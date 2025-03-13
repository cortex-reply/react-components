import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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
  ExternalLink,
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

import { Separator } from '@/components//ui/separator'
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

import { SidebarRight } from '@/components//Menus/SidebarRight'
import { SidebarLeft } from '@/components//Menus/SidebarLeft'
import { Header } from '../components/HeaderFooter'
// import GithubControl from '@/components//Editor/GithubControl'
import { Toaster } from '@/components//ui/toaster'
import { LowImpactHero } from '@/components/Heros/LowImpact'
import { MediumImpactHero } from '@/components/Heros/MediumImpact'
import { HighImpactHero } from '@/components/Heros/HighImpact'
import { PostHero } from '@/components/Heros/PostHero'

import logoLight from '../images/cortex-reply-light.png'
import logoDark from '../images/cortex-reply-dark.png'
import { BlogDetail } from '../sections/BlogDetail'
export default function WebsiteSection({ ...args }) {
  return (
    <div>
      <Header isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} />
      {/* <HeaderMobile isMenuOpen={true} logoLight={logoLight} logoDark={logoDark} {...args.header}/> */}

      {/* Hero Section */}

      {/* <main> */}
      <PostHero {...args.hero} />
      <BlogDetail className="!pb-0" {...args.blog} />
      {/* </main> */}
    </div>
  )
}
