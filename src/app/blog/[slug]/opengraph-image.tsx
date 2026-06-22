import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/blog';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const revalidate = 60;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getBlogPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            color: 'white',
            fontSize: 48,
          }}
        >
          Post not found
        </div>
      ),
      size,
    );
  }

  const { title, description } = post.frontmatter;

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Hanken Grotesk", system-ui, sans-serif',
          color: 'white',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              margin: 0,
              color: '#60a5fa',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Blog Post
          </p>

          <h1
            style={{
              fontSize: 72,
              fontWeight: 700,
              margin: 0,
              color: 'white',
              maxWidth: '1000px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          <p
            style={{
              fontSize: 28,
              fontWeight: 400,
              margin: 0,
              color: '#cbd5e1',
              maxWidth: '1000px',
              lineHeight: 1.4,
            }}
          >
            {description}
          </p>
        </div>

        {/* Watermark - Bottom Right */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            right: 40,
            fontSize: 24,
            color: '#475569',
            fontWeight: 600,
          }}
        >
          ramxcodes
        </div>

        {/* Category Tag - Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 40,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              background: '#60a5fa',
              borderRadius: '50%',
            }}
          />
          <span style={{ fontSize: 20, color: '#94a3b8', fontWeight: 500 }}>
            ramxcodes blog
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
