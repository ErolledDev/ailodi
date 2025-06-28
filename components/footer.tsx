import Link from 'next/link';
import { BookOpen, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="wp-footer">
      <div className="wp-footer-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen size={28} className="text-white" />
              </div>
              <span className="wp-footer-brand">Professional Blog</span>
            </Link>
            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              A modern, professional blog sharing insights on web development, 
              technology, and digital innovation. Built with passion and hosted 
              with care on Cloudflare.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart size={16} className="text-red-400" />
              <span>by our team</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-6">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} className="text-gray-400 hover:text-white" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} className="text-gray-400 hover:text-white" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              Follow us for the latest updates and insights.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Professional Blog. All rights reserved.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              RSS Feed
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}