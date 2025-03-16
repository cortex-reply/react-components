'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { LowImpactHero } from '@/components/Heros/LowImpact'
import { MediumImpactHero } from '@/components/Heros/MediumImpact'
import { HighImpactHero } from '@/components/Heros/HighImpact'
import { PostHero } from '@/components/Heros/PostHero'
import { Header } from '../components/HeaderFooter'
import { VideoHeader } from '../components/HeaderFooter'
import logoVideo from '../images/cortex-reply-bw.png'
import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { Container, PageShape } from '@/components/Other'
import { SectionHero } from '@/components/Heros/SectionHero'
import { type Page, type Media as MediaType } from '@/payload-types'
import { RichText } from '@/components/Payload/RichText'
import { cn } from '@/lib/utils/cn'
import { Footer } from '../components/HeaderFooter'
import { Media } from '@/components/Payload/Media'
import {
  ServiceSection,
  AboutSection,
  ContactSection,
  LocationsSection,
  BlogList,
  ServiceDetailSection,
} from '../sections'

interface TopSectionProps {
  children: React.ReactNode
}

const content = (description: string) => {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,

      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,

          children: [
            {
              mode: 'normal',
              text: description,
              type: 'text',
              style: '',
              detail: 0,
              format: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          textStyle: '',
          textFormat: 0,
        },
      ],
      direction: 'ltr',
    },
  }
}
const TopSection: React.FC<TopSectionProps> = ({ children }) => {
  return (
    <div>
      <div className="sticky top-0 h-screen">
        {children}
        <PageShape className="text-black z-10" position="header" />
      </div>
    </div>
  )
}

const Dummy = () => {
  return (
    <TopSection>
      <video
        className="fixed inset-0 object-cover w-full h-full z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="assets/videos/background2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div className="absolute inset-0 bg-primary-900/50" /> */}

      {/* {!isScrolled && !isMenuOpen && (
          <button
            className="fixed hidden lg:block top-4 right-4 z-[60] p-2 rounded-full bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
            onClick={toggleMenu}
          >
           
              <Menu className="w-6 h-6 text-white" />
  
  
          </button>
        )}
         */}

      <div className="fixed inset-0 h-full z-10 flex flex-col items-start justify-center text-white px-4">
        {/* { !isScrolled && !isMenuOpen && <Image
            src={logoVideo}
            alt="Cortex Reply Logo"
            width={720}
            height={320}
            className={cn('absolute top-2.5 h-auto w-auto mt-8 hidden lg:block', isMenuOpen && 'lg:hidden')}
          />} */}
        {/* <div className="absolute top-1/2vv h-full flex flex-col px-4 items-center justify-center">
            <h1 className="text-6xl font-bold pt-auto mb-12">{title && title}</h1>
            <div className="text-3xl mb-8 max-w-2xl">{subtitle && subtitle}</div>
          </div> */}
        <Container>
          <div className="flex flex-col items-start md:w-1/2 mb-10 z-0 md:mb-0">
            <h1 className="text-5xl md:text-6xl mb-6">Lorum ipsum.</h1>
            <div className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui ac odio.
            </div>
          </div>
        </Container>
      </div>
    </TopSection>
  )
}

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  // sectionHero: SectionHero,
  dummy: Dummy,
}

export default function Page({ ...args }) {
  const style = args.style

  return (
    <div className="relative overflow-y-none scroll-smooth snap-y snap-mandatory">
      {/* <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain"> */}
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} {...args.header} />
      <RenderHero {...args.hero} />
      <Section theme="light" style={style}>
        <ServiceSection {...args.service} />
      </Section>
      <div className="bg-white z-50">
        <Section theme="dark" style={style} image={args.service.services[0].image}>
          <DummyContent />
        </Section>
        {/* <Section theme="light" style={style}>
        <DummyContent />
      </Section>
      <Section theme="dark" shape={['left', 'left']}>
        <DummyContent />
      </Section> */}
        {/* <Section theme="light" style={style}>
        <DummyContent />
      </Section>
      <Section theme="dark" style={style}>
        <DummyContent />
      </Section> */}
        <Section
          theme="light"
          style={style}
          hasWhiteBackground={style === 'slide' && true}
          className="top-[-280px]"
        >
          <DummyContent />
        </Section>
        <Section theme="dark" style={style}>
          <ContactSection {...args.contact} />
        </Section>
        <div className="-mt-1">
          <Section theme="light" style={'scroll'} hasWhiteBackground={style === 'slide' && true}>
            <LocationsSection {...args.contact} />
          </Section>
        </div>
        <div className="-mb-1">
          <Section theme="last" style={style}>
            <BlogList {...args.blog} />
          </Section>
        </div>
      </div>
      {/* <div className="bottom-0"> */}
      <Footer {...args.footer} />
      {/* </div> */}
    </div>
  )
}

