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
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Write
              </Link>
              <Link href="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/terms-of-service" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/disclaimer" className="text-muted-foreground hover:text-foreground">
                Disclaimer
              </Link>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Medium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}