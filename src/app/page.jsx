"use client";

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Generate floating particles
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      
      // Random colors
      const colors = ['rgba(0, 240, 255, 0.6)', 'rgba(255, 0, 200, 0.6)', 'rgba(181, 0, 255, 0.6)'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      particlesContainer.appendChild(particle);
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Add parallax effect to hero
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-content');
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 800);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '🤖',
      title: 'Intelligent Matching',
      description: 'Advanced algorithms connect you with compatible people instantly.'
    },
    {
      icon: '💬',
      title: 'Unlimited Messaging',
      description: 'Free and premium chat with rich media support, voice notes, and video calls.'
    },
    {
      icon: '🎥',
      title: 'Live Video Rooms',
      description: 'Join group video sessions or private rooms for intimate conversations.'
    },
    {
      icon: '🔒',
      title: 'Privacy First',
      description: 'End-to-end encryption and complete control over your data.'
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Connect with people worldwide with automatic translation.'
    },
    {
      icon: '⭐',
      title: 'Expert Consultants',
      description: 'Access professional relationship advisors and certified consultants.'
    }
  ];

  return (
    <div className="vexachat-home">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      
      {/* Floating Particles */}
      <div className="particles" id="particles"></div>

      {/* Header */}
      <header>
        <div className="header-content">
          <div className="logo">VeXachat</div>
          <nav>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <Link href="/login">Sign In</Link>
            <Link 
              href="/signup" 
              className="signup-btn"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Connect Beyond Limits</h1>
          <p>Experience the future of social dating with immersive chat experiences and unlimited possibilities.</p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn btn-primary">Get Started Free</Link>
            <a href="#features" className="btn btn-secondary">Explore Features</a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          <div className="stat-item">
            <h3>50K+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-item">
            <h3>1M+</h3>
            <p>Messages Sent</p>
          </div>
          <div className="stat-item">
            <h3>15K+</h3>
            <p>Matches Made</p>
          </div>
          <div className="stat-item">
            <h3>4.9/5</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} VeXachat. All rights reserved.</p>
        <div>
          <Link href="/security">Security</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <a href="mailto:vexa@vexachat.world">Contact</a>
        </div>
      </footer>
    </div>
  );
}
