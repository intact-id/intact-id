import { useState } from 'react';
import './Blog.css';

const Blog = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const categories = [
        { id: 'all', label: 'All Posts' },
        { id: 'industry', label: 'Industry Insights' },
        { id: 'best-practices', label: 'Best Practices' },
        { id: 'product', label: 'Product Updates' },
        { id: 'compliance', label: 'Compliance' }
    ];

    const blogPosts = [
        {
            id: 1,
            category: 'industry',
            title: 'The Future of Digital Identity Verification in 2025',
            excerpt: 'Explore emerging trends in biometric authentication, AI-powered fraud detection, and the shift towards decentralized identity solutions.',
            author: 'Sarah Chen',
            role: 'Chief Product Officer',
            date: 'Nov 25, 2025',
            readTime: '8 min read',
            image: '🔮',
            tags: ['AI', 'Biometrics', 'Trends']
        },
        {
            id: 2,
            category: 'compliance',
            title: 'Understanding KYC Compliance Across Different Regions',
            excerpt: 'A comprehensive guide to navigating KYC/AML regulations in the EU, US, Asia-Pacific, and emerging markets.',
            author: 'Michael Rodriguez',
            role: 'Compliance Director',
            date: 'Nov 22, 2025',
            readTime: '12 min read',
            image: '⚖️',
            tags: ['KYC', 'AML', 'Regulations']
        },
        {
            id: 3,
            category: 'product',
            title: 'Introducing Enhanced Liveness Detection 2.0',
            excerpt: 'Our latest update brings 3D depth mapping and advanced anti-spoofing capabilities to prevent sophisticated fraud attempts.',
            author: 'David Kim',
            role: 'Engineering Lead',
            date: 'Nov 20, 2025',
            readTime: '5 min read',
            image: '🚀',
            tags: ['Product', 'Security', 'Update']
        },
        {
            id: 4,
            category: 'best-practices',
            title: 'Optimizing Verification Flow for Better Conversion',
            excerpt: 'Learn how to reduce drop-off rates during identity verification with UX best practices and smart implementation strategies.',
            author: 'Emma Thompson',
            role: 'UX Research Lead',
            date: 'Nov 18, 2025',
            readTime: '10 min read',
            image: '📊',
            tags: ['UX', 'Conversion', 'Best Practices']
        },
        {
            id: 5,
            category: 'industry',
            title: 'How FinTech Companies Are Fighting Identity Fraud',
            excerpt: 'Case studies from leading digital banks and payment platforms on implementing multi-layered fraud prevention.',
            author: 'James Wilson',
            role: 'Security Analyst',
            date: 'Nov 15, 2025',
            readTime: '7 min read',
            image: '🛡️',
            tags: ['FinTech', 'Fraud', 'Security']
        },
        {
            id: 6,
            category: 'compliance',
            title: 'GDPR and Identity Verification: What You Need to Know',
            excerpt: 'Essential guidelines for handling personal data during verification processes while staying GDPR compliant.',
            author: 'Sophie Martin',
            role: 'Legal Counsel',
            date: 'Nov 12, 2025',
            readTime: '9 min read',
            image: '🔒',
            tags: ['GDPR', 'Privacy', 'Data Protection']
        },
        {
            id: 7,
            category: 'product',
            title: 'New SDK Release: Python 3.0 with Async Support',
            excerpt: 'Faster integration and improved performance with our redesigned Python SDK featuring async/await patterns.',
            author: 'Alex Chen',
            role: 'Developer Relations',
            date: 'Nov 10, 2025',
            readTime: '6 min read',
            image: '💻',
            tags: ['SDK', 'Python', 'Developer']
        },
        {
            id: 8,
            category: 'best-practices',
            title: 'Building Trust: The Psychology of Identity Verification',
            excerpt: 'Understanding user behavior and designing verification experiences that build confidence and reduce anxiety.',
            author: 'Dr. Lisa Anderson',
            role: 'Behavioral Scientist',
            date: 'Nov 8, 2025',
            readTime: '11 min read',
            image: '🧠',
            tags: ['Psychology', 'UX', 'Trust']
        },
        {
            id: 9,
            category: 'industry',
            title: 'The Rise of Decentralized Identity Solutions',
            excerpt: 'Exploring blockchain-based identity systems and their potential to revolutionize digital verification.',
            author: 'Robert Chang',
            role: 'Innovation Director',
            date: 'Nov 5, 2025',
            readTime: '8 min read',
            image: '⛓️',
            tags: ['Blockchain', 'Web3', 'Innovation']
        }
    ];

    const filteredPosts = activeFilter === 'all'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeFilter);

    return (
        <div className="blog-wrapper">
            {/* Hero Section */}
            <section className="blog-hero">
                <div className="blog-hero-content">
                    <div className="blog-badge">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <rect x="2" y="3" width="12" height="10" rx="1" stroke="url(#blogBadge)" strokeWidth="1.5" />
                            <path d="M5 6H11M5 9H9" stroke="url(#blogBadge)" strokeWidth="1.5" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="blogBadge">
                                    <stop offset="0%" stopColor="#6366F1" />
                                    <stop offset="100%" stopColor="#8B5CF6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        Resources & Insights
                    </div>
                    <h1 className="blog-hero-title">
                        Stay Informed About
                        <span className="gradient-text"> Identity Verification</span>
                    </h1>
                    <p className="blog-hero-description">
                        Expert insights, industry trends, compliance guides, and product updates
                        to help you build secure and compliant verification systems.
                    </p>
                </div>
            </section>

            {/* Filter Section */}
            <section className="blog-filter-section">
                <div className="blog-container">
                    <div className="filter-tabs">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`filter-tab ${activeFilter === category.id ? 'active' : ''}`}
                                onClick={() => setActiveFilter(category.id)}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="blog-posts-section">
                <div className="blog-container">
                    <div className="blog-grid">
                        {filteredPosts.map(post => (
                            <article key={post.id} className="blog-card">
                                <div className="blog-card-image">
                                    <span className="blog-emoji">{post.image}</span>
                                    <div className="blog-category-badge">{categories.find(c => c.id === post.category)?.label}</div>
                                </div>

                                <div className="blog-card-content">
                                    <h3 className="blog-card-title">{post.title}</h3>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>

                                    <div className="blog-card-tags">
                                        {post.tags.map((tag, index) => (
                                            <span key={index} className="blog-tag">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="blog-card-footer">
                                        <div className="blog-author">
                                            <div className="author-avatar">
                                                {post.author.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="author-info">
                                                <div className="author-name">{post.author}</div>
                                                <div className="author-role">{post.role}</div>
                                            </div>
                                        </div>
                                        <div className="blog-meta">
                                            <span className="blog-date">{post.date}</span>
                                            <span className="blog-dot">•</span>
                                            <span className="blog-read-time">{post.readTime}</span>
                                        </div>
                                    </div>

                                    <button className="read-more-btn">
                                        Read Article
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="newsletter-section">
                <div className="newsletter-container">
                    <div className="newsletter-content">
                        <div className="newsletter-icon">
                            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path d="M6 12L24 24L42 12M6 12V36C6 37.1046 6.89543 38 8 38H40C41.1046 38 42 37.1046 42 36V12M6 12C6 10.8954 6.89543 10 8 10H40C41.1046 10 42 10.8954 42 12"
                                    stroke="url(#newsletterGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                <defs>
                                    <linearGradient id="newsletterGrad">
                                        <stop offset="0%" stopColor="#6366F1" />
                                        <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <h2 className="newsletter-title">Stay Updated</h2>
                        <p className="newsletter-description">
                            Get the latest insights, product updates, and compliance guides delivered to your inbox.
                        </p>
                        <form className="newsletter-form">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="newsletter-input"
                            />
                            <button type="submit" className="newsletter-btn">
                                Subscribe
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
