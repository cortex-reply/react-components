import * as React from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { SimpleHeader } from '../components/HeaderFooter'
import { InfoTile } from '../components/Blocks/InfoTile'
import { MOTD } from '../components/Blocks/MOTD'
import { NewsGrid } from '../components/Layouts/NewsGrid'
import { EventCard, type EventCardProps } from '../components/Cards/EventCard'
import { CustomerCard, type CustomerCardProps } from '../components/Cards/CustomerCard'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent } from '@/components/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

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
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components//ui/sidebar'

import { SidebarRight } from '@/components/Menus/SidebarRight'
import { SidebarLeftMulti } from '@/components//Menus/SidebarLeftMulti'

// import GithubControl from '@/components//Editor/GithubControl'
import { Toaster } from '@/components//ui/toaster'

function Intranet2({ ...args }) {
  return (
    <div>
      
      {/* 3 column wrapper */}
      <div className="mx-auto w-full max-w-screen-2xl grow lg:flex xl:px-2">
        {/* Left sidebar & main wrapper */}
        <div className="flex-1 xl:flex">
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:border-b-0 xl:border-r xl:pl-6">
            {/* Left column area */}

            {args.customers.map(
              (customer: CustomerCardProps, index: React.Key | null | undefined) => (
                <div key={index} className="py-2 w-full flex justify-center">
                  <CustomerCard {...customer} />
                </div>
              ),
            )}
          </div>

          <div className="px-4 py-4 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            {/* <h1 className="text-balance text-3xl m-5 font-semibold tracking-tight text-primary sm:text-5xl">
                Propositions
              </h1> */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoTile mainImage="/placeholder/ai.png" title="AI Enablement" color="primary" />
              <InfoTile mainImage="/placeholder/finops.png" title="FinOps" color="primary2" />
              <InfoTile
                mainImage="/placeholder/metahuman.png"
                title="Metahumans"
                color="primary3"
              />
            </div>
            <h1 className="text-balance text-3xl m-5 font-semibold tracking-tight text-primary sm:text-5xl">
              News & Updates
            </h1>
            {/* <NewsGrid /> */}
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-200 px-4 py-4 sm:px-4 lg:w-96 lg:border-l lg:border-t-0 lg:pr-8 xl:pr-6">
          {/* Right column area */}

          <div className="mx-auto max-w-7xl">
            <div className="relative isolate overflow-hidden bg-gradient-to-br from-gray-900 via-brand-one to-brand-two px-2 py-4 text-center shadow-2xl sm:rounded-xl sm:px-2">
              <h2 className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                Ways of working
              </h2>
              <p className="mx-3 mt-4 max-w-xl text-pretty text-lg/8 text-gray-300">
                Guides, Templates and Tools to help you work smarter.
              </p>
              <div className="mt-4 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
              </div>
              {/* <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 w-[64rem] h-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#0069aa" />
              <stop offset={1} stopColor="#17bebb" />
            </radialGradient>
          </defs>
        </svg> */}
            </div>
          </div>
          <div className="mx-auto max-w-7xl flex flex-col items-center">
            {args.events.map((event: EventCardProps, index: React.Key | null | undefined) => (
              <div key={index} className="py-2 w-full flex justify-center">
                <EventCard {...event} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Intranet({ ...args }) {
  const plugin = React.useRef(Autoplay({ delay: 2000, stopOnInteraction: false }))
  return (
    // <div className="flex fixed flex-col w-screen h-screen max-h-screen overflow-auto overscroll-contain">
    <div>
      <SidebarProvider className="fixed top-16 mb-4 h-full max-h-[calc(100vh-3.5rem)] flex-1 flex-row overflow-y-clip">
        <SidebarLeftMulti {...args.sidebarLeft} className="flex-none" />
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
          <MOTD {...args.motd} />
          <div className="mx-4 bg-gradient-to-br from-gray-900 via-brand-one to-brand-two py-4 text-center sm:rounded-xl">
                <h2 className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Ways of working
                </h2>
                <p className="mx-3 mt-4 text-pretty text-lg/8 text-gray-300">
                  Guides, Templates and Tools to help you work smarter.
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get started
                  </a>
                </div>
              </div>
          <Carousel
            plugins={[plugin.current]}
            className="mx-16 h-300px p-4"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={() => plugin.current.play(false)}
          >
            <CarouselContent className="-ml-1">
              {args.customers.map(
                (customer: CustomerCardProps, index: React.Key | null | undefined) => (
                  <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className="p-1">
                      <CustomerCard {...customer} />
                    </div>
                  </CarouselItem>
                ),
              )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
        <Sidebar side="right" variant="inset">
          {/* <SidebarHeader className="p-0 pt-4">
            <SidebarContent>
              <div className="bg-gradient-to-br from-gray-900 via-brand-one to-brand-two py-4 text-center sm:rounded-xl">
                <h2 className="text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  Ways of working
                </h2>
                <p className="mx-3 mt-4 max-w-xl text-pretty text-lg/8 text-gray-300">
                  Guides, Templates and Tools to help you work smarter.
                </p>
                <div className="mt-4 flex items-center justify-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </SidebarContent>
          </SidebarHeader> */}
          <SidebarContent>
            <div className="mx-auto max-w-7xl flex flex-col items-center">
              {args.events.map((event: EventCardProps, index: React.Key | null | undefined) => (
                <div key={index} className="py-2 w-full flex justify-center">
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </SidebarContent>
        </Sidebar>

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
