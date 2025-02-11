'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Page } from '@/payload-types'
import { RenderBlocks } from '../Blocks'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Header } from '../HeaderFooter'
import { Footer } from '../HeaderFooter'
import logoDark from '../../images/cortex-reply-dark.png'
import logoLight from '../../images/cortex-reply-light.png'
import { HeadingImage } from '../Blocks/HeadingImage'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'pagedjs'
import { Printable } from './Printable';
import Image1 from '../../images/stock1.jpg';

export const SlideShow: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const [activeSection, setActiveSection] = useState(0)

  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  const handleSliderClick = (sectionId: number) => {
    // console.log('sectionId', sectionId)
    // console.log('block', blocks[sectionId])
    setActiveSection(sectionId)
  }

  const goToNextSlide = () => {
    setActiveSection((prev) => (prev + 1) % blocks.length)
  }

  const goToPreviousSlide = () => {
    setActiveSection((prev) => (prev - 1 + blocks.length) % blocks.length)
  }

  interface DebounceFunction {
    (...args: any[]): void
  }

  const debounce = (func: (...args: any[]) => void, wait: number): DebounceFunction => {
    let timeout: ReturnType<typeof setTimeout>
    return (...args: any[]) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  }

  interface WheelEventWithDelta extends WheelEvent {
    deltaY: number
  }

  const handleWheel = useCallback(
    debounce((event: WheelEventWithDelta) => {
      if (event.deltaY > 0) {
        goToNextSlide()
      } else {
        goToPreviousSlide()
      }
    }, 300),
    [],
  )

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      goToNextSlide()
    } else if (event.key === 'ArrowUp') {
      goToPreviousSlide()
    }
  }
  
  useEffect(() => {
    AOS.init({ duration: 1000 })
    window.addEventListener('wheel', handleWheel)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <div className={`flex flex-col min-h-screen relative overflow-hidden`}>

      {/* Header */}
      <Header 
      isMenuOpen={true} 
      logoLight={logoLight} 
      logoDark={logoDark}
      />

      {/* Vertical Slider */}

      <div className="fixed left-0 top-0 flex h-screen w-9 z-10 flex-col items-center justify-center bg-gray-100">
        {hasBlocks &&
          blocks.map((section: any, id: number) => (
            <button
              key={section.id}
              className={`group relative flex items-center justify-center my-2 h-16 w-4 rounded-full transition-all hover:bg-accent duration-300 ${activeSection === id ? 'bg-accent' : 'bg-gray-300'
                }`}
              onClick={() => handleSliderClick(id)}
            >
              {/* Label */}
              <span className="absolute ml-7 left-full text-left transform -translate-y-1/2 translate-x-0 rotate-90 origin-left whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                {section.blockName}
              </span>
            </button>
          ))}
      </div>

      {/* Main Content */}
      <AnimatePresence>
        {blocks.map((block, index) => (
          <div id={`slide-${index}`} key={index} className="print-section">
            <div
              className={`absolute flex items-center justify-center transition-opacity duration-300 ${index === activeSection ? 'opacity-100' : 'opacity-0'
                } w-full h-full bg-cover bg-center`}
            >
              {index === 0 ? (
                <HeadingImage
                  image={Image1}
                  title="Reply Cortex"
                  // companyLogo={logoLight}
                  // customerLogo={logoDark}
                />
              ) : (
                <RenderBlocks blocks={[block]} />
              )}
            </div>
          </div>
        ))}
      </AnimatePresence>

      {/* Printable */}
      <Printable blocks={blocks} />


      {/* Down Arrow */}
      <button
        className="absolute bottom-4 left-1 z-20 text-3xl text-primary transition-all duration-300 hover:scale-110"
        onClick={goToNextSlide}
      >
        <ScrollDownIcon />
      </button>

      {/* Footer */}

      {/* <Footer
        className="w-full mt-auto z-50"
        logoLight={logoLight}
        logoDark={logoDark}
        footerData={{
          about: {
            description:
              'Cortex Reply is a leading consulting company in the field of digital transformation and innovation. We help our clients to successfully master the challenges of digital transformation.',
            socialLinks: [],
          },
          columnOne: {
            title: 'Quick Links',
            links: [
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' },
            ],
          },
          columnTwo: {
            title: 'Company',
            location: '123 Business St, Tech City',
            mails: ['contact@cortexreply.com'],
            phoneNumbers: ['+123 456 7890'],
          },
          columnThree: {
            title: 'Recent Blogs',
            blogs: [
              {
                title: 'The Future of AI in Business',
                slug: '/blogs/the-future-of-ai-in-business',
                date: '2024-01-01',
                image: {
                  src: logoDark,
                  alt: 'Blog Image',
                },
              },
              {
                title: 'The Benefits of Cloud Computing',
                slug: '/blogs/the-benefits-of-cloud-computing',
                date: '2024-01-01',
                image: {
                  src: logoDark,
                  alt: 'Blog Image',
                },

              },
            ],
          },
          footerBottom: {
            copyrightText: '© 2024 Cortex Reply. All rights reserved.',
            links: [],
          },
        }}
      /> */}
    </div>

  )
}

const ScrollDownIcon: React.FC = () => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className={cn('w-fit min-h-[50px] min-w-[20px] p-1 border-2 rounded-full', 'border-gray-800')}
    >
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 25], opacity: [1, 0] }}
        transition={{
          duration: 1,
          ease: 'easeOut',
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className={cn('w-[12px] h-[12px] rounded-full', 'bg-gray-800')}
      />
    </motion.div>
  </AnimatePresence>
)
