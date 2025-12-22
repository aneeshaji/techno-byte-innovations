import { Helmet } from 'react-helmet';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: string;
}

const SEO = ({
    title,
    description,
    keywords = 'software development, web development, mobile apps, cloud solutions, AI, machine learning, TechnoByteInnovations, Trivandrum, Kerala',
    canonicalUrl,
    ogImage = '/og-image.jpg',
    ogType = 'website'
}: SEOProps) => {
    const baseUrl = 'https://technobyteinnovations.com';
    const fullTitle = `${title} | TechnoByteInnovations`;
    const url = canonicalUrl ? `${baseUrl}${canonicalUrl}` : baseUrl;

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
            <meta property="og:image" content={`${baseUrl}${ogImage}`} />
            <meta property="og:site_name" content="TechnoByteInnovations" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={`${baseUrl}${ogImage}`} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />
            <meta name="author" content="TechnoByteInnovations" />
        </Helmet>
    );
};

export default SEO;
