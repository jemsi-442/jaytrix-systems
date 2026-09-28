export const profile = {
  name: "JAYTRIX SYSTEMS",
  title: "Software, IT & Cybersecurity Services",
  tagline:
    "We help businesses work smarter with custom software, secure systems, reliable IT support, and practical digital solutions.",
  about: [
    "JAYTRIX SYSTEMS is a Tanzania-based technology company providing software development, systems design, Linux administration, IT support, and cybersecurity services.",
    "We build practical digital tools around the way an organization actually works: from business applications and APIs to point-of-sale, payroll, inventory, and management platforms.",
    "Our work emphasizes reliable delivery, clear communication, secure access, and maintainable systems that can grow with the people who depend on them.",
  ],
  workingStyle: [
    {
      title: "Start With Your Workflow",
      description:
        "We take time to understand your day-to-day process before recommending a solution.",
    },
    {
      title: "Security From the Start",
      description:
        "We consider data protection and access control throughout design and delivery.",
    },
    {
      title: "Practical Delivery",
      description:
        "We focus on useful features, clear steps and solutions your team can put to work.",
    },
    {
      title: "Support As You Grow",
      description:
        "We plan for ongoing support and improvements as your needs change.",
    },
  ],
  location: "Tanzania",
  email: "jemsifredrick4@gmail.com",
  phone: "+255683186987",
  whatsapp: "255683186987",
  services: [
    "Custom business software",
    "Web and mobile applications",
    "POS, payroll, and inventory systems",
    "Linux and IT support",
    "Cybersecurity assessments",
  ],
  social: {
    whatsapp: "https://wa.me/255683186987",
  },
};

export const skills = {
  architecture: {
    title: "Custom Business Software",
    emphasis: "Business systems",
    summary: "Software shaped around your actual operations, helping your team manage work, records and decisions in one place.",
    items: ["Point-of-sale and inventory systems", "Payroll and staff management tools", "Custom workflow and administration platforms"],
  },
  frontend: {
    title: "Web & Mobile Applications",
    emphasis: "Digital products",
    summary: "Clear, responsive digital experiences that help customers and staff get things done from any device.",
    items: ["Business websites and customer portals", "Web applications and dashboards", "Mobile application design and development"],
  },
  database: {
    title: "API & Data Solutions",
    emphasis: "Connected systems",
    summary: "Reliable ways to connect applications and organize the information your business depends on.",
    items: ["Application and payment integrations", "Database design and migration", "Reporting and data workflow support"],
  },
  devops: {
    title: "IT & Infrastructure Support",
    emphasis: "Reliable operations",
    summary: "Practical help setting up and maintaining the systems that keep your digital services running.",
    items: ["Linux server setup and administration", "Deployment, backups and monitoring", "Troubleshooting and ongoing IT support"],
  },
  security: {
    title: "Cybersecurity Services",
    emphasis: "Security & resilience",
    summary: "Authorized security reviews that help identify risks and give you clear, useful steps to address them.",
    items: ["Web application security assessments", "Access control and configuration reviews", "Actionable findings and hardening guidance"],
  },
};

