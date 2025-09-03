'use client'
import React from 'react'
import {
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  Check,
  ChevronRight,
  ChevronsUpDown,
  Command,
  CreditCard,
  FilePlus,
  Edit,
  Printer,
  Folder,
  Frame,
  LifeBuoy,
  LogOut,
  Map,
  MoreHorizontal,
  PieChart,
  Send,
  Settings2,
  Share,
  Plus,
  Sparkles,
  SquareTerminal,
  Trash2,
} from 'lucide-react'

// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "cortex-design-system/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components//ui/breadcrumb'

import { Separator } from '@/components/ui/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components//ui/sidebar'

import { SidebarRight } from '@/components/Menus/SidebarRight'
import { AppSidebarLeft } from './AppSidebarLeft'

import { Toaster } from '@/components//ui/toaster'
import { Header } from '@/components/HeaderFooter'

import logoLight from '../../images/cortex-reply-light.png'
import logoDark from '../../images/cortex-reply-dark.png'

export default function Documentation({ ...args }) {
  return (
    // <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
    <div className='bg-sidebar'>
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} {...args.header} className='bg-sidebar' wide/>
      <SidebarProvider className="top-24 mb-4 h-full max-h-[calc(100vh-3.5rem)] flex-1 flex-row overflow-y-clip">
        <AppSidebarLeft {...args.sidebarLeft} className="flex-none top-24" />
        <SidebarInset className="grow overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
        {/* <SidebarRight
          {...args.sidebarRight}
          // editorComponent={<GithubControl {...args.github} />}
          className="flex-none top-24"
        /> */}
      </SidebarProvider>
      <Toaster />
    </div>
  )
}
