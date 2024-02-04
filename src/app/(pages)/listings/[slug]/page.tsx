import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { Listing } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { RelatedPosts } from '../../../_blocks/RelatedPosts'
import { Blocks } from '../../../_components/Blocks'
import { ListingHero } from '../../../_heros/ListingHero'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../../../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Listing({ params: { slug } }) {
  const { isEnabled: isDraftMode } = draftMode()

  let listing: Listing | null = null

  try {
    listing = await fetchDoc<Listing>({
      collection: 'listings',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error) // eslint-disable-line no-console
  }

  if (!listing) {
    notFound()
  }

  const { layout, relatedListings } = listing

  return (
    <React.Fragment>
      <ListingHero listing={listing} />
      <Blocks
        blocks={[
          ...layout,
          {
            blockType: 'relatedPosts',
            blockName: 'Related Listings',
            relationTo: 'listings',
            introContent: [
              {
                type: 'h4',
                children: [
                  {
                    text: 'Related listings',
                  },
                ],
              },
              {
                type: 'p',
                children: [
                  {
                    text: 'The listings displayed here are individually selected for this page. Admins can select any number of related listings to display here and the layout will adjust accordingly. Alternatively, you could swap this out for the "Archive" block to automatically populate listings by category complete with pagination. To manage related listings, ',
                  },
                  {
                    type: 'link',
                    url: `/admin/collections/listings/${listing.id}`,
                    children: [
                      {
                        text: 'navigate to the admin dashboard',
                      },
                    ],
                  },
                  {
                    text: '.',
                  },
                ],
              },
            ],
            docs: relatedListings,
          },
        ]}
      />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const listings = await fetchDocs<Listing>('listings')
    return listings?.map(({ slug }) => slug)
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let listing: Listing | null = null

  try {
    listing = await fetchDoc<Listing>({
      collection: 'listings',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {}

  return generateMeta({ doc: listing })
}
