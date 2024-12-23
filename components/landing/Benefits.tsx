import Image from '@/components/mdxcomponents/Image'
import React from 'react'
import Container from './Container'

const Benefits = (props) => {
  const { data } = props
  if (!data || !data.image) {
    return <p>Loading...</p>  // Afficher un message de chargement si `data` ou `data.image` est undefined
  }  
  return (
    <>
      <Container className="mb-20 flex flex-wrap lg:flex-nowrap lg:gap-10">
        <div
          className={`flex w-full items-center justify-center lg:w-1/2 ${
            props.imgPos === 'right' ? 'lg:order-1' : ''
          }`}
        >
          <div>
            <Image
              src={data.image}
              width={2048}
              height={2048}
              alt="Benefits"
              className="object-cover"
              placeholder="blur"
              blurDataURL={data.image}                             
              quality={80}
            />
          </div>
        </div>

        <div
          className={`flex w-full flex-wrap items-center lg:w-1/2 ${
            data.imgPos === 'right' ? 'lg:justify-end' : ''
          }`}
        >
          <div>
            <div className="mt-4 flex w-full flex-col">
              <h2 className="mt-3 max-w-2xl text-3xl font-bold font-headings leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight">
                {data.title}
              </h2>

              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-600 dark:text-gray-300 lg:text-xl xl:text-xl">
                {data.desc}
              </p>
            </div>

            <div className="mt-5 w-full">
              {data.bullets.map((item, index) => (
                <Benefit key={index} title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

function Benefit(props) {
  return (
    <>
      <div className="mt-8 flex items-start space-x-3">
        <div className="mt-1 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-indigo-500 ">
          {React.cloneElement(props.icon, {
            className: 'w-7 h-7 text-indigo-50',
          })}
        </div>
        <div>
          <h3 className="text-xl font-medium font-headings text-gray-800 dark:text-gray-200">{props.title}</h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400">{props.children}</p>
        </div>
      </div>
    </>
  )
}

export default Benefits
