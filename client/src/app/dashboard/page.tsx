import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <Link href="/new-post" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                New Post
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900">Your Content</h2>
          {/* Calendar view will go here */}
          <div className="mt-8 bg-white p-8 rounded-lg shadow">
            <p>Calendar placeholder</p>
          </div>
        </div>
      </main>
    </div>
  );
}
