'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Logo
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="#about" className="hover:text-blue-600">About</Link>
            <Link href="#services" className="hover:text-blue-600">Services</Link>
            <Link href="#projects" className="hover:text-blue-600">Projects</Link>
            <Link href="#contact" className="hover:text-blue-600">Contact</Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="#about" className="block hover:text-blue-600">About</Link>
            <Link href="#services" className="block hover:text-blue-600">Services</Link>
            <Link href="#projects" className="block hover:text-blue-600">Projects</Link>
            <Link href="#contact" className="block hover:text-blue-600">Contact</Link>
          </div>
        )}
      </nav>
    </header>
  )
}