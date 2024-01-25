import React from 'react'

export default function About() {
  return (
  <>
  
  <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 dark:text-gray-900">About Me</h1>
        <p className="text-gray-700 mb-4">
          Hi there! I'm Shivam Kumar, a passionate full-stack web developer based in India.
        </p>
        <p className="text-gray-700 mb-4">
          I love building web applications and solving problems using a variety of technologies.
          With a strong foundation in both front-end and back-end development, I strive to create
          efficient and user-friendly applications.
        </p>
        <p className="text-gray-700 mb-4">
          Currently, I am honing my skills and exploring new technologies to stay up-to-date
          with the ever-evolving landscape of web development.
        </p>
        <p className="text-gray-700 mb-4">
          Feel free to reach out to me at{' '}
          <a href="mailto:goodwaygivershivam@gmail.com" className="text-blue-500">
            goodwaygivershivam@gmail.com
          </a>{' '}
          for any inquiries or just to say hello!
        </p>
      </div>
    </div>
  </>
  )
}
