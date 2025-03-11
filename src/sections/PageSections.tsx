'use client'
import React from 'react'
import Image from 'next/image'
import { LowImpactHero } from '@/components/Heros/LowImpact'
import { MediumImpactHero } from '@/components/Heros/MediumImpact'
import { HighImpactHero } from '@/components/Heros/HighImpact'
import { Header } from '../components/HeaderFooter'
import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { Container, PageShape } from '@/components/Other'
import { type Page, type Media as MediaType } from '@/payload-types'
import { RichText } from '@/components/Payload/RichText'
import { cn } from '@/lib/utils/cn'
import { Footer } from '../components/HeaderFooter'
import { Media } from '@/components/Payload/Media'
import { ServiceSection, ContactSection, LocationsSection, BlogList } from '../sections'
import { SectionHero } from '@/components/Heros/SectionHero'

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
    <div className="bg-white">
      <div
        className="relative h-screen text-white bg-black"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 65% 100%, 0% 85%)',
        }}
      >
        <div className="relative z-10">{children}</div>
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

      <div className="fixed inset-0 h-full z-10 flex flex-col items-start justify-center text-white px-4">
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
  dummy: Dummy,
}

export default function Page({ ...args }) {
  const style = args.style

  return (
    <div className="relative overflow-y-none scroll-smooth snap-y snap-mandatory">
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} {...args.header} />
      <RenderHero {...args.hero} />
      <Section theme="light" style={style}>
        <ServiceSection {...args.service} />
      </Section>

      <Section theme="dark" style={style} image={args.service.services[0].image}>
        <DummyContent />
      </Section>

      <Section theme="light" style={style}>
        <DummyContent />
      </Section>

      <Section theme="dark" style={style}>
        <ContactSection {...args.contact} />
      </Section>

      <Section theme="light" style={style}>
        <LocationsSection {...args.contact} />
      </Section>

      <Section theme="last" style={style}>
        <BlogList {...args.blog} />
      </Section>

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
}

export const Section: React.FC<SectionProps> = ({
  children,
  theme,
  style,

  id,
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
      <section id={id || 'next-section'} className="sticky md:top-0 h-screen">
        {/* <div className="absolute w-full h-full bg-accent"></div> */}
        <div className="dark pt-0 min-h-[80vh]">
          <PageShape className="z-10" position="dark-top" />
          <div className="relative">
            <div className="flex items-center bg-black justify-center pt-12">{children}</div>
          </div>
        </div>
      </section>
    )
  }

  if (theme === 'light' && style === 'slide') {
    return (
      <section id={id || 'next-section'} className="sticky top-0 light pt-0 h-screen">
        {/* <div className="absolute w-full h-full bg-accent"></div> */}
        <div className="sticky top-0 light pt-0 h-screen">
          <PageShape className="z-10" position="light-top" />
          <div className="relative bg-white">
            <div className="flex items-center bg-white justify-center pt-12">{children}</div>
            <div className="h-[200px] bg-white"></div>
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
            <div className="flex items-center justify-center pt-12">{children}</div>
            <PageShape className="text-black z-10" position="bottom-right" />
          </div>
        </div>
      </section>
    )
  }
  if (theme === 'light') {
    return (
      <section id={id || 'next-section'} className="">
        <div className="sticky top-0 light bg-background min-h-[50vh]">
          <div className="flex items-center justify-center">{children}</div>
        </div>
      </section>
    )
  }
  if (theme === 'dark') {
    return (
      <section id="next-section">
        <div className="sticky top-0 dark bg-white overflow-hidden">
          <div
            className="flex items-center h-[80vh] justify-center pt-12 bg-black text-white"
            style={{
              clipPath: 'polygon(0 15%, 35% 0, 100% 15%, 100% 85%, 65% 100%, 0 85%)',
            }}
          >
            {children}
          </div>
        </div>
      </section>
    )
  }
  if (theme === 'last') {
    return (
      <section id={id || 'next-section'} className="">
        <div className="sticky top-0 dark h-[80vh] bg-white">
          <div className="flex items-center justify-center pb-12 bg-black">{children}</div>
        </div>
      </section>
    )
  }
}
