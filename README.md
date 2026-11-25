# Christian Villareal Portfolio — Next.js

The portfolio uses the Next.js Pages Router. The homepage, project detail pages, and sitemap read published Contentful entries on request. New projects appear first by Contentful creation date. Each project has server-rendered HTML with its title, description, canonical URL, and social metadata.

## Setup

Install dependencies with `npm install`. Copy `.env.example` to `.env.local` and configure the Contentful Delivery API credentials. Keep both Contentful variables server-side. Set `NEXT_PUBLIC_SITE_URL` to the full public portfolio URL, including any path prefix.

Run `npm run dev` to start the portfolio and the local contact backend. With the default URL setting, open http://localhost:3000/react-portfolio/. The backend runs on port 3001 and uses `portfolio-backend/.env` for `RESEND_API_KEY`, `FROM_EMAIL`, and `TO_EMAIL`. If its dependencies are missing, run `npm --prefix portfolio-backend install`.

For the published contact form, set `NEXT_PUBLIC_API_URL` to your working public contact backend URL before building. You can use the same variable locally to test the deployed backend.

## Build and publish

Deploy to a host that runs Next.js with a server, such as a Node web service. Use `npm ci` to install dependencies, `npm run build` to build, and `npm start` to serve the production build. Set the public URL and contact API variables at build time and the Contentful credentials at runtime.

GitHub Pages serves static files and cannot run these request-time routes. After the initial server deployment, publish projects in Contentful and refresh the portfolio once the Delivery API serves the changes. Content updates require no new build or deployment.

## Google Search Console

After deploying, verify the site in Google Search Console and submit `sitemap.xml` at your configured public portfolio URL. The existing Google verification file is available on the site.
