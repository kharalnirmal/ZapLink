import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { urlAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // WHY states? Manage form input, loading, success, error, and URLs list
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [urls, setUrls] = useState([]); // List of user's URLs



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setSuccess("")
    setLoading(true);
    try {
      const response = await urlAPI.createShortUrl(originalUrl);
      setSuccess("Short URL created successfully!");
      setOriginalUrl(''); // Clear input
      // WHY add to front? Show newest URLs first
      setUrls([response.data, ...urls]);
    } catch (error) {
      setError(err.response?.data?.error || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  }


  // WHY redirect? Protect dashboard from non-authenticated users
  useEffect(() => {
    if (!isAuthenticated) {
      Navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // WHY fetch URLs on load? Show user their existing URLs
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserUrls();
    }
  }, [isAuthenticated]);

  const fetchUserUrls = async () => {
    try {
      const response = await urlAPI.getUserUrls();
      setUrls(response.data.urls);
    } catch (err) {
      console.error('Failed to fetch URLs:', err);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setSuccess('URL copied to clipboard!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // WHY return null? Don't render anything while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className='max-w-4xl mx-auto '>
      <div className='bg-white shadow-md p-6 mb-6 rounded-2xl'>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.username}! 👋
        </h1>
        <p className="text-gray-600">Create and manage your short URLs</p>
      </div>

      {/* URL Creation Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Create New Short URL
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className=' flex gap-3  '>
            <input
              type="url"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              required
              className="flex-1 px-4 py-2 border text-gray-800 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-sm md:text-lg text-white font-semibold py-2 px-[0.4rem] md:px-4 rounded-md transition duration-200  disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Shorten URL'}
            </button>
          </div>
        </form>
      </div>

      {/* URLs List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your URLs ({urls.length})
        </h2>
        {urls.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>
            No URLs created yet. Start by creating a new short URL!
          </p>
        ) : (<div className='space-y-4'>
          {urls.map((url) => (
            <div className='border border-gray-300  p-4 rounded-2xl' key={url._id}>
              <div className='flex items-center justify-between'>
                <div className='flex-1 min-w-0'>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {url.originalUrl}
                  </p>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-blue-600 font-mono">
                      {url.shortUrl}
                    </p>
                    <button
                      onClick={() => copyToClipboard(url.shortUrl)}
                      className="ml-2 text-xs bg-gray-400 hover:bg-gray-200 px-2 py-1 rounded"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {url.clickCount} clicks
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(url.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>)}
      </div>
    </div>
  )
}

export default Dashboard