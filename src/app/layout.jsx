import './globals.css';

export const metadata = {
  title: 'VeXaChat | منصة الشات المستقبلية',
  description: 'منصة شات متقدمة بتصميم عصري وتجربة مستخدم فريدة',
  keywords: ['شات', 'دردشة', 'تواصل', 'مجتمع', 'محادثة'],
  authors: [{ name: 'VeXaChat Team' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#00F0FF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        {/* Preload Critical Assets */}
        <link rel="preload" href="/bg-stars.png" as="image" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#00F0FF" />
        
        {/* Open Graph */}
        <meta property="og:title" content="VeXaChat | منصة الشات المستقبلية" />
        <meta property="og:description" content="انضم إلى مجتمع VeXaChat وتواصل مع الأصدقاء في بيئة آمنة ومتطورة" />
        <meta property="og:image" content="https://vexachat.world/og-image.png" />
        <meta property="og:url" content="https://vexachat.world" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ar_AR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VeXaChat | منصة الشات المستقبلية" />
        <meta name="twitter:description" content="منصة شات متقدمة بتصميم عصري وتجربة مستخدم فريدة" />
        <meta name="twitter:image" content="https://vexachat.world/twitter-image.png" />
        <meta name="twitter:site" content="@vexachat" />
        
        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS */}
        <style>{`
          /* تحسينات الأداء */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* تحسين تحميل الصور */
          img {
            content-visibility: auto;
          }
          
          /* إخفاء الشريط الأزرق على iOS */
          input, textarea, select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
        `}</style>
      </head>
      <body className="bg-gradient-dark bg-fixed bg-cover bg-center bg-no-repeat overflow-x-hidden"
            style={{backgroundImage: "url('/bg-stars.png')"}}>
        
        {/* Overlay تحسين التباين */}
        <div className="fixed inset-0 bg-gradient-to-b from-dark-950/80 via-dark-900/60 to-dark-800/40 pointer-events-none" />
        
        {/* Floating Elements للتصميم */}
        <div className="fixed top-0 left-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-500" />
        
        {/* Main Container */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Navigation سيضاف لاحقاً */}
          {/* <Navbar /> */}
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer سيضاف لاحقاً */}
          {/* <Footer /> */}
        </div>
        
        {/* Loading States */}
        <div id="loading-indicator" className="fixed top-4 left-1/2 -translate-x-1/2 hidden">
          <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Notification Area */}
        <div id="notifications" className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md"></div>
        
        {/* Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // متابعة حالة التحميل
              document.addEventListener('DOMContentLoaded', function() {
                const loader = document.getElementById('loading-indicator');
                
                // إخفاء Loader بعد التحميل
                setTimeout(() => {
                  if (loader) loader.classList.add('hidden');
                }, 100);
                
                // إضافة فئة للـ body عند التحميل
                document.body.classList.add('loaded');
              });
              
              // متابعة حالة الاتصال
              window.addEventListener('online', () => {
                document.body.classList.remove('offline');
                document.body.classList.add('online');
              });
              
              window.addEventListener('offline', () => {
                document.body.classList.remove('online');
                document.body.classList.add('offline');
              });
            `
          }}
        />
      </body>
    </html>
  );
}
