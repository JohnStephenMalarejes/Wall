'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Heart, MessageCircle, MoreHorizontal, User, ThumbsUp } from 'lucide-react'

interface Post {
  id: string
  content: string
  created_at: string
}

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
    const subscription = supabase
      .channel('realtime-posts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        (payload) => {
          setPosts((prev) => [payload.new as Post, ...prev])
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [])

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const postDate = new Date(dateString)
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds}s`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`
    
    return postDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: postDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-500">Be the first to share something!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <article 
          key={post.id} 
          className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
        >
          {/* Post Header */}
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">John Stephen Malarejes</h4>
                  <p className="text-xs text-gray-500 flex items-center">
                    {formatTimeAgo(post.created_at)} · 
                    <span className="ml-1">🌍</span>
                  </p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors duration-200">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Post Content */}
          <div className="px-4 pb-3">
            <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
              {post.content}
            </p>
          </div>

          {/* Like Count (if any) */}
          {likedPosts.has(post.id) && (
            <div className="px-4 pb-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <ThumbsUp className="w-2.5 h-2.5 text-white fill-current" />
                  </div>
                  <span>1</span>
                </div>
              </div>
            </div>
          )}

          {/* Post Actions */}
          <div className="border-t border-gray-200">
            <div className="flex items-center">
              <button 
                onClick={() => toggleLike(post.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-2 hover:bg-gray-50 transition-colors duration-200 ${
                  likedPosts.has(post.id) ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <ThumbsUp 
                  className={`w-4 h-4 ${
                    likedPosts.has(post.id) ? 'fill-current' : ''
                  }`} 
                />
                <span className="text-sm font-medium">Like</span>
              </button>

              <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Comment</span>
              </button>

              <button className="flex-1 flex items-center justify-center space-x-2 py-2 text-gray-600 hover:bg-gray-50 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}