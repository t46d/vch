import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/bg-stars.png" as="image" />
        <style>{`
          body {
            background: url('/bg-stars.png') no-repeat center center fixed;
            background-size: cover;
          }
        `}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
