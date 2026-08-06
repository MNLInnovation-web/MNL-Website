import { Post } from './blog';

export function mapWPPostToPost(wpPost: any): Post {
  if (!wpPost) {
    // Return a dummy post or throw error, but better to return a safe object to avoid crashing the map
    return {
      id: 'error',
      slug: 'error',
      title: 'Error loading post',
      excerpt: '',
      date: '',
      category: 'Uncategorized',
      author: { name: 'Unknown', role: 'Unknown', avatar: '' },
      readTime: '0 min',
      image: '',
      tags: []
    };
  }

  // The page hero already renders one <h1> from the post title, so any <h1>
  // inside the WP body content would create a second, duplicate H1.
  const content = (wpPost.content || '').replace(/<h1([\s>])/gi, '<h2$1').replace(/<\/h1>/gi, '</h2>');
  const wordCount = content.split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / 220);
  const readTime = `${readTimeMinutes} min read`;

  // Safely format date
  let formattedDate = '';
  try {
    if (wpPost.date) {
      const d = new Date(wpPost.date);
      // Check for valid date
      if (!isNaN(d.getTime())) {
        formattedDate = d.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
      } else {
          formattedDate = wpPost.date;
      }
    }
  } catch (e) {
    formattedDate = '';
  }

  const categoryName = wpPost.categories?.nodes?.[0]?.name || 'Insights';
  
  // Extract author info safely
  const authorNode = wpPost.author?.node || {};
  const authorName = authorNode.name || 'MN Legal';

  const authorOverrides: Record<string, { role: string; roleLink?: string }> = {
    'jonathan baumgart': {
      role: 'CEO of Atomiq Consulting',
      roleLink: 'https://atomiqconsulting.com/'
    },
    'zachary ongeri': {
      role: 'AI Associate'
    }
  };

  const authorNameLower = authorName.toLowerCase();
  const override = authorOverrides[authorNameLower];

  const authorRole = override ? override.role : (authorNode.description ? 'Senior Advocate' : 'Advocate');
  const authorRoleLink = override?.roleLink;

  const authorAvatar = authorNode.avatar?.url || 'https://via.placeholder.com/150';
  const authorBio = authorNode.description || '';

  // Extract image safely
  const featuredImage = wpPost.featuredImage?.node?.sourceUrl || 'https://via.placeholder.com/1200x630';

  // Extract tags safely
  const tags = wpPost.tags?.nodes?.map((t: any) => t.name) || [];

  return {
    id: wpPost.id || Math.random().toString(),
    slug: wpPost.slug || 'untitled',
    title: wpPost.title || 'Untitled Post',
    excerpt: wpPost.excerpt ? wpPost.excerpt.replace(/<[^>]*>?/gm, '') : '', 
    content,
    date: formattedDate,
    category: categoryName,
    author: {
      name: authorName,
      role: authorRole,
      roleLink: authorRoleLink,
      avatar: authorAvatar,
      bio: authorBio
    },
    readTime,
    image: featuredImage,
    featured: wpPost.sticky || false,
    tags: tags
  };
}
