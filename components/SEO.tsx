import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useConfig } from '../context/ConfigContext';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => {
    const { config } = useConfig();

    const siteTitle = title ? `${title} | ${config.hero.title}` : `${config.hero.title} | ${config.hero.slogan}`;
    const metaDescription = description || config.footer.poweredByText || "Angora Kitap Akademi - Hayatı Oku";
    const metaImage = image || config.logoUrl || "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=2000";
    const siteUrl = url || "https://angorakitap.com";

    return (
        <Helmet>
            {/* Standart Meta Etiketleri */}
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href={siteUrl} />

            {/* Open Graph / Facebook / WhatsApp */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={metaDescription} />
            <meta property="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;
