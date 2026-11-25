const fs = require('fs');
const { createClient } = require('contentful');
require('@next/env').loadEnvConfig(process.cwd());
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://christianvillareal.github.io/react-portfolio').replace(/\/$/, '');
const escapeXml = value => String(value).replace(/[<>&"']/g, c => ({'<':'&lt;', '>':'&gt;', '&':'&amp;', '"':'&quot;', "'":'&apos;'}[c]));
async function generate() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) throw new Error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN in .env.local before building.');
  const client = createClient({space, accessToken, retryLimit: 3, timeout: 15000});
  const entries = [];
  let skip = 0;
  do {
    const response = await client.getEntries({content_type:'cvProjects', limit:100, skip, order:'sys.createdAt'});
    entries.push(...response.items);
    skip += response.items.length;
    if (skip >= response.total) break;
    if (!response.items.length) throw new Error('Contentful pagination returned no entries.');
  } while (true);
  const assetUrl = url => !url ? '' : url.startsWith('//') ? 'https:' + url : url;
  const projects = entries.map(item => ({
    id:item.sys.id, title:item.fields.title || 'Untitled', description:item.fields.description || '',
    categories:Array.isArray(item.fields.categories) ? item.fields.categories : item.fields.categories ? [item.fields.categories] : [],
    images:(item.fields.image || []).map(image => assetUrl(image.fields?.file?.url)).filter(Boolean),
    date:item.fields.date || '', updatedAt:item.sys.updatedAt,
  }));
  fs.mkdirSync('.cache', {recursive:true});
  fs.writeFileSync('.cache/projects.json', JSON.stringify(projects));
  const urls = [{loc:siteUrl+'/'}, ...projects.map(p => ({loc:siteUrl+'/project/'+p.id+'/', lastmod:p.updatedAt}))];
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + urls.map(u => '  <url><loc>'+escapeXml(u.loc)+'</loc>'+(u.lastmod ? '<lastmod>'+escapeXml(u.lastmod)+'</lastmod>' : '')+'</url>').join('\n')+'\n</urlset>\n';
  fs.writeFileSync('public/sitemap.xml', xml);
  fs.writeFileSync('public/robots.txt', 'User-agent: *\nAllow: /\nSitemap: '+siteUrl+'/sitemap.xml\n');
  fs.writeFileSync('public/.nojekyll', '');
  console.log('Prepared '+projects.length+' project pages and sitemap entries.');
}
generate().catch(error => {console.error(error.message); process.exitCode = 1;});
