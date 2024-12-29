export interface CloudfrontLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

export default function cloudfrontLoader({ src, width, quality }: CloudfrontLoaderProps): string {
  const url = new URL(`${process.env.CLOUD_FRONT_URL}${src}`);
  if (!url.searchParams.has('format')) {
    url.searchParams.set('format', 'webp'); // Format automatique (WebP, PNG, etc.)
  }
  url.searchParams.set('width', (width || 800).toString()); // Largeur par défaut
  url.searchParams.set('quality', (quality || 90).toString()); // Qualité par défaut
  return url.href;
}
