import type { Metadata } from 'next'
import { prisma } from '@/lib/db'
import ProductLanding from '@/components/product-landing/ProductLanding'
import { PRODUCT_LANDINGS } from '@/lib/product-landings'

export const dynamic = 'force-dynamic'

const content = PRODUCT_LANDINGS.rotas

export const metadata: Metadata = {
  title: `${content.brand} — Planejamento de rotas e entregas`,
  description: content.subheadline,
}

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

  return <ProductLanding content={content} images={images} />
}
