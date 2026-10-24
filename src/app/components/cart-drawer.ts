import { Component, ElementRef, HostListener, effect, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FcfaPipe } from '../pipes/fcfa.pipe';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-drawer',
  imports: [FormsModule, FcfaPipe],
  template: `
    @if (cart.isOpen()) {
      <div class="drawer-backdrop" (click)="cart.close()"></div>
      <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        <header class="drawer__head">
          <h2 id="drawer-title" class="drawer__title">Ma commande</h2>
          <button #closeBtn class="icon-btn" type="button" (click)="cart.close()" aria-label="Fermer">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        @if (cart.lines().length === 0) {
          <div class="drawer__empty">
            <p>Votre commande est vide.</p>
            <p class="drawer__hint">Ajoutez des articles depuis la boutique.</p>
            <a class="btn btn--primary" href="#boutique" (click)="cart.close()">Voir la boutique</a>
          </div>
        } @else {
          <ul class="drawer__list">
            @for (line of cart.lines(); track line.key) {
              <li class="line">
                <div class="line__info">
                  <p class="line__name">{{ line.product.name }}</p>
                  @if (line.variant) {
                    <p class="line__variant">{{ line.variant.label }}</p>
                  }
                  <p class="line__price">{{ line.product.price | fcfa }}</p>
                </div>
                <div class="qty" role="group" [attr.aria-label]="'Quantité de ' + line.product.name + (line.variant ? ', ' + line.variant.label : '')">
                  <button type="button" (click)="cart.decrease(line.key)" aria-label="Retirer une unité">-</button>
                  <span>{{ line.qty }}</span>
                  <button type="button" (click)="cart.increase(line.key)" aria-label="Ajouter une unité">+</button>
                </div>
                <button class="link-btn line__remove" type="button" (click)="cart.remove(line.key)">
                  Retirer
                </button>
              </li>
            }
          </ul>

          <div class="drawer__foot">
            @if (cart.pricedTotal() > 0) {
              <p class="drawer__total">
                <span>Total indicatif</span>
                <strong>{{ cart.pricedTotal() | fcfa }}</strong>
              </p>
            }
            @if (cart.hasUnpriced()) {
              <p class="drawer__hint">Les articles sur demande seront chiffrés par Irène.</p>
            }

            <div class="field">
              <label for="c-name">Votre nom (facultatif)</label>
              <input id="c-name" name="cname" type="text" autocomplete="name" [(ngModel)]="name" />
            </div>
            <div class="field">
              <label for="c-note">Taille, couleur, précisions (facultatif)</label>
              <textarea id="c-note" name="cnote" rows="2" [(ngModel)]="note"></textarea>
            </div>

            <button class="btn btn--wa btn--block" type="button" (click)="cart.send(name, note)">
              Envoyer ma commande sur WhatsApp
            </button>
            <button class="link-btn drawer__clear" type="button" (click)="cart.clear()">Vider la commande</button>
          </div>
        }
      </aside>
    }
  `,
})
export class CartDrawerComponent {
  protected readonly cart = inject(CartService);
  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('closeBtn');

  protected name = '';
  protected note = '';

  constructor() {
    // Verrouille le défilement de la page quand le panneau est ouvert.
    effect(() => {
      document.body.classList.toggle('no-scroll', this.cart.isOpen());
    });
    // Place le focus sur le bouton Fermer à l'ouverture.
    effect(() => {
      this.closeBtn()?.nativeElement.focus();
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.cart.close();
  }
}
