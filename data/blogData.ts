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
  "Health",
  "Training",
  "Nutrition",
  "Medical",
  "General",
] as const;

export const BLOG_STATUSES = ["published", "draft", "archived"] as const;

export const mockBlogs: Blog[] = [
  {
    id: "1",
    title: "UX Review Presentations: How to Create Compelling Design Stories",
    shortDescription:
      "How do you create compelling presentations that wow your colleagues and impress your managers? Learn the art of visual storytelling.",
    content: `<h2>The Art of UX Review Presentations</h2>
<p>Creating compelling UX review presentations is both an art and a science. Whether you're presenting to stakeholders, your design team, or clients, the way you frame your design decisions can make all the difference.</p>
<h3>Start with the Problem</h3>
<p>Every great presentation starts with a clear problem statement. Before diving into your solutions, ensure your audience understands the user pain points you're addressing. Use data, user quotes, and journey maps to paint a vivid picture.</p>
<h3>Show Your Process</h3>
<p>Don't just show the final design—walk through your design process. Show early sketches, wireframes, and iterations. This builds credibility and helps stakeholders understand the thought behind each decision.</p>
<h3>Use Real Data</h3>
<p>Wherever possible, back up your design decisions with real user research data. Usability test results, A/B test outcomes, and analytics data all add weight to your arguments.</p>
<p>Remember: a great UX presentation doesn't just show what you designed—it tells the story of why.</p>`,
    category: "Training",
    tags: ["UX", "Design", "Presentations", "Healthcare"],
    featuredImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=500&fit=crop",
    status: "published",
    author: "Olivia Rhye",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    createdAt: "2024-01-20",
    views: 1240,
    likes: 89,
    comments: 23,
  },
  {
    id: "2",
    title: "Migrating to Linear 101: A Complete Guide for Healthcare Teams",
    shortDescription:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started with your medical team.",
    content: `<h2>Why Healthcare Teams Need Better Project Management</h2>
<p>In the fast-paced world of healthcare technology, efficient project management is crucial. Linear offers a streamlined approach that can transform how your team works.</p>
<h3>Getting Started</h3>
<p>The first step is setting up your workspace. Create projects for each major initiative, and use labels to categorize issues by priority and type.</p>
<h3>Workflow Automation</h3>
<p>One of Linear's strongest features is its automation capabilities. Set up automatic status transitions, assignment rules, and notification preferences to keep your team in sync.</p>
<h3>Integration with Healthcare Systems</h3>
<p>Linear integrates with many tools commonly used in healthcare tech, including Slack, GitHub, and Figma. These integrations help maintain a single source of truth for your projects.</p>`,
    category: "Medical",
    tags: ["Project Management", "Healthcare", "Productivity"],
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    status: "published",
    author: "Phoenix Baker",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    createdAt: "2024-01-19",
    views: 890,
    likes: 64,
    comments: 15,
  },
  {
    id: "3",
    title: "What is Wireframing? A Comprehensive Guide for Medical UI Design",
    shortDescription:
      "Introduction to Wireframing and its Principles. Learn from the best in the industry and apply it to healthcare interfaces.",
    content: `<h2>Understanding Wireframing in Healthcare</h2>
<p>Wireframing is the blueprint of any digital product. In healthcare applications, where usability can literally impact patient outcomes, wireframing becomes even more critical.</p>
<h3>What is a Wireframe?</h3>
<p>A wireframe is a low-fidelity visual representation of a user interface. Think of it as the skeleton of your application—it shows the structure without the visual design details.</p>
<h3>Why Wireframe for Healthcare?</h3>
<p>Healthcare applications have unique requirements: accessibility compliance, complex data visualization, and the need for error-free interactions. Wireframing helps address these challenges early.</p>
<h3>Best Practices</h3>
<ul>
<li>Start with user flows before creating wireframes</li>
<li>Focus on information hierarchy</li>
<li>Consider accessibility from the beginning</li>
<li>Test wireframes with actual healthcare professionals</li>
</ul>`,
    category: "Training",
    tags: ["Wireframing", "UI Design", "Healthcare", "Best Practices"],
    featuredImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop",
    status: "published",
    author: "Candice Wu",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    createdAt: "2024-01-15",
    views: 2100,
    likes: 156,
    comments: 42,
  },
  {
    id: "4",
    title: "Understanding Nutrition Labels: A Healthcare Professional's Guide",
    shortDescription:
      "Decode nutrition labels like a pro. This guide covers everything healthcare professionals need to know about guiding patients.",
    content: `<h2>Nutrition Labels Decoded</h2>
<p>As healthcare professionals, understanding nutrition labels is essential for providing accurate dietary guidance to patients.</p>
<h3>Serving Size Matters</h3>
<p>The serving size on a nutrition label is the foundation for all other nutritional information. Always check this first, as it may differ significantly from what a person typically eats.</p>
<h3>Key Nutrients to Monitor</h3>
<p>Focus on calories, saturated fat, sodium, and added sugars—these are the nutrients most linked to chronic health conditions.</p>
<h3>The Percent Daily Value</h3>
<p>The %DV helps determine if a serving of food is high or low in a nutrient. Generally, 5% DV or less is low, and 20% DV or more is high.</p>`,
    category: "Nutrition",
    tags: ["Nutrition", "Labels", "Patient Care", "Diet"],
    featuredImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop",
    status: "published",
    author: "Dr. Sarah Chen",
    authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    createdAt: "2024-02-05",
    views: 3200,
    likes: 210,
    comments: 67,
  },
  {
    id: "5",
    title: "Mental Health in the Workplace: Building Supportive Environments",
    shortDescription:
      "Explore strategies for creating mentally healthy workplaces in the healthcare sector. Evidence-based approaches that work.",
    content: `<h2>Creating Mentally Healthy Healthcare Workplaces</h2>
<p>Healthcare workers face unique mental health challenges. Burnout, compassion fatigue, and secondary trauma are all too common in the industry.</p>
<h3>Recognizing the Signs</h3>
<p>The first step in creating a supportive environment is recognizing when team members may be struggling. Look for changes in behavior, increased absenteeism, or declining work quality.</p>
<h3>Building Support Systems</h3>
<p>Implement peer support programs, provide access to counseling services, and create safe spaces for open discussion about mental health challenges.</p>`,
    category: "Health",
    tags: ["Mental Health", "Workplace", "Wellbeing", "Healthcare Workers"],
    featuredImage: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
    status: "published",
    author: "James Mitchell",
    authorAvatar: "https://randomuser.me/api/portraits/men/22.jpg",
    createdAt: "2024-02-10",
    views: 1800,
    likes: 134,
    comments: 38,
  },
  {
    id: "6",
    title: "Telemedicine Best Practices for Modern Healthcare Providers",
    shortDescription:
      "Master the art of virtual patient consultations. Tips and strategies for delivering excellent telehealth experiences.",
    content: `<h2>Mastering Telemedicine</h2>
<p>The rapid adoption of telemedicine has transformed healthcare delivery. Here's how to make the most of virtual consultations.</p>
<h3>Technical Setup</h3>
<p>Ensure you have reliable internet, good lighting, and a professional background. Test your equipment before each session.</p>
<h3>Communication Tips</h3>
<p>Make eye contact by looking at the camera, not the screen. Speak clearly and pause to allow for any lag. Use visual aids when explaining conditions or treatments.</p>`,
    category: "Medical",
    tags: ["Telemedicine", "Virtual Care", "Best Practices"],
    featuredImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
    status: "published",
    author: "Dr. Emily Watson",
    authorAvatar: "https://randomuser.me/api/portraits/women/50.jpg",
    createdAt: "2024-02-15",
    views: 4500,
    likes: 290,
    comments: 85,
  },
  {
    id: "7",
    title: "Infection Control Training: New Guidelines for 2024",
    shortDescription:
      "Stay updated with the latest infection control protocols. Comprehensive training guide for healthcare facilities.",
    content: `<h2>2024 Infection Control Updates</h2>
<p>Infection control remains a cornerstone of patient safety. The 2024 guidelines bring several important updates that all healthcare professionals should know.</p>
<h3>Key Changes</h3>
<p>New guidelines emphasize enhanced hand hygiene protocols, updated PPE recommendations, and revised isolation procedures for emerging pathogens.</p>`,
    category: "Training",
    tags: ["Infection Control", "Training", "Patient Safety", "2024 Guidelines"],
    featuredImage: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&h=500&fit=crop",
    status: "draft",
    author: "Dr. Robert Kim",
    authorAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
    createdAt: "2024-03-01",
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    id: "8",
    title: "The Future of AI in Healthcare Diagnostics",
    shortDescription:
      "Exploring how artificial intelligence is revolutionizing medical diagnostics and what it means for practitioners.",
    content: `<h2>AI-Powered Diagnostics</h2>
<p>Artificial intelligence is rapidly changing the landscape of medical diagnostics. From imaging analysis to predictive modeling, AI offers unprecedented capabilities.</p>
<h3>Current Applications</h3>
<p>AI is already being used in radiology, pathology, and dermatology for image analysis. These tools can detect patterns that may be invisible to the human eye.</p>`,
    category: "Medical",
    tags: ["AI", "Diagnostics", "Future of Healthcare", "Technology"],
    featuredImage: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=500&fit=crop",
    status: "draft",
    author: "Alex Thompson",
    authorAvatar: "https://randomuser.me/api/portraits/men/60.jpg",
    createdAt: "2024-03-05",
    views: 0,
    likes: 0,
    comments: 0,
  },
  {
    id: "9",
    title: "Archived: Legacy CPR Training Procedures",
    shortDescription:
      "This article covers the previous CPR training protocols. Replaced by 2024 updated guidelines.",
    content: `<h2>Legacy CPR Procedures</h2>
<p>Note: This article has been archived. Please refer to the updated 2024 CPR training guidelines for current procedures.</p>`,
    category: "Training",
    tags: ["CPR", "Legacy", "Training"],
    featuredImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=500&fit=crop",
    status: "archived",
    author: "Admin",
    authorAvatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: "2023-06-15",
    views: 5600,
    likes: 320,
    comments: 95,
  },
  {
    id: "10",
    title: "Realizing The Mission of Global Expansion, Opens its First Cafe in Singapore",
    shortDescription:
      "We started our global cafe initiative, opening our first location in Singapore to expand wellness resources across the globe.",
    content: `<h2>Global Expansion Begins</h2>
<p>We are a small cafe with big dreams of becoming a global cafe. We started our operations in Singapore, and we are now venturing to Singapore for our first cafe offering.</p>
<p>The cafe is located at Orchard Hill, one of the main roads in the urban area of Singapore. It is a family-friendly neighborhood with a wide range of restaurants, cafes, and activities for the visitors.</p>
<h3>Our Vision</h3>
<p>We are currently running our first pop-up shop at Sartupio, the area that we call our first destination. Global Expansion Cafe will be open for lunch and dinner to order local breakfast, Chagall Expansion Cafe will introduce new items and experiences in Singapore for the community to enhance their well-being.</p>
<h3>What We Offer</h3>
<p>We are currently running our pop-up in Singapore and hope to launch our first store one day before company is established. The cafe is located after the Cafe is on its way to becoming one of the most famous cafes in Singapore. It is a hidden gem that is close to your favorites.  The Cafe has a mid-range of prices, one of which is a good opportunity for anyone who enjoys eating healthy.</p>`,
    category: "General",
    tags: ["Expansion", "Singapore", "Cafe", "Global"],
    featuredImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=500&fit=crop",
    status: "published",
    author: "Olivia Rhye",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    createdAt: "2024-08-19",
    views: 7800,
    likes: 420,
    comments: 156,
  },
];
