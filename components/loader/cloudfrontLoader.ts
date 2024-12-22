export interface CloudfrontLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudfrontLoader({ src, width, quality }: CloudfrontLoaderProps): string {
  const url = new URL(`https://d2mezi5ylxaxvl.cloudfront.net${src}`);
  url.searchParams.set('format', 'auto'); // Format automatique (WebP, PNG, etc.)
  url.searchParams.set('width', (width || 800).toString()); // Largeur par défaut
  url.searchParams.set('quality', (quality || 75).toString()); // Qualité par défaut
  return url.href;
}
