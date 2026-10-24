import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { PRODUCTS, Product, Variant } from '../data/catalog';
import { formatFcfa } from '../pipes/fcfa.pipe';
import { WhatsappService } from './whatsapp.service';

export interface CartLine {
  /** Identifiant de la ligne : article, et coloris s'il y en a un. */
  key: string;
  product: Product;
  variant?: Variant;
  qty: number;
}

const STORAGE_KEY = 'irene-commande-v2';

function lineKey(product: Product, variant?: Variant | null): string {
  return variant ? `${product.id}:${variant.id}` : product.id;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly whatsapp = inject(WhatsappService);

  readonly lines = signal<CartLine[]>(this.restore());
  readonly isOpen = signal(false);

  readonly count = computed(() => this.lines().reduce((sum, l) => sum + l.qty, 0));

  /** Total des articles qui ont un prix. */
  readonly pricedTotal = computed(() =>
    this.lines().reduce((sum, l) => sum + (l.product.price ?? 0) * l.qty, 0),
  );

  /** Vrai si au moins un article de la commande n'a pas de prix affiché. */
  readonly hasUnpriced = computed(() => this.lines().some((l) => l.product.price === null));

  constructor() {
    effect(() => {
      const data = this.lines().map((l) => ({ key: l.key, qty: l.qty }));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        /* stockage indisponible : la commande reste simplement en mémoire */
      }
    });
  }

  add(product: Product, variant?: Variant | null): void {
    const key = lineKey(product, variant);
    this.lines.update((lines) => {
      const existing = lines.find((l) => l.key === key);
      if (existing) {
        return lines.map((l) => (l === existing ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...lines, { key, product, variant: variant ?? undefined, qty: 1 }];
    });
  }

  increase(key: string): void {
    this.lines.update((lines) => lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)));
  }

  decrease(key: string): void {
    this.lines.update((lines) =>
      lines.map((l) => (l.key === key ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0),
    );
  }

  remove(key: string): void {
    this.lines.update((lines) => lines.filter((l) => l.key !== key));
  }

  clear(): void {
    this.lines.set([]);
  }

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  /** Envoie la commande à Irène sur WhatsApp. */
  send(customerName: string, note: string): void {
    const rows = this.lines().map((l) => {
      const color = l.variant ? `, ${l.variant.label}` : '';
      return `- ${l.qty} x ${l.product.name}${color} (${formatFcfa(l.product.price)})`;
    });
    const parts = ['Bonjour Irène, je voudrais commander :', ...rows];
    if (this.pricedTotal() > 0) {
      const suffix = this.hasUnpriced() ? ' (hors articles sur demande)' : '';
      parts.push('', `Total indicatif : ${formatFcfa(this.pricedTotal())}${suffix}`);
    }
    if (note.trim()) {
      parts.push('', `Précision : ${note.trim()}`);
    }
    if (customerName.trim()) {
      parts.push('', `Nom : ${customerName.trim()}`);
    }
    parts.push('', 'Merci.');
    this.whatsapp.open(parts.join('\n'));
  }

  private restore(): CartLine[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const saved = JSON.parse(raw) as { key: string; qty: number }[];
      const lines: CartLine[] = [];
      for (const s of saved) {
        const [productId, variantId] = String(s.key).split(':');
        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product || !(Number(s.qty) > 0)) {
          continue;
        }
        const variant = variantId ? product.variants?.find((v) => v.id === variantId) : undefined;
        if (variantId && !variant) {
          continue;
        }
        lines.push({ key: s.key, product, variant, qty: Number(s.qty) });
      }
      return lines;
    } catch {
      return [];
    }
  }
}
