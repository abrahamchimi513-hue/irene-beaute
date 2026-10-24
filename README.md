# Irène - Beauté, Mode & Élégance

Site vitrine en Angular 20 : services et tarifs, catalogue (vêtements et mèches), commande et rendez-vous envoyés sur WhatsApp.

## Démarrer sur ton ordinateur

Il faut Node.js 20 ou plus récent (https://nodejs.org, version LTS).

```bash
npm install
npm start
```

Ouvre ensuite http://localhost:4200 dans le navigateur. Le site se met à jour à chaque modification.

## Modifier le contenu (sans toucher au design)

Tout se trouve dans `src/app/data/` :

| Fichier | Ce qu'il contient |
| --- | --- |
| `site.config.ts` | Nom, numéro de téléphone et WhatsApp, adresse |
| `services.ts` | Prestations et tarifs (ongleri, coiffure, lace frontal) |
| `catalog.ts` | Articles de la boutique (vêtements et mèches) |

### Ajouter un article avec sa photo

1. Copie la photo dans le dossier `public/images/` (crée le dossier s'il n'existe pas), par exemple `robe-rouge.jpg`.
2. Dans `catalog.ts`, ajoute un bloc :

```ts
{
  id: 'robe-rouge',
  category: 'vetements',      // ou 'meches'
  name: 'Robe rouge',
  description: 'Pour les cérémonies.',
  price: 15000,               // en FCFA, ou null pour "Sur demande"
  image: 'images/robe-rouge.jpg',
},
```

Les articles déjà présents dans `catalog.ts` sont des exemples sans prix ni photo : à remplacer par les vrais.

## Mettre le site en ligne

```bash
npm run build
```

Le site prêt à publier se trouve dans `dist/irene-beaute/browser/`. Dépose ce dossier sur un hébergeur statique : Netlify, Vercel, Cloudflare Pages ou Firebase Hosting (gratuits pour commencer). Le nom de domaine (par exemple `irene-beaute.com`) s'achète chez un registraire puis se relie à l'hébergeur depuis ses réglages.

## Comment ça marche

- **Commande** : le client ajoute des articles, ouvre "Ma commande" puis envoie. WhatsApp s'ouvre avec le message déjà rédigé (articles, quantités, nom).
- **Rendez-vous** : le formulaire prépare un message avec le service, la date et l'heure souhaitées.
- Aucun paiement en ligne : Irène confirme le prix et la disponibilité par WhatsApp.
