export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '')
    .replace(/^-+|-+$/g, '');
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const headingRegex = /^ {0,3}(#{2,3})\s+(.+?)\s*$/gm;
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const rawLevel = match[1].length;
    const rawText = match[2].replace(/\s+#+$/u, '').trim();
    const text = rawText
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[`*_~]/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!text) {
      continue;
    }

    headings.push({
      id: slugifyHeading(text),
      text,
      level: rawLevel === 3 ? 3 : 2,
    });
  }

  return headings;
}
