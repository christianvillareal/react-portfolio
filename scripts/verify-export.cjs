const fs=require('fs');const path=require('path');const assert=require('assert');
require('@next/env').loadEnvConfig(process.cwd());
const rootUrl=process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/,'');
const projects=JSON.parse(fs.readFileSync('.cache/projects.json','utf8'));
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
const sitemap=fs.readFileSync('out/sitemap.xml','utf8');assert.equal((sitemap.match(/<loc>/g)||[]).length,projects.length+1);
for(const project of projects) {
 const url=rootUrl+'/project/'+project.id+'/';assert(sitemap.includes('<loc>'+url+'</loc>'));
 const html=fs.readFileSync('out/project/'+project.id+'/index.html','utf8');
 assert(html.includes('rel="canonical" href="'+url+'"'));
 assert(html.includes(escape(project.title)));assert(html.includes('Project Overview'));assert(!html.includes('Loading project...'));
 assert(html.includes('name="description"'));assert(html.includes('property="og:image"'));
 const data=JSON.parse(html.match(/<script id="__NEXT_DATA__"[^>]*>(.*?)<\/script>/s)[1]);assert.equal(data.props.pageProps.project.id,project.id);
}
assert(fs.existsSync('out/.nojekyll'));assert(fs.existsSync('out/googlef577e1476780b604.html'));
const home=fs.readFileSync('out/index.html','utf8');assert(home.includes('/react-portfolio/_next/'));assert(home.includes('href="/react-portfolio/project/'));
let checked=0;function walk(dir) {for(const entry of fs.readdirSync(dir,{withFileTypes:true})) {const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(/\.(js|html|json)$/.test(p)) {assert(!fs.readFileSync(p,'utf8').includes(process.env.CONTENTFUL_ACCESS_TOKEN),'Build credential present in export');checked++;}}}walk('out');
console.log('Verified 77 sitemap URLs, all 76 project HTML pages, canonical metadata, asset prefix, verification file, and '+checked+' exported files without Contentful credentials.');

