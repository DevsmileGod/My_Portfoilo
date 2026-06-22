/**
 * JSON-LD Schema Generator
 * Generates structured data for SEO and rich snippets
 */

import { siteConfig } from '@/config/Meta';

/**
 * Generate Person schema for portfolio owner
 */
export function generatePersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'ramxcodes',
    jobTitle: 'Software Developer',
    url: siteConfig.url,
    sameAs: [
      `https://github.com/${siteConfig.author.github}`,
      `https://linkedin.com/in/${siteConfig.author.linkedin}`,
      `https://x.com/${siteConfig.author.twitter.replace('@', '')}`,
    ],
    email: siteConfig.author.email,
  };
  return schema;
}

/**
 * Generate BlogPosting schema for blog posts
 */
export function generateBlogPostingSchema(
  title: string,
  description: string,
  datePublished: string,
  authorName: string = 'ramxcodes',
  image?: string,
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: image ? `${siteConfig.url}${image}` : undefined,
    datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
      url: siteConfig.url,
    },
  };

  // Remove undefined fields
  Object.keys(schema).forEach(
    (key) => schema[key as keyof typeof schema] === undefined && delete schema[key as keyof typeof schema],
  );

  return schema;
}

/**
 * Generate CreativeWork schema for project case studies
 */
export function generateProjectSchema(
  title: string,
  description: string,
  image?: string,
  technologies?: string[],
  liveUrl?: string,
  githubUrl?: string,
) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    image: image ? `${siteConfig.url}${image}` : undefined,
    creator: {
      '@type': 'Person',
      name: 'ramxcodes',
      url: siteConfig.url,
    },
    url: liveUrl || siteConfig.url,
    ...(technologies && { keywords: technologies.join(', ') }),
    ...(githubUrl && { codeRepository: githubUrl }),
  };

  // Remove undefined fields
  Object.keys(schema).forEach(
    (key) => schema[key as keyof typeof schema] === undefined && delete schema[key as keyof typeof schema],
  );

  return schema;
}

/**
 * Generate WebSite schema for homepage
 */
export function generateWebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    creator: {
      '@type': 'Person',
      name: 'ramxcodes',
    },
  };

  return schema;
}
