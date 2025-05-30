import { Header , Footer} from '../components/HeaderFooter'
import { RenderHero } from '@/components/Heros/RenderHero'
import { RenderBlocks, RenderBlocksWithShapes } from '@/components/Blocks/RenderBlocks'
import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { MainPageSection } from '../sections/MainPageSection'
import { Page as PageType, ReusableContent } from '@/payload-types'
import { getTableOfContents } from '../utils'
import { Observer } from 'tailwindcss-intersect'
import { useEffect } from 'react'
import { RelatedPagesMenu } from '@/components/HeaderFooter/RelatedPagesMenu'

interface WebsiteSectionProps {
  hero: any
  page: PageType
  [key: string]: any
}
interface TableOfContentsItem {
  text: string
  id: string // Unique identifier for scrolling
  tag: string // Tag type like "h1", "h2", etc.
}



export default function WebsiteSection({ ...args }: WebsiteSectionProps) {
  const page = args.page
  // console.log('page', page.layout)
  const { contentWithIds, tableOfContents } = getTableOfContents(page)
  // console.log('contentWithIds', contentWithIds)
  useEffect(() => {
    Observer.start()
  }, [])
  return (
    <div className="relative overflow-none scroll-smooth snap-y snap-mandatory overscroll-contain">
      
    {/* <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain"> */}
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} wide/>
      {/* { args.hero && args.hero.type != 'lowImpact' && args.related && (
        <div className='fixed top-16 z-50'>
        <RelatedPagesMenu
          menuItems={args.related}
          wide />
                </div>

        )} */}
      
      <div>
      <RenderHero {...args.hero} />
      </div>
      { args.hero && args.related && (
        <RelatedPagesMenu
          menuItems={args.related}
          dark={args.hero.type === 'highImpact' ? false : true}
          wide />
        )}
{/* 
      <MainPageSection
        edit={args.edit}
        pageId={args.page.id}
        tableOfContents={tableOfContents}
        relatedContent={args.relatedContent}
      > */}
        <RenderBlocksWithShapes blocks={contentWithIds} />
        <Footer {...args.footer} />
      {/* </MainPageSection> */}




    </div>
  )
}
