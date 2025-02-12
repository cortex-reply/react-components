import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { Printable } from './Printable';
import { HeadingImage } from '../Blocks/HeadingImage';
import Image1 from '../../images/stock1.jpg';

const meta: Meta<typeof Printable> = {
    title: 'Example Pages/Print',
    component: Printable,
    parameters: {
        layout: 'fullscreen',
    },
    argTypes: {
        layout: {
            control: { type: 'radio' },
            options: ['portrait', 'landscape'],
        },
    },
};

export default meta;

type Story = StoryObj<typeof Printable>;

const sampleSections = [
    {
        sectionTitle: 'Introduction',
        blocks: [
            { type: 'heading', content: 'Welcome to Reply Cortex' },
            { type: 'subheading', content: 'Revolutionizing Email Management' },
            { type: 'paragraph', content: 'Reply Cortex is an AI-powered email management tool designed to optimize workflow and enhance efficiency.' },
            { type: 'list', items: [
                'Automate responses and follow-ups',
                'Organize emails intelligently',
                'AI-driven insights and analytics'
            ] },
            { type: 'image', src: Image1, alt: 'Introduction Image' },
            { type: 'quote', content: '"A game-changer in email automation!" - Tech Review' }
        ],
    },
    {
        sectionTitle: 'Features',
        blocks: [
            { type: 'heading', content: 'Key Features' },
            { type: 'subheading', content: 'What Makes Reply Cortex Unique?' },
            { type: 'list', items: [
                'Automated email campaigns',
                'Performance tracking with real-time analytics',
                'AI-driven recommendations for smarter email handling',
                'Seamless integration with major platforms',
                'Customizable templates and workflows'
            ] },
            { type: 'paragraph', content: 'Our AI-backed features are designed to increase efficiency, saving you valuable time while ensuring high-quality email management.' },
            { type: 'image', src: Image1, alt: 'Features Image' },
            { type: 'stat', content: 'Efficiency Boost: Users report a 40% increase in email response time.' }
        ],
    },
    {
        sectionTitle: 'How It Works',
        blocks: [
            { type: 'heading', content: 'Step-by-Step Guide' },
            { type: 'subheading', content: 'Simple Setup, Powerful Results' },
            { type: 'list', items: [
                'Sign up for a free account',
                'Connect your email for seamless automation',
                'Customize your settings and workflows',
                'Start managing emails effortlessly with AI support'
            ] },
            { type: 'image', src: Image1, alt: 'How It Works Image' },
            { type: 'highlight', content: 'Get started in under 5 minutes!' }
        ],
    },
    {
        sectionTitle: 'Benefits',
        blocks: [
            { type: 'heading', content: 'Why Choose Reply Cortex?' },
            { type: 'list', items: [
                'Increase productivity by automating repetitive tasks',
                'Enhance email management with AI-driven insights',
                'Gain valuable analytics for business growth',
                'Seamless multi-platform integration',
                'Secure and reliable communication'
            ] },
            { type: 'image', src: Image1, alt: 'Benefits Image' },
            { type: 'quote', content: '"Saved our team hours every week!" - Alex R., Business Owner' }
        ],
    },
    {
        sectionTitle: 'Pricing',
        blocks: [
            { type: 'heading', content: 'Subscription Plans' },
            { type: 'list', items: [
                'Free Plan: $0/month - Perfect for startups and individuals',
                'Pro Plan: $49/month - Advanced features for growing teams',
                'Enterprise Plan: $99/month - Custom solutions for large businesses'
            ] },
            { type: 'image', src: Image1, alt: 'Pricing Image' },
            { type: 'highlight', content: 'Start with a 14-day free trial - No credit card required!' }
        ],
    },
    {
        sectionTitle: 'Testimonials',
        blocks: [
            { type: 'heading', content: 'What Our Users Say' },
            { type: 'quote', content: '"Reply Cortex has transformed our workflow!" - John Doe' },
            { type: 'quote', content: '"A must-have tool for any business looking to improve efficiency." - Jane Smith' },
            { type: 'quote', content: '"The AI recommendations are spot-on and save us tons of time." - Michael L.' },
            { type: 'image', src: Image1, alt: 'Testimonials Image' },
            { type: 'highlight', content: 'Join 10,000+ happy users worldwide!' }
        ],
    },
    {
        sectionTitle: 'Contact Us',
        blocks: [
            { type: 'heading', content: 'Get in Touch' },
            { type: 'paragraph', content: 'Need help or have questions? Reach out to us anytime!' },
            { type: 'list', items: [
                'Support Email: support@replycortex.com',
                'Follow us on Twitter and LinkedIn',
                'Join our community for tips and updates'
            ] },
            { type: 'image', src: Image1, alt: 'Contact Us Image' }
        ],
    },
];


const titlePage = <HeadingImage title="" image={Image1} />;

export const Default: Story = {
    args: {
        sections: sampleSections,
        layout: 'landscape',
        titlePage,
    },
};

export const Landscape: Story = {
    args: {
        ...Default.args,
        layout: 'landscape',
    },
};


export const Portrait: Story = {
    args: {
        ...Default.args,
        layout: 'portrait',
    },
};