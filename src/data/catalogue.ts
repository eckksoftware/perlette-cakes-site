import type { ImageMetadata } from 'astro';

import layeredBerriesCakeImage from '../assets/images/custom-cakes/layered-berries-cake.JPG'
import creamCakeImage from '../assets/images/custom-cakes/cream-cake.JPG'
import berriesCakeImage from '../assets/images/custom-cakes/berries-cake.JPG'
import flowerCake from '../assets/images/index/hero-flowery-cake.JPG';
import crunchyCake from '../assets/images/custom-cakes/crunchy-cake.JPG'
import tiramisuCake from '../assets/images/custom-cakes/tiramisu-cake.JPG'
import berryChocoCake from '../assets/images/custom-cakes/berry-choc-cake.JPG'
import floweryCreamCake from '../assets/images/custom-cakes/flowery-cream-cake.JPG'
import moltenChocCake from '../assets/images/custom-cakes/molten-cake.JPG'
import lemonMiniCake from '../assets/images/custom-cakes/lemon-mini-cake.JPG'
import orangeCake from '../assets/images/custom-cakes/orange-cake.JPG'
import christmasCake from '../assets/images/custom-cakes/christmas-cake.JPG'
import giftsCake from '../assets/images/custom-cakes/gifts-cake.JPG'
import heroCupcakes from '../assets/images/index/hero-cupcakes.JPG';
import varietyCupcakes from '../assets/images/index/variety-cupcakes.JPG';
import varietyPastries from '../assets/images/index/variety-pastries.JPG';
import varietyCookies from '../assets/images/index/variety-cookies.JPG';

export interface Variation {
  slug: string;
  name: string;
  image: ImageMetadata;
  imageAlt: string;
}

export type CategorySlug = 'custom-cakes' | 'cupcakes' | 'pastries' | 'cookies';

export interface Category {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  signature: Pick<Variation, 'image' | 'imageAlt'>;
  variations: Variation[];
  whatsappMessage: string;
  modalInterest: string;
}

const customCakes: Category = {
  slug: 'custom-cakes',
  name: 'Custom Cakes',
  title: 'Custom Cake Delivery Klang Valley | Custom Cakes by Perlette Cakes',
  description:
    'Custom celebration cakes made to order by Perlette Cakes, a home-based baker in Klang Valley. Birthdays, gifting, and gatherings, delivered by Lalamove. Start your order on WhatsApp.',
  signature: {
    image: flowerCake,
    imageAlt: 'Cream-frosted celebration cake decorated with edible flowers, gold leaf, and gold pearls.',
  },
  variations: [
    {
      slug: 'cream-cake',
      name: 'Cream cake',
      image: creamCakeImage,
      imageAlt: 'Square chocolate and vanilla layered cake finished with a smooth chocolate glaze and gold leaf.',
    },
    {
      slug: 'berries-cake',
      name: 'Berries cake',
      image: berriesCakeImage,
      imageAlt: 'Layered chocolate cake topped with fresh strawberries, blueberries, whipped cream, and gold leaf.',
    },
    {
      slug: 'layered-berries-cake',
      name: 'Layered Berries cake',
      image: layeredBerriesCakeImage,
      imageAlt: 'Rectangular chocolate cake covered with blueberries, raspberries, chocolate buttercream, and gold leaf.',
    },
    {
      slug: 'crunchy-cake',
      name: 'Chocolate Crunchy cake',
      image: crunchyCake,
      imageAlt: 'Stack of chocolate chip cookie bars with gooey chocolate pieces and a fudgy chocolate layer.',
    },
    {
      slug: 'tiramisu-cake',
      name: 'Tiramisu cake',
      image: tiramisuCake,
      imageAlt: 'Individual tiramisu desserts layered with mascarpone cream, coffee-soaked sponge, and cocoa powder.',
    },
    {
      slug: 'berry-choc-cake',
      name: 'Berry Chocolate cake',
      image: berryChocoCake,
      imageAlt: 'Three-layer chocolate cake filled with cream and cherry compote, topped with gold-dusted cherries.',
    },
    {
      slug: 'flowery-symmetrical-cake',
      name: 'Flowery Cream cake',
      image: floweryCreamCake,
      imageAlt: 'Pastel celebration cake decorated with fresh pink and yellow flowers, blueberries, and piped cream.',
    },
    {
      slug: 'molten-cake',
      name: 'Molten Chocolate cake',
      image: moltenChocCake,
      imageAlt: 'Chocolate chip cookie cake with a crisp golden top, chocolate chunks, and a fudgy centre.',
    },
    {
      slug: 'orange-cake',
      name: 'Orange cake',
      image: orangeCake,
      imageAlt: 'Glossy pink celebration cake decorated with dried orange slices and a handwritten birthday message.',
    },
    {
      slug: 'lemon-mini-cake',
      name: 'Lemon Mini cake',
      image: lemonMiniCake,
      imageAlt: 'Assortment of iced chocolate cookies topped with walnuts, gold leaf, and piped cream.',
    },
    {
      slug: 'christmas-cake',
      name: 'Christmas cake',
      image: christmasCake,
      imageAlt: 'Christmas celebration cakes with chocolate buttercream, Santa and Christmas tree decorations, and festive lettering.',
    },
    {
      slug: 'gifts-cake',
      name: 'Gifts cake',
      image: giftsCake,
      imageAlt: 'Perlette Cakes gift boxes wrapped with colourful ribbons and ready for festive gifting.',
    },
  ],
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a custom cake order.",
  modalInterest: 'Cake',
};

