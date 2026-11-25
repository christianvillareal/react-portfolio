import { getProjects } from '../../lib/projects';
import { siteLink } from '../../lib/site';

const xmlEntities = { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' };
const escapeXml = value => String(value).replace(/[<>&"']/g, char => xmlEntities[char]);

export default async function sitemap(_req, res) {
  const projects = await getProjects();
  const projectUrls = projects.map(({ id, updatedAt }) =>
    `  <url><loc>${escapeXml(siteLink(`/project/${encodeURIComponent(id)}/`))}</loc>` +
    (updatedAt ? `<lastmod>${escapeXml(updatedAt)}</lastmod>` : '') + '</url>'
  );
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send([
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    `  <url><loc>${escapeXml(siteLink())}</loc></url>`,
    ...projectUrls,
    '</urlset>',
  ].join('\n'));
}
