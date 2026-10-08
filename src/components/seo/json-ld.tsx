import { QUESTIONS } from "@/content/faq";
import { SITE } from "@/lib/site";

/** Renders a JSON-LD block; "<" is escaped so content can't close the script tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static, escaped JSON-LD
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Who we are and what the site is: shown once, on every page. */
export const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}/#organization`,
      name: SITE.name,
      alternateName: "Gratitude Pass",
      url: SITE.url,
      logo: `${SITE.url}/icons/icon-512.png`,
      description: SITE.description,
      email: SITE.contactEmail,
      areaServed: { "@type": "Country", name: SITE.country },
      parentOrganization: { "@type": "Organization", name: SITE.company },
      sameAs: Object.values(SITE.social),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": `${SITE.url}/#organization` },
    },
  ],
};

/** The homepage FAQ, mirrored from the visible Questions section. */
export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QUESTIONS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};
