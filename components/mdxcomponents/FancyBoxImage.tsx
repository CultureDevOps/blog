'use client'
import NextImage, { ImageProps } from "next/image";

interface ImageWithFancyboxProps extends ImageProps {
  src: string; // Source obligatoire
  alt: string; // Texte alternatif obligatoire
}

const FancyBoxImage = ({ alt, src, ...rest }: ImageWithFancyboxProps) => {
  const isExternal = src.startsWith('http'); // Vérifie si l'URL est externe

  const cloudFrontUrl = process.env.CLOUD_FRONT_URL;
  let href = isExternal ? src : `${cloudFrontUrl}${src}`;
  if (!isExternal && !href.includes('?format=')) {
    href += '?format=auto';
  }

  const imageContent = isExternal ? (
    // Si l'image est externe, on utilise une balise <img> standard
    <img alt={alt} src={src} {...rest} className="rounded-lg"/>
  ) : (
    <NextImage 
      {...rest} 
      src={src} 
      alt={alt} 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover rounded-lg"
      />
  );
  
  return (
    <div className="fancybox-wrapper" data-fancybox="gallery" data-src={href} aria-label={alt}>
      {imageContent}
    </div>
  );
};

export default FancyBoxImage;
