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
    // nextArrow: <div className="absolote r-40"> next</div>,
    slidesToShow: 3.3, // Allows last slide to be partially visible,
    Infinity: false,
    rtl: true,
    dotsClass: 'slick-dots !text-left -left-px',
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
    <div>
      <div className="clipped-image">
        <Image src={bgImage} alt="Clipped Image" fill className="bg-cover w-full !h-[110%] " />
      </div>
      {blogs && blogs?.length > 0 && (
        <>
          <div className="pt-4 md:pt-40 pr-12 flex flex-row justify-end items-center gap-2 mb-12 text-red ">
            <div onClick={previous} className="cursor-pointer ">
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
            <div onClick={next} className="cursor-pointer ">
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
          <div className=" overflow-hidden md:ml-12 max-w-full ml-0 h-[80dvh]">
            <Slider
              ref={(slider: any) => {
                sliderRef = slider
              }}
              {...settings}
            >
              {blogs?.map(({ image, content, link, name, title }, index) => (
                <div
                  className={`pr-4 ${index === 0 ? 'pl-2' : 'pl-4'} max-h-[650px] overflow-y-auto h-full`}
                  key={`blogs-${name}`}
                >
                  <FeatureCard
                    className="bg-background prose-p:text-foreground "
                    title={title}
                    image={image}
                    settings={{ card: 'outline' }}
                    content={content}
                    link={{ ...link, type: 'custom' }}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  )
}
// import { AnimatePresence } from 'framer-motion'
// import Slider from 'react-slick'
// import { FeatureCard } from '../components'
// import { ImageTest, RichTextTest } from '../tests/payload'
// import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

// // Custom Previous Arrow
// const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
//   <button
//     onClick={onClick}
//     className="absolute left-0 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 hover:bg-gray-200"
//   >
//     <IoIosArrowBack size={24} className="text-gray-600" />
//   </button>
// )

// // Custom Next Arrow
// const NextArrow = ({ onClick }: { onClick?: () => void }) => (
//   <button
//     onClick={onClick}
//     className="absolute right-0 z-10 flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 hover:bg-gray-200"
//   >
//     <IoIosArrowForward size={24} className="text-gray-600" />
//   </button>
// )

// export const Blogs: React.FC<{
//   bgImage: string
//   blogs?: { title: string; content: string; link: string; name: string }[]
// }> = ({ bgImage, blogs }) => {
//   const settings = {
//     dots: true,
//     speed: 500,
//     slidesToShow: 3.3, // Allows last slide to be partially visible
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     infinite: false, // Prevents looping
//     rtl: false, // Ensures left-to-right flow
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   }

//   return (
//     <AnimatePresence>
//       {blogs && blogs.length > 0 && (
//         <div className="relative w-full pl-8 pr-4 overflow-hidden">
//           <Slider {...settings}>
//             {blogs.map(({ name, title, content, link }, index) => (
//               <div
//                 key={`blogs-${name}`}
//                 className={`px-4 transition-all ${index === blogs.length - 1 ? 'mr-16' : ''}`}
//               >
//                 <FeatureCard
//                   title={title}
//                   image={ImageTest.hero}
//                   settings={{ card: 'outline' }}
//                   content={RichTextTest.simple}
//                   link={{ label: 'find out more', type: 'custom', url: '#' }}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       )}
//     </AnimatePresence>
//   )
// }
