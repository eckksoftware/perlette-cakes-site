// Single source for the WhatsApp order link so copy, schema, and links never drift.
export const WHATSAPP_NUMBER = '60196505050'; // numeric only, matches schema + wa.me

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_INQUIRY =
  "Hi Perlette Cakes! I'd like to enquire about a custom cake order.";
