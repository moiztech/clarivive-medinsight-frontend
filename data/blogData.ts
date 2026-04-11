export interface Blog {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  status: "published" | "draft" | "archived";
  author: string;
  authorAvatar: string;
  createdAt: string;
  views?: number;
  likes?: number;
  comments?: number;
}

export const BLOG_CATEGORIES = [
  "Design",
  "Product",
  "Software Engineering",
  "Management",
  "Customer Success",
] as const;

export const BLOG_STATUSES = ["published", "draft", "archived"] as const;

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "UX review presentations",
    shortDescription:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    content: `<h2>The Art of UX Review Presentations</h2>
<p>Creating compelling UX review presentations is both an art and a science. Whether you're presenting to stakeholders, your design team, or clients, the way you frame your design decisions can make all the difference.</p>
<h3>Start with the Problem</h3>
<p>Every great presentation starts with a clear problem statement. Before diving into your solutions, ensure your audience understands the user pain points you're addressing. Use data, user quotes, and journey maps to paint a vivid picture.</p>
<h3>Show Your Process</h3>
<p>Don't just show the final design—walk through your design process. Show early sketches, wireframes, and iterations. This builds credibility and helps stakeholders understand the thought behind each decision.</p>
<h3>Use Real Data</h3>
<p>Wherever possible, back up your design decisions with real user research data. Usability test results, A/B test outcomes, and analytics data all add weight to your arguments.</p>
<p>Remember: a great UX presentation doesn't just show what you designed—it tells the story of why.</p>`,
    category: "Design",
    tags: ["UX", "Design", "Presentations"],
    featuredImage: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&h=500&fit=crop",
    status: "published",
    author: "Olivia Rhye",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    createdAt: "2022-01-20",
    views: 1240,
    likes: 89,
    comments: 23,
  },
  {
    id: "2",
    title: "Migrating to Linear 101",
    shortDescription:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    content: `<h2>Why Teams Need Better Project Management</h2>
<p>In the fast-paced world of technology, efficient project management is crucial. Linear offers a streamlined approach that can transform how your team works.</p>
<h3>Getting Started</h3>
<p>The first step is setting up your workspace. Create projects for each major initiative, and use labels to categorize issues by priority and type.</p>
<h3>Workflow Automation</h3>
<p>One of Linear's strongest features is its automation capabilities. Set up automatic status transitions, assignment rules, and notification preferences to keep your team in sync.</p>`,
    category: "Product",
    tags: ["Project Management", "Productivity"],
    featuredImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=500&fit=crop",
    status: "published",
    author: "Phoenix Baker",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    createdAt: "2022-01-19",
    views: 890,
    likes: 64,
    comments: 15,
  },
  {
    id: "3",
    title: "Building your API Stack",
    shortDescription:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    content: `<h2>Understanding API Architecture</h2>
<p>Building a robust API stack is essential for modern software development. From REST to GraphQL, the choices you make early on will impact your project for years to come.</p>
<h3>Choosing Your Stack</h3>
<p>Consider factors like scalability, developer experience, and ecosystem support when selecting your API technologies.</p>
<h3>Best Practices</h3>
<ul>
<li>Use consistent naming conventions</li>
<li>Implement proper authentication and authorization</li>
<li>Version your APIs from the start</li>
<li>Write comprehensive documentation</li>
</ul>`,
    category: "Software Engineering",
    tags: ["API", "Engineering", "Best Practices"],
    featuredImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=500&fit=crop",
    status: "published",
    author: "Lana Steiner",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    createdAt: "2022-01-18",
    views: 2100,
    likes: 156,
    comments: 42,
  },
  {
    id: "4",
    title: "Grid system for better Design User Interface",
    shortDescription:
      "A grid system is a design tool used to arrange content on a webpage. It is a series of vertical and horizontal lines that create a matrix of intersecting points.",
    content: `<h2>Grid Systems in UI Design</h2>
<p>Grid systems are the backbone of well-organized user interfaces. They provide structure and consistency across your designs.</p>
<h3>Types of Grids</h3>
<p>From manuscript grids to modular grids, understanding the different types helps you choose the right one for your project.</p>`,
    category: "Design",
    tags: ["Grid", "UI Design", "Layout"],
    featuredImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=500&fit=crop",
    status: "published",
    author: "Phoenix Baker",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    createdAt: "2022-01-17",
    views: 3200,
    likes: 210,
    comments: 67,
  },
  {
    id: "5",
    title: "Creating a Culture of Innovation",
    shortDescription:
      "Explore strategies for building an innovative workplace culture that drives growth and keeps your team motivated.",
    content: `<h2>Building Innovation Culture</h2>
<p>Innovation doesn't happen by accident. It requires intentional effort to create an environment where new ideas can flourish.</p>
<h3>Key Strategies</h3>
<p>Encourage experimentation, celebrate failures as learning opportunities, and create safe spaces for open discussion about new ideas.</p>`,
    category: "Management",
    tags: ["Innovation", "Culture", "Leadership"],
    featuredImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop",
    status: "published",
    author: "Lana Steiner",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    createdAt: "2022-01-16",
    views: 1800,
    likes: 134,
    comments: 38,
  },
  {
    id: "6",
    title: "Podcasting Tips for Startup Founders",
    shortDescription:
      "Starting a podcast can be a great way to build your brand and connect with your audience. Here's what you need to know.",
    content: `<h2>Podcasting for Startups</h2>
<p>Podcasting has become one of the most effective channels for startup founders to share their stories and build authentic connections with their audience.</p>
<h3>Getting Started</h3>
<p>You don't need expensive equipment to start. A good microphone and quiet room are enough to produce quality content.</p>`,
    category: "Customer Success",
    tags: ["Podcasting", "Startup", "Marketing"],
    featuredImage: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=500&fit=crop",
    status: "published",
    author: "Olivia Rhye",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    createdAt: "2022-01-15",
    views: 4500,
    likes: 290,
    comments: 85,
  },
  {
    id: "7",
    title: "Understanding Color Theory in UI Design",
    shortDescription:
      "Color theory is the foundation of visual design. Learn how to use colors effectively in your user interfaces.",
    content: `<h2>Color Theory Fundamentals</h2>
<p>Understanding color theory is essential for creating visually appealing and accessible user interfaces.</p>
<h3>The Color Wheel</h3>
<p>The color wheel is your starting point. Understanding complementary, analogous, and triadic color schemes will help you create harmonious designs.</p>`,
    category: "Design",
    tags: ["Color Theory", "UI Design", "Visual Design"],
    featuredImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    status: "published",
    author: "Phoenix Baker",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    createdAt: "2022-01-14",
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    id: "8",
    title: "The Future of AI in Software Engineering",
    shortDescription:
      "Exploring how artificial intelligence is revolutionizing software development and what it means for engineers.",
    content: `<h2>AI-Powered Development</h2>
<p>Artificial intelligence is rapidly changing the landscape of software engineering. From code generation to automated testing, AI offers unprecedented capabilities.</p>`,
    category: "Software Engineering",
    tags: ["AI", "Engineering", "Technology"],
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    status: "published",
    author: "Candice Wu",
    authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    createdAt: "2022-01-13",
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    id: "9",
    title: "Bill Walsh leadership lessons",
    shortDescription:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    content: `<h2>Leadership Lessons from Bill Walsh</h2>
<p>Bill Walsh's leadership principles are timeless. His approach to building a winning culture extends far beyond the football field.</p>`,
    category: "Management",
    tags: ["Leadership", "Management"],
    featuredImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=500&fit=crop",
    status: "published",
    author: "Alec Whitten",
    authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: "2022-01-12",
    views: 5600,
    likes: 320,
    comments: 95,
  },
  {
    id: "10",
    title: "PM mental models",
    shortDescription:
      "Mental models are simple expressions of complex processes or relationships.",
    content: `<h2>Mental Models for Product Managers</h2>
<p>Great product managers use mental models to simplify decision-making and communicate complex ideas effectively.</p>`,
    category: "Product",
    tags: ["Product Management", "Mental Models"],
    featuredImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
    status: "published",
    author: "Demi Wilkinson",
    authorAvatar: "https://randomuser.me/api/portraits/women/50.jpg",
    createdAt: "2022-01-11",
    views: 7800,
    likes: 420,
    comments: 156,
  },
];
