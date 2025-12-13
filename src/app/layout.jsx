import '../globals.css';

export const metadata = {
  title: 'VeXachat - Advanced Social Dating Platform',
  description: 'Experience the future of social dating',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
