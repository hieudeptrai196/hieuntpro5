/**
 * Single source of truth for CV content.
 * Content sourced 1:1 from official CV — do not paraphrase.
 */

export const siteConfig = {
  name: "Nguyễn Thọ Hiếu",
  title: "Developer / Software Engineer",
  tagline: "Backend Developer · 3+ years forging high-performance systems",
  summary:
    "Developer (Node.js, PHP) with 3+ years of experience in developing high-performance, large-scale systems (Telecommunications and Ecommerce).",
  phone: "0834778196",
  email: "hieulatoi1962@gmail.com",
  linkedin: "https://www.linkedin.com/in/hieunguyen196",
  location: "Hanoi",
  siteUrl: "https://hieunt.site",
} as const;

export const strengths = [
  {
    title: "Strengths",
    body:
      "Extensive experience in handling high-traffic environments, ensuring system stability and scalability under heavy user loads.",
  },
  {
    title: "Comprehensive Skills",
    body:
      "Possess practical experience in Frontend development, providing a holistic perspective throughout the product development lifecycle.",
  },
  {
    title: "Innovative Mindset",
    body:
      "Proactive in learning, passionate about researching and integrating emerging technologies into projects to optimize efficiency.",
  },
  {
    title: "Work Style",
    body:
      "Persistent and highly adaptable, committed to maintaining top-tier work quality and meeting deadlines even under high pressure.",
  },
] as const;

export const education = {
  school: "Electric Power University",
  status: "Graduated",
  period: "2018 - 2023",
  major: "Software Engineering",
} as const;

export const skills = {
  backend: {
    label: "Backend Development",
    icon: "Q",
    items: [
      { label: "Languages & Frameworks", value: "PHP (Laravel), Node.js (NestJS), Java" },
      { label: "Architecture & Design", value: "Master Slave, Design Patterns, Clean Code" },
      { label: "System Optimization", value: "Redis, Caching, RabbitMQ, WebSocket, Asynchronous processing" },
      { label: "Security", value: "SQL Injection prevention, Data encryption, Web security" },
    ],
  },
  data: {
    label: "Databases & Infrastructure",
    icon: "W",
    items: [
      { label: "Data Management", value: "MySQL, PostgreSQL, Index optimization, Database scaling" },
      { label: "Infrastructure & Connectivity", value: "Nginx, RESTful API, GraphQL, WebSocket" },
      { label: "Cloud & CDN", value: "Cloudflare CDN, R2 Object Storage, Cache Rules, WAF, DDoS protection, DNS management" },
      { label: "Management Tools", value: "Git (Version Control), Jira (Project Management), Agile/Scrum" },
    ],
  },
  fullstack: {
    label: "Full-stack Knowledge",
    icon: "E",
    items: [
      { label: "Frontend Technologies", value: "CSR & SSR, ReactJS (Next.js), Angular" },
      { label: "Performance & UX", value: "Critical rendering path, Page load speed, Core Web Vitals optimization" },
      { label: "AI in Daily Workflow", value: "Claude, ChatGPT, Gemini — code review, debugging, architecture planning, writing technical docs" },
      { label: "AI Product Integration", value: "LLM API integration, AI-driven chatbots, prompt engineering for backend services" },
    ],
  },
  soft: {
    label: "Soft Skills & Communication",
    icon: "R",
    items: [
      { label: "Languages", value: "English (technical documentation reading comprehension, communication)" },
      { label: "Teamwork", value: "Cross-functional, system service coordination" },
      { label: "Client Collaboration", value: "Requirement discussion, technical reporting, solution hand-over" },
      { label: "Research & Innovation", value: "New technologies, AI integration, performance optimization" },
    ],
  },
} as const;

export type SkillKey = keyof typeof skills;

