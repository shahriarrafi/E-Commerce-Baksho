import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Baksho Premium',
    short_name: 'Baksho',
    description: 'The art of unboxing premium lifestyle pieces.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#FFF6ED',
    theme_color: '#111827',
    orientation: 'portrait',
    icons: [
      {
        src: '/metadata-logo.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  }
}
