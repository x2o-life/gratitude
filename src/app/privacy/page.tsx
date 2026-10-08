import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { OG_ALT, OG_SIZE } from "@/lib/og";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Gratitude collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: "/privacy",
    siteName: SITE.name,
    title: "Privacy Policy | Gratitude",
    description:
      "How Gratitude collects, uses and protects your personal information.",
    locale: SITE.locale,
    images: [{ url: "/opengraph-image", ...OG_SIZE, alt: OG_ALT }],
  },
  twitter: { title: "Privacy Policy | Gratitude" },
};

export default function PrivacyPage() {
  const mail = `mailto:${SITE.contactEmail}`;
  return (
    <LegalPage title="Privacy Policy" updated="8 October 2026">
      <p>
        Gratitude is operated by {SITE.company} in {SITE.country}{" "}
        (&quot;we&quot;, &quot;us&quot;). This policy explains what personal
        information we collect through {SITE.url.replace("https://", "")} and
        the Gratitude service, why we collect it, and the choices you have.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Waitlist sign-ups.</strong> If you join as someone who shops,
          your name and email address. If you join as a business, your name,
          work email, phone number and company name.
        </li>
        <li>
          <strong>Using the service.</strong> When Gratitude launches, the phone
          number you give at a partner shop, and the visits, bill amounts and
          rewards recorded against it.
        </li>
        <li>
          <strong>Usage information.</strong> We use Google Analytics to
          understand how people use this site: pages visited, buttons clicked,
          approximate location, device and browser. It uses cookies and does not
          receive your name, email or phone number. You can opt out with
          Google&apos;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout">browser add-on</a>{" "}
          or by blocking cookies.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To let you know when Gratitude is available near you.</li>
        <li>To contact businesses that want to partner with us.</li>
        <li>To record your rewards and show them in your Pass.</li>
        <li>To send sign-in codes by SMS. We never use SMS for promotions.</li>
        <li>To keep the service secure and improve it.</li>
      </ul>

      <h2>Who can see it</h2>
      <p>
        Each partner brand sees only your visits and rewards with that brand,
        never your activity elsewhere. We do not sell your personal information.
        We use trusted service providers, including Google Firebase for data
        storage and Google Analytics for site statistics, who process data on
        our behalf and may store it on servers outside {SITE.country}.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep waitlist details until Gratitude launches for you or you ask us
        to remove them. We keep account and reward information for as long as
        you use the service, and delete or anonymise it when it is no longer
        needed.
      </p>

      <h2>Your rights</h2>
      <p>
        Under Sri Lanka&apos;s Personal Data Protection Act, No. 9 of 2022, you
        can ask to access, correct or delete your personal information, or
        withdraw your consent at any time. Email{" "}
        <a href={mail}>{SITE.contactEmail}</a> and we will respond within a
        reasonable time.
      </p>

      <h2>Changes</h2>
      <p>
        If we change this policy, we will update the date at the top of this
        page. Significant changes will be communicated more directly.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about your privacy? Email{" "}
        <a href={mail}>{SITE.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
