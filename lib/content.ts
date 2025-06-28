import type { BlogPost } from '@/types/blog';

const API_URL = 'https://blogform.netlify.app/api/content.json';

// Fallback mock data for development when API is unreachable
const MOCK_DATA: BlogPost[] = [
  {
    id: "mock-1",
    title: "Getting Started with Next.js and Cloudflare",
    slug: "getting-started-nextjs-cloudflare",
    content: "# Getting Started with Next.js and Cloudflare\n\nThis is a comprehensive guide to building modern web applications with Next.js and deploying them on Cloudflare Pages.\n\n## Why Next.js?\n\nNext.js provides an excellent developer experience with features like:\n\n- **Server-side rendering** for better SEO\n- **Static site generation** for optimal performance\n- **API routes** for backend functionality\n- **Built-in optimization** for images and fonts\n\n## Cloudflare Pages Benefits\n\n- Global CDN distribution\n- Automatic HTTPS\n- Git integration\n- Edge computing capabilities\n\n## Getting Started\n\n```bash\nnpx create-next-app@latest my-blog\ncd my-blog\nnpm run dev\n```\n\nThis will create a new Next.js application ready for development.",
    featuredImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
    metaDescription: "Learn how to build and deploy modern web applications using Next.js and Cloudflare Pages with this comprehensive guide.",
    seoTitle: "Getting Started with Next.js and Cloudflare | Professional Blog",
    keywords: ["nextjs", "cloudflare", "web development", "deployment"],
    author: "Professional Blog Team",
    categories: ["Web Development", "Tutorial"],
    tags: ["nextjs", "cloudflare", "deployment", "tutorial"],
    status: "published" as const,
    publishDate: "2024-01-15T10:00:00Z",
    createdAt: "2024-01-15T09:30:00Z",
    updatedAt: "2024-01-15T10:15:00Z"
  },
  {
    id: "mock-2",
    title: "Modern CSS Techniques for Better Web Design",
    slug: "modern-css-techniques-web-design",
    content: "# Modern CSS Techniques for Better Web Design\n\nCSS has evolved significantly over the years. Let's explore some modern techniques that can improve your web design.\n\n## CSS Grid Layout\n\nCSS Grid provides a powerful way to create complex layouts:\n\n```css\n.container {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 2rem;\n}\n```\n\n## Flexbox for Component Layout\n\nFlexbox is perfect for component-level layouts:\n\n```css\n.card {\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n```\n\n## CSS Custom Properties\n\nUse CSS variables for maintainable stylesheets:\n\n```css\n:root {\n  --primary-color: #3b82f6;\n  --secondary-color: #64748b;\n}\n```\n\n## Container Queries\n\nContainer queries allow responsive design based on container size:\n\n```css\n@container (min-width: 400px) {\n  .card {\n    flex-direction: row;\n  }\n}\n```",
    featuredImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
    metaDescription: "Discover modern CSS techniques including Grid, Flexbox, Custom Properties, and Container Queries to create better web designs.",
    seoTitle: "Modern CSS Techniques for Better Web Design | Professional Blog",
    keywords: ["css", "web design", "grid", "flexbox", "frontend"],
    author: "Professional Blog Team",
    categories: ["Web Development", "CSS"],
    tags: ["css", "design", "frontend", "layout"],
    status: "published" as const,
    publishDate: "2024-01-10T14:00:00Z",
    createdAt: "2024-01-10T13:30:00Z",
    updatedAt: "2024-01-10T14:15:00Z"
  },
  {
    id: "mock-3",
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-applications",
    content: "# Building Scalable React Applications\n\nAs your React application grows, maintaining code quality and performance becomes crucial. Here are key strategies for building scalable React apps.\n\n## Component Architecture\n\n### Atomic Design Principles\n\nOrganize components using atomic design:\n\n- **Atoms**: Basic building blocks (buttons, inputs)\n- **Molecules**: Simple combinations of atoms\n- **Organisms**: Complex UI components\n- **Templates**: Page-level layouts\n- **Pages**: Specific instances of templates\n\n### Custom Hooks\n\nExtract logic into reusable custom hooks:\n\n```jsx\nfunction useLocalStorage(key, initialValue) {\n  const [storedValue, setStoredValue] = useState(() => {\n    try {\n      const item = window.localStorage.getItem(key);\n      return item ? JSON.parse(item) : initialValue;\n    } catch (error) {\n      return initialValue;\n    }\n  });\n\n  const setValue = (value) => {\n    try {\n      setStoredValue(value);\n      window.localStorage.setItem(key, JSON.stringify(value));\n    } catch (error) {\n      console.error(error);\n    }\n  };\n\n  return [storedValue, setValue];\n}\n```\n\n## State Management\n\n### Context API for Global State\n\nUse React Context for application-wide state:\n\n```jsx\nconst AppContext = createContext();\n\nfunction AppProvider({ children }) {\n  const [user, setUser] = useState(null);\n  const [theme, setTheme] = useState('light');\n\n  return (\n    <AppContext.Provider value={{ user, setUser, theme, setTheme }}>\n      {children}\n    </AppContext.Provider>\n  );\n}\n```\n\n## Performance Optimization\n\n### React.memo and useMemo\n\nPrevent unnecessary re-renders:\n\n```jsx\nconst ExpensiveComponent = React.memo(({ data }) => {\n  const processedData = useMemo(() => {\n    return data.map(item => ({ ...item, processed: true }));\n  }, [data]);\n\n  return <div>{/* render processed data */}</div>;\n});\n```",
    featuredImageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
    metaDescription: "Learn essential strategies for building scalable React applications including component architecture, state management, and performance optimization.",
    seoTitle: "Building Scalable React Applications | Professional Blog",
    keywords: ["react", "javascript", "scalability", "performance", "architecture"],
    author: "Professional Blog Team",
    categories: ["Web Development", "React"],
    tags: ["react", "javascript", "scalability", "performance"],
    status: "published" as const,
    publishDate: "2024-01-05T16:00:00Z",
    createdAt: "2024-01-05T15:30:00Z",
    updatedAt: "2024-01-05T16:15:00Z"
  },
  {
    id: "mock-4",
    title: "The History of Computing: From Abacus to AI",
    slug: "history-of-computing",
    content: "# The History of Computing: From Abacus to AI\n\nThe evolution of computing technology has been one of the most remarkable journeys in human history. From simple counting devices to artificial intelligence, let's explore the fascinating timeline of computing.\n\n## Ancient Computing Tools\n\n### The Abacus (3000 BC)\n\nThe abacus was one of the first computing devices, used for basic arithmetic operations. Different cultures developed their own versions:\n\n- **Chinese Suanpan**: Featured 2/5 bead configuration\n- **Japanese Soroban**: Simplified 1/4 bead design\n- **Russian Schoty**: Used a 10-bead decimal system\n\n### Antikythera Mechanism (100 BC)\n\nThis ancient Greek device is considered the world's first analog computer, used to predict astronomical positions and eclipses.\n\n## Mechanical Computing Era\n\n### Pascal's Calculator (1642)\n\nBlaise Pascal invented the first mechanical calculator, capable of addition and subtraction. This device laid the groundwork for future mechanical computers.\n\n### Leibniz's Step Reckoner (1673)\n\nGottfried Leibniz improved upon Pascal's design, creating a machine that could perform multiplication and division.\n\n### Babbage's Analytical Engine (1837)\n\nCharles Babbage designed the first general-purpose computer, featuring:\n\n- **Mill**: The processing unit (CPU equivalent)\n- **Store**: Memory for data and instructions\n- **Control Unit**: Program execution control\n- **Input/Output**: Punch card system\n\n## Electronic Computing Revolution\n\n### ENIAC (1946)\n\nThe Electronic Numerical Integrator and Computer was one of the first general-purpose electronic computers:\n\n- Weighed 30 tons\n- Used 18,000 vacuum tubes\n- Could perform 5,000 additions per second\n\n### Transistor Invention (1947)\n\nThe transistor revolutionized computing by replacing vacuum tubes, making computers:\n\n- Smaller and more reliable\n- More energy efficient\n- Capable of faster switching\n\n## The Microprocessor Age\n\n### Intel 4004 (1971)\n\nThe first commercial microprocessor marked the beginning of the personal computer era:\n\n- 4-bit architecture\n- 2,300 transistors\n- 740 kHz clock speed\n\n### Personal Computer Revolution\n\n**Altair 8800 (1975)**: First successful personal computer kit\n**Apple II (1977)**: Brought computing to mainstream consumers\n**IBM PC (1981)**: Established the PC standard\n\n## Modern Computing Era\n\n### Internet and World Wide Web\n\n- **ARPANET (1969)**: Predecessor to the internet\n- **World Wide Web (1989)**: Tim Berners-Lee's revolutionary information system\n- **Mosaic Browser (1993)**: First graphical web browser\n\n### Mobile Computing Revolution\n\n- **Palm Pilot (1996)**: Popularized handheld computing\n- **iPhone (2007)**: Revolutionized mobile computing\n- **Android (2008)**: Open-source mobile platform\n\n## Artificial Intelligence and Beyond\n\n### Machine Learning Breakthroughs\n\n- **Deep Blue (1997)**: IBM's chess-playing computer\n- **Watson (2011)**: Natural language processing system\n- **AlphaGo (2016)**: Mastered the game of Go\n\n### Modern AI Revolution\n\n- **GPT Models**: Large language models transforming communication\n- **Computer Vision**: Enabling machines to \"see\" and interpret images\n- **Autonomous Systems**: Self-driving cars and robotics\n\n## The Future of Computing\n\n### Quantum Computing\n\nQuantum computers promise to solve complex problems exponentially faster than classical computers by leveraging quantum mechanical phenomena.\n\n### Neuromorphic Computing\n\nBrain-inspired computing architectures that mimic neural networks for more efficient processing.\n\n### Edge Computing\n\nDistributed computing that brings computation closer to data sources for reduced latency and improved performance.\n\n## Conclusion\n\nThe history of computing demonstrates humanity's relentless pursuit of tools to augment our cognitive abilities. From the simple abacus to sophisticated AI systems, each advancement has built upon previous innovations, creating the digital world we inhabit today.\n\nAs we look to the future, emerging technologies like quantum computing and artificial general intelligence promise to continue this remarkable journey of innovation and discovery.",
    featuredImageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
    metaDescription: "Explore the fascinating evolution of computing technology from ancient counting devices to modern artificial intelligence systems.",
    seoTitle: "The History of Computing: From Abacus to AI | Professional Blog",
    keywords: ["computing history", "technology evolution", "artificial intelligence", "computer science"],
    author: "Professional Blog Team",
    categories: ["Technology", "History"],
    tags: ["computing", "history", "technology", "ai", "innovation"],
    status: "published" as const,
    publishDate: "2024-01-01T12:00:00Z",
    createdAt: "2024-01-01T11:30:00Z",
    updatedAt: "2024-01-01T12:15:00Z"
  }
];

