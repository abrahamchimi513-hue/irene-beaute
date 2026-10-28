export type ServiceGroup = 'ongleri' | 'coiffure';

export interface Service {
  id: string;
  group: ServiceGroup;
  name: string;
  description: string;
  /** Prix en FCFA. Mettre null pour afficher "Sur demande". */
  price: number | null;
  /** Photo de la prestation, dans public/images/. Sans photo, une vignette provisoire s'affiche. */
  image?: string;
}

/** Prestations proposées. Ajouter, modifier ou retirer des lignes ici. */
export const SERVICES: Service[] = [
  {
    id: 'vernis-gel-capsule',
    group: 'ongleri',
    name: 'Vernis gel sur capsule',
    description: 'Pose de capsules avec vernis gel, rapide et soignée.',
    price: 2000,
    image: 'images/service-vernis-gel-capsule.jpg',
  },
  {
    id: 'construction-gel',
    group: 'ongleri',
    name: 'Construction gel',
    description: "Allongement et structure de l'ongle en gel.",
    price: 3500,
    image: 'images/service-construction-gel.jpg',
  },
  {
    id: 'gainage',
    group: 'ongleri',
    name: 'Gainage',
    description: "Renfort de l'ongle naturel pour une tenue durable.",
    price: 5000,
  },
  {
    id: 'manucure-pedicure',
    group: 'ongleri',
    name: 'Manucure et pédicure',
    description: 'Soin des mains et des pieds, pour des ongles nets et soignés.',
    price: null,
    image: 'images/service-manucure-pedicure.jpg',
  },
  {
    id: 'coiffure',
    group: 'coiffure',
    name: 'Coiffure',
    description: 'Décrivez le style souhaité, Irène vous communique le tarif.',
    price: null,
    image: 'images/service-coiffure.jpg',
  },
  {
    id: 'pose-lace-frontal',
    group: 'coiffure',
    name: 'Pose lace frontal',
    description: 'Pose soignée de votre lace frontal.',
    price: null,
    image: 'images/service-lace-frontal.jpg',
  },
  {
    id: 'traitement-perruques',
    group: 'coiffure',
    name: 'Traitement de perruques',
    description: 'Entretien et soin de votre perruque pour lui redonner de l\'éclat.',
    price: null,
  },
];