const cupcakes: Category = {
  slug: 'cupcakes',
  name: 'Cupcakes',
  title: 'Cupcake Delivery Klang Valley | Cupcakes by Perlette Cakes',
  description:
    'Small-batch cupcakes made to order by Perlette Cakes, a home-based baker in Klang Valley. For dessert tables, office treats, and celebrations, delivered by Lalamove. Order on WhatsApp.',
  signature: {
    image: heroCupcakes,
    imageAlt: 'An assortment of cupcakes with piped frosting and decorative toppings.',
  },
  variations: [
    {
      slug: 'classic-vanilla',
      name: 'Classic vanilla',
      image: varietyCupcakes,
      imageAlt: 'Assorted cupcakes with piped frosting and decorative toppings arranged together.',
    },
    {
      slug: 'chocolate-cupcake',
      name: 'Chocolate',
      image: heroCupcakes,
      imageAlt: 'Assorted frosted cupcakes prepared for a celebration order.',
    },
    {
      slug: 'red-velvet',
      name: 'Red velvet',
      image: varietyCupcakes,
      imageAlt: 'Assorted cupcakes with swirled frosting arranged together for an order.',
    },
    {
      slug: 'seasonal-cupcake',
      name: 'Seasonal flavour',
      image: crunchyCake,
      imageAlt: 'Stack of chocolate chip cookie bars with chocolate chunks and a fudgy centre.',
    },
  ],
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a cupcake order.",
  modalInterest: 'Cupcakes',
};

const pastries: Category = {
  slug: 'pastries',
  name: 'Pastries',
  title: 'Pastry Boxes Klang Valley | Pastries by Perlette Cakes',
  description:
    'Freshly baked pastries and pastry boxes made to order by Perlette Cakes, a home-based baker in Klang Valley. For gifting, gatherings, and everyday treats, delivered by Lalamove. Order on WhatsApp.',
  signature: {
    image: varietyPastries,
    imageAlt: 'Mixed pastries grouped together for a pastry box.',
  },
  variations: [
    {
      slug: 'assorted-box',
      name: 'Assorted pastry box',
      image: varietyPastries,
      imageAlt: 'An assortment of pastries grouped together for a pastry box order.',
    },
    {
      slug: 'butter-croissant',
      name: 'Butter croissant',
      image: crunchyCake,
      imageAlt: 'Stack of chocolate chip cookie bars with chocolate chunks and a fudgy centre.',
    },
    {
      slug: 'sweet-danish',
      name: 'Sweet danish',
      image: varietyPastries,
      imageAlt: 'Assorted pastries with sweet fillings arranged together for a box.',
    },
    {
      slug: 'cinnamon-roll',
      name: 'Cinnamon roll',
      image: crunchyCake,
      imageAlt: 'Stack of chocolate chip cookie bars with chocolate chunks and a fudgy centre.',
    },
  ],
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a pastry order.",
  modalInterest: 'Pastries',
};

const cookies: Category = {
  slug: 'cookies',
  name: 'Cookies',
  title: 'Cookie Gift Boxes Klang Valley | Cookies by Perlette Cakes',
  description:
    'Freshly baked cookies and cookie gift boxes made to order by Perlette Cakes, a home-based baker in Klang Valley. For festive gifting, snack trays, and sharing, delivered by Lalamove. Order on WhatsApp.',
  signature: {
    image: varietyCookies,
    imageAlt: 'Assorted cookies displayed together for gifting and sharing.',
  },
  variations: [
    {
      slug: 'chocolate-chip',
      name: 'Chocolate chip',
      image: varietyCookies,
      imageAlt: 'An assortment of cookies displayed together for gifting and sharing.',
    },
    {
      slug: 'festive-box',
      name: 'Festive gift box',
      image: crunchyCake,
      imageAlt: 'Stack of chocolate chip cookie bars with chocolate chunks and a fudgy centre.',
    },
    {
      slug: 'shortbread',
      name: 'Buttery shortbread',
      image: varietyCookies,
      imageAlt: 'Assorted shortbread and cookies arranged together for a gift box.',
    },
    {
      slug: 'double-chocolate',
      name: 'Double chocolate',
      image: crunchyCake,
      imageAlt: 'Stack of chocolate chip cookie bars with chocolate chunks and a fudgy centre.',
    },
  ],
  whatsappMessage: "Hi Perlette Cakes! I'd like to enquire about a cookie order.",
  modalInterest: 'Cookies',
};

export const categories: Category[] = [customCakes, cupcakes, pastries, cookies];

export function categoryBySlug(slug: CategorySlug): Category {
  const found = categories.find((category) => category.slug === slug);
  if (!found) throw new Error(`Unknown category: ${slug}`);
  return found;
}
