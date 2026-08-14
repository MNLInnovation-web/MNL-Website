import { MetadataRoute } from 'next'
import { practiceAreas } from '@/lib/practice-areas'
import { teamMembers } from '@/lib/team'
import { getAllPosts } from '@/lib/wp'
import { SITE_URL } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Shared with canonical generation so the sitemap can never drift to a
  // different host than the one in <link rel="canonical">.
  const baseUrl = SITE_URL

  const practiceAreaEntries: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${baseUrl}/practice-areas/${area.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  const teamEntries: MetadataRoute.Sitemap = teamMembers.map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
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
  } catch (err) {
    // WordPress API unavailable at build time — articles omitted.
    // Logged loudly: a silent failure here drops every article from the
    // sitemap without any other visible symptom.
    console.error('[sitemap] WordPress fetch failed, articles omitted:', err)
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
    ...teamEntries,
    ...articleEntries,
  ]
}
