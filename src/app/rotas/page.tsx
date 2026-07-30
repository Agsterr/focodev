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

const content = PRODUCT_LANDINGS.rotas

export const metadata: Metadata = buildMetadata({
  title: `${content.brand} — Planejamento de rotas e entregas`,
  description: content.subheadline,
  path: '/rotas',
  image: content.coverImage,
  keywords: [
    'app de rotas',
    'planejamento de entregas',
    'roteirização',
    'app para entregadores',
    'gestão de rotas',
    'App Rotas',
    'FocoDev',
  ],
})

export default async function RotasPage() {
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
            path: '/rotas',
            image: content.coverImage,
            applicationCategory: 'BusinessApplication',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: content.brand, path: '/rotas' },
          ]),
        ]}
      />
      <ProductLanding content={content} images={images} />
    </>
  )
}