export const experiences = [
  {
    id: "vnpt-media",
    company: "VNPT - Vietnam Posts and Telecommunications Group",
    logo: "https://cdn.hieunt.site/vnpt_logo.png",
    link: "https://vnpt.com.vn/",
    position: "Backend Developer",
    period: "10/2025 - Now",
    responsibilities: [
      {
        title: "Telecommunications & Frontend Development",
        body:
          "Participated in developing and deploying core features for large-scale telecommunications systems to maintain stability for a massive user base. Supported the optimization of frontend rendering and system resources to ensure a smooth user experience across interfaces.",
      },
      {
        title: "Performance Optimization",
        body:
          "Assisted in refactoring database queries, applying caching strategies, and implementing frontend lazy-loading techniques to handle high traffic, reducing latency and improving system throughput.",
      },
      {
        title: "System Maintenance & Security",
        body:
          "Contributed to identifying and patching legacy security vulnerabilities while enhancing UI/UX performance to improve overall system stability and ensure a secure user experience.",
      },
      {
        title: "Full-stack Project Implementation",
        body:
          "Served as a developer for high-priority outsourcing projects for VNPT, directly coding both Frontend and Backend components. Focused on end-to-end performance optimization to deliver reliable, scalable, and highly responsive applications.",
      },
    ],
    projects: [
      {
        name: "Core IPCC Voice System",
        link: "https://vnptmedia.vn/dich-vu-v2/phan-mem/202004/ipcc-multimedia-21b1a5e/",
        body:
          "Developed and managed a large-scale telecommunications user authorization system. Optimized data flows and connectivity to ensure stability for voice services, supporting thousands of concurrent sessions between agents and customers.",
      },
      {
        name: "DOOH (Digital Out-of-Home) Platform",
        body:
          "Built a content management and distribution system for a digital billboard network. Integrated real-time livestreaming features and automated display scheduling, optimizing media performance and user reach at public locations.",
      },
    ],
  },
  {
    id: "newwave",
    company: "Newwave Solutions",
    logo: "https://cdn.hieunt.site/logo-nws.png",
    position: "Backend Developer",
    link: "https://newwave.vn",
    period: "07/2022 - 10/2025",
    responsibilities: [
      {
        title: "Full-stack Optimization",
        body:
          "Refactored complex database queries and implemented frontend optimization techniques to handle high concurrent traffic. Successfully reduced average page load time by over 40%, significantly improving user experience for large-scale platforms.",
      },
      {
        title: "E-commerce & Security",
        body:
          "Developed and scaled high-performance e-commerce systems, optimized critical rendering paths, and ensured system stability during Flash Sale events with sudden user spikes. Implemented robust defensive measures against SQL Injection and MITM attacks.",
      },
      {
        title: "Product Innovation (NFT & AI)",
        body:
          "Pioneered the end-to-end development of the company's first NFT Marketplace platform and integrated AI Chatbots.",
      },
      {
        title: "International Collaboration",
        body:
          "Coordinated with Japanese clients in English to discuss project requirements, providing technical consultancy on system scalability and performance.",
      },
    ],
    projects: [
      {
        name: "E-commerce System — MAG",
        link: "https://market.orilab.jp/",
        body:
          "Developed and optimized a large-scale platform using Elasticsearch to accelerate search and data retrieval. Efficiently handled Flash Sales with surging traffic, ensuring stable system operation and fast response times.",
      },
      {
        name: "AI Chatbot Integration",
        body:
          "Implemented Chatbot solutions based on LLM models (ChatGPT, Gemini) and PostgreSQL for conversation management. Automated over 70% of customer response processes, supporting intelligent interaction and optimizing operational efficiency through automated workflows.",
      },
    ],
  },
  {
    id: "smart-osc",
    company: "Smart OSC",
    logo: "https://cdn.hieunt.site/smartosc_logo.webp",
    position: "Backend Developer Intern",
    link: "https://smartosc.com",
    period: "01/2022 - 06/2022",
    tag: "Internship",
    responsibilities: [
      {
        title: "Internship Onboarding",
        body:
          "Joined the backend team as an intern. Got hands-on exposure to a large-scale enterprise codebase, team workflow, and code-review culture under senior engineers' mentorship.",
      },
      {
        title: "Foundation Building",
        body:
          "Practiced production fundamentals: Git collaboration, REST API conventions, basic database design, and writing maintainable PHP/Node.js code. Contributed small bug fixes and feature tickets to build engineering foundations.",
      },
    ],
    projects: [],
  },
] as const;

export const navLinks = [
  { id: "lore", label: "Lore" },
  { id: "abilities", label: "Abilities" },
  { id: "career", label: "Career" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
