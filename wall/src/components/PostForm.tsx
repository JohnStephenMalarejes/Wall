'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, User } from 'lucide-react'

export default function PostForm() {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = async () => {
    if (!content.trim()) return
    setLoading(true)
    await supabase.from('posts').insert({ content: content.slice(0, 280) })
    setContent('')
    setLoading(false)
    setFocused(false)
  }

  const characterCount = content.length
  const maxLength = 280

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="p-4">
        <div className="flex items-start space-x-3">
          {/* Avatar */}
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 text-white" />
          </div>
          
          {/* Input Area */}
          <div className="flex-1 space-y-3">
            <div className="relative">
              <Textarea
                placeholder="What's on your mind?"
                className={`resize-none border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 text-base placeholder:text-gray-500 transition-all duration-200 focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none ${focused ? 'min-h-[100px]' : 'min-h-[50px]'}`}
                maxLength={maxLength}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => !content && setFocused(false)}
              />
              
              {/* Character Counter */}
              {focused && characterCount > 0 && (
                <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                  <div className={`text-xs font-medium ${characterCount > maxLength * 0.9 ? 'text-red-600' : 'text-gray-500'}`}>
                    {characterCount}/{maxLength}
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 ${characterCount > maxLength * 0.9 ? 'border-red-500' : 'border-blue-500'} relative`}>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 24 24">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={`${(characterCount / maxLength) * 56.5} 56.5`}
                        className={characterCount > maxLength * 0.9 ? 'text-red-500' : 'text-blue-500'}
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            {(focused || content.trim()) && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">
                    {content.trim() ? 'Public' : 'Share with everyone'}
                  </span>
                </div>

                <Button 
                  onClick={handleSubmit} 
                  disabled={loading || !content.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-1.5 text-sm font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <span>Post</span>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}