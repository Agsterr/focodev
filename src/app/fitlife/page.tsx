import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import ProductLanding from '@/components/product-landing/ProductLanding'
import JsonLd from '@/components/JsonLd'
import { PRODUCT_LANDINGS } from '@/lib/product-landings'
import {
  breadcrumbJsonLd,
  buildMetadata,
  softwareApplicationJsonLd,
} from '@/lib/seo'

export const dynamic = 'force-dynamic'

const content = PRODUCT_LANDINGS.fitlife

export const metadata: Metadata = buildMetadata({
  title: `${content.brand} — App de academia e treinos`,
  description: content.subheadline,
  path: '/fitlife',
  image: content.coverImage,
  keywords: [
    'app de academia',
    'software para academia',
    'treino musculação',
    'app para personal trainer',
    'Foco Academia',
    'FocoDev',
  ],
})

export default async function FitLifePage() {
  let images: { id: string; url: string; alt: string | null }[] = []
  try {
    const project = await prisma.project.findUnique({
      where: { slug: content.projectSlug },
      include: { images: { orderBy: { createdAt: 'asc' } } },
    })
    images = project?.images || []
  } catch {
    images = []
  }

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationJsonLd({
            name: content.brand,
            description: content.subheadline,
            path: '/fitlife',
            image: content.coverImage,
            applicationCategory: 'HealthApplication',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: content.brand, path: '/fitlife' },
          ]),
        ]}
      />
      <ProductLanding content={content} images={images} />
    </>
  )
}
