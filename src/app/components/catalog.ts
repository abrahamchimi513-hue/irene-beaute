import { Component, ElementRef, HostListener, computed, effect, inject, signal, viewChild } from '@angular/core';
import { CATEGORIES, Category, PRODUCTS, Product, Variant } from '../data/catalog';
import { FcfaPipe } from '../pipes/fcfa.pipe';
import { CartService } from '../services/cart.service';
import { WhatsappService } from '../services/whatsapp.service';

@Component({
  selector: 'app-catalog',
  imports: [FcfaPipe],
  template: `
    <section id="boutique" class="section section--white">
      <div class="container">
        <p class="eyebrow">Boutique</p>
        <h2 class="section__title">Vêtements pour femme et mèches</h2>
        <p class="section__lead">
          Touchez un article pour voir les détails et les coloris. Ajoutez-le à votre commande, puis
          envoyez-la à Irène sur WhatsApp pour confirmer la disponibilité, la taille et le prix.
        </p>

        <div class="tabs" role="group" aria-label="Filtrer le catalogue">
          @for (c of categories; track c.id) {
            <button
              class="tab"
              type="button"
              [attr.aria-pressed]="filter() === c.id"
              (click)="filter.set(c.id)"
            >
              {{ c.label }}
            </button>
          }
        </div>

        <div class="product-grid">
          @for (p of visible(); track p.id) {
            <article class="product">
              <button class="tile tile--btn" type="button" tabindex="-1" aria-hidden="true" (click)="open(p, $event)">
                @if (cardImage(p); as img) {
                  <img [src]="img" [alt]="p.name" loading="lazy" />
                } @else {
                  <span class="tile__mono">{{ p.name.charAt(0) }}</span>
                  <span class="tile__soon">Photo à venir</span>
                }
                @if (p.variants && p.variants.length > 1) {
                  <span class="tile__badge">{{ p.variants.length }} coloris</span>
                }
              </button>
              <div class="product__body">
                <p class="product__cat">{{ p.category === 'meches' ? 'Mèches' : 'Vêtements' }}</p>
                <h3 class="product__name">
                  <button class="name-btn" type="button" (click)="open(p, $event)">{{ p.name }}</button>
                </h3>
                <p class="product__desc">{{ p.description }}</p>
                <p class="product__price" [class.product__price--ask]="p.price === null">
                  {{ p.price | fcfa }}
                </p>
                @if (p.variants && p.variants.length > 1) {
                  <button class="btn btn--ghost btn--block" type="button" (click)="open(p, $event)">
                    Voir les coloris
                  </button>
                } @else {
                  <button class="btn btn--primary btn--block" type="button" (click)="add(p, null)">
                    {{ justAdded() === p.id ? 'Ajouté à la commande' : 'Ajouter à la commande' }}
                  </button>
                }
              </div>
            </article>
          }
        </div>

        <p class="catalog__more">
          Vous ne trouvez pas ce que vous cherchez ?
          <a [href]="whatsapp.link('Bonjour Irène, je voudrais voir les articles disponibles à la boutique.')" target="_blank" rel="noopener">
            Demandez-le sur WhatsApp</a>.
        </p>
      </div>
    </section>

    @if (selected(); as p) {
      <div class="modal-backdrop" (click)="close()"></div>
      <div class="modal" role="dialog" aria-modal="true" [attr.aria-label]="p.name">
        <button #closeBtn class="icon-btn modal__close" type="button" (click)="close()" aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div class="modal__scroll">
          <div class="modal__media">
            @if (currentImage(); as img) {
              <img [src]="img" [alt]="altText(p)" />
            } @else {
              <span class="tile__mono">{{ p.name.charAt(0) }}</span>
            }
          </div>

          <div class="modal__info">
            <p class="product__cat">{{ p.category === 'meches' ? 'Mèches' : 'Vêtements' }}</p>
            <h3 class="modal__title">{{ p.name }}</h3>
            <p class="modal__price" [class.product__price--ask]="p.price === null">{{ p.price | fcfa }}</p>
            <p class="modal__desc">{{ p.description }}</p>

            @if (p.variants && p.variants.length > 1) {
              <div class="modal__colors">
                <p class="modal__label">Coloris : <strong>{{ currentVariant()?.label }}</strong></p>
                <div class="swatches" role="group" aria-label="Choisir un coloris">
                  @for (v of p.variants; track v.id) {
                    <button
                      class="swatch"
                      type="button"
                      [attr.aria-pressed]="currentVariant()?.id === v.id"
                      (click)="variantId.set(v.id)"
                    >
                      <img [src]="v.image" alt="" loading="lazy" />
                      <span>{{ v.label }}</span>
                    </button>
                  }
                </div>
              </div>
            }

            <div class="modal__actions">
              <button class="btn btn--primary btn--block" type="button" (click)="add(p, currentVariant())">
                {{ justAdded() === key(p, currentVariant()) ? 'Ajouté à la commande' : 'Ajouter à la commande' }}
              </button>
              <a class="btn btn--ghost btn--block" [href]="whatsapp.link(askMessage(p))" target="_blank" rel="noopener">
                Poser une question sur WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class CatalogComponent {
  private readonly cart = inject(CartService);
  protected readonly whatsapp = inject(WhatsappService);
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  protected readonly categories = CATEGORIES;
  protected readonly filter = signal<Category | 'tous'>('tous');
  protected readonly justAdded = signal<string | null>(null);

  protected readonly selected = signal<Product | null>(null);
  protected readonly variantId = signal<string | null>(null);

  protected readonly visible = computed(() =>
    this.filter() === 'tous' ? PRODUCTS : PRODUCTS.filter((p) => p.category === this.filter()),
  );

  protected readonly currentVariant = computed<Variant | null>(() => {
    const p = this.selected();
    if (!p?.variants?.length) {
      return null;
    }
    return p.variants.find((v) => v.id === this.variantId()) ?? p.variants[0];
  });

  protected readonly currentImage = computed(
    () => this.currentVariant()?.image ?? this.selected()?.image ?? null,
  );

  private timer: ReturnType<typeof setTimeout> | undefined;
  private opener: HTMLElement | null = null;

  constructor() {
    // Bloque le défilement de la page derrière la fiche.
    effect(() => {
      document.body.classList.toggle('modal-open', this.selected() !== null);
    });
    // Place le focus sur le bouton Fermer à l'ouverture.
    effect(() => {
      this.closeBtn()?.nativeElement.focus();
    });
  }

  /** Une seule image sur la carte : celle de l'article, ou du premier coloris. */
  protected cardImage(p: Product): string | null {
    return p.image ?? p.variants?.[0]?.image ?? null;
  }

  protected key(p: Product, v: Variant | null): string {
    return v ? `${p.id}:${v.id}` : p.id;
  }

  protected altText(p: Product): string {
    const v = this.currentVariant();
    return v ? `${p.name}, ${v.label}` : p.name;
  }

  protected askMessage(p: Product): string {
    const v = this.currentVariant();
    const color = v ? ` en ${v.label.toLowerCase()}` : '';
    return `Bonjour Irène, je suis intéressée par : ${p.name}${color}. Est-il disponible ?`;
  }

  protected open(p: Product, event?: Event): void {
    this.opener = (event?.currentTarget as HTMLElement | null) ?? null;
    this.selected.set(p);
    this.variantId.set(p.variants?.[0]?.id ?? null);
  }

  protected close(): void {
    this.selected.set(null);
    this.opener?.focus();
    this.opener = null;
  }

  protected add(p: Product, v: Variant | null): void {
    this.cart.add(p, v);
    this.justAdded.set(this.key(p, v));
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.justAdded.set(null), 1600);
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.selected()) {
      this.close();
    }
  }
}
