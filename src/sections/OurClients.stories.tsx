import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { OurClients } from './OurClients'
import UK_Parliament_logo from '../images/our-clinets/UK_Parliament_logo.png'
import Cheque_and_Credit_logo from '../images/our-clinets/Cheque_and_Credit_logo.png'
import VocaLink_logo from '../images/our-clinets/UK_Parliament_logo.png'
import HSBC_logo from '../images/our-clinets/HSBC_Logo.png'

const clients = [
  { name: 'HSBC', logo: HSBC_logo },
  { name: 'UK Parliament', logo: UK_Parliament_logo },
  {
    name: 'Cheque & Credit Clearing Company',
    logo: Cheque_and_Credit_logo,
  },
  { name: 'VocaLink', logo: VocaLink_logo },
  { name: 'HSBC', logo: HSBC_logo },
  { name: 'UK Parliament', logo: UK_Parliament_logo },
  {
    name: 'Cheque & Credit Clearing Company',
    logo: Cheque_and_Credit_logo,
  },
  { name: 'VocaLink', logo: VocaLink_logo },
  { name: 'HSBC', logo: HSBC_logo },
  { name: 'UK Parliament', logo: UK_Parliament_logo },
  {
    name: 'Cheque & Credit Clearing Company',
    logo: Cheque_and_Credit_logo,
  },
  { name: 'VocaLink', logo: VocaLink_logo },
]

const meta: Meta<typeof OurClients> = {
  title: 'Reusable Blocks/OurClients',
  component: OurClients,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {},
}

export default meta

type Story = StoryObj<typeof OurClients>

export const Default: Story = {
  render: (args) => <OurClients clients={clients} />,
}
