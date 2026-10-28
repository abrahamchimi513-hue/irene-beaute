export type Category = 'vetements' | 'meches' | 'perruques';

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
  { id: 'perruques', label: 'Perruques' },
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
    id: 'robe-volants-dos-nu',
    category: 'vetements',
    name: 'Robe dos nu à volants',
    description: 'Robe longue à col américain, jupe à volants superposés.',
    price: null,
    variants: [
      { id: 'blanc', label: 'Blanc', image: 'images/robe-volants-blanc.jpg' },
      { id: 'fuchsia', label: 'Fuchsia', image: 'images/robe-volants-fuchsia.jpg' },
    ],
  },
  {
    id: 'robe-chemise-ceinturee',
    category: 'vetements',
    name: 'Robe chemise ceinturée',
    description: 'Robe chemise longue boutonnée, plis sur le buste, large ceinture tressée.',
    price: null,
    variants: [
      { id: 'marron', label: 'Marron', image: 'images/robe-chemise-marron.jpg' },
      { id: 'beige', label: 'Beige', image: 'images/robe-chemise-beige.jpg' },
      { id: 'bleu', label: 'Bleu', image: 'images/robe-chemise-bleu.jpg' },
      { id: 'rouille', label: 'Rouille', image: 'images/robe-chemise-rouille.jpg' },
      { id: 'olive', label: 'Vert olive', image: 'images/robe-chemise-olive.jpg' },
    ],
  },
  {
    id: 'robe-chemise-pois',
    category: 'vetements',
    name: 'Robe chemise à pois',
    description: 'Robe chemise légère à manches longues, jupe évasée et ceinture à nouer.',
    price: null,
    variants: [
      { id: 'blanc', label: 'Blanc', image: 'images/robe-chemise-pois-blanc.jpg' },
      { id: 'noir', label: 'Noir', image: 'images/robe-chemise-pois-noir.jpg' },
    ],
  },
  {
    id: 'veste-cuir-asymetrique',
    category: 'vetements',
    name: 'Veste courte en simili cuir',
    description: 'Veste courte à grand col et coupe asymétrique.',
    price: null,
    variants: [
      { id: 'bordeaux', label: 'Bordeaux', image: 'images/veste-cuir-bordeaux.jpg' },
      { id: 'noir', label: 'Noir', image: 'images/veste-cuir-noir.jpg' },
    ],
  },
  {
    id: 'ensemble-marron-bandes-roses',
    category: 'vetements',
    name: 'Ensemble marron à bandes roses',
    description: 'Haut col en V et corsaire assortis, bandes roses sur les côtés.',
    price: null,
    image: 'images/ensemble-marron-bandes-roses.jpg',
  },
  {
    id: 'short-jean-fourrure',
    category: 'vetements',
    name: 'Short en jean bordé de fourrure',
    description: 'Short en jean foncé, bordure fourrure blanche, étoile, nœuds et pompon cœur.',
    price: null,
    image: 'images/short-jean-fourrure.jpg',
  },
  {
    id: 'ensemble-jogging-marron',
    category: 'vetements',
    name: 'Ensemble jogging marron à bandes',
    description: 'Veste, brassière et pantalon large marron à bandes beiges.',
    price: null,
    image: 'images/ensemble-jogging-marron.jpg',
  },
  {
    id: 'ensemble-haut-raye-jaune-noir',
    category: 'vetements',
    name: 'Ensemble haut rayé et pantalon large',
    description: 'Haut court rayé jaune et noir à lacet, pantalon large noir.',
    price: null,
    image: 'images/ensemble-haut-raye-jaune-noir.jpg',
  },
  {
    id: 'ensemble-leopard-jupe-longue',
    category: 'vetements',
    name: 'Ensemble léopard et jupe longue',
    description: 'Haut court à bretelles et jupe longue à imprimé léopard.',
    price: null,
    image: 'images/ensemble-leopard-jupe-longue.jpg',
  },
  {
    id: 'robe-longue-rouge',
    category: 'vetements',
    name: 'Robe longue fluide rouge',
    description: 'Robe longue ample à fines bretelles et encolure froncée.',
    price: null,
    image: 'images/robe-longue-rouge.jpg',
  },
  {
    id: 'robe-noire-noeud-volant',
    category: 'vetements',
    name: 'Robe noire à nœud et volant',
    description: 'Robe noire à col lavallière, manches transparentes, boutons dorés et ceinture foulard.',
    price: null,
    image: 'images/robe-noire-noeud-volant.jpg',
  },
  {
    id: 'ensemble-corset-leopard',
    category: 'vetements',
    name: 'Ensemble corset léopard et corsaire',
    description: 'Haut corset à bretelles imprimé léopard avec corsaire bordeaux.',
    price: null,
    image: 'images/ensemble-corset-leopard.jpg',
  },
  {
    id: 'robe-dos-nu-pois-blanc',
    category: 'vetements',
    name: 'Robe dos nu à pois',
    description: 'Robe mi-longue blanche à pois noirs, col montant et bas asymétrique.',
    price: null,
    image: 'images/robe-dos-nu-pois-blanc.jpg',
  },
  {
    id: 'robe-babydoll-tulle-jaune',
    category: 'vetements',
    name: 'Robe babydoll en tulle jaune',
    description: 'Robe courte évasée en tulle, col montant et bas à volants.',
    price: null,
    image: 'images/robe-babydoll-tulle-jaune.jpg',
  },
  {
    id: 'robe-boutonnee-vert',
    category: 'vetements',
    name: 'Robe longue boutonnée à fente',
    description: 'Robe longue ajustée vert anis, encolure carrée, boutons et fente devant.',
    price: null,
    image: 'images/robe-boutonnee-vert.jpg',
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
  {
    id: 'perruques',
    category: 'perruques',
    name: 'Perruques',
    description: 'Perruques disponibles à la boutique. Demandez les modèles et les prix à Irène.',
    price: null,
  },
];
