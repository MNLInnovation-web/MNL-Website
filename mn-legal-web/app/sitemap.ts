import { MetadataRoute } from 'next'
import { practiceAreas } from '@/lib/practice-areas'
import { getAllPosts } from '@/lib/wp'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mnlegal.net'

  const practiceAreaEntries: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    articleEntries = posts.map((post: any) => ({
      url: `${baseUrl}/insights/${post.slug}`,
      lastModified: new Date(post.date || Date.now()),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  } catch {
    // WordPress API unavailable at build time — articles omitted
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/insights`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    ...practiceAreaEntries,
    ...articleEntries,
  ]
}
