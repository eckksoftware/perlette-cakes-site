import type { ImageMetadata } from 'astro';

// Placeholder photography: reuse the landing images so bespoke layouts can be
// visualised now. Swap per-variation shots later; grep `placeholderImage` to find them.
import cakesImage from '../assets/images/index/variety-cakes.JPG';
import flowerCake from '../assets/images/index/hero-flowery-cake.JPG';
import ownerGifts from '../assets/images/index/owner-personal-handmade-gifts.JPG';
import heroCupcakes from '../assets/images/index/hero-cupcakes.JPG';
import varietyCupcakes from '../assets/images/index/variety-cupcakes.JPG';
import varietyPastries from '../assets/images/index/variety-pastries.JPG';
import varietyCookies from '../assets/images/index/variety-cookies.JPG';

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
  introEyebrow: string;
  intro: string[]; // answer-first: Perlette Cakes, Klang Valley, WhatsApp, Lalamove
  // sections
  signatureEyebrow: string;
  signatureHeadline: string;
  signatureCtaLabel: string;
  signature: Variation; // the cinematic full-bleed hero product
  collageHeading: string;
  collageIntro: string;
  variations: Variation[]; // the collage
  useCasesTitle: string;
  useCases: string[];
  leadTimeNote: string;
  ctaHeading: string;
  ctaBody: string;
  // ordering
  whatsappMessage: string;
  modalInterest: string; // pre-checks a modal "Interested In" option
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
  introEyebrow: 'Custom cakes · Klang Valley',
  intro: [
    'Perlette Cakes is a home-based baker making custom celebration cakes to order across Klang Valley, Malaysia. Every cake is baked for one occasion — yours.',
    'Tell us the date, the flavours, and the moment on WhatsApp, and we take it from there, right through to Lalamove delivery at your door.',
  ],
  signatureEyebrow: 'The one they remember',
  signatureHeadline: 'The cake they photograph before they cut it',
  signatureCtaLabel: 'Start your cake on WhatsApp',
  signature: {
    slug: 'signature-floral',
    name: 'Signature floral cake',
    crave:
      'Tender crumb under clouds of fresh cream and edible flowers — the cake the whole table leans in for.',
    image: flowerCake,
    imageAlt: 'Flowery celebration cake with piped cream, edible flowers, and a white ribbon detail.',
    placeholderImage: true,
  },
  collageHeading: 'Made to order, made to your moment',
  collageIntro:
    'A few of the cakes we are asked for most. Yours is baked fresh for one date — tell us the flavour and the finish, and we shape it around your celebration.',
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
  useCasesTitle: 'One baker, every kind of celebration',
  useCases: ['Birthdays', 'Gifting', 'Gatherings', 'Corporate & events', 'Small celebrations'],
  leadTimeNote:
    'Custom cakes are best ordered 3 to 5 days ahead, with larger or more detailed designs needing a little more notice. We deliver across Klang Valley by Lalamove — there is no pickup.',
  ctaHeading: "Have a date and a vision? Let's make the cake.",
  ctaBody:
    "Tell us your date and your idea on WhatsApp — we'll confirm flavours, design, and Lalamove delivery from there.",
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a custom cake order.",
  modalInterest: 'Cake',
};

