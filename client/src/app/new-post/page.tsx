'use client';

import { useState } from 'react';

export default function NewPostPage() {
  const [content, setContent] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to send data to the backend API
    console.log({ content, scheduledAt });
    alert('Post created (mock)!');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label htmlFor="scheduledAt" className="block text-sm font-medium text-gray-700 mb-2">
              Schedule for later (optional)
            </label>
            <input
              type="datetime-local"
              id="scheduledAt"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}
