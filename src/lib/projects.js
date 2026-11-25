import { createClient } from 'contentful';

function contentfulClient() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) {
    throw new Error('Set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN on the Next.js server.');
  }
  return createClient({ space, accessToken, retryLimit: 3, timeout: 15000 });
}

function toProject({ sys, fields }) {
  const categories = fields.categories || [];
  const images = (fields.image || [])
    .map(image => image?.fields?.file?.url)
    .filter(Boolean)
    .map(url => url.startsWith('//') ? 'https:' + url : url);

  return {
    id: sys.id,
    title: fields.title || 'Untitled',
    description: fields.description || '',
    categories: Array.isArray(categories) ? categories : [categories],
    images,
    date: fields.date || '',
    updatedAt: sys.updatedAt,
  };
}

export async function getProjects() {
  const client = contentfulClient();
  const projects = [];
  while (true) {
    const { items, total } = await client.getEntries({
      content_type: 'cvProjects',
      order: '-sys.createdAt,sys.id',
      limit: 100,
      skip: projects.length,
    });
    projects.push(...items.map(toProject));
    if (projects.length >= total) return projects;
    if (!items.length) throw new Error('Contentful pagination returned no entries.');
  }
}

export async function getProject(id) {
  const { items: [entry] } = await contentfulClient().getEntries({
    content_type: 'cvProjects',
    'sys.id': id,
    limit: 1,
  });
  return entry ? toProject(entry) : null;
}
