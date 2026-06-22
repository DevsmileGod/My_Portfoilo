'use client';

import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Container className="min-h-screen">
      <div className="flex items-center justify-center py-20">
        <div className="space-y-6 text-center">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-red-100 dark:bg-red-950 p-4">
              <AlertCircle className="w-12 h-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Error Title */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              An unexpected error occurred. Please try again or go back to the home page.
            </p>
          </div>

          {/* Error Details (Development) */}
          {process.env.NODE_ENV === 'development' && error.message && (
            <details className="text-left max-w-md mx-auto">
              <summary className="cursor-pointer text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                Error Details
              </summary>
              <pre className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded text-xs overflow-auto text-red-600 dark:text-red-400">
                {error.message}
              </pre>
            </details>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center pt-4">
            <Button
              onClick={() => reset()}
              className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = '/')}
              className="gap-2 border-gray-300 dark:border-gray-600"
            >
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
