/** Single source of truth for site-wide SEO details. */
export const SITE = {
  name: "Gratitude",
  url: "https://www.staygrateful.life",
  title: "Gratitude | Rewards at the places you love",
  description:
    "Give your number at the counter and earn at every Gratitude brand. One Pass for all your rewards, and loyalty programs brands can launch in minutes.",
  shortDescription:
    "One Pass for every stamp, point and treat at the cafés, shops and salons you love in Sri Lanka.",
  locale: "en_LK",
  company: "x2o Life",
  country: "Sri Lanka",
  // TODO: confirm this inbox exists before going live (used on Privacy and Terms pages).
  contactEmail: "hello@staygrateful.life",
  social: {
    instagram: "https://www.instagram.com/staygrateful.life/",
  },
  keywords: [
    "Gratitude",
    "Gratitude Pass",
    "loyalty rewards Sri Lanka",
    "rewards app Sri Lanka",
    "loyalty program for cafés",
    "loyalty program for restaurants",
    "digital stamp card",
    "customer loyalty software",
  ],
} as const;
