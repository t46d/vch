// src/app/layout.jsx

// ❌ تم تصحيح هذا الخطأ (كان: '@/app/globals.css')
// هذا يفترض أن ملف globals.css موجود في src/globals.css
import '@/globals.css'; 

// ❌ تم تصحيح هذا الخطأ (كان: '@/components/common/Header')
// هذا يفترض أن ملف Header موجود في src/components/Header.jsx
import Header from '@/components/Header'; 
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VeXachat',
  description: 'AI powered chat and consultation platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen relative bg-gray-900">
            {/* عرض الهيدر فقط إذا كنت بحاجة إليه في كل الصفحات */}
            <Header /> 
            
            <main className="flex-grow">
                {children}
            </main>

            {/* يمكنك إضافة Footer هنا إذا كان لديك */}
        </div>
      </body>
    </html>
  );
}
