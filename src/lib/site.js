export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://christianvillareal.github.io/react-portfolio').replace(/\/$/, '');
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteLink = (pathname = '/') => siteUrl + '/' + pathname.replace(/^\//, '');
export function plainText(value) {
  if (typeof value === 'string') return value;
  if (!value) return '';
  if (value.nodeType === 'text') return value.value || '';
  return (value.content || []).map(plainText).join(' ').replace(/\s+/g, ' ').trim();
}
