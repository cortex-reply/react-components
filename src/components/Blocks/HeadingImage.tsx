import Image from 'next/image'

interface HeadingImageProps {
  image: string
  subtitle?: string
  title: string
  companyLogo?: string
  customerLogo?: string
}

export function HeadingImage({
  image,
  subtitle = 'Case study',
  title,
  companyLogo,
  customerLogo,
}: HeadingImageProps) {
  return (
    <div className="relative w-full overflow-hidden pb-16 pt-[calc(80vw*0.5)]">
      <div className="absolute left-0 top-0 h-[calc(100%+80vw*0.5)] w-full overflow-hidden">
        <div className="absolute left-[calc(50%-40vw*0.5)] top-[calc(40vw*0.5*-0.29)] h-[80vw] w-[80vw] origin-top-left -rotate-45 overflow-hidden rounded-[24vw]">
          <Image
            src={image}
            alt="Header background"
            className="h-full w-full rotate-45 scale-[1.42] object-cover object-center"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>

      {/* Logos */}
      <div className="absolute left-4 top-4 flex flex-col items-start gap-4 md:left-8 md:top-8">
        {companyLogo && (
          <div className="h-16 w-32 md:h-24 md:w-48">
            <Image
              src={companyLogo}
              alt="Company logo"
              className="h-full w-full object-contain"
              width={192}
              height={96}
            />
          </div>
        )}
        {customerLogo && (
          <div className="h-10 w-20 md:h-12 md:w-24">
            <Image
              src={customerLogo}
              alt="Customer logo"
              className="h-full w-full object-contain"
              width={96}
              height={48}
            />
          </div>
        )}
      </div>

      <div className="container relative mx-auto px-4">
        <p className="mb-4 text-lg font-medium text-sky-400">{subtitle}</p>
        <h1 className="max-w-4xl text-[2.75rem] font-bold leading-[1.15] tracking-tight text-[#051527] md:text-6xl">
          {title}
        </h1>
      </div>
    </div>
  )
}
