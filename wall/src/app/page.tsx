import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import Profile from '@/components/Profile'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-blue-600">
                  Wall
                </h1>
                <p className="text-xs text-gray-500">Connect with friends</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <Profile />
            </div>
          </div>

          {/* Main Content */}
          <main className="lg:col-span-2 space-y-4">
            {/* Welcome Section */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                What's on your mind?
              </h2>
              <p className="text-gray-600 text-sm">
                Share an update with your friends
              </p>
            </div>

            {/* Post Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Create Post
                </h3>
              </div>
              <div className="p-4">
                <PostForm />
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Recent Posts
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-500">Online</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <PostList />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}