import { Post, Media } from '@/payload-types'
import { formatDateTimeStringShort } from '@/lib/utils/formatDateTime'
import {
  SectionHeading,
  type SectionHeadingWithoutStylingProps,
} from '@/components/HeaderFooter/SectionHeading'
import { Container } from '@/components/Other/Container'
import { cn } from '@/lib/utils/cn'
import { getStaggeredDelay } from '@/lib/utils/setStaggeredDelay'
import { CustomLink } from '@/components/Other/CustomLink'
import Image, { ImageProps } from 'next/image'
import { FaArrowRight, FaUser } from 'react-icons/fa6'

interface BlogProps {
  image: Omit<ImageProps, 'width' | 'height'>
  authors?: { name: string; image: ImageProps }[]
  categories?: string[]
  commentCount: string
  title: string
  description: string
  slug: string
  publishedAt: string
  meta: Post['meta']
}

export interface BlogSectionProps {
  sectionHeading?: Pick<SectionHeadingWithoutStylingProps, 'subtitle' | 'title'>
  blogs: Partial<Post>[]
  base?: string // base path for the blogs
}

export function BlogList({ blogs, sectionHeading, base = 'insights' }: BlogSectionProps) {
  console.log(blogs)
  return (
    <Container>
      <div className="">
        {sectionHeading && (
          <div data-aos="fade-up" data-aos-delay="100">
            <SectionHeading {...sectionHeading} alignment="start" hasBottomSpacing />
          </div>
        )}
      </div>
      {blogs && blogs.length > 0 && (
        <div className="-mx-4 flex flex-wrap justify-start gap-y-4">
          {blogs.map((blog, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={getStaggeredDelay([200, 400, 600], index)}
              className="w-full h-full md:w-1/2 md:px-4 lg:w-1/3"
            >
              <BlogCard {...blog} base={base} />
            </div>
          ))}
        </div>
      )}
    </Container>
  )
}

const inlineFlexLayoutClasses = cn('inline-flex items-center gap-2 text-white')
const iconClasses = cn('text-sm text-white')

export function BlogCard({
  slug,
  meta,
  authors,
  title,
  publishedAt: date,
  categories,
  base,
}: Partial<Post> & { base: string }) {
  return (
    <article className="group/blog relative z-1 flex h-full min-h-[452px] flex-col  overflow-hidden rounded-5 p-0">
      <span className="absolute inset-0 z-[2] "></span>
      <Image
        src={(meta?.image as Media)?.url || '/assets/images/brand/cortex-reply-gradient.png'}
        alt={(meta?.image as Media)?.alt || 'Blog image'}
        fill
        sizes={`
          (min-width:768px) 50vw, 
          (min-width:1024px) 33vw,
          100vw
          `}
        className={cn(
          // Normal classes
          'pointer-events-none object-cover opacity-0 [filter:blur(10px)] [transform:translatex(50%)_scalex(2)] [transition:all_500ms_ease]',
          // on card hover classes
          'group-hover/blog:opacity-100 group-hover/blog:[filter:blur(0px)] group-hover/blog:[transform:translatex(0)_scalex(1)]',
        )}
      />
      <Image
        src={(meta?.image as Media)?.url || '/assets/images/brand/cortex-reply-gradient.png'}
        alt={(meta?.image as Media)?.alt || 'Blog image'}
        fill
        sizes={`
          (min-width:768px) 50vw, 
          (min-width:1024px) 33vw,
          100vw
          `}
        className={cn(
          // Normal classes
          'pointer-events-none object-cover [transition:all_500ms_ease]',
          // on card hover classes
          'group-hover/blog:opacity-0 group-hover/blog:[filter:blur(10px)] group-hover/blog:[transform:translatex(-50%)_scalex(2)]',
        )}
      />

      {/* Content  */}
      <div className="relative z-10 flex h-full flex-1 w-full flex-col">
        {date && (
          <div>
            <div className="inline-grid w-full items-center justify-center rounded-5 bg-background/40 px-4 py-3 text-center font-secondary text-md font-bold text-foreground transition-colors group-hover/blog:bg-accent group-hover/blog:text-accent-foreground md:text-lg">
              <time dateTime={date} className="text-foreground">
                <span className="block">{formatDateTimeStringShort(date)}</span>
                {/* <span className="block">
                {formatDateTimeStringCompact(date).split(' ')[1]} {formatDateTimeStringCompact(date).split(' ')[2]}
              </span> */}
              </time>
            </div>
          </div>
        )}
        <div className="mt-auto space-y-2 text-white md:space-y-5">
          <div className="inline-flex flex-wrap items-center gap-x-5 gap-y-2">
            {/* {authors && authors.map((author, index) => (
            <div className="relative flex items-center gap-x-4" key={index}>
              {author.image ? (
                <img
                  alt={author.image.alt || author.name}
                  src={typeof author.image.src === 'string' ? author.image.src : undefined}
                  className="size-10 rounded-full bg-gray-50"
                />
              ) : (
                <div className="size-10 rounded-full bg-gray-50" />
              )}{' '}
              <div className="text-sm/6">
                <p className="text-foreground  pr-6">
                  <span className="absolute inset-0" />
                  {author.name}
                </p>
              </div>
            </div>
          ))} */}
            <p className={inlineFlexLayoutClasses}>
              {/* <span className={iconClasses}>
                <FaComments />
              </span>
              <span>Comments ({String(commentCount).padStart(2, '0')})</span> */}
            </p>
          </div>
          <h3 className="text-md font-bold w-full h-28 p-6 bg-background/60 text-foreground md:text-lg">
            <CustomLink
              aria-label={title}
              href={`/${base}/${slug}` || '#'}
              className="transition-colors duration-300 hover:text-primary"
            >
              {title}
            </CustomLink>
          </h3>
          <div>
            <CustomLink
              href={`/${base}/${slug}` || '#'}
              className={cn(
                inlineFlexLayoutClasses,
                'gap-[.625rem] bg-background/80 px-4 py-2 mx-6 my-3 text-base font-semibold uppercase text-foreground transition-colors duration-300 hover:text-accent-foreground',
              )}
            >
              <span>Read More</span>
              <span className="text-accent">
                <FaArrowRight />
              </span>
            </CustomLink>
          </div>
        </div>
      </div>
    </article>
  )
}
