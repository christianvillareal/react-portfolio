import React from 'react';
import { Helmet } from 'react-helmet-async';

function SEO({ 
  title = "Christian Villareal | React Developer Portfolio",
  description = "Frontend Developer specializing in modern web apps. View my projects in web design, development, and UX/UI.",
  keywords = "developer, frontend portfolio, web developer, UI/UX designer, JavaScript, Philippines",
  image = `${process.env.PUBLIC_URL}/images/og-image.png`,
  url = "https://christianvillareal.github.io/react-portfolio",
  type = "website",
  canonical = "",
  author = "Christian Villareal"
}) {
  const siteUrl = "https://christianvillareal.github.io/react-portfolio"; // CHANGE THIS TO YOUR URL
  const fullUrl = canonical || `${siteUrl}${url}`;
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content="Christian Villareal Portfolio" />
      
      {/* Additional */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Christian Villareal",
            "url": "${siteUrl}",
            "jobTitle": "React Developer & UI/UX Designer",
            "description": "${description}",
            "image": "${fullImage}",
            "sameAs": [
              "https://github.com/christianvillareal",
              "https://linkedin.com/in/christianvillareal1998"
            ],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Cebu City",
              "addressCountry": "Philippines"
            },
            "knowsAbout": ["React", "JavaScript", "UI/UX Design", "Web Development", "Frontend"]
          }
        `}
      </script>
    </Helmet>
  );
}

export default SEO;