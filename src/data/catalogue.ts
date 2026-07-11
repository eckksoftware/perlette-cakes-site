import type { ImageMetadata } from 'astro';

// Placeholder photography: reuse the landing images so bespoke layouts can be
// visualised now. Swap per-variation shots later; grep `placeholderImage` to find them.
import cakesImage from '../assets/images/index/variety-cakes.JPG';
import flowerCake from '../assets/images/index/hero-flowery-cake.JPG';
import ownerGifts from '../assets/images/index/owner-personal-handmade-gifts.JPG';

export interface Accent {
  theme: string; // class in src/styles/accents.css
  label: string;
}

export interface Variation {
  slug: string; // anchor id now; dedicated URL later only if the variation rule is met
  name: string;
  crave: string; // evocative, truthful "you're missing out" line — no unverified claims
  detail?: string; // optional factual note
  image: ImageMetadata;
  imageAlt: string; // describes the actual (placeholder) photo for accessibility
  placeholderImage?: boolean;
}

export type CategorySlug = 'custom-cakes' | 'cupcakes' | 'pastries' | 'cookies';

export interface Category {
  slug: CategorySlug;
  name: string;
  navLabel: string;
  accent: Accent;
  // SEO
  title: string;
  description: string;
  h1: string;
  intro: string[]; // answer-first: Perlette Cakes, Klang Valley, WhatsApp, Lalamove
  leadTimeNote: string;
  useCases: string[];
  // ordering
  whatsappMessage: string;
  modalInterest?: string; // pre-checks a modal "Interested In" option
  // content
  signature: Variation; // the cinematic full-bleed hero product
  signatureHeadline: string;
  signatureEyebrow: string;
  variations: Variation[]; // the collage
}

const customCakes: Category = {
  slug: 'custom-cakes',
  name: 'Custom Cakes',
  navLabel: 'Custom Cakes',
  accent: { theme: 'accent-plum', label: 'plum' },
  title: 'Custom Cake Delivery Klang Valley | Custom Cakes by Perlette Cakes',
  description:
    'Custom celebration cakes made to order by Perlette Cakes, a home-based baker in Klang Valley. Birthdays, gifting, and gatherings, delivered by Lalamove. Start your order on WhatsApp.',
  h1: 'Custom cakes delivered across Klang Valley',
  intro: [
    'Perlette Cakes is a home-based baker making custom celebration cakes to order across Klang Valley, Malaysia. Every cake is baked for one occasion — yours.',
    'Tell us the date, the flavours, and the moment on WhatsApp, and we take it from there, right through to Lalamove delivery at your door.',
  ],
  leadTimeNote:
    'Custom cakes are best ordered 3 to 5 days ahead, with larger or more detailed designs needing a little more notice. We deliver across Klang Valley by Lalamove — there is no pickup.',
  useCases: ['Birthdays', 'Gifting', 'Gatherings', 'Corporate & events', 'Small celebrations'],
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a custom cake order.",
  modalInterest: 'Cake',
  signatureEyebrow: 'The one they remember',
  signatureHeadline: 'The cake they photograph before they cut it',
  signature: {
    slug: 'signature-floral',
    name: 'Signature floral cake',
    crave:
      'Tender crumb under clouds of fresh cream and edible flowers — the cake the whole table leans in for.',
    image: flowerCake,
    imageAlt: 'Flowery celebration cake with piped cream, edible flowers, and a white ribbon detail.',
    placeholderImage: true,
  },
  variations: [
    {
      slug: 'strawberry',
      name: 'Strawberry cake',
      crave:
        'Vanilla sponge, fresh cream, and ripe strawberries layered tall — light enough to go back for a second slice.',
      detail: 'A birthday favourite.',
      image: cakesImage,
      imageAlt: 'An assortment of custom celebration cakes with different colours, sizes, and piped details.',
      placeholderImage: true,
    },
    {
      slug: 'chocolate',
      name: 'Chocolate fudge cake',
      crave: 'Dark, moist chocolate sponge and a fudge so rich the room goes quiet on the first bite.',
      image: ownerGifts,
      imageAlt: 'Handmade cakes and treats boxed as personal gifts by Perlette Cakes.',
      placeholderImage: true,
    },
    {
      slug: 'vintage-heart',
      name: 'Vintage heart cake',
      crave:
        'Piped lambeth borders and a hand-written message — nostalgic, romantic, and made to be gifted.',
      image: cakesImage,
      imageAlt: 'An assortment of custom celebration cakes with piped borders and decorative finishes.',
      placeholderImage: true,
    },
    {
      slug: 'bento',
      name: 'Bento cake',
      crave: 'A little cake for two, boxed and ready to surprise — small on size, big on the moment.',
      image: flowerCake,
      imageAlt: 'A small decorated celebration cake finished with piped cream and delicate detail.',
      placeholderImage: true,
    },
  ],
};

export const categories: Category[] = [customCakes];

export function categoryBySlug(slug: CategorySlug): Category {
  const found = categories.find((category) => category.slug === slug);
  if (!found) throw new Error(`Unknown category: ${slug}`);
  return found;
}

export const categoryPath = (slug: CategorySlug): string => `/${slug}/`;
export const categoryUrl = (slug: CategorySlug): string => `https://perlettecakes.com/${slug}/`;
