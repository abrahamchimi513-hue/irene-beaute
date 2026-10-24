import { Component, inject } from '@angular/core';
import { WhatsappService } from './services/whatsapp.service';
import { BookingComponent } from './components/booking';
import { CartDrawerComponent } from './components/cart-drawer';
import { CatalogComponent } from './components/catalog';
import { ContactComponent } from './components/contact';
import { FooterComponent } from './components/footer';
import { GalleryComponent } from './components/gallery';
import { HeaderComponent } from './components/header';
import { HeroComponent } from './components/hero';
import { HowItWorksComponent } from './components/how-it-works';
import { ServicesComponent } from './components/services';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HeroComponent,
    ServicesComponent,
    GalleryComponent,
    CatalogComponent,
    HowItWorksComponent,
    BookingComponent,
    ContactComponent,
    FooterComponent,
    CartDrawerComponent,
  ],
  template: `
    <a class="skip-link" href="#main">Aller au contenu</a>
    <app-header />
    <main id="main">
      <app-hero />
      <app-services />
      <app-gallery />
      <app-catalog />
      <app-how-it-works />
      <app-booking />
      <app-contact />
    </main>
    <app-footer />
    <app-cart-drawer />

    <a class="wa-float" [href]="whatsapp.link()" target="_blank" rel="noopener" aria-label="Écrire à Irène sur WhatsApp">
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M20 11.5a8 8 0 0 1-11.8 7L4 20l1.5-4.1A8 8 0 1 1 20 11.5z" />
        <path d="M9.2 8.8c.2 2.6 2.4 4.9 5 5.2l1.2-1.3-1.8-1-.8.7a3.6 3.6 0 0 1-1.7-1.7l.7-.8-1-1.8-1.6 1.2z" />
      </svg>
    </a>
  `,
})
export class App {
  protected readonly whatsapp = inject(WhatsappService);
}
