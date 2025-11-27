// Helper for GitHub Pages basePath
const basePath = process.env.NODE_ENV === 'production' ? '/HallXIII' : '';

export function getAssetPath(path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalizedPath}`;
}

export default basePath;
