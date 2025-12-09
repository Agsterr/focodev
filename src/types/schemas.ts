import { z } from 'zod'

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  pageSize: z.number().min(1).max(100).default(10),
})

export const serviceSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal('')),
})

export const projectSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
})

export const videoSchema = z.object({
  title: z.string().min(3),
  youtubeUrl: z.string().url().includes('youtube.com').or(z.string().url().includes('youtu.be')),
  thumbnailUrl: z.string().url().optional().or(z.literal('')),
})

export const imageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  projectId: z.string().optional(),
})

export const companyInfoSchema = z.object({
  name: z.string().min(2),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  instagram: z.string().optional(),
  address: z.string().optional(),
  whatsappLink: z.string().url().optional(),
  whatsappNumber: z.string().optional(),
})

export const homeBannerSchema = z.object({
  title: z.string().min(3),
  subtitle: z.string().optional(),
  backgroundImageUrl: z.string().url().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
})

export type ServiceInput = z.infer<typeof serviceSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type VideoInput = z.infer<typeof videoSchema>
export type ImageInput = z.infer<typeof imageSchema>
export type CompanyInfoInput = z.infer<typeof companyInfoSchema>
export type HomeBannerInput = z.infer<typeof homeBannerSchema>
