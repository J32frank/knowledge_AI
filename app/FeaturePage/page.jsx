"use client"
import React, { useState } from 'react';
import { BookOpen, ChevronDown, GraduationCap, Menu, Search } from 'lucide-react';
import Link from 'next/link';

export default function FeaturePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <header className="bg-white-600 text-gray-900 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap size={32} />
              <span className="text-2xl font-bold">Hack Heroes</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/courses" className="hover:text-gray-500 transition duration-150">KNOWLEDGE GROWTH</Link>
              
            </nav>
            <div className="flex items-center space-x-4">
              <Search className="h-6 w-6 cursor-pointer hover:text-blue-200 transition duration-150" />
              <button className="md:hidden">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-950">Feature of knowledge Growth</h1>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gray-800 text-white px-6 py-4">
            <h2 className="text-xl font-semibold">Knowledge Growth innovative platform that leverages artificial intelligence to offer students a presonalized learning experience. </h2>
            <p className="text-sm mt-1"></p>
          </div>
          <div className="px-6 py-4">
            <p className="mb-4 text-gray-750">Our platform provides:</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>AI Generated Teaching material</li>
              <li>Access to Educational Video</li>
              <li> Note taking Tool that summarize content</li>
              <li>Interractive Learning Through AI driving Quizzes </li>
              <li>Educational Planing Tool</li>
              <li></li>

            </ul>
          </div>
        </div>
        
       
      </main>

    </div>
  );
}