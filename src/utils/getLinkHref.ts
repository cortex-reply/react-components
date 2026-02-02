import type { Page } from '@/payload-types'

/**
 * Constructs a link href from either a direct URL or a reference structure
 * @param link - Link object with optional url and reference
 * @returns The constructed href string or '#'
 */
export function getLinkHref(link?: {
  url?: string | null
  reference?: {
    relationTo?: string
    value?: any
  } | null
}): string {
  if (!link) return '#'

  // If a direct URL exists, use it
  if (link.url) return link.url

  // If reference exists, build URL from relationTo and slug
  if (link.reference?.value) {
    const { relationTo, value } = link.reference
    const slug = (value as Page)?.slug

    if (!slug) return '#'

    // For pages, just use the slug
    if (relationTo === 'pages') {
      return `/${slug}`
    }

    // For other relationTo types, use relationTo/slug format
    return `/${relationTo}/${slug}`
  }

  return '#'
}
