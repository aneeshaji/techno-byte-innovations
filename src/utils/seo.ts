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

/** Organization & LocalBusiness node with GeoCoordinates for local search ranking */
export const organizationSchema = {
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: PHONE_E164,
  priceRange: '$$',
  currenciesAccepted: 'INR, USD, AED, EUR, GBP',
  paymentAccepted: 'Credit Card, Bank Transfer, UPI, Wire Transfer',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Technopark / Trivandrum',
    addressLocality: ADDRESS_LOCALITY,
    addressRegion: ADDRESS_REGION,
    postalCode: '695581',
    addressCountry: ADDRESS_COUNTRY,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 8.5241,
    longitude: 76.9366,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Kerala' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'United Kingdom' },
  ],
  sameAs: [
    'https://wa.me/919995064344',
    'https://github.com/aneeshaji',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '52',
    bestRating: '5',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Engineering Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Custom Web Application Development', description: 'Enterprise SaaS platforms, portals, and cloud web applications built with React, Node, and Python.' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Mobile App Development (iOS & Android)', description: 'Native and cross-platform mobile apps built with React Native and Flutter.' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'AI & Machine Learning Solutions', description: 'Custom LLM integrations, predictive modeling, NLP pipelines, and computer vision systems.' },
      },
      {
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: 'Enterprise ERP & Cloud Architecture', description: 'Scalable cloud infrastructure on AWS, Azure, GCP with Kubernetes, Docker, and CI/CD pipelines.' },
      },
    ],
  },
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

/** BreadcrumbList schema for inner pages to display hierarchical breadcrumbs in Google Search. */
export const breadcrumbSchema = (crumbs: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE_URL,
    },
    ...crumbs.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 2,
      name: crumb.name,
      item: `${SITE_URL}${crumb.url}`,
    })),
  ],
});
