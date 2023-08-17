import React from 'react'
export default function Home() {

  return (
    <div className="bg-gradient-to-r h-screen from-black to-gray-600">
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white-900 sm:text-6xl">
              Hello {JSON.parse(localStorage.getItem("session")) !== null && JSON.parse(localStorage.getItem("session")).sessionUserName}
            </h1>
            <p className="font-mono mt-12 text-lg leading-8 text-white-600">
              “ When you know the impact of little expenses, you will realise that there is nothing little in this world. ”
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
