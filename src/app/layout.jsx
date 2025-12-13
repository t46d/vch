import '../globals.css';

export const metadata = {
  title: 'VeXachat - Advanced Social Dating Platform',
  description: 'Experience the future of social dating with immersive chat experiences and unlimited possibilities',
  keywords: ['social dating', 'chat platform', 'vexa', 'dating app', 'social network'],
  authors: [{ name: 'VeXachat Team' }],
  openGraph: {
    type: 'website',
    url: 'https://vexachat.vercel.app',
    title: 'VeXachat - Connect Beyond Limits',
    description: 'Experience the future of social dating',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* إضافة خط Inter للتصميم */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
