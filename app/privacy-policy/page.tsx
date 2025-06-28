import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy explains how we collect, use, and protect your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-background">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-6">
          <strong>Last updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Professional Blog ("we," "our," or "us") collects, 
              uses, and shares your personal information when you visit or use our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Information You Provide</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Contact information when you reach out to us</li>
                  <li>Comments and feedback you submit</li>
                  <li>Newsletter subscription information</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>To provide and improve our services</li>
              <li>To respond to your inquiries and requests</li>
              <li>To send you newsletters and updates (with your consent)</li>
              <li>To analyze website usage and improve user experience</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties, 
              except in the following circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>With your explicit consent</li>
              <li>To comply with legal requirements</li>
              <li>To protect our rights and safety</li>
              <li>With trusted service providers who assist in operating our website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience, 
              analyze site traffic, and understand where our visitors are coming from. You can 
              control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information against 
              unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Objection to processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites or services. We are not 
              responsible for the privacy practices of these external sites. We encourage you 
              to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">
                Email: <a href="mailto:privacy@professionalblog.com" className="text-primary hover:text-primary/80">privacy@professionalblog.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}