import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'R&G Group',
  title: 'R&G Group',
  description: 'An open-source website built with Payload and Next.js.',
  images: [
    {
      url: 'https://payloadcms.com/images/og-image.jpg',
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
