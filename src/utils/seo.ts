/**
 * JSON-LD (Schema.org) builders for structured data.
 * Kept together so search engines get consistent, valid entities.
 */
import {
  ADDRESS_COUNTRY,
  ADDRESS_LOCALITY,
  ADDRESS_REGION,
  AREA_SERVED,
  CONTACT_EMAIL,
  PHONE_E164,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from './siteConfig';

/** Organization / ProfessionalService node. */
export const organizationSchema = {
  '@type': ['Organization', 'ProfessionalService'],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: PHONE_E164,
  address: {
    '@type': 'PostalAddress',
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    addressCountry: ADDRESS_COUNTRY,
  },
  areaServed: AREA_SERVED,
};

export const websiteSchema = {
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
};

/** Combined graph used on the home page (mirrors the static fallback in index.html). */
export const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [organizationSchema, websiteSchema],
};

/** ItemList of Service offers — services page. */
export const servicesPageSchema = (services: { title: string; description: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: services.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.title,
    description: s.description,
    item: {
      '@type': 'Service',
      name: s.title,
      description: s.description,
      provider: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
      areaServed: AREA_SERVED,
      url: `${SITE_URL}/services`,
    },
  })),
});

/** FAQPage schema — contact page (built from the FAQ list). */
export const faqPageSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

/** ItemList of projects — portfolio page. */
export const portfolioPageSchema = (projects: { title: string; desc: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: projects.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    description: p.desc,
    url: p.url,
  })),
});
