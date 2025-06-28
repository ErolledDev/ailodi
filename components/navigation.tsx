'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="wp-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen size={24} className="text-white" />
            </div>
            <span className="wp-nav-brand">Professional Blog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="wp-nav-link">
              Home
            </Link>
            <Link href="/categories" className="wp-nav-link">
              Categories
            </Link>
            <Link href="/about" className="wp-nav-link">
              About
            </Link>
            <Link href="/contact" className="wp-nav-link">
              Contact
            </Link>
            
            {/* Search */}
            <div className="wp-search w-64">
              <Search size={18} className="wp-search-icon" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="border-gray-200 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="wp-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/categories" 
                className="wp-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                href="/about" 
                className="wp-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="wp-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Search */}
              <div className="wp-search px-2">
                <Search size={18} className="wp-search-icon" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="border-gray-200 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}