const cupcakes: Category = {
  slug: 'cupcakes',
  name: 'Cupcakes',
  navLabel: 'Cupcakes',
  accent: { theme: 'accent-coral', label: 'coral' },
  title: 'Cupcake Delivery Klang Valley | Cupcakes by Perlette Cakes',
  description:
    'Small-batch cupcakes made to order by Perlette Cakes, a home-based baker in Klang Valley. For dessert tables, office treats, and celebrations, delivered by Lalamove. Order on WhatsApp.',
  h1: 'Cupcakes delivered across Klang Valley',
  introEyebrow: 'Cupcakes · Klang Valley',
  intro: [
    'Perlette Cakes bakes small-batch cupcakes to order across Klang Valley, Malaysia — piped fresh, boxed with care, and made for the day you need them.',
    'Pick your flavours and quantity on WhatsApp, and we sort the rest, right through to Lalamove delivery.',
  ],
  signatureEyebrow: 'A dozen little reasons',
  signatureHeadline: 'The cupcakes that disappear first',
  signatureCtaLabel: 'Start your cupcake order',
  signature: {
    slug: 'signature-buttercream',
    name: 'Signature buttercream cupcakes',
    crave:
      'Tender sponge crowned with swirls of buttercream that stop just short of sweet — the ones the tray empties of first.',
    image: heroCupcakes,
    imageAlt: 'An assortment of cupcakes with piped frosting and decorative toppings.',
    placeholderImage: true,
  },
  collageHeading: 'A flavour for everyone',
  collageIntro:
    'The cupcakes we are asked for most. Mix and match your box — tell us the flavours and we pipe them fresh for your date.',
  variations: [
    {
      slug: 'classic-vanilla',
      name: 'Classic vanilla',
      crave: 'Soft vanilla sponge and silky vanilla buttercream — the crowd-pleaser nobody turns down.',
      image: varietyCupcakes,
      imageAlt: 'Assorted cupcakes with piped frosting and decorative toppings arranged together.',
      placeholderImage: true,
    },
    {
      slug: 'chocolate-cupcake',
      name: 'Chocolate',
      crave: 'Deep cocoa sponge under a swirl of chocolate buttercream — rich without being heavy.',
      image: heroCupcakes,
      imageAlt: 'An assortment of cupcakes made per order for personal or corporate events.',
      placeholderImage: true,
    },
    {
      slug: 'red-velvet',
      name: 'Red velvet',
      crave: 'Velvet crumb with a tang of cream cheese frosting — quietly the most requested.',
      image: varietyCupcakes,
      imageAlt: 'Assorted cupcakes with swirled frosting arranged together for an order.',
      placeholderImage: true,
    },
    {
      slug: 'seasonal-cupcake',
      name: 'Seasonal flavour',
      crave: 'A rotating flavour we bake around the season — ask us what is fresh this week.',
      image: ownerGifts,
      imageAlt: 'Handmade treats boxed as personal gifts by Perlette Cakes.',
      placeholderImage: true,
    },
  ],
  useCasesTitle: 'Little bakes for every occasion',
  useCases: ['Dessert tables', 'Office treats', 'Party favours', 'Gifting', 'Small celebrations'],
  leadTimeNote:
    'Cupcakes are best ordered 3 to 5 days ahead, with larger batches needing a little more notice. We deliver across Klang Valley by Lalamove — there is no pickup.',
  ctaHeading: 'Know your flavours and your date?',
  ctaBody:
    "Tell us how many and which flavours on WhatsApp — we'll sort the box and Lalamove delivery from there.",
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a cupcake order.",
  modalInterest: 'Cupcakes',
};

const pastries: Category = {
  slug: 'pastries',
  name: 'Pastries',
  navLabel: 'Pastries',
  accent: { theme: 'accent-caramel', label: 'caramel' },
  title: 'Pastry Boxes Klang Valley | Pastries by Perlette Cakes',
  description:
    'Freshly baked pastries and pastry boxes made to order by Perlette Cakes, a home-based baker in Klang Valley. For gifting, gatherings, and everyday treats, delivered by Lalamove. Order on WhatsApp.',
  h1: 'Pastries delivered across Klang Valley',
  introEyebrow: 'Pastries · Klang Valley',
  intro: [
    'Perlette Cakes bakes pastries to order across Klang Valley, Malaysia — buttery, golden, and boxed to share the day they are baked.',
    'Tell us the box and the occasion on WhatsApp, and we handle the rest, right through to Lalamove delivery.',
  ],
  signatureEyebrow: 'Warm from the oven',
  signatureHeadline: 'Pastries worth reaching across the table for',
  signatureCtaLabel: 'Start your pastry order',
  signature: {
    slug: 'signature-pastry-box',
    name: 'Signature pastry box',
    crave:
      'A box of buttery, golden pastries with layers that shatter softly — made to be shared, gone before you know it.',
    image: varietyPastries,
    imageAlt: 'Mixed pastries grouped together for a pastry box.',
    placeholderImage: true,
  },
  collageHeading: 'Baked fresh, boxed to share',
  collageIntro:
    'The pastries we are asked for most. Build your box — tell us what you love and we bake it the morning it goes out.',
  variations: [
    {
      slug: 'assorted-box',
      name: 'Assorted pastry box',
      crave: 'A curated mix of our best pastries in one box — variety for when you cannot choose just one.',
      image: varietyPastries,
      imageAlt: 'An assortment of pastries grouped together for a pastry box order.',
      placeholderImage: true,
    },
    {
      slug: 'butter-croissant',
      name: 'Butter croissant',
      crave: 'Slow-proofed and baked to a deep gold, with a crackle that gives way to soft, buttery layers.',
      image: ownerGifts,
      imageAlt: 'Handmade baked treats boxed as personal gifts by Perlette Cakes.',
      placeholderImage: true,
    },
    {
      slug: 'sweet-danish',
      name: 'Sweet danish',
      crave: 'Flaky pastry cradling a sweet centre — the one you go back for with your coffee.',
      image: varietyPastries,
      imageAlt: 'Assorted pastries with sweet fillings arranged together for a box.',
      placeholderImage: true,
    },
    {
      slug: 'cinnamon-roll',
      name: 'Cinnamon roll',
      crave: 'Soft, spiralled, and glazed while warm — the smell alone gets everyone into the kitchen.',
      image: ownerGifts,
      imageAlt: 'Freshly baked treats boxed for gifting by Perlette Cakes.',
      placeholderImage: true,
    },
  ],
  useCasesTitle: 'A box for every table',
  useCases: ['Gifting', 'Gatherings', 'Everyday treats', 'Add-on boxes', 'Corporate & events'],
  leadTimeNote:
    'Pastries are best ordered 3 to 5 days ahead, with larger boxes needing a little more notice. We deliver across Klang Valley by Lalamove — there is no pickup.',
  ctaHeading: 'Craving a box of something buttery?',
  ctaBody:
    "Tell us the box and the occasion on WhatsApp — we'll handle the bake and Lalamove delivery from there.",
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a pastry order.",
  modalInterest: 'Pastries',
};

