import { getAllBlogPosts } from '@/lib/blog';
import { siteConfig } from '@/config/Meta';
import { NextResponse } from 'next/server';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

/**
 * RSS 2.0 Feed endpoint
 * Generates XML feed for all published blog posts
 * Available at /feed.xml
 */
export async function GET() {
  try {
    const blogPosts = getAllBlogPosts();

    // Filter only published posts
    const publishedPosts = blogPosts.filter(
      (post) => post.frontmatter.isPublished,
    );

    // Build RSS channel
    const rssChannel = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <title>${escapeXml(siteConfig.title)}</title>
      <url>${siteConfig.url}/favicon.ico</url>
      <link>${siteConfig.url}</link>
    </image>
${publishedPosts
  .map((post) => {
    const postUrl = `${siteConfig.url}/blog/${post.slug}`;
    const pubDate = new Date(post.frontmatter.date).toUTCString();

    return `    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <description>${escapeXml(post.frontmatter.description)}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.frontmatter.tags[0] || 'blog')}</category>
      <image>
        <url>${siteConfig.url}${post.frontmatter.image}</url>
        <title>${escapeXml(post.frontmatter.title)}</title>
        <link>${postUrl}</link>
      </image>
    </item>`;
  })
  .join('\n')}
  </channel>
</rss>`;

    return new NextResponse(rssChannel, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('RSS feed generation error:', error);

    // Return error RSS feed
    const errorFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Error</title>
    <link>${siteConfig.url}</link>
    <description>RSS feed generation failed</description>
  </channel>
</rss>`;

    return new NextResponse(errorFeed, {
      status: 500,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    });
  }
}

/**
 * Escape XML special characters
 * Prevents XML injection and malformed feeds
 */
function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