export const projects = [
  {
    title: "JAYTRIX Sales Management System",
    category: "Retail & distribution",
    status: "Platform design",
    role: "Retail sales and stock management",
    description:
      "A business platform designed for shops, supermarkets, pharmacies, hospitality businesses, wholesalers and other sales-driven operations.",
    focus:
      "Brings sales, stock, branches, customers and reporting into one coordinated system, with support planned for connected and offline workflows.",
    highlights: [
      "Point-of-sale flows for desktop and mobile teams",
      "Stock, customer, branch and sales management",
      "Reporting and payment workflow planning",
    ],
    tags: ["Point of sale", "Stock control", "Multi-branch", "Offline workflows", "Business reporting"],
    liveUrl: null,
    sourceUrl: null,
    repoNote: "Private project",
    privacyNote: "Some implementation details are private. Contact us to discuss a similar solution for your business.",
  },
  {
    title: "RGC Tanzania Management Platform",
    category: "Administration & governance",
    status: "Private project",
    image: "/images/projects/rgc-system-dashboard.svg",
    imageAlt: "Management dashboard for church administration and organizational oversight",
    role: "Organization-wide administration",
    description:
      "A management platform supporting administrative workflows, structured access and oversight across a large church organization in Tanzania.",
    focus:
      "Helps organize records and responsibilities across multiple levels of an organization, with permission controls for different roles.",
    highlights: [
      "Administrative workflows and organizational records",
      "Role-based access for different responsibilities",
      "Oversight and reporting support",
    ],
    tags: ["Administration", "Governance", "Role-based access", "Records", "Reporting"],
    liveUrl: null,
    sourceUrl: null,
    repoNote: "Private project",
    privacyNote: "Project details are limited. Contact us to discuss management systems for your organization.",
  },
  {
    title: "Pharmacy Management System",
    category: "Pharmacy operations",
    status: "Open-source example",
    role: "Stock and sales management",
    description:
      "A pharmacy operations system for tracking stock, handling sales and keeping day-to-day transaction records organized.",
    focus:
      "Supports consistent stock movement and sales workflows, helping staff maintain clearer operational records.",
    highlights: [
      "Inventory and transaction tracking",
      "Sales workflow support",
      "Structured operational records",
    ],
    tags: ["Pharmacy", "Inventory", "Sales", "Transactions", "Operations"],
    liveUrl: null,
    sourceUrl: "https://github.com/jemsi-442/Pharmacy-System",
  },
  {
    title: "Payroll Management System",
    category: "People & payroll operations",
    status: "Open-source example",
    image: "/images/projects/payroll-management-dashboard.svg",
    imageAlt: "Payroll dashboard with salary processing and reporting panels",
    role: "Payroll processing and records",
    description:
      "A payroll application that organizes salary calculations, deductions and payroll processing into a clear, repeatable workflow.",
    focus:
      "Helps reduce manual calculation work and keep payroll rules and processing steps consistent.",
    highlights: [
      "Salary and deduction processing",
      "Validation of payroll inputs",
      "Organized payroll records and workflows",
    ],
    tags: ["Payroll", "Salary processing", "Deductions", "Records", "Reporting"],
    liveUrl: null,
    sourceUrl: "https://github.com/jemsi-442/payroll_management",
  },
  {
    title: "Ecommerce Multi-Vendor Platform",
    category: "Online commerce & delivery",
    status: "Private project",
    image: "/images/projects/ecommerce-dashboard.svg",
    imageAlt: "Ecommerce dashboard for marketplace orders and delivery operations",
    role: "Marketplace and delivery operations",
    description:
      "An online marketplace concept connecting shoppers, vendors and delivery teams through coordinated product, order and delivery workflows.",
    focus:
      "Organizes the order journey from product selection through vendor fulfilment and delivery assignment.",
    highlights: [
      "Vendor and product management",
      "Order progression and delivery coordination",
      "Operational visibility for marketplace teams",
    ],
    tags: ["Online marketplace", "Vendors", "Orders", "Delivery", "Operations"],
    liveUrl: null,
    sourceUrl: null,
    repoNote: "Private project",
    privacyNote: "Some implementation details are private. Contact us to discuss an ecommerce solution for your business.",
  },
  {
    title: "Service Marketplace Platform",
    category: "Service booking & transactions",
    status: "Private project",
    image: "/images/projects/service-marketplace-dashboard.svg",
    imageAlt: "Service marketplace dashboard for bookings and transaction oversight",
    role: "Service bookings and transaction management",
    description:
      "A digital marketplace concept for connecting service providers and customers through bookings, managed payments and support workflows.",
    focus:
      "Provides a structured path for booking services, tracking transactions and resolving issues between marketplace participants.",
    highlights: [
      "Service listings and booking workflows",
      "Managed transaction and payment states",
      "Dispute and support processes",
    ],
    tags: ["Service providers", "Bookings", "Payments", "Transaction tracking", "Customer support"],
    liveUrl: null,
    sourceUrl: null,
    repoNote: "Private project",
    privacyNote: "Some implementation details are private. Contact us to discuss a marketplace for your industry.",
  },
];

export const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#skills" },
  { label: "Our Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];
