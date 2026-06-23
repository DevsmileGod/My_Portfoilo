import Container from '@/components/common/Container';
import { Card, CardContent, CardHeader } from '@/components/ui/card';


export default function BlogLoading() {
  return (
    <Container className="space-y-16 py-20">
      {/* Header */}
      <div className="space-y-4">
        <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      </div>

      {/* Blog Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="overflow-hidden border-gray-100 dark:border-gray-800 shadow-none"
          >
            {/* Image Skeleton */}
            <CardHeader className="p-0">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse" />
            </CardHeader>

            {/* Content Skeleton */}
            <CardContent className="space-y-4 pt-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-5 w-4/5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
              </div>

              {/* Tags and Date */}
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
