import Container from '@/components/common/Container';

export default function BlogPostLoading() {
  return (
    <Container className="space-y-12 py-20 max-w-4xl mx-auto">
      {/* Breadcrumb Skeleton */}
      <div className="flex gap-2">
        <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-px bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Hero Image Skeleton */}
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />

      {/* Title Skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-10 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Meta Information Skeleton */}
      <div className="flex flex-wrap gap-4">
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-200 dark:bg-gray-700" />

      {/* Content Skeleton */}
      <div className="space-y-4 prose dark:prose-invert max-w-none">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            {/* Paragraph lines */}
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Navigation Skeleton */}
      <div className="flex justify-between gap-4 pt-12 border-t border-gray-100 dark:border-gray-800">
        <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-12 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>
    </Container>
  );
}
