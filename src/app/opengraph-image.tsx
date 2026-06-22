import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const revalidate = 60;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
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
          padding: '40px',
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
            gap: '30px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 88,
              fontWeight: 700,
              margin: 0,
              background: 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ram
          </h1>

          <p
            style={{
              fontSize: 48,
              fontWeight: 500,
              margin: 0,
              color: '#cbd5e1',
              maxWidth: '1000px',
            }}
          >
            A Full Stack web developer
          </p>

          <p
            style={{
              fontSize: 32,
              fontWeight: 400,
              margin: 0,
              color: '#94a3b8',
              maxWidth: '1000px',
            }}
          >
            Building interactive web apps with React, TypeScript & Next.js
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

        {/* Accent - Bottom Left */}
        <div
          style={{
            position: 'absolute',
            bottom: 30,
            left: 40,
            width: 150,
            height: 4,
            background: 'linear-gradient(90deg, #60a5fa 0%, transparent 100%)',
            borderRadius: 2,
          }}
        />
      </div>
    ),
    {
      ...size,
    },
  );
}
