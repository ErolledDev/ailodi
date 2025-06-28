import { Users, Target, Award, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Quality Content',
      description: 'We strive to provide high-quality, well-researched articles that add value to our readers.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a community of developers, creators, and technology enthusiasts who learn together.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Commitment to excellence in everything we do, from content creation to user experience.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Driven by passion for technology, innovation, and sharing knowledge with others.'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Welcome to our professional blog, where we share insights, tutorials, and stories 
          about web development, technology, and digital innovation. Our mission is to create 
          valuable content that helps developers and creators build better digital experiences.
        </p>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
              <p>
                Started as a passion project, our blog has grown into a comprehensive resource 
                for developers and technology enthusiasts. We believe in the power of sharing 
                knowledge and building communities around shared interests.
              </p>
              <p>
                Our team consists of experienced developers, designers, and writers who are 
                passionate about creating content that makes a difference. We cover everything 
                from cutting-edge frameworks to fundamental programming concepts.
              </p>
              <p>
                Built with modern technologies like Next.js and hosted on Cloudflare, our 
                platform represents the same innovative spirit we write about in our articles.
              </p>
            </div>
          </div>
          <div className="lg:pl-8">
            <div className="bg-green-50 rounded-xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">100+</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Articles Published</p>
                    <p className="text-gray-600">High-quality content for developers</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">50K+</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Monthly Readers</p>
                    <p className="text-gray-600">Growing community of learners</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-green-700 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">5+</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">Years Experience</p>
                    <p className="text-gray-600">Proven track record in tech</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do and shape the content we create.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center hover-lift bg-white shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-green-50 rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
          To democratize access to high-quality technical education and create a platform 
          where developers can learn, grow, and share their expertise. We believe that 
          knowledge should be accessible, practical, and inspiring.
        </p>
      </div>
    </div>
  );
}