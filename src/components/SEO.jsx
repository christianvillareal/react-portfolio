import React from 'react';
import Head from 'next/head';
import { siteUrl, basePath, siteLink } from '../lib/site';

function SEO({
  title = "Christian Villareal | React Developer Portfolio",
  description = "Frontend Developer specializing in modern web apps. View my projects in web design, development, and UX/UI.",
  keywords = "developer, frontend portfolio, web developer, UI/UX designer, JavaScript, Philippines",
  image = `${basePath}/og-image.jpg`,
  url = "/",
  type = "website",
  canonical = "",
  author = "Christian Villareal"
}) {
  const fullUrl = canonical || (url.startsWith('http') ? url : siteLink(url.endsWith('/') ? url : url + '/'));
  const fullImage = image.startsWith('http') ? image : new URL(image, siteUrl).href;
  const schema = { '@context':'https://schema.org', '@type':'Person', name:'Christian Villareal', url:siteUrl+'/', jobTitle:'Frontend Developer & UI/UX Designer', description, image:fullImage, sameAs:['https://github.com/christianvillareal','https://linkedin.com/in/christianvillareal1998'] };

  return (
    <Head>
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
      <link rel="icon" href={basePath + '/favicon.png'} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g, '\\u003c')}} />
    </Head>
  );
}

export default SEO;