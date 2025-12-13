import '../globals.css';

export const metadata = {
  title: 'VeXachat - Advanced Social Dating Platform',
  description: 'Experience the future of social dating with AI-powered matching and immersive chat experiences',
  keywords: ['dating', 'social', 'AI matching', 'chat', 'vexa'],
  authors: [{ name: 'VeXachat Team' }],
  openGraph: {
    type: 'website',
    url: 'https://vexachat.vercel.app',
    title: 'VeXachat',
    description: 'Advanced social dating platform',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
