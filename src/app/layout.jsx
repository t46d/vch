import './globals.css';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata = {
  title: 'VeXaChat | Future Chat Platform',
  description: 'Advanced adult chat platform for people 18+',
  keywords: ['chat', 'dating', 'social', 'adult', 'messaging', '18+'],
  authors: [{ name: 'VeXaChat Team' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#FF00C8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload Critical Assets */}
        <link rel="preload" href="/bg-stars.png" as="image" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#FF00C8" />
        
        {/* Open Graph */}
        <meta property="og:title" content="VeXaChat | Adult Chat Platform" />
        <meta property="og:description" content="Connect with amazing people worldwide on our advanced chat platform for adults 18+" />
        <meta property="og:image" content="https://vexachat.world/og-image.png" />
        <meta property="og:url" content="https://vexachat.world" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="VeXaChat | Future Chat Platform" />
        <meta name="twitter:description" content="Advanced chat platform for adults 18+" />
        <meta name="twitter:image" content="https://vexachat.world/twitter-image.png" />
        <meta name="twitter:site" content="@vexachat" />
        
        {/* Performance Optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Critical CSS */}
        <style>{`
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          img {
            content-visibility: auto;
          }
          
          input, textarea, select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }
          
          /* Age warning */
          .age-warning {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(90deg, #FF0000, #FF4500);
            color: white;
            text-align: center;
            padding: 12px;
            font-size: 14px;
            font-weight: bold;
            z-index: 10000;
            box-shadow: 0 -4px 20px rgba(255, 0, 0, 0.3);
          }
          
          .age-warning::before {
            content: "🔞 ";
          }
        `}</style>
      </head>
      <body className="bg-gradient-dark bg-fixed bg-cover bg-center bg-no-repeat overflow-x-hidden"
            style={{backgroundImage: "url('/bg-stars.png')"}}>
        
        {/* Age Warning - Always visible */}
        <div className="age-warning">
          WARNING: This platform is for ADULTS 18+ ONLY. By continuing, you confirm you are 18+ years old.
        </div>
        
        {/* Language Switcher */}
        <LanguageSwitcher />
        
        {/* Overlay for better contrast */}
        <div className="fixed inset-0 bg-gradient-to-b from-dark-950/80 via-dark-900/60 to-dark-800/40 pointer-events-none" />
        
        {/* Floating Elements */}
        <div className="fixed top-0 left-0 w-96 h-96 bg-electric/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="fixed bottom-0 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -z-10 animate-pulse delay-500" />
        
        {/* Main Container */}
        <div className="relative z-10 min-h-screen flex flex-col pt-4">
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        {/* Loading Indicator */}
        <div id="loading-indicator" className="fixed top-4 left-1/2 -translate-x-1/2 hidden">
          <div className="w-8 h-8 border-2 border-electric border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Notification Area */}
        <div id="notifications" className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md"></div>
        
        {/* Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const loader = document.getElementById('loading-indicator');
                setTimeout(() => {
                  if (loader) loader.classList.add('hidden');
                }, 100);
                document.body.classList.add('loaded');
              });
              
              // Age verification reminder
              const ageWarning = document.querySelector('.age-warning');
              if (ageWarning) {
                ageWarning.addEventListener('click', function() {
                  this.style.display = 'none';
                });
                
                // Auto-hide after 10 seconds
                setTimeout(() => {
                  ageWarning.style.opacity = '0.7';
                }, 10000);
              }
              
              // Save language preference
              const langSelect = document.querySelector('select');
              if (langSelect) {
                const savedLang = localStorage.getItem('vexachat-lang');
                if (savedLang) {
                  langSelect.value = savedLang;
                }
                langSelect.addEventListener('change', function() {
                  localStorage.setItem('vexachat-lang', this.value);
                  window.location.reload();
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
