import NextImage, { ImageProps } from 'next/image'

interface CustomImageProps extends ImageProps {
  sizes?: string; 
}

const Image = ({ sizes, ...rest }: CustomImageProps) => {
  return (
    <NextImage 
    sizes= {sizes ? sizes : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
    {...rest}
    />
  )
}


export default Image
