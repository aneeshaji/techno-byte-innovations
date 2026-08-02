import { Helmet } from 'react-helmet';
import { SITE_NAME, SITE_URL } from '../utils/siteConfig';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
    schema?: Record<string, unknown>;
}

const SEO = ({
    title,
    description,
    keywords = 'software development, web development, mobile apps, cloud solutions, AI, machine learning, TechnoByteInnovations, Trivandrum, Kerala',
    canonicalUrl,
    ogImage = '/logo.png',
    ogType = 'website',
    schema,
}: SEOProps) => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="title" content={fullTitle} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={`${SITE_URL}${ogImage}`} />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${SITE_URL}${ogImage}`} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content={SITE_NAME} />

            {/* Structured data (JSON-LD) */}
            {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
        </Helmet>
    );
};

export default SEO;
