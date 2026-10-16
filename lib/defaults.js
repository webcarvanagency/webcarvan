// Starter content. It is shown while Firebase is not configured and can be
// imported into Firestore from the admin dashboard with one click.

export const defaultSettings = {
  general: {
    siteName: "Web Caravan",
    tagline: "Web & Marketing Development Agency",
    logo: "",
    logoDark: "",
    favicon: "",
    footerText: "Your Vision. Our Expertise. Digital Growth.",
    copyright: "Web Caravan. All rights reserved.",
    madeIn: "Pakistan",
  },
  hero: {
    badge: "Web & Marketing Development Agency",
    title: "Turn Your Ideas Into",
    highlight: "Powerful Digital Solutions",
    description:
      "We are a small, passionate team of two brothers helping businesses build modern websites, e-commerce stores and grow their brand with smart digital marketing.",
    primaryLabel: "Start a Project",
    primaryLink: "/contact",
    secondaryLabel: "View Our Work",
    secondaryLink: "/work",
    image: "",
    note: "Local Team, Pakistan Based",
    techStack: ["React", "Next.js", "MongoDB", "Firebase", "Shopify"],
  },
  stats: [
    { value: "100%", label: "Client Satisfaction" },
    { value: "10+", label: "Projects Delivered" },
    { value: "5+", label: "Countries Served" },
    { value: "24/7", label: "Ongoing Support" },
  ],
  sections: {
    servicesLabel: "Our Services",
    servicesTitle: "We Build What You Need",
    servicesText:
      "From websites to marketing — we offer complete digital solutions to help your business grow and succeed.",
    projectsLabel: "Our Work",
    projectsTitle: "Some Of Our Recent Projects",
    projectsText:
      "Real businesses. Real results. Explore a few of our latest work and see how we help brands grow online.",
    processLabel: "Why Choose Us",
    processTitle: "Simple Process. Real Results.",
    processText:
      "We keep things clear, transparent and easy — from the first conversation to the final launch and beyond.",
    testimonialsLabel: "What Our Clients Say",
    testimonialsTitle: "Trusted by Businesses Worldwide",
    testimonialsText: "Kind words from amazing people we've worked with.",
    insightsLabel: "Insights",
    insightsTitle: "Ideas, Guides & Updates",
    insightsText: "Practical tips on websites, e-commerce and digital marketing from our team.",
  },
  about: {
    label: "About Us",
    title: "Two Brothers. One Mission.",
    description:
      "We're a small, focused team of two brothers — front-end and back-end developers, designers and digital marketers. We started Web Caravan with a simple goal: help businesses build their online presence and grow with modern technology and smart marketing.",
    story:
      "Web Caravan started with a laptop, a shared passion for technology and a belief that every business deserves a website that actually works for it.\n\nToday we design, build and grow websites, online stores and marketing campaigns for clients in Pakistan and around the world. Because we are a small team, you always talk directly to the people building your project — no middlemen, no confusion.\n\nWe care about clean code, fast performance, honest communication and long-term relationships. Your growth is our priority.",
    image: "",
    note: "Let's build something great together!",
    highlights: [
      { icon: "users", value: "2", label: "Founders" },
      { icon: "heart", value: "100%", label: "Client Focus" },
      { icon: "lightbulb", value: "Always", label: "Learning" },
    ],
    skills: ["React / Next.js", "MongoDB", "Firebase", "Shopify", "SEO & Digital Marketing", "UI/UX Design"],
    values: [
      { icon: "shield", title: "Honest & Transparent", text: "Clear pricing, clear timelines and regular updates." },
      { icon: "zap", title: "Fast & Modern", text: "Performance-first websites built with the latest technology." },
      { icon: "headphones", title: "Real Support", text: "We stay with you after launch to keep things running." },
      { icon: "trending", title: "Growth Focused", text: "Every decision is made to help your business grow." },
    ],
  },
  process: [
    { title: "Discover", text: "Understand your goals, needs and vision." },
    { title: "Plan", text: "Create a strategy, design plan and timeline." },
    { title: "Build", text: "Design, develop and test with quality in mind." },
    { title: "Launch & Grow", text: "Go live and support you for long-term success." },
  ],
  cta: {
    label: "Let's Work Together",
    title: "Ready to Build Something Great?",
    text: "We'd love to hear about your project. Let's discuss your ideas and turn them into a real solution.",
    buttonLabel: "Start a Project",
    buttonLink: "/contact",
    note: "Your Growth, Our Priority",
  },
  contact: {
    title: "Let's Talk About Your Project",
    text: "Tell us a little about your business and what you need. We usually reply within 24 hours.",
    email: "hello@webcaravan.com",
    phone: "+92 300 0000000",
    whatsapp: "+923000000000",
    whatsappMessage: "Hi Web Caravan, I'd like to discuss a project.",
    address: "Lahore, Pakistan",
    hours: "Mon - Sat, 10:00 AM - 7:00 PM",
    mapEmbedUrl: "",
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
    github: "",
  },
  seo: {
    siteUrl: "",
    title: "Web Caravan | Web & Marketing Development Agency",
    description:
      "Web Caravan builds modern websites, Shopify e-commerce stores and data-driven digital marketing strategies that help businesses grow.",
    keywords:
      "web development, website design, Next.js, React, Shopify, e-commerce, digital marketing, SEO, Pakistan web agency",
    ogImage: "",
    twitterHandle: "",
  },
};

