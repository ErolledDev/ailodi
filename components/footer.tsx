import Link from 'next/link';

export function Footer() {
  return (
    <footer className="medium-footer">
      <div className="medium-footer-content">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <Link href="/" className="medium-footer-brand">
              Medium
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                Write
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Help
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Terms
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Medium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}