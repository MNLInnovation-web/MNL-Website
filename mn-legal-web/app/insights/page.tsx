import type { Metadata } from 'next';
import { Suspense } from 'react';

import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Legal Insights & Articles',
  description: 'Thought leadership and legal analysis on Kenyan law, Data Privacy, AI governance, and Corporate Commercial law from MN Advocates LLP.',
  path: '/insights',
});
import Navbar from '../components/Navbar';
import BlogHero from '../components/BlogHero';
import Footer from '../components/Footer';
import UIExtras from '../components/UIExtras';
import InsightsContent from './InsightsContent';
import { getAllPosts } from '@/lib/wp';
import { mapWPPostToPost } from '@/lib/mapper';

export default async function InsightsPage() {
  const wpPosts = await getAllPosts();
  const allPosts = wpPosts?.map(mapWPPostToPost) || [];

  return (
    <main className="relative bg-[var(--bg-primary)] min-h-screen">
      <UIExtras />
      <Navbar />
      
      <BlogHero 
        title="Thought Leadership<br>from MN Advocates LLP"
        subtitle="Analysis, commentary, and practical guidance on Kenyan law and the East African legal landscape - from our senior advocates."
      />
      
      <Suspense fallback={
        <div className="py-20 text-center font-display italic text-2xl">
          Loading Insights...
        </div>
      }>
        <InsightsContent posts={allPosts} />
      </Suspense>

      <Footer />
    </main>
  );
}