export const defaultServices = [
  {
    id: "web-development",
    title: "Web Development",
    slug: "web-development",
    icon: "code",
    excerpt: "Modern, fast and scalable websites and web applications using the latest technologies.",
    description:
      "We build modern websites and web applications that load fast, rank well on Google and are easy to manage.\n\nFrom simple business websites to custom dashboards and full-stack web apps, we use proven technologies like React, Next.js, MongoDB and Firebase to deliver reliable results.",
    features: ["React & Next.js", "MongoDB & Firebase", "Custom Web Applications", "Responsive & Fast"],
    image: "",
    order: 1,
    published: true,
  },
  {
    id: "ecommerce-shopify",
    title: "E-commerce & Shopify",
    slug: "ecommerce-shopify",
    icon: "shopping",
    excerpt: "Build or upgrade your online store with beautiful designs and smooth shopping experiences.",
    description:
      "We help you sell online with beautiful, high-converting Shopify and custom e-commerce stores.\n\nWe handle store setup, theme customization, product and collection setup, payment and shipping integration and ongoing optimization.",
    features: ["Shopify Store Setup & Customization", "Product & Collection Setup", "Payment & Shipping Integration", "Store Optimization"],
    image: "",
    order: 2,
    published: true,
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    slug: "digital-marketing",
    icon: "megaphone",
    excerpt: "Get more visibility, attract the right audience and turn clicks into customers with data-driven marketing.",
    description:
      "Great websites need great visibility. We plan and run marketing that brings the right people to your business.\n\nOur services include search engine optimization, social media marketing, content creation and clear monthly analytics reports.",
    features: ["SEO (Search Engine Optimization)", "Social Media Marketing", "Content Creation & Strategy", "Analytics & Reporting"],
    image: "",
    order: 3,
    published: true,
  },
];

