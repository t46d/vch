"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        size: 2 + Math.random() * 3,
        color: ['#00F0FF', '#FF00C8', '#B500FF'][Math.floor(Math.random() * 3)]
      });
    }
    setParticles(newParticles);
  }, []);

  const features = [
    { icon: '💬', title: 'Unlimited Chatting', description: 'Chat without limits, share media, voice messages' },
    { icon: '🎥', title: 'Video Calls', description: 'HD video calls and group rooms' },
    { icon: '🔒', title: 'Private & Secure', description: 'End-to-end encryption, self-destructing messages' },
    { icon: '🌎', title: 'Global Community', description: 'Meet people from around the world' },
    { icon: '✨', title: 'Premium Features', description: 'Exclusive features for premium members' },
    { icon: '⚡', title: 'Fast & Smooth', description: 'Lightning fast messaging experience' },
  ];

  const testimonials = [
    { name: 'Sophia', age: 24, country: 'USA', content: 'Best chat platform ever! Met amazing people here.', avatar: 'S' },
    { name: 'Emma', age: 22, country: 'Canada', content: 'The video quality is amazing and the community is friendly.', avatar: 'E' },
    { name: 'Isabella', age: 25, country: 'UK', content: 'Love the privacy features and easy to use interface.', avatar: 'I' },
    { name: 'Olivia', age: 23, country: 'Australia', content: 'Made real connections here. Highly recommended!', avatar: 'O' },
    { name: 'Ava', age: 21, country: 'Germany', content: 'The best social platform for adults. 10/10!', avatar: 'A' },
    { name: 'Mia', age: 26, country: 'France', content: 'Perfect for meeting like-minded people.', avatar: 'M' },
  ];

  const stats = [
    { value: '500K+', label: 'Active Users' },
    { value: '10M+', label: 'Daily Messages' },
    { value: '50K+', label: 'New Matches Daily' },
    { value: '4.8★', label: 'User Rating' },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-bold gradient-text">VeXaChat</div>
          <nav className="flex gap-6">
            <Link href="/discover" className="hover:text-purple-300">Discover</Link>
            <Link href="/login" className="bg-purple-600 px-6 py-2 rounded-full hover:bg-purple-700">Login</Link>
            <Link href="/signup" className="bg-pink-600 px-6 py-2 rounded-full hover:bg-pink-700">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-6xl font-bold mb-6">Connect Beyond Boundaries</h1>
        <p className="text-xl mb-10 text-gray-300 max-w-2xl mx-auto">
          The ultimate chat platform for adults 18+ where you can meet, chat, and connect with amazing people worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup" className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-full text-lg font-bold hover:scale-105 transition">
            Start Free Trial
          </Link>
          <Link href="/discover" className="border border-purple-500 px-8 py-3 rounded-full text-lg hover:bg-purple-500/20 transition">
            Explore Features
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Premium Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 p-8 rounded-2xl backdrop-blur-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((user, index) => (
            <div key={index} className="bg-white/5 p-6 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-bold">{user.name}, {user.age}</div>
                  <div className="text-sm text-gray-400">{user.country}</div>
                </div>
              </div>
              <p className="text-gray-300">"{user.content}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-white/10 text-center">
        <div className="text-gray-400 text-sm">
          <p>© 2024 VeXaChat. For adults 18+ only.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/safety" className="hover:text-white">Safety</Link>
            <Link href="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
