'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import { BrandLogo } from './BrandLogo'
import { useTheme } from 'next-themes'

import { Moon, Sun } from 'lucide-react'
import { StaticImageData } from 'next/image'
import HeaderMenu, { type HeaderMenuProps } from './HeaderMenu'
import { PopoverGroup } from '@headlessui/react'
import { Container } from '@/components/Other/Container'
import { cn } from '@/lib/utils'

interface HeaderProps {
  isMenuOpen: boolean
  logoLight: StaticImageData
  logoDark: StaticImageData
  menuItems?: HeaderMenuProps[]
  themeControl?: boolean
  wide?: boolean 
}

export function HeaderDesktop({ isMenuOpen, logoLight, logoDark, menuItems, themeControl=false, wide=false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentTheme, setCurrentTheme] = useState('')
  const themes = ['light', 'dark']
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setCurrentTheme(theme || 'dark')
  }, [theme])

  const toggleTheme = () => {
    const nextTheme = themes[(themes.indexOf(currentTheme) + 1) % themes.length]
    setCurrentTheme(nextTheme)
    setTheme(nextTheme)
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`z-50 pb-0 transition-all duration-300 hidden lg:block ${
          isScrolled || isMenuOpen ? 'translate-y-0' : '-translate-y-full bg-transparent'
        }`}
      >
        
        {/* <Container className="px-0"> */}
          <nav className="backdrop-blur-sm bg-background/80 text-white p-0">
          
            <div className={cn("flex items-center justify-between px-9 py-0", !wide && 'container')}>
            {/* <Container className="px-0"> */}
              <BrandLogo logoDark={logoDark} logoLight={logoLight} />
              
              <PopoverGroup className={cn("hidden lg:flex lg:gap-x-12", wide && "pr-20")}>
                {menuItems && menuItems.map((menu) => <HeaderMenu key={menu.name} {...menu} />)}
              </PopoverGroup>
             {/* <div className="flex items-center space-x-4"> */}
              {/* <Button asChild variant="outline" size="sm" className="border-accent bg-transparent rounded-2xl px-6 hover:bg-accent"><a href='/contact'>Contact Us</a></Button> */}
              
             { themeControl &&    <button
                  className="fixed right-4 z-[60] p-2 rounded-full hover:border hover:border-accent backdrop-blur-sm transition-all duration-300 hover:bg-white/20 text-primary dark:text-white hover:text-accent hover:scale-125"
                  onClick={toggleTheme}
                >
                  <div className="relative">
                    <Sun className="absolute h-6 w-6 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                    <Moon className="absoulte h-6 w-6 rotate-0 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
                    {/* <X className="w-6 h-6 text-white" /> */}
                  </div>
                </button> }
              {/* </div> */}
              
            </div>
          </nav>
        {/* </Container> */}
      </header>
    </>
  )
}
