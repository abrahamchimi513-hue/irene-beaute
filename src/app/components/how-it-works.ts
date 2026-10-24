import { Component } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  template: `
    <section class="section section--tight">
      <div class="container">
        <p class="eyebrow">Simple et rapide</p>
        <h2 class="section__title">Comment ça marche</h2>
        <ol class="steps">
          @for (s of steps; track s.title) {
            <li class="step">
              <h3 class="step__title">{{ s.title }}</h3>
              <p class="step__text">{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
})
export class HowItWorksComponent {
  protected readonly steps = [
    {
      title: 'Choisissez',
      text: 'Parcourez la boutique ou la liste des services et sélectionnez ce qui vous plaît.',
    },
    {
      title: 'Envoyez sur WhatsApp',
      text: 'Votre commande ou votre demande de rendez-vous arrive prête à envoyer, message déjà rédigé.',
    },
    {
      title: 'Confirmez avec Irène',
      text: "Irène vous répond directement pour confirmer la disponibilité, le prix et l'horaire.",
    },
  ];
}
