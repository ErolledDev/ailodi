'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="medium-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="medium-nav-brand">
            AI Lodi
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="medium-nav-link">
              Home
            </Link>
            <Link href="/about" className="medium-nav-link">
              About
            </Link>
            <Link href="/contact" className="medium-nav-link">
              Contact
            </Link>
            
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="medium-search w-64">
              <Search size={16} className="medium-search-icon" />
              <Input
                type="search"
                placeholder="Search AI & Tech insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-gray-200 focus:ring-gray-300 focus:border-gray-300"
              />
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="medium-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="medium-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="medium-nav-link px-2 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Search */}
              <form onSubmit={handleSearchSubmit} className="medium-search px-2">
                <Search size={16} className="medium-search-icon" />
                <Input
                  type="search"
                  placeholder="Search AI & Tech insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-gray-200 focus:ring-gray-300 focus:border-gray-300"
                />
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}