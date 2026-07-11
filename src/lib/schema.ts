// Typed JSON-LD builders. Return plain objects for Layout's `jsonLd` prop, which
// merges them with the site-wide Bakery schema. Keep schema generated from the same
// data arrays as the visible page so the two cannot drift.

export const SITE_ORIGIN = 'https://perlettecakes.com';

interface CollectionPageInput {
  name: string;
  description: string;
  url: string;
}

export function collectionPageSchema({ name, description, url }: CollectionPageInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url,
  };
}

export interface ListItemInput {
  name: string;
  description?: string;
  image?: string;
  url?: string;
}

export function itemListSchema(url: string, items: ListItemInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    url,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: item.image } : {}),
      ...(item.url ? { url: item.url } : {}),
    })),
  };
}

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
