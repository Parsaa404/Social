import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-center">
        <h1 className="text-4xl font-bold mb-8">Welcome to Your Social Media Manager</h1>
        <p className="text-lg text-gray-700 mb-12">
          Schedule, publish, and analyze your social media content all in one place.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/login" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors">
            Register
          </Link>
          <Link href="/dashboard" className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
