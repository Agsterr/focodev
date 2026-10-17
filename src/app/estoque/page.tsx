import type { Metadata } from 'next'
import { getProjectBySlug } from '@/lib/public-data'
import ProductLanding from '@/components/product-landing/ProductLanding'
import JsonLd from '@/components/JsonLd'
import { PRODUCT_LANDINGS } from '@/lib/product-landings'
import {
  breadcrumbJsonLd,
  buildMetadata,
  softwareApplicationJsonLd,
} from '@/lib/seo'

export const dynamic = 'force-dynamic'

const content = PRODUCT_LANDINGS.estoque

export const metadata: Metadata = buildMetadata({
  title: `${content.brand} — Controle de estoque e vendas online`,
  description: content.subheadline,
  path: '/estoque',
  image: content.coverImage,
  keywords: [
    'sistema de estoque',
    'controle de estoque online',
    'gerenciamento de estoque',
    'ERP para loja',
    'sistema de vendas e compras',
    'inventário',
    'FocoDev',
  ],
})

export default async function EstoquePage() {
  let images: { id: string; url: string; alt: string | null }[] = []
  try {
    const project = await getProjectBySlug(content.projectSlug)
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
            path: '/estoque',
            image: content.coverImage,
            applicationCategory: 'BusinessApplication',
          }),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: content.brand, path: '/estoque' },
          ]),
        ]}
      />
      <ProductLanding content={content} images={images} />
    </>
  )
}
