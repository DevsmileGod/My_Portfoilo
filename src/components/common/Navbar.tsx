'use client';

import { navbarConfig } from '@/config/Navbar';
import Image from 'next/image';
import React from 'react';

import Container from './Container';
import { ThemeToggleButton } from './ThemeSwitch';
import { TrackedLink } from './TrackedLink';
import useScrollPosition from '@/hooks/use-scroll-position';

export default function Navbar() {
  const { isScrolled } = useScrollPosition();

  const navStyle = {
    '--nav-background': 'color-mix(in srgb, var(--background) 80%, transparent)',
  } as React.CSSProperties;

  const navClasses = [
    'sticky top-0 left-0 right-0 z-[60] transition-[background,backdrop-filter] duration-200 ease-out',
    'md:rounded-full md:border md:border-border/30 md:bg-background/90',
    isScrolled
      ? 'bg-[var(--nav-background)] border-b border-white/10 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur-[12px]'
      : 'bg-transparent border-b-0 shadow-none',
  ].join(' ');

  return (
    <Container className={navClasses} style={navStyle}>
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-baseline gap-4">
          <TrackedLink
            href="/"
            track={{
              name: 'button_click',
              data: { buttonId: 'logo', section: 'navbar' },
            }}
          >
            <Image
              className="h-12 w-12 rounded-md border border-gray-200 bg-blue-300 transition-all duration-300 ease-in-out hover:scale-90 dark:bg-yellow-300"
              src={navbarConfig.logo.src}
              alt={navbarConfig.logo.alt}
              width={navbarConfig.logo.width}
              height={navbarConfig.logo.height}
            />
          </TrackedLink>
          <div className="flex items-center justify-center gap-4">
            {navbarConfig.navItems.map((item) => (
              <TrackedLink
                className="transition-all duration-300 ease-in-out hover:underline hover:decoration-2 hover:underline-offset-4"
                key={item.label}
                href={item.href}
                track={{
                  name: 'button_click',
                  data: { buttonId: item.label, section: 'navbar' },
                }}
              >
                {item.label}
              </TrackedLink>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggleButton variant="circle" start="top-right" blur />
        </div>
      </div>
    </Container>
  );
}