const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}

const DummyContent = () => {
  const bgImage = {
    blurDataURL: '/assets/props/Cortex-Handshake-BG.jpg',
    height: 1315,
    url: '/assets/props/Cortex-Handshake-BG.jpg',
    width: 1920,
  }

  return (
    <div className="container">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-1 items-center justify-center">
        {/* Left Side Content */}
        <div className={cn('w-full text-left')}>
          <h2 className="text-3xl md:text-5xl text-primary">Lorum ipsum...</h2>
          <p className="mt-4 text-gray-700 text-lg">
            <RichText
              enableGutter={false}
              content={content(
                'Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui ac odio. Nulla facilisi. Nullam nec nisi nec odio ultricies ultricies. Nullam nec nisi nec odio ultricies ultricies. Nullam nec nisi nec odio ultricies ultricies. Lorum ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui ac odio. Nulla facilisi. Nullam nec nisi nec odio ultricies ultricies. Nullam nec nisi nec odio ultricies ultricies. Nullam nec nisi nec odio ultricies ultricies.',
              )}
              enableProse={false}
              className={cn('prose prose-headings:text-foreground prose-p:text-foreground')}
            />
          </p>

          {/* CTA Button */}
          <button className="mt-6 px-6 py-3 border border-1 border-accent text-foreground rounded-full text-base hover:bg-accent hover:text-accent-foreground transition">
            Click here
          </button>
        </div>

        {/* Right Side - AI Themed Image */}
        <div className="w-full h-full min-h-96 p-6 md:p-6 flex justify-center">
          <Image
            src={bgImage.url} // Change this to the actual image path
            alt="image"
            width={bgImage.width}
            height={bgImage.height}
            className="max-w-full"
          />
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  neighbours?: ('scroll' | 'slide')[] // describes the sections above and below. fixed means the section is fixed and does not move. normal means the section is scrollable
  shape?: ('left' | 'right')[]
  theme: 'light' | 'dark' | 'first' | 'last'
  style?: 'scroll' | 'slide' // anything that is fixed
  image?: MediaType
  id?: string
  hasWhiteBackground?: boolean
  className?: string
}

export const Section: React.FC<SectionProps> = ({
  children,
  theme,
  style,
  neighbours,
  shape,
  image,
  id,
  hasWhiteBackground,
  className,
}) => {
  // const actionType = action === 'slide' ? 'sticky' : 'relative'
  const BackgroundImage = (media: MediaType) => {
    return (
      <div className="select-none">
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName="z-5 object-cover"
            priority={false}
            loading="lazy"
            resource={media}
          />
        )}
        {media && typeof media === 'string' && (
          <div>
            <Image className="-z-10 object-cover" alt="" fill priority src={media} />
          </div>
        )}
        {/* Overlay  */}
        {/* <span className="absolute inset-0 bg-gradient-1 from-white/0 to-white dark:from-background/0 dark:to-background"></span> */}
      </div>
    )
  }

  if (theme === 'dark' && style === 'slide') {
    return (
      <section
        id={id || 'next-section'}
        className="sticky top-[-25px] md:top-[-300px] min-h-screen bg-transparent"
      >
        {/* <div className="absolute w-full h-full bg-accent"></div> */}
        <div className="dark pt-0 min-h-[80vh]">
          <PageShape className="z-10" position="dark-top" style={style} />
          <div className="relative">
            <div className="flex items-center bg-black justify-center pt-12">
              <div className="container">{children}</div>
            </div>
            <PageShape className="text-black z-10" position="dark-bottom" />
          </div>
        </div>
      </section>
    )
  }

  if (theme === 'light' && style === 'slide') {
    return (
      <section
        id={id || 'next-section'}
        className={cn('sticky top-0 light pt-0 h-full ', className)}
      >
        {/* <div className="absolute w-full h-full bg-accent"></div> */}
        {hasWhiteBackground && <div className="whiteBackground"></div>}
        <div className=" top-0 light pt-0 h-screen bg-white">
          <PageShape className="z-10" position="light-top" style={style} />
          <div className="relative bg-white">
            <div className="flex items-center bg-white justify-center pt-12">
              <div className="container">{children}</div>
            </div>
            <div className="h-[200px] bg-white"></div>
            {/* <PageShape className="text-black z-10" position="light-bottom" /> */}
          </div>
        </div>
      </section>
    )
  }

  if (theme === 'first') {
    return (
      <section id={id || 'next-section'} className="">
        {/* <div className="absolute w-full h-full bg-accent"></div> */}
        <div className="sticky top-0 light bg-background pt-6 min-h-[80vh]">
          <div className="relative">
            <div className="flex items-center justify-center pt-12">
              <div className="container">{children}</div>
            </div>
            <PageShape className="text-black z-10" position="bottom-right" />
          </div>
        </div>
      </section>
    )
  }
  if (theme === 'light') {
    return (
      <section id={id || 'next-section'} className="">
        {hasWhiteBackground && <div className="whiteBackground"></div>}
        <div className="sticky top-[-300px] light bg-background min-h-[50vh]">
          {/* <PageShape className="text-black z-10" position="top" /> */}
          <div className="flex items-center justify-center">
            <div className="container">{children}</div>
          </div>
          {/* <PageShape className="text-black z-10" position="bottom-right" /> */}
        </div>
      </section>
    )
  }
  if (theme === 'dark') {
    return (
      <section id={id || 'next-section'} className="">
        <div className="sticky top-0 dark min-h-[80vh] ">
          {/* <BackgroundImage {...image} /> */}
          <PageShape className="text-black z-10" position="bottom-right" style={style} />

          <div className="flex items-center justify-center pt-12 bg-black">
            <div className="container">{children}</div>
          </div>
          <PageShape className="text-accent z-10" position="top" />
        </div>
      </section>
    )
  }
  if (theme === 'last') {
    return (
      <section id={id || 'next-section'} className="">
        <div className="sticky top-0 dark min-h-[80vh] bg-white">
          {/* <BackgroundImage {...image} /> */}
          <PageShape className="text-black z-10" position="bottom-right" />

          <div className="flex items-center justify-center pb-12 bg-black min-h-[80vh]">
            <div className="container">{children}</div>
          </div>
          {/* <PageShape className="text-accent z-10" position="top" /> */}
        </div>
      </section>
    )
  }

  // style={{
  //   backgroundImage: `url(${image?.src})`, // Use the src property from ImageProps
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
  // }}

  //   return (
  //     <section className="relative">
  //       {/* <div
  //         className={cn(
  //           'absolute mt-[50%] w-full h-full',
  //           theme === 'dark' ? 'bg-white' : 'bg-black',
  //         )}
  //       ></div> */}

  //       {/* <div
  //         className={cn(
  //           'flex flex-col md:flex-row items-center justify-between gap-12 px-6 md:px-16 py-16 bg-background',
  //           theme,
  //           theme === 'dark' && 'bg-black clip-custom-top-l',
  //         )}
  //       > */}

  //       <div className={cn('sticky top-0 light bg-background py-6', theme)}>
  //         {children}
  //         {/* <div className="clip-bottom w-full h-[15vh] bg-black"></div> */}
  //         <style jsx>{`
  //           .clip-bottom {
  //             clip-path: polygon(0% 0%, 0% 50%, 100% 100%, 100% 0%);
  //           }
  //           .clip-custom-bottom {
  //             clip-path: polygon(
  //               0% 0%,
  //               0% 16.2%,
  //               0% 83.2%,
  //               0% 87.3%,
  //               65.4% 99.6%,
  //               100% 72.9%,
  //               100% 16.2%,
  //               100% 0%
  //             );
  //           }
  //           .clip-custom-top-r {
  //             clip-path: polygon(
  //               0% 100%,
  //               0% 83.8%,
  //               0% 16.8%,
  //               0% 12.7%,
  //               65.4% 0.4%,
  //               100% 27.1%,
  //               100% 83.8%,
  //               100% 100%
  //             );
  //           }
  //           .clip-custom-top-l {
  //             clip-path: polygon(
  //               100% 100%,
  //               100% 83.8%,
  //               100% 16.8%,
  //               100% 12.7%,
  //               34.6% 0.4%,
  //               0% 27.1%,
  //               0% 83.8%,
  //               0% 100%
  //             );
  //           }
  //           .clip-custom-top-bottom {
  //             clip-path: polygon(
  //               0% 0%,
  //               0% 12.7%,
  //               34.6% 0.4%,
  //               100% 16.8%,
  //               100% 83.8%,
  //               65.4% 99.6%,
  //               0% 87.3%,
  //               0% 100%,
  //               100% 100%,
  //               100% 83.8%,
  //               100% 16.8%,
  //               100% 12.7%,
  //               65.4% 0.4%,
  //               0% 27.1%,
  //               0% 83.8%,
  //               0% 100%
  //             );
  //           }
  //         `}</style>
  //       </div>
  //       {/* { theme === 'dark' &&         <PageShape className="text-black z-10" position="top" /> } */}
  //     </section>
  //   )
}
