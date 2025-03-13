// import { footerSectionData } from '@/data'
import { ImageProps, LinkProps } from '@/common-types'
// import { Container } from '@/components/ui'
import { CustomLink } from '@/components/Other/CustomLink'
import { cn } from '@/lib/utils'
import Image, { StaticImageData } from 'next/image'
import { BrandLogo } from './BrandLogo'
import { FaChevronRight, FaEnvelope, FaPaperPlane, FaPhone, FaCalendarDays } from 'react-icons/fa6'
import { ClassValue } from 'clsx'
import { formatDateTimeStringCompact } from '@/lib/utils/formatDateTime'
interface RecentBlog {
  slug: string
  image: Omit<ImageProps, 'width' | 'height'>
  date: string
  title: string
}

interface SocialLinkProps {
  icon: React.ReactNode
  href: string
}

export interface SectionProps {
  className?: ClassValue
  logoLight: StaticImageData
  logoDark: StaticImageData
  footerData: FooterSectionProps
}

export interface FooterSectionProps {
  about: {
    description: string
    socialLinks: SocialLinkProps[]
  }
  columnOne: {
    title: string
    links: LinkProps[]
  }
  columnTwo: {
    contactUs: SocialLinkProps[]
  }
  columnThree: {
    title: string
    blogs: RecentBlog[]
  }
  footerBottom: {
    copyrightText: string
    links: LinkProps[]
  }
}

const titleClasses = cn('text-brand-green text-md leading-[1.25] md:text-lg mb-5 md:mb-[1.5rem]')
const addressIconParentClasses = cn(
  'w-10 h-10 rounded-5 inline-grid place-items-center dark:bg-accent-700 border border-accent-800 dark:border-transparent text-accent flex-none',
)
const addressItemClasses = cn('flex items-center gap-5')
const textColor = cn('transition-colors duration-300 hover:text-accent dark:hover:text-white')

export function Footer({ className, footerData, logoLight, logoDark }: SectionProps) {
  const { about, columnOne, columnTwo, columnThree, footerBottom } = footerData
  return (
    <footer
      className={cn('sticky z-2 flex flex-col dark bg-black overflow-hidden pt-12', className)}
    >
      <div className="py-16 md:py-20">
        <div className="container">
          <BrandLogo logoDark={logoDark} logoLight={logoLight} />
          <div className="mt-7 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
            {/* About  */}
            <div data-aos="fade-up" data-aos-delay="200">
              <p className="mb-7 text-white max-w-[280px]">{about.description}</p>
              {about.socialLinks && about.socialLinks.length > 0 && (
                <nav aria-label="social links">
                  <ul className="inline-flex min-h-[50px] items-center rounded-5 text-white gap-2">
                    {about.socialLinks.map((socialLink, index) => (
                      <li key={index} className="bg-brand-green rounded-full p-3">
                        <CustomLink
                          aria-label={socialLink.href}
                          className={'text-2xl'}
                          href={socialLink.href}
                          openNewTab
                        >
                          <span>{socialLink.icon}</span>
                        </CustomLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* Column one  */}
            <div data-aos="fade-up" data-aos-delay="400">
              <h3 className={titleClasses}>{columnOne.title}</h3>
              {columnOne.links && columnOne.links.length > 0 && (
                <nav aria-label="footer links navigation">
                  <ul className="grid gap-4">
                    {columnOne.links.map((link) => (
                      <li key={link.label} className="flex items-center text-white gap-2.5">
                        {link.label}
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* Column Two  */}
            <div data-aos="fade-up" data-aos-delay="600">
              <ul aria-label="addresses" className="grid gap-5">
                {columnTwo.contactUs && columnTwo.contactUs.length > 0 && (
                  <ul className="grid gap-2">
                    {columnTwo.contactUs.map((item, index) => (
                      <li key={index} className="flex items-center text-white gap-3">
                        <span key={index} className="bg-brand-green rounded-full p-3 text-2xl">
                          {item.icon}
                        </span>
                        <span className="max-w-56">{item.href}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex min-h-[90px] items-center border-t border-accent-800 border-opacity-20 py-5 dark:border-body dark:border-opacity-20">
        <div className="container">
          <div className="flex flex-wrap items-center text-xs justify-between gap-x-8 gap-y-4 md:gap-x-10 text-gray-400">
            <p>{footerBottom.copyrightText}</p>
            {footerBottom.links && footerBottom.links.length > 0 && (
              <nav aria-label="footer bottom navigation">
                <ul className="flex flex-wrap items-center gap-x-4  md:gap-x-7">
                  {footerBottom.links.map((link) => (
                    <li key={link.label}>
                      <CustomLink
                        aria-label={`Go to page ${link.label}`}
                        href={link.href}
                        openNewTab={link.openNewTab}
                        className={textColor}
                      >
                        {link.label}
                      </CustomLink>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
