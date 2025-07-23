'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import api from '../../lib/api';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type PostEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: any;
};

export default function DashboardPage() {
  const [events, setEvents] = useState<PostEvent[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        const postEvents = response.data.map((post: any) => ({
          id: post.id,
          title: `${post.status}: ${post.content.substring(0, 20)}...`,
          start: new Date(post.scheduledAt || post.createdAt),
          end: new Date(post.scheduledAt || post.createdAt),
          allDay: !post.scheduledAt, // Mark as all-day if it's not scheduled
        }));
        setEvents(postEvents);
      } catch (err) {
        setError('Failed to fetch posts.');
        console.error(err);
      }
    };

    fetchPosts();
  }, []);

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
            <div className="flex items-center gap-4">
               <a href="/api/connect/twitter" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                Connect Twitter
              </a>
              <Link href="/new-post" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                New Post
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8">Content Planner</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="bg-white p-8 rounded-lg shadow" style={{ height: '70vh' }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
