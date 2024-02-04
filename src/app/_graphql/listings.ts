import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const LISTINGS = `
  query Listings {
    Listings(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const LISTING = `
  query Listing($slug: String, $draft: Boolean) {
    Listings(where: { slug: { equals: $slug }}, limit: 1, draft: $draft) {
      docs {
        id
        title
        categories {
          title
        }
        createdAt
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        relatedListings {
          id
          slug
          title
          ${META}
        }
        ${META}
      }
    }
  }
`
