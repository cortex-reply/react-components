import { cn } from '@/lib/utils'
import { AnimatePresence } from 'framer-motion'
import Slider from 'react-slick'
import Image from 'next/image'
import { Button, Container } from '../components'
import Link from 'next/link'

export const CaseStudies: React.FC<{
  bgImage: string
  caseStudies?: { title: string; content: string; link: string; name: string }[]
}> = ({ bgImage, caseStudies = [] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <></>,
    prevArrow: <></>,
  }
  return (
    <AnimatePresence>
      {CaseStudies && CaseStudies?.length > 0 && (
        <div>
          <Image
            src={bgImage}
            alt="case-studies-bg "
            sizes="100vw"
            fill
            className="bg-cover w-full min-h-[100vh] h-fit"
          />
          <div className="mt-auto mb-auto">
            <Slider {...settings}>
              {caseStudies?.map(({ name, title, content, link }) => (
                <div
                  key={`case-study-${name}`}
                  className=" w-full align-center h-full mx-auto my-auto text-center md:pt-16 pt-12"
                >
                  <h3 className="w-full md:max-w-[65%] mx-auto text-center text-2xl sm:text-3xl md:text-5xl text-primary px-6 sm:px-8">
                    {title}
                  </h3>
                  <h3 className="py-2 md:py-8 w-full md:max-w-[85%] mx-auto text-center text-xl sm:text-2xl md:text-4xl text-destructive-foreground px-4 sm:px-8">
                    {content}
                  </h3>
                  <Link href={link} className=" w-full text-center">
                    <Button
                      variant="outline"
                      className="rounded-full border-accent bg-transparent text-destructive-foreground p-4 hover:bg-accent "
                    >
                      READ THE FULL CASE STUDY
                    </Button>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}
{
  /* <div key={`case-study-${name}`} className="flex flex-col w-full ">
<h3 className="w-full md:max-w-[65%] mx-auto text-center text-2xl sm:text-3xl md:text-5xl text-primary px-6 sm:px-8">
  {title}
</h3>
<h3 className="pt-2 md:pt-8 w-full md:max-w-[85%] mx-auto text-center text-xl sm:text-2xl md:text-4xl text-destructive-foreground px-4 sm:px-8">
  {content}
</h3>
<div className="flex justify-center"></div>
<Button variant="outline" className="rounded-full border-accent bg-transparent">
  READ THE FULL CASE STUDY
</Button>
</div> */
}
