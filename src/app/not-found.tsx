import { Button } from '@/components/ui/button';
import Container from '@/components/common/Container';
import { TrackedLink } from '@/components/common/TrackedLink';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <Container className="min-h-screen">
      <div className="flex items-center justify-center py-20">
        <div className="space-y-6 text-center">
          {/* 404 Error Code */}
          <div className="space-y-2">
            <h1 className="text-8xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              404
            </h1>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Page Not Found
            </p>
          </div>

          {/* Error Message */}
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </p>

          {/* Action Button */}
          <div className="pt-4">
            <TrackedLink
              href="/"
              track={{
                name: 'button_click',
                data: { buttonId: 'not_found_home', section: 'not_found' },
              }}
            >
              <Button className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </TrackedLink>
          </div>

          {/* Decorative Element */}
          <div className="pt-8 opacity-50">
            <div className="h-24 w-24 mx-auto rounded-full border-2 border-blue-300 dark:border-blue-500 flex items-center justify-center text-4xl">
              🧭
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
