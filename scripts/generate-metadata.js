const fs = require('fs');
const path = require('path');

// Configuration
const API_URL = 'https://blogform.netlify.app/api/content.json';
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ailodi.xyz';
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'AI Lodi';
const SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'AI Lodi is your ultimate guide to modern technology, AI breakthroughs, programming trends, and future science.';

// Fetch with retry mechanism and explicit cache control
async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      // Force fresh data by bypassing any cache with explicit headers
      const response = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log(`✅ BUILD: Successfully fetched fresh data from API (attempt ${i + 1})`);
      return response;
    } catch (error) {
      console.warn(`⚠️ BUILD: Fetch attempt ${i + 1} failed:`, error.message);
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
}

// Generate sitemap.xml
function generateSitemap(posts) {
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/categories/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/privacy-policy/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-service/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer/`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Blog post URLs
  const blogPosts = posts.map((post) => {
    const postDate = new Date(post.updatedAt);
    const now = new Date();
    const daysSinceUpdate = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24));
    
    let changeFrequency = 'monthly';
    if (daysSinceUpdate < 7) changeFrequency = 'daily';
    else if (daysSinceUpdate < 30) changeFrequency = 'weekly';
    else if (daysSinceUpdate < 365) changeFrequency = 'monthly';
    else changeFrequency = 'yearly';

    return {
      url: `${BASE_URL}/post/${post.slug}/`,
      lastModified: postDate,
      changeFrequency,
      priority: 0.9,
    };
  });

  // Category pages
  const categoriesArray = posts.flatMap(post => post.categories);
  const categories = Array.from(new Set(categoriesArray));
  const categoryPages = categories.map((category) => ({
    url: `${BASE_URL}/categories/?filter=${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const allPages = [...staticPages, ...blogPosts, ...categoryPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

// Generate RSS feed
function generateRSSFeed(posts) {
  const latestPosts = posts
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 20);

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${SITE_NAME} - Your Global Tech Insights & AI Innovation Hub</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${BASE_URL}</link>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-US</language>
    <managingEditor>hello@ailodi.xyz (AI Lodi Team)</managingEditor>
    <webMaster>hello@ailodi.xyz (AI Lodi Team)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <category>Technology</category>
    <category>Artificial Intelligence</category>
    <category>Programming</category>
    <category>Innovation</category>
    <ttl>60</ttl>
    <image>
      <url>${BASE_URL}/logo.png</url>
      <title>${SITE_NAME}</title>
      <link>${BASE_URL}</link>
      <width>512</width>
      <height>512</height>
    </image>
    ${latestPosts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.metaDescription}]]></description>
      <content:encoded><![CDATA[${post.content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')}]]></content:encoded>
      <link>${BASE_URL}/post/${post.slug}/</link>
      <guid isPermaLink="true">${BASE_URL}/post/${post.slug}/</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <dc:creator><![CDATA[${post.author}]]></dc:creator>
      ${post.categories.map(category => `<category><![CDATA[${category}]]></category>`).join('')}
      ${post.featuredImageUrl ? `<enclosure url="${post.featuredImageUrl}" type="image/jpeg"/>` : ''}
    </item>`).join('')}
  </channel>
</rss>`;

  return rssXml;
}

// Main function
async function generateMetadata() {
  try {
    console.log('🔄 BUILD: Fetching fresh content from API with explicit cache bypass...');
    const response = await fetchWithRetry(API_URL);
    const data = await response.json();
    const publishedPosts = data.filter(post => post.status === 'published');
    
    console.log(`📚 BUILD: Found ${publishedPosts.length} published posts`);
    console.log(`📝 BUILD: Latest posts:`, publishedPosts.slice(0, 3).map(p => p.title));

    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Generate and write sitemap
    console.log('🗺️ BUILD: Generating sitemap.xml with fresh content...');
    const sitemap = generateSitemap(publishedPosts);
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
    console.log('✅ BUILD: sitemap.xml generated successfully');

    // Generate and write RSS feed
    console.log('📡 BUILD: Generating feed.xml with fresh content...');
    const rss = generateRSSFeed(publishedPosts);
    fs.writeFileSync(path.join(publicDir, 'feed.xml'), rss, 'utf8');
    console.log('✅ BUILD: feed.xml generated successfully');

    console.log('🎉 BUILD: All metadata files generated successfully with fresh content!');
  } catch (error) {
    console.error('❌ BUILD: Error generating metadata:', error);
    process.exit(1);
  }
}

// Run the script
generateMetadata();