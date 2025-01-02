'use client'
import NextImage, { ImageProps } from "next/image";

interface ImageWithFancyboxProps extends ImageProps {
  src: string; // Source obligatoire
  alt: string; // Texte alternatif obligatoire
  noShadow?: boolean;
}

const FancyBoxImage = ({ alt, src, noShadow, ...rest }: ImageWithFancyboxProps) => {
  const isExternal = src.startsWith('http'); // Vérifie si l'URL est externe

  const cloudFrontUrl = process.env.CLOUD_FRONT_URL;
  let href = isExternal ? src : `${cloudFrontUrl}${src}`;
  if (!isExternal && !href.includes('?format=')) {
    href += '?format=auto';
  }

  const shadow = noShadow ? "" : "shadow-xl shadow-slate-400 dark:shadow-slate-950"

  const imageContent = isExternal ? (
    // Si l'image est externe, on utilise une balise <img> standard
    <img alt={alt} src={src} {...rest} className={`rounded-lg ${shadow}`}/>
  ) : (
    <NextImage 
      {...rest} 
      src={src} 
      alt={alt} 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`object-cover rounded-lg ${shadow}`}
      />
  );

  // Fonction pour enlever le focus du bouton avant d'ouvrir la modale
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const button = e.currentTarget as HTMLElement;
    button.blur(); // Enlève le focus du bouton
  };
  
  return (
    <div 
      className="fancybox-wrapper" 
      data-fancybox="gallery" 
      data-src={href} 
      aria-label={alt}
      role="button" // Indique qu'il s'agit d'un bouton pour l'accessibilité
      tabIndex={0}  // Rend focusable
      onClick={handleClick}
    >
      {imageContent}
    </div>
  );
};

export default FancyBoxImage;
