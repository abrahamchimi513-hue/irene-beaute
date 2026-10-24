export type Category = 'vetements' | 'meches';

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  /** Prix en FCFA. Mettre null pour afficher "Sur demande". */
  price: number | null;
  /**
   * Chemin de la photo, par exemple 'images/robe-rouge.jpg'.
   * Déposer le fichier dans le dossier public/images/.
   * Sans photo, une vignette élégante est affichée à la place.
   */
  image?: string;
  /**
   * Coloris ou variantes du même article. Quand il y en a, la boutique n'affiche
   * qu'une vignette (la première) et les autres s'ouvrent au clic.
   */
  variants?: Variant[];
}

export interface Variant {
  id: string;
  /** Nom affiché, par exemple "Bleu marine". */
  label: string;
  /** Photo de ce coloris, dans public/images/. */
  image: string;
}

export const CATEGORIES: { id: Category | 'tous'; label: string }[] = [
  { id: 'tous', label: 'Tout voir' },
  { id: 'vetements', label: 'Vêtements' },
  { id: 'meches', label: 'Mèches' },
];

/**
 * CATALOGUE : à remplacer par les vrais articles de la boutique.
 * Les entrées ci-dessous sont des exemples génériques, sans prix ni photo.
 * Pour chaque article : un id unique, une catégorie, un nom, une description,
 * un prix en FCFA (ou null) et, si possible, une photo.
 */
export const PRODUCTS: Product[] = [
  {
    id: 'chemise-carreaux-short-jean',
    category: 'vetements',
    name: 'Chemise à carreaux et short en jean',
    description: 'Chemise ample à carreaux marron, short en jean avec empiècements carreaux et dentelle.',
    price: null,
    image: 'images/chemise-carreaux-short-jean.jpg',
  },
  {
    id: 'ensemble-chemise-rayee-pantalon',
    category: 'vetements',
    name: 'Ensemble chemise rayée et pantalon large',
    description: 'Chemise rayée portée ouverte sur un haut blanc, pantalon large fluide à cordon. Aussi en fuchsia, blanc et orange : demandez à Irène.',
    price: null,
    variants: [
      { id: 'bleu-marine', label: 'Bleu marine', image: 'images/chemise-rayee-bleu-marine.jpg' },
      { id: 'kaki', label: 'Kaki', image: 'images/chemise-rayee-kaki.jpg' },
      { id: 'marron', label: 'Marron', image: 'images/chemise-rayee-marron.jpg' },
      { id: 'noir', label: 'Noir', image: 'images/chemise-rayee-noir.jpg' },
    ],
  },
  {
    id: 'ensemble-pois-blanc',
    category: 'vetements',
    name: 'Ensemble à pois blanc',
    description: 'Haut à col noué et pantalon large assorti, pois noirs sur fond blanc.',
    price: null,
    image: 'images/ensemble-pois-blanc.jpg',
  },
  {
    id: 'combinaison-pois-noir',
    category: 'vetements',
    name: 'Combinaison à pois noir',
    description: 'Combinaison pantalon fluide à manches courtes et ceinture, pois blancs sur fond noir.',
    price: null,
    image: 'images/ensemble-pois-noir.jpg',
  },
  {
    id: 'body-dentelle',
    category: 'vetements',
    name: 'Body en dentelle',
    description: 'Body en dentelle à manches longues, avec pince décorative.',
    price: null,
    variants: [
      { id: 'bordeaux', label: 'Bordeaux', image: 'images/body-dentelle-bordeaux.jpg' },
      { id: 'marron', label: 'Marron', image: 'images/body-dentelle-marron.jpg' },
    ],
  },
  {
    id: 'meches-super-star-braid-33',
    category: 'meches',
    name: 'Mèches Super Star Braid',
    description: 'Mèches 100% Kanekalon pour tresses, coloris n°33.',
    price: null,
    image: 'images/meches-super-star-braid-33.jpg',
  },
  {
    id: 'meches-reinah-twist-lush',
    category: 'meches',
    name: 'Reinah Twist Lush Hair',
    description: 'Twists prêts à poser, paquet de 400 g, longueur 18 pouces.',
    price: null,
    image: 'images/meches-reinah-twist-lush.jpg',
  },
  {
    id: 'meches-sasha-locs-lush',
    category: 'meches',
    name: 'Sasha Locs Lush Hair',
    description: 'Longues mèches pour locs, extra légères, douces et brillantes.',
    price: null,
    image: 'images/meches-sasha-locs-lush.jpg',
  },
  {
    id: 'meches-kanekalon-coloris',
    category: 'meches',
    name: 'Mèches Kanekalon en plusieurs coloris',
    description: 'Mèches 100% Kanekalon pour tresses, du brun foncé au beige.',
    price: null,
    image: 'images/meches-kanekalon-coloris.jpg',
  },
];
