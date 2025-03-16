'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Slider from 'react-slick'
import 'aos/dist/aos.css'
import 'pagedjs'
import Image from 'next/image'

import { Container } from '../components'

export const OurClients: React.FC<{
  clients?: { name: string; logo: string }[]
}> = (props) => {
  const { clients = [] } = props

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <></>,
    prevArrow: <></>,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <AnimatePresence>
      {clients && clients?.length > 0 && (
        <Container className="w-full pt-16 pb-20 intersect-once intersect:animate-flip-up opacity-0 intersect:opacity-100 intersect:animate-duration-500">
          <h2 className="text-3xl md:text-5xl text-primary mb-16 text-center w-full">
            Our Clients
          </h2>
          <Slider {...settings}>
            {clients?.map(({ name, logo }) => (
              <div key={`client-${name}`} className="flex justify-center items-center w-full ">
                <Image
                  src={logo}
                  alt={name}
                  className="!h-[80px] object-contain w-auto max-w-[150px] m-auto"
                />
              </div>
            ))}
          </Slider>
        </Container>
      )}
    </AnimatePresence>
  )
}