async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      console.warn(`Fetch attempt ${i + 1} failed:`, error);
      
      if (i === retries - 1) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
    }
  }
  
  throw new Error('All fetch attempts failed');
}

export async function getAllContent(): Promise<BlogPost[]> {
  try {
    const response = await fetchWithRetry(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    const publishedPosts = data.filter((post: BlogPost) => post.status === 'published');
    
    if (publishedPosts.length === 0) {
      console.warn('No published posts found, using mock data');
      return MOCK_DATA;
    }
    
    return publishedPosts;
  } catch (error) {
    console.error('Error fetching content, using mock data:', error);
    return MOCK_DATA;
  }
}

export async function getContentBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetchWithRetry(API_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Accept': 'application/json',
      },
    });
    
    const data = await response.json();
    const publishedPosts = data.filter((post: BlogPost) => post.status === 'published');
    const post = publishedPosts.find((p: BlogPost) => p.slug === slug);
    
    if (post) {
      return post;
    }
    
    // Fallback to mock data
    const mockPost = MOCK_DATA.find((p: BlogPost) => p.slug === slug);
    if (mockPost) {
      console.warn(`Using mock data for slug: ${slug}`);
      return mockPost;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching content by slug, checking mock data:', error);
    
    // Fallback to mock data
    const mockPost = MOCK_DATA.find((p: BlogPost) => p.slug === slug);
    if (mockPost) {
      console.warn(`Using mock data for slug: ${slug}`);
      return mockPost;
    }
    
    return null;
  }
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const posts = await getAllContent();
    return posts.filter(post => post.categories.includes(category));
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return MOCK_DATA.filter(post => post.categories.includes(category));
  }
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  try {
    const posts = await getAllContent();
    const lowercaseQuery = query.toLowerCase();
    
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.metaDescription.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
    );
  } catch (error) {
    console.error('Error searching posts:', error);
    const lowercaseQuery = query.toLowerCase();
    
    return MOCK_DATA.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.metaDescription.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.categories.some(category => category.toLowerCase().includes(lowercaseQuery))
    );
  }
}