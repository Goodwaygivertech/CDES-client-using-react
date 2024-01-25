import React from 'react'

export default function About() {
  return (
  <>
  
  <div className="dark:bg-gray-800 min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white dark:bg-gray-900 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-200">About Me</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
        Hello there! I'm Shivam Kumar, an enthusiastic Indian full-stack web developer.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
        I enjoy utilizing a range of technologies to solve problems and creating web applications. Having a solid background in both front-end and back-end development, I work hard to make applications that are effective and easy to use.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
        I'm currently developing my abilities and learning about new technologies to keep up with the ever changing web development scene.
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
        Please feel free to contact me at
          <a href="mailto:goodwaygivershivam@gmail.com" className="text-blue-500">
            goodwaygivershivam@gmail.com
          </a>{' '}
          with any questions or simply to say hi!
        </p>
      </div>
    </div>
  </>
  )
}
