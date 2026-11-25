const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://christianvillareal.github.io/react-portfolio').replace(/\/$/, '');
const basePath = new URL(siteUrl).pathname.replace(/\/$/, '');
module.exports = {
  trailingSlash: true, basePath,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/sitemap.xml', destination: '/api/sitemap/' },
        { source: '/robots.txt', destination: '/api/robots/' },
      ],
    };
  },
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath, NEXT_PUBLIC_SITE_URL: siteUrl },
};
