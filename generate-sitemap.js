// const { createClient } = require('contentful');
// const fs = require('fs');
// const path = require('path');

// // Contentful client setup (SAME as your Projects.jsx)
// const client = createClient({
//   space: '7wddt967mgfr',
//   accessToken: 'HDc3S_flilPqMp3DMm0LTOMpUWIhlDnLdjeTn8nyekY',
// });

// // Your GitHub Pages URL
// const SITE_URL = 'https://christianvillareal.github.io/react-portfolio';

// async function generateSitemap() {
//   console.log('🔄 Fetching projects from Contentful...');
  
//   try {
//     // Fetch all projects (SAME as your Projects.jsx)
//     const response = await client.getEntries({
//       content_type: 'cvProjects'
//     });

//     const projects = response.items;
//     console.log(`✅ Found ${projects.length} projects`);

//     // Get today's date for lastmod
//     const today = new Date().toISOString().split('T')[0];

//     // Build sitemap XML
//     let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//         xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
//         http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

//   <!-- Homepage -->
//   <url>
//     <loc>${SITE_URL}/</loc>
//     <lastmod>${today}</lastmod>
//     <changefreq>weekly</changefreq>
//     <priority>1.0</priority>
//   </url>`;

//     // Add each project URL
//     projects.forEach((project) => {
//       const lastmod = project.sys.updatedAt ? project.sys.updatedAt.split('T')[0] : today;
//       const title = project.fields.title || 'Project';
      
//       sitemap += `
//   <!-- ${title} -->
//   <url>
//     <loc>${SITE_URL}/project/${project.sys.id}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>monthly</changefreq>
//     <priority>0.8</priority>
//   </url>`;
//     });

//     sitemap += `
// </urlset>`;

//     // Write sitemap to public folder
//     const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
//     fs.writeFileSync(outputPath, sitemap);
    
//     console.log(`✅ Sitemap generated successfully!`);
//     console.log(`📁 Location: public/sitemap.xml`);
//     console.log(`📊 Total URLs: ${projects.length + 1}`);
//     console.log(`🔗 Homepage: ${SITE_URL}/`);
    
//     // Log all project URLs
//     console.log(`\n📋 Project URLs:`);
//     projects.forEach((project, index) => {
//       console.log(`  ${index + 1}. ${project.fields.title || 'Untitled'}`);
//       console.log(`     ${SITE_URL}/project/${project.sys.id}`);
//     });

//   } catch (error) {
//     console.error('❌ Error generating sitemap:', error.message);
    
//     // Create fallback sitemap with just homepage
//     const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <url>
//     <loc>${SITE_URL}/</loc>
//     <priority>1.0</priority>
//   </url>
// </urlset>`;
    
//     fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), fallbackSitemap);
//     console.log('⚠️ Fallback sitemap created with homepage only');
//   }
// }

// // Run the function
// generateSitemap();