const cookies: Category = {
  slug: 'cookies',
  name: 'Cookies',
  navLabel: 'Cookies',
  accent: { theme: 'accent-cocoa', label: 'cocoa' },
  title: 'Cookie Gift Boxes Klang Valley | Cookies by Perlette Cakes',
  description:
    'Freshly baked cookies and cookie gift boxes made to order by Perlette Cakes, a home-based baker in Klang Valley. For festive gifting, snack trays, and sharing, delivered by Lalamove. Order on WhatsApp.',
  h1: 'Cookies delivered across Klang Valley',
  introEyebrow: 'Cookies · Klang Valley',
  intro: [
    'Perlette Cakes bakes cookies to order across Klang Valley, Malaysia — baked fresh, boxed to gift, and made for sharing.',
    'Tell us the box and the occasion on WhatsApp, and we take care of the rest, right through to Lalamove delivery.',
  ],
  signatureEyebrow: 'Made to gift',
  signatureHeadline: 'The cookie box that gets remembered',
  signatureCtaLabel: 'Start your cookie order',
  signature: {
    slug: 'signature-cookie-box',
    name: 'Signature cookie box',
    crave:
      'A box of cookies with soft centres and golden edges — the gift people message you about afterwards.',
    image: varietyCookies,
    imageAlt: 'Assorted cookies displayed together for gifting and sharing.',
    placeholderImage: true,
  },
  collageHeading: 'Boxed and ready to gift',
  collageIntro:
    'The cookies we are asked for most. Pick your box — tell us the occasion and we bake and package it to give.',
  variations: [
    {
      slug: 'chocolate-chip',
      name: 'Chocolate chip',
      crave: 'Soft-centred with pools of melted chocolate and a golden, chewy edge.',
      image: varietyCookies,
      imageAlt: 'An assortment of cookies displayed together for gifting and sharing.',
      placeholderImage: true,
    },
    {
      slug: 'festive-box',
      name: 'Festive gift box',
      crave: 'A seasonal assortment boxed for gifting — the easy yes for teachers, colleagues, and neighbours.',
      image: ownerGifts,
      imageAlt: 'Handmade cookies and treats boxed as personal gifts by Perlette Cakes.',
      placeholderImage: true,
    },
    {
      slug: 'shortbread',
      name: 'Buttery shortbread',
      crave: 'Crumbly, melt-in-the-mouth, and just sweet enough with your afternoon tea.',
      image: varietyCookies,
      imageAlt: 'Assorted shortbread and cookies arranged together for a gift box.',
      placeholderImage: true,
    },
    {
      slug: 'double-chocolate',
      name: 'Double chocolate',
      crave: 'Cocoa dough loaded with chocolate chunks — deep, fudgy, and unapologetic.',
      image: ownerGifts,
      imageAlt: 'Freshly baked cookies boxed for gifting by Perlette Cakes.',
      placeholderImage: true,
    },
  ],
  useCasesTitle: 'Made to gift, made to share',
  useCases: ['Festive gifting', 'Snack trays', 'Corporate gifts', 'Sharing boxes', 'Small celebrations'],
  leadTimeNote:
    'Cookies are best ordered 3 to 5 days ahead, with larger boxes needing a little more notice. We deliver across Klang Valley by Lalamove — there is no pickup.',
  ctaHeading: 'Got someone to treat?',
  ctaBody:
    "Tell us the box and the occasion on WhatsApp — we'll bake it fresh and send it by Lalamove.",
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a cookie order.",
  modalInterest: 'Cookies',
};

export const categories: Category[] = [customCakes, cupcakes, pastries, cookies];

export function categoryBySlug(slug: CategorySlug): Category {
  const found = categories.find((category) => category.slug === slug);
  if (!found) throw new Error(`Unknown category: ${slug}`);
  return found;
}

export const categoryPath = (slug: CategorySlug): string => `/${slug}/`;
export const categoryUrl = (slug: CategorySlug): string => `https://perlettecakes.com/${slug}/`;
