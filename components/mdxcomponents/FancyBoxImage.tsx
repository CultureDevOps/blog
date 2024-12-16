'use client'
import NextImage, { ImageProps } from "next/image";

interface ImageWithFancyboxProps extends ImageProps {
  // originalSrc?: string; // Rendre originalSrc facultatif
  src: string;
}

const FancyBoxImage = ({ alt, src , ...rest }: ImageWithFancyboxProps) => {
  const isExternal = src.startsWith('http'); // Vérifie si l'URL est externe

  const imageContent = isExternal ? (
    // Si l'image est externe, on utilise une balise <img> standard
    <img alt={alt} src={src} {...rest} />
  ) : (
    <NextImage {...rest} src={src} alt={alt} layout="intrinsic" />
  );


  return (
    <div className="fancybox-wrapper" data-fancybox="gallery" data-src={src} aria-label={alt}>
      {imageContent}
    </div>
  );
};

export default FancyBoxImage;
