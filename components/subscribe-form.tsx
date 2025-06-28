'use client';

import { useState } from 'react';
import { Mail, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail('');
    
    // Reset success state after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  if (isSubscribed) {
    return (
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 text-green-700">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold">Successfully subscribed!</h3>
              <p className="text-sm text-green-600">Thank you for joining our newsletter.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Mail size={20} className="text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-foreground">
              Stay Updated
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Get the latest articles delivered to your inbox
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 border-primary/20 focus:border-primary focus:ring-primary/20"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || !email}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={16} className="mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}