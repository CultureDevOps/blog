import Image, { ImageProps } from "next/image"

interface ImageWithReflectionProps extends ImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const ImageWithReflection = ({
  src,
  alt,
  width,
  height,
  className,
  ...rest
}: ImageWithReflectionProps) => {
  const isExternal = src.startsWith("http") // Vérifie si l'URL est externe

  const cloudFrontUrl = process.env.CLOUD_FRONT_URL
  let href = isExternal ? src : `${cloudFrontUrl}${src}`
  if (!isExternal && !href.includes("?format=")) {
    href += "?format=auto"
  }
  return (
    <div className="relative flex flex-col items-center">
      {/* Image principale */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} "block"`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      {/* Reflet */}
      <div
        className="absolute top-full mt-1 size-full"
        style={{
          backgroundImage: `url(${href})`,
          backgroundSize: "cover",
          transform: "scaleY(-1)",
          filter: "blur(5px) opacity(0.3)",
        }}
      ></div>
    </div>
  )
}

export default ImageWithReflection
