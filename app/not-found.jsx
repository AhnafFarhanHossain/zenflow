import Button from "@/components/Button";

export default function NotFound() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-6 text-center">
      <div className="space-y-6 md:space-y-8">
        <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-[#15803d] dark:text-[#bbf7d0] tracking-tight">
          404
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 tracking-wide max-w-sm md:max-w-md mx-auto">
          Oops! The page you are looking for could not be found.
        </p>
      </div>
      <Button href="/" className="mt-10 md:mt-12" variant="primary" size="lg">
        Return Home
      </Button>
    </div>
  );
}
