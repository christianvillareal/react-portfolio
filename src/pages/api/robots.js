import { siteLink } from '../../lib/site';

export default function robots(_req, res) {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(`User-agent: *\nAllow: /\nSitemap: ${siteLink('/sitemap.xml')}\n`);
}
