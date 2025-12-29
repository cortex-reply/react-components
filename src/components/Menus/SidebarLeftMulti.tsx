'use client'
import React from 'react'
import { ChevronRight } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components//ui/collapsible'
import clsx from 'clsx'
import { Skeleton } from '@/components//ui/skeleton'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components//ui/sidebar'



type FileType = 'published' | 'draft' | 'note'

type Metadata = {
  backend: 'github'
  owner: string
  repo: string
  path: string
  branch?: string
  encoding?: string
}

interface LinkItem {
  label: string
  url: string
  type?: FileType
  metadata?: Metadata
}

type MenuStructure ={
  label: string
  url?: string
  isActive?: boolean
  icon?: React.ComponentType<React.ComponentProps<'svg'>>
  type?: FileType
  links?: LinkItem[] | undefined
}

type MultiMenuStructure = {
  name: string
  nav: MenuStructure[]
}

type NavigationItem = {
  label: string
  url: string
  isActive?: boolean // Optional property for active items
  isDraft?: boolean // Optional property for draft items
  items?: NavigationItem[] // Recursive type for nested items
  icon?: React.ComponentType<React.ComponentProps<'svg'>>
}

interface SidebarLeftMultiProps extends React.ComponentProps<typeof Sidebar> {
  mainNav?: MultiMenuStructure[]
  secondaryNav?: MenuStructure[]
  title?: string
  subTitle?: string
  pathName?: string
  menuHeading?: string
  onNavClick?: (callback: any) => void
  loading?: boolean
  LinkComponent?: React.ComponentType<React.ComponentProps<'a'>>
}

export function SidebarLeftMulti({
  mainNav,
  secondaryNav,
  title,
  subTitle,
  pathName,
  menuHeading,
  onNavClick,
  loading = false,
  LinkComponent,
  ...props
}: SidebarLeftMultiProps) {
  interface ButtonProps {
    href?: string
    children: React.ReactNode
  }
  const Button: React.FC<ButtonProps> = ({ href, children, ...props }) => {
    return (
      <button
        onClick={() => onNavClick && onNavClick(href)}
        className="flex items-center justify-start w-full text-sm text-left px-4 py-2"
        {...props}
      >
        {children}
      </button>
    )
  }
  // if onNavClick is provided, pass the callback to the buttons. else, render an anchor tag
  const Link: React.FC<ButtonProps & React.ComponentProps<'a'>> = LinkComponent
    ? (props) => <LinkComponent {...props} />
    : onNavClick
      ? Button
      : (props) => <a {...props} />

  return (
    <Sidebar {...props} variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            {loading ? (
              <div className="grid flex-1 p-2 text-left text-m leading-tight">
                <Skeleton className="bg-gray-200 my-2 w-full h-7" />
                <Skeleton className="bg-gray-200 w-3/4 my-2 h-5" />
              </div>
            ) : (
              <div className="grid flex-1 p-2 text-left text-m leading-tight">
                <span className="truncate font-semibold">{title}</span>
                {subTitle && <span className="truncate text-sm">{subTitle}</span>}
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {loading && (
        <SidebarContent>
          <Skeleton className="bg-gray-200 w-3/4 h-5" />
          <Skeleton className="bg-gray-200 w-3/4 h-5" />

          <Skeleton className="bg-gray-200 w-3/4 h-5" />

          <Skeleton className="bg-gray-200 w-3/4 h-5" />

          <Skeleton className="bg-gray-200 w-3/4 h-5" />
          <Skeleton className="bg-gray-200 w-3/4 h-5" />
          <Skeleton className="bg-gray-200 w-3/4 h-5" />
          <Skeleton className="bg-gray-200 w-3/4 h-5" />
          <Skeleton className="bg-gray-200 w-3/4 h-5" />
          <Skeleton className="bg-gray-200 w-3/4 h-5" />
        </SidebarContent>
      )}

      <SidebarContent>
        {mainNav &&
          !loading &&
          mainNav.map((item, index) => (
            <SidebarGroup>
          <SidebarGroupLabel>{item.name}</SidebarGroupLabel>
            { item && !loading && item.nav.map((item, index) => (
            <Menu key={index} subNav={item} pathName={pathName} Link={Link} />
            ))}
          </SidebarGroup>
          ))}

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {secondaryNav &&
                !loading &&
                secondaryNav.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton asChild size="sm">
                      <Link href={item.url || ''}>
                        {item.icon && <item.icon />}
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  )
}

function Menu({
  subNav,
  pathName,
  Link,
}: {
  menuHeading?: string
  subNav: MenuStructure
  pathName?: string
  Link: React.FC<
    {
      href?: string
      children: React.ReactNode
    } & React.ComponentProps<'a'>
  >
}) {
  const item = subNav
  let isActive = false
  // if a link within subNav.links equals the current pathName, set isActive to true ( this will open the collapsible )
  if (item.links) {
    item.links.map((link) => {
      if (link.url === pathName) {
        isActive = true
      }
    })
  }
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup className="py-0">
        <SidebarMenu>
          <Collapsible key={item.label} asChild defaultOpen={item.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={item.label}
                className={clsx(isActive && 'font-bold text-accent')}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
              {item.links?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRight />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.links?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton
                            asChild
                            className={clsx(subItem.url === pathName && 'font-bold text-accent')}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.label}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroup>
    </Collapsible>
  )
}
