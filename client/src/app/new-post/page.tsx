'use client';

import { useState, useEffect } from 'react';
import api from '../../lib/api';
import { useRouter } from 'next/navigation';

// Define a type for social accounts for better type safety
type SocialAccount = {
  id: string;
  provider: string;
  username: string;
};

export default function NewPostPage() {
  const [content, setContent] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // In a real app, you would fetch the user's connected social accounts
  useEffect(() => {
    // Mocking social accounts for now
    // TODO: Replace with a real API call to fetch accounts
    const mockAccounts: SocialAccount[] = [
      { id: 'clx......', provider: 'twitter', username: '@testuser' },
    ];
    setSocialAccounts(mockAccounts);
    if (mockAccounts.length > 0) {
      setSelectedAccount(mockAccounts[0].id);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedAccount) {
      setError('Please select a social account to post to.');
      return;
    }

    try {
      const postData = {
        content,
        socialAccountId: selectedAccount,
        ...(scheduledAt && { scheduledAt }), // Only include scheduledAt if it's set
      };
      await api.post('/posts', postData);
      alert('Post created successfully!');
      router.push('/dashboard');
    } catch (err) {
      setError('Failed to create post. Please make sure you are logged in.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Create a New Post</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="socialAccount" className="block text-sm font-medium text-gray-700 mb-2">
              Post to
            </label>
            <select
              id="socialAccount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
            >
              {socialAccounts.map((acc) => (
                <option key={acc.id} value={acc.id}>
                  {acc.username} ({acc.provider})
                </option>
              ))}
            </select>
          </div>
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
