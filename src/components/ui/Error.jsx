import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="bg-white rounded-2xl p-8 shadow-elevation">
          <div className="h-20 w-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ApperIcon name="AlertTriangle" className="h-10 w-10 text-white" />
          </div>
          
          <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Oops! Something went wrong
          </h3>
          
          <p className="text-gray-600 mb-8 leading-relaxed">
            {message}. Don't worry, this happens sometimes. Let's try again!
          </p>
          
          <div className="space-y-4">
            {onRetry && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRetry}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <ApperIcon name="RefreshCw" className="h-5 w-5 inline mr-2" />
                Try Again
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.reload()}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:border-gray-300 transition-all duration-200"
            >
              <ApperIcon name="Home" className="h-5 w-5 inline mr-2" />
              Refresh Page
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Error