import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => {
  return (
    <NextImage 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...rest} 
    quality={90}
    />
  )
}


export default Image
