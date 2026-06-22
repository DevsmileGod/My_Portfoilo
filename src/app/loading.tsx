import Container from '@/components/common/Container';

export default function Loading() {
  return (
    <Container className="min-h-screen">
      <div className="flex items-center justify-center py-20">
        <div className="space-y-4 text-center">
          {/* Spinner */}
          <div className="flex justify-center">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 animate-spin" />
            </div>
          </div>

          {/* Loading Text */}
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading...
          </p>
        </div>
      </div>
    </Container>
  );
}
