/**
 * scripts/wp-manager.js
 * Programmatic Headless WordPress Management Client
 * Usage:
 *   node scripts/wp-manager.js --action publish --title "Title" --content "HTML" --excerpt "Excerpt"
 *   node scripts/wp-manager.js --action audit-geo
 */

const fs = require('fs');
const path = require('path');

// =========================================================================
// SECURITY COVENANT: Zero Secrets Hardcoded
// Environment variables are dynamically loaded from local .env.local
// .env.local is listed in .gitignore and is never committed to Git.
// =========================================================================

/**
 * Parses and loads environment variables from .env.local (zero-dependency dotenv)
 */
function loadEnv() {
  const envLocalPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envLocalPath)) {
    try {
      const envConfig = fs.readFileSync(envLocalPath, 'utf8');
      envConfig.split(/\r?\n/).forEach(line => {
        const trimmed = line.trim();
        // Ignore comments and empty lines
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const parts = trimmed.split('=');
          const key = parts[0].trim();
          let val = parts.slice(1).join('=').trim();
          
          // Strip surrounding quotes if present
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.substring(1, val.length - 1);
          }
          
          process.env[key] = val;
        }
      });
    } catch (err) {
      console.warn('⚠️ [Warning] Could not parse .env.local file:', err.message);
    }
  }
}

// Execute environmental loading
loadEnv();

const WP_URL = process.env.WORDPRESS_REST_URL || 'https://wp.mnlegal.net/wp-json/wp/v2';
const WP_USER = process.env.WP_USERNAME;
const WP_PASS = process.env.WP_APPLICATION_PASSWORD;

/**
 * Validate credentials safely
 */
function verifyCredentials() {
  if (!WP_USER || !WP_PASS) {
    console.error(`
❌ [Security Error] Missing WordPress authentication credentials!
To execute commands programmatically, please add the following keys to your local .env.local file:

  WP_USERNAME="your_wordpress_username"
  WP_APPLICATION_PASSWORD="xxxx xxxx xxxx xxxx xxxx xxxx"
  WORDPRESS_REST_URL="https://wp.mnlegal.net/wp-json/wp/v2"

*NOTE: Do NOT use your primary WordPress master login password. Generate a 24-character Application Password in your WordPress profile settings instead. This can be instantly revoked at any time.
    `);
    process.exit(1);
  }
}

// Generate base64 Authorization header for Application Password authentication
const getAuthHeaders = () => {
  verifyCredentials();
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`${WP_USER}:${WP_PASS}`).toString('base64')
  };
};

/**
 * Programmatically publish an article as a Draft or Live post
 */
async function publishPost({ title, content, excerpt, status = 'draft', categories = [], tags = [] }) {
  const headers = getAuthHeaders();
  console.log(`🚀 Programmatically publishing: "${title}" as status "${status}"...`);
  
  try {
    const response = await fetch(`${WP_URL}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        title,
        content,
        excerpt,
        status,
        categories,
        tags
      })
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`✅ Success! Post programmatically created. ID: ${data.id}. Link: ${data.link}`);
      return data;
    } else {
      console.error('❌ Failed to publish post:', data);
    }
  } catch (error) {
    console.error('❌ Network error during publish:', error);
  }
}

/**
 * Audit existing posts for GEO Executive Summaries and auto-correct them in WordPress
 */
async function auditAndFixGEOSummaries() {
  const headers = getAuthHeaders();
  console.log('🔍 Initiating programmatic GEO/SEO compliance audit...');
  
  try {
    // Fetch the 20 most recent published posts from WordPress REST API
    const response = await fetch(`${WP_URL}/posts?per_page=20&status=publish`, { headers });
    const posts = await response.json();
    
    if (!response.ok) {
      console.error('❌ Failed to retrieve posts for audit:', posts);
      return;
    }

    console.log(`📊 Retrieved ${posts.length} posts for audit.`);

    for (const post of posts) {
      const excerpt = post.excerpt?.rendered || '';
      
      // Clean HTML tags and retrieve plain text
      const cleanExcerpt = excerpt.replace(/<[^>]*>?/gm, '').trim();
      const wordCount = cleanExcerpt.split(/\s+/).filter(Boolean).length;
      
      console.log(`\n📝 Auditing: "${post.title.rendered}"`);
      console.log(`   └ Current Summary Word Count: ${wordCount}`);

      // GEO target criteria: summary should be concise (40-60 words)
      const isGEOCompliant = wordCount >= 40 && wordCount <= 60;

      if (!isGEOCompliant) {
        console.log(`   ⚠️ Non-compliant summary detected! Generating fresh GEO executive summary...`);
        
        // Clean the entire article body to compile sentences
        const cleanContent = post.content.rendered
          .replace(/<[^>]*>?/gm, ' ')
          .replace(/\s+/g, ' ')
          .trim();
          
        const sentences = cleanContent.split(/[.!?]+/);
        
        let newSummary = '';
        let wordAccumulator = 0;
        
        for (const sentence of sentences) {
          const trimmedSentence = sentence.trim();
          if (!trimmedSentence) continue;
          
          const words = trimmedSentence.split(' ');
          if (wordAccumulator + words.length <= 55) {
            newSummary += trimmedSentence + '. ';
            wordAccumulator += words.length;
          } else {
            break;
          }
        }
        
        newSummary = newSummary.trim();
        const finalWordCount = newSummary.split(/\s+/).filter(Boolean).length;
        
        if (finalWordCount >= 30) {
          console.log(`   ✅ Constructed compliant 40-60 word abstract (${finalWordCount} words).`);
          console.log(`   └ Abstract: "${newSummary}"`);
          console.log(`   🚀 Writing update back to WordPress programmatically...`);
          
          // Programmatically update the post excerpt on WordPress via REST API
          const updateResponse = await fetch(`${WP_URL}/posts/${post.id}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
              excerpt: newSummary
            })
          });

          if (updateResponse.ok) {
            console.log(`   🎉 Successfully updated Post ID ${post.id} with the GEO summary.`);
          } else {
            const err = await updateResponse.json();
            console.error(`   ❌ Failed to update post ID ${post.id}:`, err);
          }
        } else {
          console.log(`   ❌ Could not extract a sufficient high-quality summary from post content body.`);
        }
      } else {
        console.log(`   ✅ Compliant! Excerpt word count matches GEO threshold.`);
      }
    }
  } catch (error) {
    console.error('❌ Error during GEO audit:', error);
  }
}

// Parse Command Line Parameters
const args = process.argv.slice(2);
const actionArg = args.indexOf('--action');
const action = actionArg !== -1 ? args[actionArg + 1] : null;

if (action === 'publish') {
  const titleArg = args.indexOf('--title');
  const contentArg = args.indexOf('--content');
  const title = titleArg !== -1 ? args[titleArg + 1] : 'Automated Insight Draft';
  const content = contentArg !== -1 ? args[contentArg + 1] : '<p>Automated programmatic content body.</p>';
  
  publishPost({ title, content, status: 'draft' });
} else if (action === 'audit-geo') {
  auditAndFixGEOSummaries();
} else {
  console.log(`
ℹ️  [MN Legal Automated WP Manager]

  To execute commands programmatically, run:
  
  📊 Run GEO compliance audit and auto-update missing summaries:
    node scripts/wp-manager.js --action audit-geo
    
  ✍️ Programmatically publish a new draft article:
    node scripts/wp-manager.js --action publish --title "Title" --content "<p>Body HTML</p>"
  `);
}
