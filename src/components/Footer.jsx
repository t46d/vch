// src/components/Footer.jsx
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark-950/70 border-t border-gray-800/50 py-6 mt-12">
      <div className="container mx-auto text-center text-gray-500 text-sm">
        <p>
          &copy; {new Date().getFullYear()} VeXachat. All rights reserved. 
          Powered by{' '}
          <span className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
            AI & Cyberpunk Aesthetics.
          </span>
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <Link href="/terms" className="hover:text-cyan-400">Terms</Link>
          <span className="text-gray-700">|</span>
          <Link href="/privacy" className="hover:text-cyan-400">Privacy</Link>
          <span className="text-gray-700">|</span>
          <Link href="/support" className="hover:text-cyan-400">Support</Link>
        </div>
      </div>
    </footer>
  );
}