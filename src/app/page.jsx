import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <main className="max-w-4xl w-full text-center">
        <h1 className="text-6xl font-extrabold mb-4 tracking-tight">
          VeXachat
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
          تواصل فوراً وبشكل آمن. انضم إلى المجتمع الذي يلبي احتياجاتك.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/signup" passHref>
            <button className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-300">
              ابدأ الآن
            </button>
          </Link>
          <Link href="/discover" passHref>
            <button className="px-8 py-3 text-lg font-semibold rounded-lg shadow-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition duration-300">
              اكتشف المجتمعات
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
