/**
 * Database Seed Script
 * Run with: node server/seed.js
 */

const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const Project = require('./models/Project')
const Education = require('./models/Education')
const Foundation = require('./models/Foundation')
const BlogPost = require('./models/BlogPost')

const seedData = {
  projects: [
    {
      title: 'Power Generation Expansion',
      description: "Driving Transcorp Energy's capacity expansion initiatives across thermal and renewable energy assets, aiming to close Nigeria's energy gap.",
      category: 'Energy Infrastructure',
      status: 'Ongoing',
      technologies: ['Generation', 'Infrastructure', 'Nigeria'],
      link: '',
      featured: true,
      order: 1,
    },
    {
      title: 'Clean Energy Transition',
      description: "Championing Nigeria's pathway to renewable energy integration within Transcorp's portfolio — solar, gas-to-power, and hybrid solutions.",
      category: 'Renewable Energy',
      status: 'In Planning',
      technologies: ['Renewables', 'Sustainability', 'Africa'],
      link: '',
      featured: true,
      order: 2,
    },
    {
      title: 'Energy Sector Reform',
      description: 'Active engagement with government and regulators on the reform of Nigeria\'s electricity market, tariff structures, and private sector participation.',
      category: 'Policy & Advocacy',
      status: 'Active',
      technologies: ['Policy', 'Regulation', 'Reform'],
      link: '',
      featured: true,
      order: 3,
    },
    {
      title: 'The Ezeafulukwe Foundation',
      description: 'A forthcoming initiative to drive educational access, youth empowerment, and sustainable community development across Africa.',
      category: 'Social Impact',
      status: 'Coming Soon',
      technologies: ['Education', 'Youth', 'Africa'],
      link: '/foundation',
      featured: true,
      order: 4,
    },
  ],

  education: [
    {
      institution: 'University of Houston Law Center',
      degree: 'LL.M — Energy Law',
      field: 'Houston, Texas, USA',
      startYear: '',
      endYear: '',
      description: 'Specialisation in international energy law, oil & gas transactions, and regulatory frameworks.',
      type: 'degree',
      order: 1,
    },
    {
      institution: 'University of Lagos',
      degree: 'LL.M — Corporate & Commercial Law',
      field: 'Lagos, Nigeria',
      startYear: '',
      endYear: '',
      description: 'Advanced studies in commercial law, company law, and corporate governance.',
      type: 'degree',
      order: 2,
    },
    {
      institution: 'Nigerian Law School',
      degree: 'B.L — Barrister at Law',
      field: 'Abuja, Nigeria',
      startYear: '',
      endYear: '',
      description: 'Professional qualification for legal practice in Nigeria.',
      type: 'degree',
      order: 3,
    },
    {
      institution: 'University of Lagos',
      degree: 'LL.B — Bachelor of Laws',
      field: 'Lagos, Nigeria',
      startYear: '',
      endYear: '',
      description: 'Foundation in Nigerian law, jurisprudence, and legal theory.',
      type: 'degree',
      order: 4,
    },
    {
      institution: 'IESE Business School',
      degree: 'Executive Education',
      field: 'Barcelona, Spain',
      startYear: '',
      endYear: '',
      description: '',
      type: 'executive',
      order: 1,
    },
    {
      institution: 'Lagos Business School',
      degree: 'Executive Education',
      field: 'Lagos, Nigeria',
      startYear: '',
      endYear: '',
      description: '',
      type: 'executive',
      order: 2,
    },
  ],

  foundation: [
    {
      title: 'Education Access',
      description: 'Providing scholarships, learning materials, and infrastructure to underserved communities across Africa.',
      category: 'Education',
      order: 1,
    },
    {
      title: 'Energy for Communities',
      description: 'Championing off-grid and renewable energy solutions to power schools, clinics, and homes in rural Africa.',
      category: 'Energy',
      order: 2,
    },
    {
      title: 'Youth Empowerment',
      description: "Mentorship, skills development, and entrepreneurship programs to equip Africa's next generation of leaders.",
      category: 'Community',
      order: 3,
    },
    {
      title: 'Governance & Institutions',
      description: 'Supporting initiatives that strengthen public institutions and accountability across the continent.',
      category: 'Governance',
      order: 4,
    },
  ],

  blogPosts: [
    {
      title: "Rethinking Nigeria's Electricity Tariff Architecture",
      slug: "rethinking-nigerias-electricity-tariff-architecture",
      category: 'Energy Policy',
      excerpt: 'A frank assessment of why tariff reform is not just an economic necessity but a social imperative for Nigeria\'s power sector sustainability.',
      content: `Nigeria's electricity sector stands at a critical juncture. The current tariff architecture, designed decades ago, fails to reflect the modern realities of generation costs, distribution inefficiencies, and the urgent need for universal access.

The fundamental challenge lies in balancing affordability for consumers with the financial viability required to attract the massive investments needed to expand generation capacity and modernize grid infrastructure.

Without meaningful reform, we risk perpetuating a cycle where distribution companies cannot invest in infrastructure upgrades, resulting in load shedding and unreliable supply that ultimately harms the very consumers the low tariffs are meant to protect.

True tariff reform must be comprehensive—addressing not just the end-user prices but the entire value chain from generation to distribution, ensuring transparency, efficiency, and sustainable pricing that enables growth.`,
      readTime: '7 min read',
      published: true,
      publishedAt: new Date('2025-03-01'),
    },
    {
      title: 'The Anatomy of Transformative CEO Leadership in Africa',
      slug: "the-anatomy-of-transformative-ceo-leadership-in-africa",
      category: 'Leadership',
      excerpt: 'Drawing from two decades in executive roles, reflections on what it truly takes to lead large organisations through disruption in emerging markets.',
      content: `Leading in Africa's unique business environment requires a distinct set of capabilities. The continent offers enormous opportunity, but also presents challenges that demand adaptive, resilient, and people-centered leadership.

Transformative CEO leadership in Africa means navigating complexity while maintaining strategic clarity. It requires building consensus among diverse stakeholders—from boards to regulators, from employees to communities—often with competing interests.

The most successful leaders I've observed share certain traits: they combine vision with execution discipline, they build strong teams and empower them, they maintain integrity through transparency, and they remain humble enough to learn from failures while confident enough to take bold decisions.

In emerging markets, the CEO must be both architect of strategy and champion of culture, driving transformation while managing the delicate balance of stakeholder expectations.`,
      readTime: '6 min read',
      published: true,
      publishedAt: new Date('2025-01-15'),
    },
    {
      title: 'Energy as the Cornerstone of African Economic Sovereignty',
      slug: "energy-as-the-cornerstone-of-african-economic-sovereignty",
      category: 'Africa',
      excerpt: "Without reliable, affordable energy, Africa's ambitious development goals will remain aspirational. Here's a roadmap for what must change.",
      content: `Africa's energy challenge is not just about electrification—it's about economic sovereignty. Without reliable, affordable power, our industries cannot compete globally, our healthcare systems cannot function effectively, and our youth cannot access the education they need to build the future.

The continent's energy trajectory will determine its economic destiny. Yet we remain at a crossroads: continue with status quo policies that perpetuate energy poverty, or embrace transformative solutions that unlock our vast potential.

Key priorities must include: accelerating renewable energy adoption to harness our abundant solar and wind resources; developing regional power pools to share resources across borders; attracting patient capital for infrastructure investment; and building local capacity for energy technology manufacturing and maintenance.

Energy access is not merely a utility issue—it's the foundation upon which industrial development, healthcare, education, and ultimately human prosperity are built.`,
      readTime: '9 min read',
      published: true,
      publishedAt: new Date('2024-11-01'),
    },
    {
      title: 'Why Board Governance Must Evolve for the African Context',
      slug: "why-board-governance-must-evolve-for-the-african-context",
      category: 'Corporate Governance',
      excerpt: 'Western governance frameworks, while instructive, require thoughtful adaptation to reflect African market realities, stakeholder dynamics, and cultural contexts.',
      content: `Corporate governance in Africa cannot be a simple transplant of Western models. Our boards must evolve to reflect the unique dynamics of operating on the continent—where family ownership structures coexist with institutional investors, where regulatory environments vary significantly across jurisdictions, and where stakeholder expectations extend beyond shareholders to include communities, employees, and governments.

Effective board governance in Africa requires balancing global best practices with local realities. It means ensuring boards have the right composition—with directors who understand the market, bring diverse perspectives, and have the courage to challenge management appropriately.

We must move beyond governance as compliance to governance as competitive advantage. Boards should be strategic assets, not just oversight mechanisms. They should drive transformation, challenge assumptions, and ensure organizations are positioned for long-term success while creating value for all stakeholders.

The evolution of African corporate governance will be a key determinant of whether the continent's businesses can attract global capital and compete on the world stage.`,
      readTime: '5 min read',
      published: true,
      publishedAt: new Date('2024-09-15'),
    },
  ],
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...')
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ce_website'
    await mongoose.connect(mongoUri)
    console.log('Connected!\n')

    // Clear existing data
    console.log('Clearing existing data...')
    await Project.deleteMany({})
    await Education.deleteMany({})
    await Foundation.deleteMany({})
    await BlogPost.deleteMany({})
    console.log('Cleared!\n')

    // Seed Projects
    console.log('Seeding Projects...')
    await Project.insertMany(seedData.projects)
    console.log(`✓ ${seedData.projects.length} projects`)

    // Seed Education
    console.log('Seeding Education...')
    await Education.insertMany(seedData.education)
    console.log(`✓ ${seedData.education.length} education entries`)

    // Seed Foundation
    console.log('Seeding Foundation...')
    await Foundation.insertMany(seedData.foundation)
    console.log(`✓ ${seedData.foundation.length} foundation entries`)

    // Seed Blog Posts
    console.log('Seeding Blog Posts...')
    await BlogPost.insertMany(seedData.blogPosts)
    console.log(`✓ ${seedData.blogPosts.length} blog posts`)

    console.log('\n✅ Database seeded successfully!')
    process.exit(0)
  } catch (err) {
    console.error('Error seeding database:', err)
    process.exit(1)
  }
}

seed()