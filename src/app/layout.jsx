import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/Header'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VeXachat | Immersive AI Social Platform',
  description: 'Advanced dating and social platform with 3D experiences',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white antialiased selection:bg-purple-500/30`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow pt-16">
            {children}
          </main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
