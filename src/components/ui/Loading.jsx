import { motion } from 'framer-motion'

const Loading = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg w-64 mb-2 animate-pulse"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-96 animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-card"
            >
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-20 mb-3 animate-pulse"></div>
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-pulse"></div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects Grid Skeleton */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32 animate-pulse"></div>
              <div className="h-10 bg-gradient-to-r from-primary-200 to-primary-300 rounded-lg w-32 animate-pulse"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-card"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24 animate-pulse"></div>
                    <div className="h-8 w-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                  </div>
                  <div className="mb-4">
                    <div className="h-3 bg-gray-200 rounded-full mb-2 animate-pulse"></div>
                    <div className="h-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-16 animate-pulse"></div>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="h-6 w-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Badge Showcase Skeleton */}
          <div>
            <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-40 mb-6 animate-pulse"></div>
            <div className="bg-white rounded-xl p-6 shadow-card">
              <div className="grid grid-cols-3 gap-4">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-center"
                  >
                    <div className="h-12 w-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full mx-auto mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full animate-pulse"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading