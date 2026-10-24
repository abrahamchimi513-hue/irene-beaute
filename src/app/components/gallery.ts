import { Component } from '@angular/core';

interface Work {
  image: string;
  alt: string;
  tag: string;
  title: string;
}

/** Photos de réalisations. Ajouter une ligne pour afficher une nouvelle photo. */
const WORKS: Work[] = [
  {
    image: 'images/realisation-ongles-stiletto.jpg',
    alt: 'Ongles en amande pointue, french blanc avec liserés dorés et fleur',
    tag: 'Ongleri',
    title: 'Amande pointue, french blanc et or',
  },
  {
    image: 'images/realisation-ongles-papillon.jpg',
    alt: 'Ongles carrés, french blanc avec un ongle décoré d\'une aile de papillon rose',
    tag: 'Ongleri',
    title: 'French blanc et aile de papillon',
  },
  {
    image: 'images/realisation-coiffure-cuivre.jpg',
    alt: 'Coiffure lisse avec raie de côté et cheveux cuivrés',
    tag: 'Coiffure',
    title: 'Lisse cuivré, raie de côté',
  },
];

@Component({
  selector: 'app-gallery',
  template: `
    <section id="realisations" class="section section--tint">
      <div class="container">
        <p class="eyebrow">Réalisations</p>
        <h2 class="section__title">Un aperçu de notre travail</h2>
        <p class="section__lead">
          Ongles et coiffures. Une photo vous inspire ? Gardez-la et montrez-la à Irène lors de votre
          rendez-vous.
        </p>

        <div class="gallery">
          @for (w of works; track w.image) {
            <figure class="work">
              <img class="work__img" [src]="w.image" [alt]="w.alt" loading="lazy" />
              <figcaption class="work__caption">
                <span class="work__tag">{{ w.tag }}</span>
                <span class="work__title">{{ w.title }}</span>
              </figcaption>
            </figure>
          }
        </div>

        <p class="gallery__cta">
          <a class="btn btn--primary" href="#rendez-vous">Prendre rendez-vous</a>
        </p>
      </div>
    </section>
  `,
})
export class GalleryComponent {
  protected readonly works = WORKS;
}
