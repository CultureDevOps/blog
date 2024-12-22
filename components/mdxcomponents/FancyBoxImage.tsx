'use client'
import NextImage, { ImageProps } from "next/image";

interface ImageWithFancyboxProps extends ImageProps {
  src: string; // Source obligatoire
  alt: string; // Texte alternatif obligatoire
}

const FancyBoxImage = ({ alt, src, ...rest }: ImageWithFancyboxProps) => {
  const isExternal = src.startsWith('http'); // Vérifie si l'URL est externe

  const imageContent = isExternal ? (
    // Si l'image est externe, on utilise une balise <img> standard
    <img alt={alt} src={src} {...rest} />
  ) : (
    <NextImage 
      {...rest} 
      src={src} 
      alt={alt} 
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover"       
      priority={false}
      />
  );

  const href = isExternal ? ( src ) : ( "https://d2mezi5ylxaxvl.cloudfront.net" + src );
  
  return (
    <div className="fancybox-wrapper" data-fancybox="gallery" data-src={href} aria-label={alt}>
      {imageContent}
    </div>
  );
};

export default FancyBoxImage;
