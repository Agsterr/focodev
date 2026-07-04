import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FocoDev Sistemas',
    short_name: 'FocoDev',
    description: 'Soluções digitais modernas e seguras para o seu negócio',
    start_url: '/',
    display: 'standalone',
    background_color: '#f0f9ff',
    theme_color: '#0ea5e9',
    orientation: 'any',
    lang: 'pt-BR',
    icons: [
      {
        src: '/portfolio/default.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
