import { GetInEarly } from "@/components/get-in-early";
import { Builders } from "@/components/home/builders";
import { Capabilities } from "@/components/home/capabilities";
import { Hero } from "@/components/home/hero";
import { InPublic } from "@/components/home/in-public";
import { Problem } from "@/components/home/problem";
import { Thesis } from "@/components/home/thesis";
import { Users } from "@/components/home/users";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <Problem />
      <Thesis />
      <Capabilities />
      <Builders />
      <Users />
      <InPublic />
      <GetInEarly />
    </>
  );
}
