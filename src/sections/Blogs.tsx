import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Slider from 'react-slick'
import { FeatureCard } from '../components'
import { useRef } from 'react'
import { Media } from '@/payload-types'

export const Blogs: React.FC<{
  bgImage: string
  blogs?: {
    content: string
    title: string
    link: { label: string; url: string }
    name: string
    image: Partial<Media>
  }[]
}> = ({ bgImage, blogs }) => {
  const settings = {
    dots: true,
    speed: 500,
    // slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <></>,
    prevArrow: <></>,
    slidesToShow: 3.3,
    Infinity: false,
    rtl: true,
    dotsClass: 'slick-dots !text-left -left-px bottom-[-65px]',
    responsive: [
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  let sliderRef = useRef(null)
  const next = () => {
    sliderRef.slickNext()
  }
  const previous = () => {
    sliderRef.slickPrev()
  }
  return (
    <div className="relative h-screen w-full">
      <div className="clipped-image absolute inset-0">
        <Image src={bgImage} alt="Clipped Image" fill className="bg-cover w-full !h-[160%] " />
      </div>
      {blogs && blogs?.length > 0 && (
        <div className="absolute top-2/3  transform  -translate-y-1/2 w-full">
          <div className="pt-4 md:pt-40 pr-12 flex flex-row justify-end items-center gap-2 mb-12 !z-50 text-primary">
            <div onClick={previous} className="cursor-pointer !z-50">
              <svg
                width="50"
                height="20"
                viewBox="0 0 50 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="50" y1="10" x2="5" y2="10" stroke="currentColor" stroke-width="2" />
                <polyline
                  points="15,2 5,10 15,18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
            <div onClick={next} className="cursor-pointer !z-50">
              <svg
                width="50"
                height="20"
                viewBox="0 0 50 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="0" y1="10" x2="45" y2="10" stroke="currentColor" stroke-width="2" />
                <polyline
                  points="35,2 45,10 35,18"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                />
              </svg>
            </div>
          </div>
          <div className=" overflow-hidden md:ml-24  max-w-full ml-0 h-[80dvh]">
            <Slider
              ref={(slider: any) => {
                sliderRef = slider
              }}
              {...settings}
            >
              {blogs?.map(({ image, content, link, name, title }, index) => (
                <div
                  className={`pr-4 ${index === 0 ? 'pl-2' : 'pl-4'} max-h-[650px] overflow-hidden h-full`}
                  key={`blogs-${name}`}
                >
                  <FeatureCard
                    imageClassName="!h-[150px]"
                    className="bg-background prose-p:text-foreground md:h-[450px] h-[400px]"
                    title={title}
                    image={image}
                    settings={{ card: 'outline' }}
                    content={content}
                    link={{ ...link, type: 'custom' }}
                    contentClassName="justify-between"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  )
  // return (
  //   <div className="relative h-screen w-full">
  //     {/* Background Image */}
  //     {/* <div className="absolute inset-0">
  //       <Image src={bgImage} alt="Clipped Image" fill className="object-cover w-full h-full" />
  //     </div> */}
  //     <div className="clipped-image absolute inset-0">
  //       <Image src={bgImage} alt="Clipped Image" fill className="bg-cover w-full !h-[110%] " />
  //     </div>
  //     {/* Navigation Buttons */}
  //     {blogs && blogs.length > 0 && (
  //       <>
  //         <div className="absolute top-10 right-12 flex flex-row justify-end items-center gap-2 z-50 text-primary">
  //           <div onClick={previous} className="cursor-pointer z-50">
  //             <svg
  //               width="50"
  //               height="20"
  //               viewBox="0 0 50 20"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <line x1="50" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="2" />
  //               <polyline
  //                 points="15,2 5,10 15,18"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //               />
  //             </svg>
  //           </div>
  //           <div onClick={next} className="cursor-pointer z-50">
  //             <svg
  //               width="50"
  //               height="20"
  //               viewBox="0 0 50 20"
  //               fill="none"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <line x1="0" y1="10" x2="45" y2="10" stroke="currentColor" strokeWidth="2" />
  //               <polyline
  //                 points="35,2 45,10 35,18"
  //                 fill="none"
  //                 stroke="currentColor"
  //                 strokeWidth="2"
  //               />
  //             </svg>
  //           </div>
  //         </div>

  //         {/* Slider (Centered in Middle of Background) */}
  //         <div className="absolute top-1/2  md:left-4 transform -translate-x-1/2 -translate-y-1/2 w-full ">
  //           <Slider
  //             ref={(slider: any) => {
  //               sliderRef = slider
  //             }}
  //             {...settings}
  //           >
  //             {blogs.map(({ image, content, link, name, title }, index) => (
  //               <div className={`px-4 max-h-[650px] overflow-y-auto h-full`} key={`blogs-${name}`}>
  //                 <FeatureCard
  //                   className="bg-background prose-p:text-foreground"
  //                   title={title}
  //                   image={image}
  //                   settings={{ card: 'outline' }}
  //                   content={content}
  //                   link={{ ...link, type: 'custom' }}
  //                 />
  //               </div>
  //             ))}
  //           </Slider>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // )
}
