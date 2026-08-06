import { Suspense } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import BlogHero from '@/app/components/BlogHero';
import UIExtras from '@/app/components/UIExtras';
import ArticleCard from '@/app/components/ArticleCard';
import { getAllPosts } from '@/lib/wp';
import { mapWPPostToPost } from '@/lib/mapper';
import Link from 'next/link';
import { Post } from '@/lib/blog';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

import { generateSEO } from '@/lib/seo';

export const metadata = {
  ...generateSEO({
    title: 'Search Legal Insights | MN Advocates LLP',
    description: 'Search our comprehensive archive of legal insights, regulatory briefings, and technology governance analysis.',
    path: '/insights/search',
    noIndex: true, // Do not index internal search results pages to optimize crawl budget
  }),
};

export default async function SearchResultsPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  const wpPosts = await getAllPosts();
  const allPosts: Post[] = wpPosts?.map(mapWPPostToPost) || [];

  const results = allPosts.filter((post: Post) => 
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    post.content?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen">
      <UIExtras />
      <Navbar />

      <BlogHero 
        title={`Results for "${query}"`}
        subtitle={`${results.length} article${results.length !== 1 ? 's' : ''} found matching your search.`}
      />

      <section className="py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[var(--mn-burgundy)]/10">
              {results.map((post: Post) => (                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center max-w-[600px] mx-auto">
              <div className="w-20 h-20 bg-[var(--mn-cream)] flex items-center justify-center mx-auto mb-8">
                 <span className="text-4xl text-[var(--heading-primary)]/20 font-display italic">§</span>
              </div>
              <h2 className="text-3xl font-display font-semibold text-[var(--heading-primary)] mb-4 border-none p-0">No articles found</h2>
              <p className="text-[var(--text-secondary)] mb-10">Try searching for broader terms like "Corporate Law", "Property", or "Litigation".</p>
              <Link 
                href="/insights" 
                className="bg-[var(--mn-burgundy)] text-white text-[11px] font-bold uppercase tracking-widest px-10 py-4 hover:bg-[var(--mn-burgundy-dark)] transition-all"
              >
                Back to Insights
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
