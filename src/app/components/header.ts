import { Component, inject, signal } from '@angular/core';
import { SITE } from '../data/site.config';
import { CartService } from '../services/cart.service';
import { WhatsappService } from '../services/whatsapp.service';

@Component({
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="container header__inner">
        <a class="brand" href="#accueil" aria-label="Irène, retour à l'accueil" (click)="menuOpen.set(false)">
          <img class="brand__logo" src="images/logo.jpg" alt="" width="48" height="48" />
          <span class="brand__text">
            <span class="brand__name">{{ site.name }}</span>
            <span class="brand__sub">{{ site.tagline }}</span>
          </span>
        </a>

        <nav class="nav" aria-label="Navigation principale">
          @for (link of links; track link.href) {
            <a [href]="link.href">{{ link.label }}</a>
          }
        </nav>

        <div class="header__actions">
          <button class="cart-btn" type="button" (click)="cart.open()" aria-label="Ouvrir ma commande">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            <span class="cart-btn__label">Ma commande</span>
            @if (cart.count() > 0) {
              <span class="cart-btn__badge" aria-label="{{ cart.count() }} article(s)">{{ cart.count() }}</span>
            }
          </button>

          <a class="btn btn--wa header__wa" [href]="whatsapp.link()" target="_blank" rel="noopener">WhatsApp</a>

          <button
            class="menu-btn"
            type="button"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-nav"
            aria-label="Menu"
          >
            @if (menuOpen()) {
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            } @else {
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            }
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav id="mobile-nav" class="mobile-nav" aria-label="Navigation mobile">
          <div class="container mobile-nav__inner">
            @for (link of links; track link.href) {
              <a [href]="link.href" (click)="menuOpen.set(false)">{{ link.label }}</a>
            }
            <a class="btn btn--wa" [href]="whatsapp.link()" target="_blank" rel="noopener">Écrire sur WhatsApp</a>
          </div>
        </nav>
      }
    </header>
  `,
})
export class HeaderComponent {
  protected readonly site = SITE;
  protected readonly cart = inject(CartService);
  protected readonly whatsapp = inject(WhatsappService);
  protected readonly menuOpen = signal(false);

  protected readonly links = [
    { href: '#services', label: 'Services' },
    { href: '#realisations', label: 'Réalisations' },
    { href: '#boutique', label: 'Boutique' },
    { href: '#rendez-vous', label: 'Rendez-vous' },
    { href: '#contact', label: 'Contact' },
  ];
}
