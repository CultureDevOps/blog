import NextImage, { ImageProps } from 'next/image'

const Image = ({ ...rest }: ImageProps) => {
  return (
    <NextImage 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    {...rest}
    />
  )
}


export default Image
