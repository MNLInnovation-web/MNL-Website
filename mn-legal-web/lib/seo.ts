import type { Metadata } from 'next';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mnlegal.net';

/**
 * Normalizes a URL path to prevent duplicate content:
 * - Appends the absolute base SITE_URL.
 * - Enforces lowercase path.
 * - Strips any trailing slashes, except for the root home page.
 */
export function getCanonicalUrl(path: string): string {
  if (!path || path === '/' || path === '') {
    return SITE_URL;
  }

  // Ensure absolute path starts with a slash
  let cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Remove trailing slashes
  while (cleanPath.endsWith('/') && cleanPath !== '/') {
    cleanPath = cleanPath.slice(0, -1);
  }

  return `${SITE_URL}${cleanPath.toLowerCase()}`;
}

interface MetaInput {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  noIndex?: boolean;
}

/**
 * Generates unified, standardized Next.js Metadata.
 */
export function generateSEO({
  title,
  description,
  path,
  ogType = 'website',
  ogImage = '/og-image.jpg',
  noIndex = false,
}: MetaInput): Metadata {
  const canonicalUrl = getCanonicalUrl(path);

  const baseMeta: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'MN Legal',
      locale: 'en_KE',
      type: ogType,
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@mnlegaladvocate',
      images: [ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`],
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
  };

  return baseMeta;
}
