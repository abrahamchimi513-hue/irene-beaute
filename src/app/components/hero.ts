import { Component, inject } from '@angular/core';
import { SITE } from '../data/site.config';
import { WhatsappService } from '../services/whatsapp.service';

@Component({
  selector: 'app-hero',
  template: `
    <section id="accueil" class="hero">
      <div class="container hero__grid">
        <div class="hero__text">
          <p class="eyebrow">Tradex, {{ site.city }}</p>
          <h1 class="hero__title">
            <span class="hero__name">{{ site.name }}</span>
            <span class="hero__tagline">{{ site.tagline }}</span>
          </h1>
          <p class="hero__lead">{{ site.intro }}</p>
          <div class="hero__cta">
            <a class="btn btn--primary" href="#rendez-vous">Prendre rendez-vous</a>
            <a class="btn btn--ghost" href="#boutique">Voir la boutique</a>
          </div>
          <p class="hero__note">
            Commandes et rendez-vous par
            <a [href]="whatsapp.link()" target="_blank" rel="noopener">WhatsApp</a>,
            réponse directe d'Irène.
          </p>
        </div>

        <div class="hero__visual">
          <span class="orb orb--ring" aria-hidden="true"></span>
          <span class="orb orb--soft" aria-hidden="true"></span>
          <img
            class="hero__logo"
            src="images/logo.jpg"
            alt="Logo Irène Beauty and Shop"
            width="800"
            height="800"
          />
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected readonly site = SITE;
  protected readonly whatsapp = inject(WhatsappService);
}
