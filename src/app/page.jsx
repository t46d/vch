import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white px-4">
      <h1 className="text-6xl font-bold gradient-text mb-6">
        VeXachat
      </h1>
      <p className="text-2xl text-gray-400 mb-8 text-center max-w-2xl">
        Experience the future of social dating with AI-powered matching and immersive chat experiences
      </p>
      
      <div className="flex gap-4">
        <Link 
          href="/signup"
          className="px-8 py-3 bg-gradient-neon text-black font-bold rounded-lg shadow-neon hover:scale-105 transition-transform"
        >
          Get Started Free
        </Link>
        <Link 
          href="/login"
          className="px-8 py-3 glass text-white font-bold rounded-lg hover:scale-105 transition-transform"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
