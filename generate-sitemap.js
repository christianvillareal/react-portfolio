const { createClient } = require('contentful');
const fs = require('fs');
const path = require('path');

// Update these if needed
const SITE_URL = 'https://christianvillareal.github.io/react-portfolio';
const CONTENT_TYPE = 'cvProjects';

// You can keep these hardcoded for now since that is how your project already works
const client = createClient({
  space: '7wddt967mgfr',
  accessToken: 'HDc3S_flilPqMp3DMm0LTOMpUWIhlDnLdjeTn8nyekY',
});

const PUBLIC_SITEMAP_PATH = path.join(__dirname, 'public', 'sitemap.xml');
const BUILD_SITEMAP_PATH = path.join(__dirname, 'build', 'sitemap.xml');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchProjectsWithRetry(maxRetries = 5) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Fetching Contentful entries... attempt ${attempt}/${maxRetries}`);

      const response = await client.getEntries({
        content_type: CONTENT_TYPE,
      });

      return response.items || [];
    } catch (error) {
      lastError = error;
      const waitTime = attempt * 1500;

      console.warn(`Contentful request failed on attempt ${attempt}: ${error.message || error}`);
      if (attempt < maxRetries) {
        console.log(`Retrying in ${waitTime}ms...`);
        await sleep(waitTime);
      }
    }
  }

  throw lastError;
}

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildSitemap(projects) {
  const today = new Date().toISOString().split('T')[0];

  const urls = [
    {
      loc: `${SITE_URL}/`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0',
      comment: 'Homepage',
    },
    ...projects.map((project) => ({
      loc: `${SITE_URL}/project/${project.sys.id}`,
      lastmod: project.sys.updatedAt ? project.sys.updatedAt.split('T')[0] : today,
      changefreq: 'monthly',
      priority: '0.8',
      comment: project.fields?.title || 'Project',
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <!-- ${escapeXml(url.comment)} -->
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
}

function buildFallbackSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

function writeFileSafely(filePath, content) {
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Sitemap written to: ${filePath}`);
}

async function generateSitemap() {
  console.log('Starting sitemap generation...');

  try {
    const projects = await fetchProjectsWithRetry(5);
    console.log(`Found ${projects.length} project(s)`);

    const sitemap = buildSitemap(projects);

    writeFileSafely(PUBLIC_SITEMAP_PATH, sitemap);

    // Optional: if build folder already exists, also keep it in sync
    if (fs.existsSync(path.join(__dirname, 'build'))) {
      writeFileSafely(BUILD_SITEMAP_PATH, sitemap);
    }

    console.log('Sitemap generated successfully.');
  } catch (error) {
    console.error('Failed to fetch projects from Contentful.');
    console.error(error);

    // If an existing sitemap already exists, keep it instead of overwriting it
    if (fs.existsSync(PUBLIC_SITEMAP_PATH)) {
      console.warn('Keeping existing public/sitemap.xml because fetch failed.');
      process.exit(0);
    }

    const fallbackSitemap = buildFallbackSitemap();
    writeFileSafely(PUBLIC_SITEMAP_PATH, fallbackSitemap);

    if (fs.existsSync(path.join(__dirname, 'build'))) {
      writeFileSafely(BUILD_SITEMAP_PATH, fallbackSitemap);
    }

    console.warn('Fallback sitemap created with homepage only.');
  }
}

generateSitemap();