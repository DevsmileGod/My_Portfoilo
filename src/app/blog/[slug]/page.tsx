import { BlogContent } from '@/components/blog/BlogContent';
import { BlogList } from '@/components/blog/BlogList';
import Container from '@/components/common/Container';
import FontSizeControls from '@/components/common/FontSizeControls';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { siteConfig } from '@/config/Meta';
import { generateBlogPostingSchema } from '@/lib/schema';
import { calculateReadingTime } from '@/lib/reading-time';
import {
  getBlogPostBySlug,
  getBlogPostSlugs,
  getRelatedPosts,
} from '@/lib/blog';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    return {
      title: 'Post Not Found',
    };
  }

  const { title, description, image, date } = post.frontmatter;
  const canonicalUrl = `${siteConfig.url}/blog/${slug}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      template: '%s | ramxcodes',
      default: title,
    },
    description,
    keywords: ['blog', 'article', 'tutorial', ...post.frontmatter.tags],
    authors: [
      {
        name: 'ramxcodes',
        url: siteConfig.url,
      },
    ],
    creator: 'ramxcodes',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: canonicalUrl,
      title,
      description,
      siteName: siteConfig.title,
      publishedTime: date,
      authors: ['ramxcodes'],
      images: [
        {
          url: `${siteConfig.url}${image}`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@ramxcodes',
      site: '@ramxcodes',
      images: [`${siteConfig.url}${image}`],
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || !post.frontmatter.isPublished) {
    notFound();
  }

  // Calculate reading time
  const readingTime = calculateReadingTime(post.content);

  const relatedPosts = await getRelatedPosts(slug, 3);

  const blogPostSchema = generateBlogPostingSchema(
    post.frontmatter.title,
    post.frontmatter.description,
    post.frontmatter.date,
    'ramxcodes',
    post.frontmatter.image,
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostSchema),
        }}
      />
      <Container className="py-16">
        <div className="space-y-12">
          {/* Back Button */}
          <div>
            <Button
              variant="ghost"
              asChild
              className="group"
              track={{
                name: 'button_click',
                data: { buttonId: 'blog_back', section: 'blog_detail' },
              }}
            >
              <Link href="/blog" className="flex items-center space-x-2">
                <ArrowLeft className="size-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
          </div>

          {/* Blog Content */}
          <BlogContent 
            frontmatter={post.frontmatter} 
            content={post.content}
            readingTime={readingTime}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <Separator />
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Related Posts</h2>
                <BlogList posts={relatedPosts} />
              </div>
            </div>
          )}

          {/* Back to Blog CTA */}
          <div className="text-center">
            <Separator className="mb-8" />
            <Button
              asChild
              size="lg"
              track={{
                name: 'button_click',
                data: { buttonId: 'blog_view_all', section: 'blog_detail' },
              }}
            >
              <Link href="/blog">View All Blogs</Link>
            </Button>
          </div>
        </div>
      </Container>
      <FontSizeControls />
    </>
  );
}
