import { MapPin, Calendar} from 'lucide-react'

interface ProfileProps {
  className?: string
}

export default function Profile({ className = '' }: ProfileProps) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 sticky top-24 ${className}`}>
      {/* Profile Image */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        
        {/* Name and Handle */}
        <h2 className="mt-4 text-xl font-bold text-gray-900">John Stephen Malarejes</h2>
        <p className="text-gray-500 text-sm">johnstephenmalarejes@gmail.com</p>
      </div>

      {/* Bio */}
      <div className="mb-6">
        <p className="text-gray-700 text-sm leading-relaxed">
          Software Developer passionate about creating beautiful user experiences. 
          Love to share insights about React, TypeScript, and modern web development.
        </p>
      </div>

      {/* Location and Details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>Bugang Sur,Bilar,Bohol, Philippines</span>
        </div>
        
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>Joined July 2025</span>
        </div>
      </div>

    </div>
  )
}