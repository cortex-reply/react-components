
import '../globals.css'
// import 'cortex-react-components/globals.css'


// import { GeistMono } from 'geist/font/mono'
// import { GeistSans } from 'geist/font/sans'



import { ThemeProvider, Header } from '@/components/index'
import logoLight from '../../.storybook/public/cortex-reply-light.png'
import logoDark from '../../.storybook/public/cortex-reply-dark.png'

import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components//Images'

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const defaultMenuItems =  {
      title: 'Your Company',
      logo: 'cortex-reply.png',
      menuItems: [
        {
          name: 'Documentation',
          items: [
            {
              name: 'Platforms & Services',
              description: 'Cloud services',
              href: '#',
              icon: ServiceIcon, // Pass the component, not <ChartPieIcon />
            },
            {
              name: 'Solutions & Propositions',
              description: 'Solutions that we have built',
              href: '#',
              icon: SolutionIcon,
            },
            {
              name: 'Products',
              description: 'Products that we sell',
              href: '#',
              icon: ProductIcon,
            },
          ],
        },
        {
          name: 'Resources',
          items: [
            { name: 'Documentation', href: '#', icon: ChartPieIcon },
            { name: 'API Reference', href: '#', icon: CursorArrowRaysIcon },
            { name: 'Github', href: '#', icon: GithubIcon },
          ],
          actions: [
            { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
            { name: 'Contact sales', href: '#', icon: PhoneIcon },
            { name: 'View all products', href: '#', icon: RectangleGroupIcon },
          ],
        },
        {
          name: 'Intranet',
          href: '#',
        },
      ],
    }

/**
 * Default decorator: apply global styles + theme + app chrome.
 * Use per-story params to toggle whether to render as a "page".
 */
const withIntranetLayout = (Story: any, ctx: any) => {
  const isPage = ctx.parameters?.layoutType === 'page' || ctx.parameters?.page === true
  const showHeader = ctx.parameters?.showHeader ?? isPage
  const defaultTheme = ctx.parameters?.theme ?? 'dark'

  if (!isPage) return <Story />

  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme={defaultTheme} disableTransitionOnChange>
        <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
          {showHeader ? (
            <Header
              isMenuOpen={true}
              logoLight={logoLight as any}
              logoDark={logoDark as any}
              menuItems={defaultMenuItems.menuItems as any}
              themeControl={true}
              wide
            />
          ) : null}
          <main>
            <Story />
          </main>
        </div>
      </ThemeProvider>
    </div>
  )
}

export { withIntranetLayout }