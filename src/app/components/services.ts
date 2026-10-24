import { Component, inject } from '@angular/core';
import { SERVICES } from '../data/services';
import { FcfaPipe } from '../pipes/fcfa.pipe';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-services',
  imports: [FcfaPipe],
  template: `
    <section id="services" class="section">
      <div class="container">
        <p class="eyebrow">Services</p>
        <h2 class="section__title">Ongles et coiffure</h2>
        <p class="section__lead">
          Des prestations soignées, aux tarifs affichés. Choisissez votre service puis réservez en
          quelques secondes.
        </p>

        <div class="services__grid">
          <article class="panel">
            <h3 class="panel__title">Ongleri</h3>
            @for (s of nails; track s.id) {
              <div class="price-row">
                <div class="price-row__thumb">
                  @if (s.image) {
                    <img [src]="s.image" [alt]="'Photo : ' + s.name" width="96" height="96" loading="lazy" />
                  } @else {
                    <span aria-hidden="true">{{ s.name.charAt(0) }}</span>
                  }
                </div>
                <h4 class="price-row__name">{{ s.name }}</h4>
                <p class="price-row__desc">{{ s.description }}</p>
                <p class="price-row__price" [class.price-row__price--ask]="s.price === null">{{ s.price | fcfa }}</p>
                <a class="price-row__cta" href="#rendez-vous" (click)="booking.choose(s.id)">
                  Réserver ce service
                </a>
              </div>
            }
          </article>

          <article class="panel panel--tint">
            <h3 class="panel__title">Coiffure</h3>
            @for (s of hair; track s.id) {
              <div class="price-row">
                <div class="price-row__thumb">
                  @if (s.image) {
                    <img [src]="s.image" [alt]="'Photo : ' + s.name" width="96" height="96" loading="lazy" />
                  } @else {
                    <span aria-hidden="true">{{ s.name.charAt(0) }}</span>
                  }
                </div>
                <h4 class="price-row__name">{{ s.name }}</h4>
                <p class="price-row__desc">{{ s.description }}</p>
                <p class="price-row__price" [class.price-row__price--ask]="s.price === null">{{ s.price | fcfa }}</p>
                <a class="price-row__cta" href="#rendez-vous" (click)="booking.choose(s.id)">
                  Demander un rendez-vous
                </a>
              </div>
            }
          </article>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  protected readonly booking = inject(BookingService);
  protected readonly nails = SERVICES.filter((s) => s.group === 'ongleri');
  protected readonly hair = SERVICES.filter((s) => s.group === 'coiffure');
}