export const defaultProjects = [
  {
    id: "food-ordering-website",
    title: "Food Ordering Website",
    slug: "food-ordering-website",
    category: "Web App",
    tags: ["React", "MongoDB", "Firebase"],
    image: "",
    excerpt: "An online food ordering platform with live menu management and order tracking.",
    description:
      "A complete food ordering experience for a local restaurant: browsable menu, cart, checkout and an admin area to manage dishes and orders in real time.",
    client: "Local Restaurant",
    liveUrl: "",
    featured: true,
    order: 1,
    published: true,
  },
  {
    id: "ecommerce-store-shopify",
    title: "E-commerce Store (Shopify)",
    slug: "ecommerce-store-shopify",
    category: "E-commerce",
    tags: ["Shopify", "Liquid", "Custom Design"],
    image: "",
    excerpt: "A custom Shopify fashion store designed for conversions on mobile.",
    description:
      "We designed and built a custom Shopify theme for a fashion brand, set up collections and payments, and optimized product pages for higher conversions.",
    client: "Fashion Brand",
    liveUrl: "",
    featured: true,
    order: 2,
    published: true,
  },
  {
    id: "business-website",
    title: "Business Website",
    slug: "business-website",
    category: "Website",
    tags: ["React", "Tailwind CSS", "CMS"],
    image: "",
    excerpt: "A modern, SEO friendly business website with an easy content manager.",
    description:
      "A fast corporate website with a simple CMS so the team can update pages, services and news without a developer.",
    client: "Consulting Firm",
    liveUrl: "",
    featured: true,
    order: 3,
    published: true,
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    slug: "analytics-dashboard",
    category: "Dashboard",
    tags: ["React", "Firebase", "Charts"],
    image: "",
    excerpt: "A real-time analytics dashboard to track sales and marketing performance.",
    description:
      "A secure dashboard that brings sales, traffic and campaign data into one clear view with charts and exportable reports.",
    client: "Startup",
    liveUrl: "",
    featured: true,
    order: 4,
    published: true,
  },
];

export const defaultTestimonials = [
  {
    id: "ali-raza",
    name: "Ali Raza",
    role: "Founder, E-commerce Brand",
    quote:
      "Web Caravan delivered a modern, fast and beautiful website for our business. Their communication and support were outstanding!",
    avatar: "",
    rating: 5,
    order: 1,
    published: true,
  },
  {
    id: "sarah-khan",
    name: "Sarah Khan",
    role: "CEO, UK Salon",
    quote:
      "Professional, skilled and easy to work with. They understood our vision and turned it into a high-performing website. Highly recommended!",
    avatar: "",
    rating: 5,
    order: 2,
    published: true,
  },
  {
    id: "usman-tariq",
    name: "Usman Tariq",
    role: "Business Owner, Lahore",
    quote: "Their marketing strategies helped us get more traffic and real customers. A true partner in our growth journey.",
    avatar: "",
    rating: 5,
    order: 3,
    published: true,
  },
];

export const defaultPosts = [
  {
    id: "why-your-business-needs-a-fast-website",
    title: "Why Your Business Needs a Fast Website in 2026",
    slug: "why-your-business-needs-a-fast-website",
    excerpt: "Speed affects your Google ranking, your sales and how customers see your brand. Here is what you should know.",
    image: "",
    author: "Web Caravan Team",
    date: "2026-09-20",
    content:
      "Your website is often the first impression a customer has of your business. If it takes more than a few seconds to load, many visitors simply leave.\n\n## Speed and SEO\n\nGoogle uses page experience signals, including loading speed, when ranking websites. A faster website can help you appear higher in search results.\n\n## Speed and sales\n\nFaster pages keep visitors engaged and make it easier for them to contact you or buy your products.\n\n## How we help\n\nWe build websites with modern tools like Next.js, optimized images and clean code so your pages load quickly on every device.",
    published: true,
  },
  {
    id: "shopify-store-checklist",
    title: "A Simple Checklist Before Launching Your Shopify Store",
    slug: "shopify-store-checklist",
    excerpt: "Launching an online store? Use this short checklist to avoid the most common mistakes.",
    image: "",
    author: "Web Caravan Team",
    date: "2026-08-12",
    content:
      "Launching a Shopify store is exciting. Before you go live, make sure the basics are in place.\n\n## Products and collections\n\nUse clear product titles, quality images and organized collections so customers find what they need.\n\n## Payments and shipping\n\nTest your checkout, payment methods and shipping rates with a real order.\n\n## Trust and policies\n\nAdd your contact details, refund policy and shipping policy so customers feel safe buying from you.",
    published: true,
  },
];

export const defaultContent = {
  services: defaultServices,
  projects: defaultProjects,
  testimonials: defaultTestimonials,
  posts: defaultPosts,
};
