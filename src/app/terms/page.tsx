import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { OG_ALT, OG_SIZE } from "@/lib/og";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that apply when you use the Gratitude website.",
  alternates: { canonical: "/terms" },
  openGraph: {
    type: "website",
    url: "/terms",
    siteName: SITE.name,
    title: "Terms of Use | Gratitude",
    description: "The terms that apply when you use the Gratitude website.",
    locale: SITE.locale,
    images: [{ url: "/opengraph-image", ...OG_SIZE, alt: OG_ALT }],
  },
  twitter: { title: "Terms of Use | Gratitude" },
};

export default function TermsPage() {
  const mail = `mailto:${SITE.contactEmail}`;
  return (
    <LegalPage title="Terms of Use" updated="8 October 2026">
      <p>
        These terms apply to your use of {SITE.url.replace("https://", "")},
        operated by {SITE.company} in {SITE.country}. By using the site or
        joining the waitlist, you agree to them.
      </p>

      <h2>The waitlist</h2>
      <p>
        Joining the waitlist does not create an account or guarantee access to
        Gratitude by any date. We will contact you using the details you provide
        when Gratitude becomes available to you.
      </p>

      <h2>Rewards and offers</h2>
      <p>
        Rewards, stamps, points and offers are set by each partner brand, which
        is responsible for honouring them. Rewards may carry their own
        conditions and expiry dates, which the Pass will show. Examples on this
        site are illustrations, not live offers.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Please don&apos;t misuse the site: no submitting someone else&apos;s
        details, attempting to break or overload it, or using it for anything
        unlawful.
      </p>

      <h2>Our content</h2>
      <p>
        The Gratitude name, logo, design and content belong to {SITE.company}.
        You may not copy or reuse them without our permission.
      </p>

      <h2>Liability</h2>
      <p>
        The site is provided as it is. To the extent the law allows, we are not
        liable for indirect losses arising from its use. Nothing in these terms
        limits rights you have under Sri Lankan law.
      </p>

      <h2>Changes and governing law</h2>
      <p>
        We may update these terms and will change the date above when we do.
        These terms are governed by the laws of {SITE.country}.
      </p>

      <h2>Contact</h2>
      <p>
        Email <a href={mail}>{SITE.contactEmail}</a>. Your use of personal
        information is covered by our <a href="/privacy">Privacy Policy</a>.
      </p>
    </LegalPage>
  );
}
