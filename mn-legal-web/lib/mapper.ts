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

  const content = wpPost.content || '';
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
      role: 'AI Associate',
      roleLink: '/team/zachary-ongeri'
    },
    'mbula nzuki': {
      role: 'Founder & Managing Partner',
      roleLink: '/team/mbula-nzuki'
    },
    'sebie salim': {
      role: 'Chief Operations, Strategy & Growth',
      roleLink: '/team/sebie-salim'
    },
    'mutundu chege': {
      role: 'Litigation Department, Co-Head',
      roleLink: '/team/mutundu-chege'
    },
    'konstantina zariou': {
      role: 'Of Counsel - London',
      roleLink: '/team/konstantina-zariou'
    },
    'husna mohammed': {
      role: 'Senior Associate',
      roleLink: '/team/husna-mohammed'
    },
    'nour sheriff': {
      role: 'Associate',
      roleLink: '/team/nour-sheriff'
    },
    'tyrus muya kamau': {
      role: 'Head of Cybersecurity',
      roleLink: '/team/tyrus-muya-kamau'
    },
    'keziah mwangi': {
      role: 'HRM and Tax Associate',
      roleLink: '/team/keziah-mwangi'
    },
    'nahashon muhari': {
      role: 'Digital Marketing & Communications Lead',
      roleLink: '/team/nahashon-muhari'
    }
  };

  const authorNameLower = authorName.toLowerCase().replace(/\s+a\.\s+/g, ' ').trim();
  const override = authorOverrides[authorNameLower];

  const authorRole = override ? override.role : (authorNode.description ? 'Senior Advocate' : 'Advocate');

  // Standardize mapping to team page if they exist in team database
  let authorRoleLink = override?.roleLink;
  if (!authorRoleLink) {
    const knownSlugs = [
      'mbula-nzuki', 'sebie-salim', 'mutundu-chege', 'konstantina-zariou',
      'husna-mohammed', 'zachary-ongeri', 'nour-sheriff', 'tyrus-muya-kamau',
      'keziah-mwangi', 'nahashon-muhari'
    ];
    const computedSlug = authorNameLower.replace(/\s+/g, '-');
    if (knownSlugs.includes(computedSlug)) {
      authorRoleLink = `/team/${computedSlug}`;
    }
  }

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
    content: wpPost.content || '',
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
