import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import UIExtras from '@/app/components/UIExtras';
import ArticleCard from '@/app/components/ArticleCard';
import TOC from '@/app/components/TOC';
import ShareButtons from '@/app/components/ShareButtons';
import ArticleCTA from '@/app/components/ArticleCTA';
import GEOSummary from '@/app/components/GEOSummary';
import { getPostBySlug, getAllPosts } from '@/lib/wp';
import { mapWPPostToPost } from '@/lib/mapper';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({ slug: post.slug }));
}

import { generateSEO } from '@/lib/seo';

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const wpPost = await getPostBySlug(slug);

  if (!wpPost) return { title: 'Article Not Found' };

  const post = mapWPPostToPost(wpPost);
  const imageUrl = wpPost.featuredImage?.node?.sourceUrl || '/og-image.jpg';
  const excerpt = post.excerpt?.substring(0, 160) || post.title;

  return generateSEO({
    title: `${post.title} | MN Advocates LLP`,
    description: excerpt,
    path: `/insights/${slug}`,
    ogType: 'article',
    ogImage: imageUrl,
  });
}

export default async function SingleArticle({ params }: PageProps) {
  const { slug } = await params;
  const wpPost = await getPostBySlug(slug);
  
  if (!wpPost) {
    notFound();
  }

  const post = mapWPPostToPost(wpPost);
  
  // Get related posts (same category if possible)
  const allWpPosts = await getAllPosts();
  const relatedPosts = allWpPosts
    .filter((p: any) => p.slug !== slug)
    .sort((a: any, b: any) => {
      const aCat = a.categories?.nodes[0]?.name === post.category ? 1 : 0;
      const bCat = b.categories?.nodes[0]?.name === post.category ? 1 : 0;
      return bCat - aCat;
    })
    .slice(0, 3)
    .map((p: any) => mapWPPostToPost(p));

  return (
    <main className="relative bg-[var(--bg-primary)]">
      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": post.title,
              "description": post.excerpt || post.title,
              "image": post.image,
              "datePublished": wpPost.date,
              "dateModified": wpPost.date,
              "author": {
                "@type": "Person",
                "name": post.author.name,
                "worksFor": { "@id": "https://mnlegal.net/#organization" }
              },
              "publisher": {
                "@type": "Organization",
                "name": "MN Legal",
                "logo": { "@type": "ImageObject", "url": "https://mnlegal.net/og-image.jpg" }
              },
              "mainEntityOfPage": { "@type": "WebPage", "@id": `https://mnlegal.net/insights/${post.slug}` }
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://mnlegal.net" },
                { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://mnlegal.net/insights" },
                { "@type": "ListItem", "position": 3, "name": post.category, "item": `https://mnlegal.net/insights?category=${post.category.toLowerCase().replace(/\s+/g, '-')}` },
                { "@type": "ListItem", "position": 4, "name": post.title, "item": `https://mnlegal.net/insights/${post.slug}` }
              ]
            }
          ])
        }}
      />
      <UIExtras />
      <Navbar />

      {/* Article Hero */}
      <section className="relative pt-32 pb-48 px-6 md:px-16 bg-[linear-gradient(135deg,#1a2744_0%,#2d3e5f_50%,#1a2744_100%)] overflow-hidden">
        {/* Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#8b1c3f 1px, transparent 1px), linear-gradient(90deg, #8b1c3f 1px, transparent 1px)', backgroundSize: '80px 80px' }}></div>
        
        {/* Decorative Circles */}
        <div className="absolute top-[-10%] right-[-5%] w-[280px] h-[280px] rounded-full border border-[rgba(139,28,63,0.2)] pointer-events-none animate-[spin_40s_linear_infinite]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[200px] h-[200px] rounded-full border border-[rgba(139,28,63,0.15)] pointer-events-none animate-[spin_50s_linear_infinite_reverse]"></div>

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <nav className="flex items-center justify-center gap-2 text-[11px] text-white/45 uppercase tracking-[1px] mb-8 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <span>/</span>
            <span className="text-white/80">{post.category}</span>
          </nav>

          <div className="bg-[var(--mn-burgundy)] text-white text-[10px] font-bold uppercase tracking-[2px] px-5 py-2 inline-block mb-10">
            {post.category}
          </div>

          <h1 className="font-display italic text-[clamp(32px,5vw,56px)] text-white leading-[1.15] mb-10 font-medium">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/70">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--mn-navy)]">
                <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
              </div>
              <div className="text-left">
                <span className="block text-[14px] font-bold text-white leading-none mb-1">{post.author.name}</span>
                {post.author.roleLink ? (
                  <a href={post.author.roleLink} target="_blank" rel="noopener noreferrer" className="block text-[11px] uppercase tracking-wider text-white/55 hover:text-white transition-colors">
                    {post.author.role}
                  </a>
                ) : (
                  <span className="block text-[11px] uppercase tracking-wider text-white/55">{post.author.role}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white/45 uppercase tracking-widest border-l border-white/20 pl-8 font-medium">
               {post.date}
            </div>
            <div className="flex items-center gap-2 text-[12px] text-white/45 uppercase tracking-widest border-l border-white/20 pl-8 font-medium">
               {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Float */}
      <section className="relative z-20 px-6 md:px-16 -mt-32">
        <div className="max-w-[980px] mx-auto aspect-[16/9] relative shadow-[0_32px_80px_rgba(26,39,68,0.35)] overflow-hidden">
          <Image src={post.image} alt={post.title} fill className="object-cover" priority />
        </div>
      </section>

      {/* Article Content Area */}
      <section className="py-24 px-6 md:px-16 bg-[var(--bg-primary)]">
        <div className="max-w-[980px] mx-auto flex flex-col lg:flex-row gap-20">
          {/* Main Body */}
          <div className="w-full lg:w-[740px] flex-shrink-0">
            {/* GEO Optimized AI Summary Block */}
            <GEOSummary excerpt={post.excerpt} />

            <div className="article-body prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }}>
            </div>

            {/* Post Tags */}
            <div className="mt-16 pt-10 border-t border-[var(--mn-cream-dark)] flex flex-wrap items-center gap-4">
               <span className="text-[12px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mr-2">Topics:</span>
               {post.tags?.map((tag: string) => (
                 <span key={tag} className="text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-wider px-4 py-2 bg-[var(--bg-primary)] border border-[var(--mn-gray-light)] hover:border-[var(--mn-burgundy)] hover:text-[var(--heading-primary)] hover:bg-[var(--mn-cream)] transition-all cursor-pointer">
                   {tag}
                 </span>
               ))}
            </div>

            {/* Social Share Row Prominent */}
            <div className="mt-12 bg-[var(--mn-cream)] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
               <span className="font-display italic text-xl text-[var(--heading-primary)]">Found this article useful? Share it.</span>
               <ShareButtons url={`/insights/${slug}`} title={post.title} variant="row" />
            </div>

            {/* Author Bio Box */}
            <div className="mt-12 bg-[var(--bg-primary)] border border-[var(--mn-cream-dark)] border-l-4 border-l-[var(--mn-burgundy)] p-10 flex flex-col md:flex-row gap-8 items-start">
               <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 bg-[var(--mn-navy)]">
                 <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
               </div>
               <div>
                  <span className="block text-[22px] font-display text-[var(--heading-primary)] font-semibold mb-1">{post.author.name}</span>
                  {post.author.roleLink ? (
                    <a href={post.author.roleLink} target="_blank" rel="noopener noreferrer" className="block text-[11px] uppercase tracking-[2px] text-[var(--mn-burgundy)] font-bold mb-4 hover:opacity-70 transition-opacity">
                      {post.author.role}
                    </a>
                  ) : (
                    <span className="block text-[11px] uppercase tracking-[2px] text-[var(--mn-burgundy)] font-bold mb-4">{post.author.role}</span>
                  )}
                  <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6">{post.author.bio}</p>
                  <Link href={`/insights?author=${post.author.name}`} className="inline-flex items-center text-[12px] font-bold text-[var(--mn-burgundy)] uppercase tracking-[2px] hover:opacity-70 transition-opacity">
                    View all articles by {post.author.name} →
                  </Link>
               </div>
            </div>

            {/* CTA Box */}
            <ArticleCTA category={post.category} title={post.title} />
          </div>

          {/* Sticky Sidebar */}
          <aside className="w-full lg:w-[240px] flex-shrink-0">
             <div className="sticky top-24 space-y-12">
                {/* Table of Contents */}
                <TOC />

                {/* Author Card Mini */}
                <div className="border border-[var(--mn-cream-dark)] p-8 bg-[var(--bg-primary)]">
                   <div className="relative w-14 h-14 rounded-full overflow-hidden bg-[var(--mn-navy)] mb-4">
                      <Image src={post.author.avatar} alt={post.author.name} fill className="object-cover" />
                   </div>
                   <span className="block text-[16px] font-display font-semibold text-[var(--heading-primary)] mb-1">{post.author.name}</span>
                   {post.author.roleLink ? (
                     <a href={post.author.roleLink} target="_blank" rel="noopener noreferrer" className="block text-[10px] uppercase tracking-[2px] text-[var(--mn-burgundy)] font-bold mb-3 hover:opacity-70 transition-opacity">
                       {post.author.role}
                     </a>
                   ) : (
                     <span className="block text-[10px] uppercase tracking-[2px] text-[var(--mn-burgundy)] font-bold mb-3">{post.author.role}</span>
                   )}
                   <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-3">{post.author.bio}</p>
                </div>

                {/* Share Sidebar */}
                <div>
                   <span className="block text-[10px] uppercase tracking-[2px] text-gray-400 font-bold mb-6">Share Article</span>
                   <ShareButtons url={`/insights/${slug}`} title={post.title} variant="sidebar" />
                </div>

                {/* Related Sidebar */}
                <div className="space-y-6">
                   <span className="block text-[10px] uppercase tracking-[2px] text-gray-400 font-bold mb-4">Related Analysis</span>
                   {relatedPosts.slice(0, 2).map((p: any) => (
                     <Link key={p.id} href={`/insights/${p.slug}`} className="group flex gap-4">
                        <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden bg-gray-100">
                           <Image src={p.image} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div>
                           <h4 className="text-[13px] font-display font-semibold text-[var(--heading-primary)] leading-tight group-hover:text-[var(--mn-burgundy)] transition-colors line-clamp-2">
                              {p.title}
                           </h4>
                           <span className="text-[11px] text-gray-400 uppercase tracking-wider font-bold mt-1 block">{p.date}</span>
                        </div>
                     </Link>
                   ))}
                </div>
             </div>
          </aside>
        </div>
      </section>

      {/* More from MN Legal Section */}
      <section className="bg-[var(--mn-cream)] py-24 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16">
            <h2 className="text-[32px] font-display text-[var(--heading-primary)] border-none p-0">
              More from <span className="border-b-2 border-[var(--mn-burgundy)] pb-2">MN Legal</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
             {relatedPosts.map((p: any) => (
               <ArticleCard key={p.id} post={p} />
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
