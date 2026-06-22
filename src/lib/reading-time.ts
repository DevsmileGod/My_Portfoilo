/**
 * Calculate estimated reading time for a given content string
 * Uses average reading speed of 200 words per minute
 *
 * @param content - The content string to calculate reading time for
 * @returns Estimated reading time in minutes (rounded up)
 *
 * @example
 * const readingTime = calculateReadingTime("# My Blog Post\n\nThis is a long article...");
 * console.log(readingTime); // 5 minutes
 */
export function calculateReadingTime(content: string): number {
  // Average reading speed: 200 words per minute
  const WORDS_PER_MINUTE = 200;

  // Remove markdown syntax and count words
  // Remove: markdown links, code blocks, HTML tags, emphasis markers
  const cleanContent = content
    // Remove markdown links: [text](url) → text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown images: ![alt](url)
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    // Remove code blocks: ```...```
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code: `code`
    .replace(/`([^`]+)`/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove markdown emphasis: **bold**, *italic*, __bold__, _italic_
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    // Remove markdown headings: # Heading
    .replace(/^#+\s+/gm, '')
    // Remove markdown lists: - item, * item, + item
    .replace(/^[-*+]\s+/gm, '')
    // Remove line breaks
    .replace(/\n+/g, ' ');

  // Count words: split by whitespace and filter empty strings
  const words = cleanContent.split(/\s+/).filter((word) => word.length > 0);
  const wordCount = words.length;

  // Calculate reading time and round up
  const readingTimeMinutes = Math.ceil(wordCount / WORDS_PER_MINUTE);

  // Ensure minimum 1 minute
  return Math.max(1, readingTimeMinutes);
}

/**
 * Format reading time as a human-readable string
 *
 * @param minutes - Number of minutes
 * @returns Formatted string (e.g., "5 min read", "< 1 min read")
 *
 * @example
 * formatReadingTime(5); // "5 min read"
 * formatReadingTime(0); // "< 1 min read"
 */
export function formatReadingTime(minutes: number): string {
  if (minutes === 0) {
    return '< 1 min read';
  }
  return `${minutes} min read`;
}
