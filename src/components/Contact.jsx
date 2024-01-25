import React from 'react'

export default function Contact() {
  return (
   <>
     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-2/3 lg:w-1/2 dark:bg-gray-900">
        <h2 className="text-3xl font-bold mb-4 dark:text-gray-300">Contact Me</h2>

        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Have questions or suggestions? Feel free to reach out to us via email.
        </p>

        <div className="flex items-center space-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-blue-500 dark:text-blue-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v-2h-2v2zm0-4h2V7h-2v5z"
            />
          </svg>
          <p className="text-gray-700 dark:text-gray-300">Email: goodwaygivershivam@gmail.com</p>
        </div>
      </div>
    </div>
   
   </>
  )
}
