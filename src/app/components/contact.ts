import { Component, inject, signal } from '@angular/core';
import { SITE } from '../data/site.config';
import { WhatsappService } from '../services/whatsapp.service';

@Component({
  selector: 'app-contact',
  template: `
    <section id="contact" class="section section--white">
      <div class="container contact">
        <div class="contact__info">
          <p class="eyebrow">Contact</p>
          <h2 class="section__title">Venez nous voir</h2>

          <dl class="info">
            <div class="info__row">
              <dt>Adresse</dt>
              <dd>
                @for (line of site.addressLines; track line) {
                  <span class="info__line">{{ line }}</span>
                }
                <span class="info__line">{{ site.city }}</span>
              </dd>
            </div>
            <div class="info__row">
              <dt>Téléphone et WhatsApp</dt>
              <dd>
                <a class="info__phone" [href]="'tel:' + site.phoneTel">{{ site.phoneDisplay }}</a>
                <button class="link-btn" type="button" (click)="copy()">
                  {{ copied() ? 'Numéro copié' : 'Copier le numéro' }}
                </button>
              </dd>
            </div>
          </dl>

          <div class="contact__cta">
            <a class="btn btn--wa" [href]="whatsapp.link('Bonjour Irène, je voudrais une information.')" target="_blank" rel="noopener">
              Écrire sur WhatsApp
            </a>
            <a class="btn btn--ghost" [href]="mapsUrl" target="_blank" rel="noopener">Voir l'itinéraire</a>
          </div>
        </div>

        <aside class="contact__card" aria-label="Rappel des prestations">
          <p class="contact__card-title">Irène</p>
          <p class="contact__card-sub">{{ site.tagline }}</p>
          <ul class="contact__list">
            <li>Ongleri, manucure et pédicure</li>
            <li>Coiffure, lace frontal et traitement de perruques</li>
            <li>Vêtements pour femme</li>
            <li>Mèches et perruques</li>
          </ul>
        </aside>
      </div>
    </section>
  `,
})
export class ContactComponent {
  protected readonly site = SITE;
  protected readonly whatsapp = inject(WhatsappService);
  protected readonly copied = signal(false);

  protected readonly mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(SITE.mapsQuery);

  protected async copy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(SITE.phoneTel);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1800);
    } catch {
      /* copie indisponible : le numéro reste affiché et cliquable */
    }
  }
}
