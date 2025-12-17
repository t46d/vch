"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  MessageSquare, 
  Video, 
  Shield, 
  Globe, 
  Users, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Rocket
} from 'lucide-react';

export default function HomePage() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // إنشاء جسيمات عائمة
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10,
        size: 2 + Math.random() * 3,
        color: ['#00F0FF', '#FF00C8', '#B500FF'][Math.floor(Math.random() * 3)]
      });
    }
    setParticles(newParticles);

    // تأثير Parallax للخلفية
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: MessageSquare,
      title: 'محادثة ذكية',
      description: 'أنظمة محادثة متقدمة مع دعم الوسائط والرسائل الصوتية'
    },
    {
      icon: Video,
      title: 'غرف فيديو حية',
      description: 'انضم إلى غرف فيديو جماعية أو خاصة لمحادثات حميمية'
    },
    {
      icon: Shield,
      title: 'أمان متكامل',
      description: 'تشفير كامل وخصوصية محمية مع تحكم كامل في بياناتك'
    },
    {
      icon: Globe,
      title: 'ترجمة فورية',
      description: 'تواصل مع أشخاص حول العالم مع ترجمة تلقائية'
    },
    {
      icon: Users,
      title: 'مجتمعات نشطة',
      description: 'انضم إلى مجتمعات تشارك اهتماماتك واهتماماتك'
    },
    {
      icon: Zap,
      title: 'أداء فائق',
      description: 'سرعة تحميل فائقة وتجربة مستخدم سلسة'
    }
  ];

  const stats = [
    { value: '50K+', label: 'مستخدم نشط', color: 'from-electric to-cyan-400' },
    { value: '1M+', label: 'رسالة يومياً', color: 'from-neon-pink to-pink-400' },
    { value: '15K+', label: 'صداقة جديدة', color: 'from-violet-500 to-purple-400' },
    { value: '4.9/5', label: 'تقييم المستخدمين', color: 'from-green-400 to-emerald-400' }
  ];

  const testimonials = [
    {
      name: 'أحمد محمد',
      role: 'مطور ويب',
      content: 'أفضل منصة شات استخدمتها! التصميم رائع والأداء مذهل.',
      avatar: 'AH'
    },
    {
      name: 'سارة عبدالله',
      role: 'مصممة جرافيك',
      content: 'المجتمعات النشطة والترجمة التلقائية جعلت التواصل أسهل.',
      avatar: 'SA'
    },
    {
      name: 'خالد فهد',
      role: 'طالب جامعي',
      content: 'الأمان والخصوصية ممتازة، أشعر بالراحة أثناء الاستخدام.',
      avatar: 'KH'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      
      {/* خلفية متحركة */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-dark" />
        
        {/* جسيمات عائمة */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${Math.random() * 100}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.color,
              opacity: 0.6,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
        
        {/* تأثيرات إضافية */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-electric/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-pink/5 rounded-full blur-3xl" />
      </div>

      {/* المحتوى الرئيسي */}
      <div className="relative z-10">
        
        {/* قسم البطل */}
        <section className="hero-section min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="hero-content text-center max-w-6xl mx-auto transition-transform duration-300">
            
            {/* شارة مميزة */}
            <div className="inline-flex items-center glass rounded-full px-4 py-2 mb-8 animate-glow">
              <Sparkles className="w-4 h-4 text-electric ml-2" />
              <span className="text-sm font-medium gradient-text">
                منصة الشات المستقبلية
              </span>
            </div>
            
            {/* العنوان الرئيسي */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="block text-white mb-2">تواصل</span>
              <span className="gradient-text animate-gradient bg-gradient-cyber">
                بلا حدود
              </span>
            </h1>
            
            {/* الوصف */}
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              انضم إلى مجتمع <span className="text-electric font-semibold">VeXaChat</span> 
              {' '}واستمتع بتجربة شات فريدة تجمع بين الأمان المتقدم والأداء المذهل والتصميم العصري
            </p>
            
            {/* أزرار الحث على الإجراء */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link 
                href="/signup" 
                className="group btn-primary px-8 py-4 text-lg font-bold rounded-2xl inline-flex items-center"
              >
                <span>ابدأ مجاناً</span>
                <ArrowRight className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                href="/discover"
                className="group glass px-8 py-4 text-lg font-medium rounded-2xl inline-flex items-center hover:glass-strong transition-all"
              >
                <span>استكشف المميزات</span>
                <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              </Link>
            </div>
            
            {/* ميزات سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { text: 'بدون إعلانات', icon: CheckCircle },
                { text: 'مجاني للأبد', icon: Star },
                { text: 'تشغيل فوري', icon: Zap },
                { text: 'أمان كامل', icon: Shield }
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center justify-center p-3 rounded-xl bg-white/5">
                    <Icon className="w-4 h-4 text-electric ml-2" />
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* قسم الإحصائيات */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="card text-center p-8 hover:scale-[1.02] transition-transform"
                >
                  <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-4`}>
                    {stat.value}
                  </div>
                  <p className="text-gray-300 text-lg">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم المميزات */}
        <section id="features" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-white">مميزات</span>{' '}
                <span className="gradient-text">فريدة</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                كل ما تحتاجه لتجربة شات استثنائية في مكان واحد
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="card group p-8 hover:shadow-neon transition-all duration-500"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-gradient-neon flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-dark-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Link 
                        href="/discover" 
                        className="inline-flex items-center text-electric hover:text-electric-dark transition-colors"
                      >
                        <span>تعرف أكثر</span>
                        <ArrowRight className="w-4 h-4 mr-2" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* قسم آراء المستخدمين */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">يقولون</span>{' '}
                <span className="text-white">عنّا</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                انضم إلى آلاف المستخدمين السعداء حول العالم
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass rounded-2xl p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-gradient-neon flex items-center justify-center">
                      <span className="font-bold text-dark-900">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div className="mr-4">
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم الحث النهائي */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass-strong rounded-3xl p-12">
              <Rocket className="w-16 h-16 text-electric mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                مستعد <span className="gradient-text">للانطلاق؟</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                انضم إلى مجتمع VeXaChat الآن وابدأ رحلة تواصل فريدة
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/signup" 
                  className="btn-primary px-10 py-5 text-xl font-bold rounded-2xl inline-flex items-center justify-center"
                >
                  <span>سجل مجاناً</span>
                  <Rocket className="w-6 h-6 mr-2" />
                </Link>
                
                <Link 
                  href="/login"
                  className="glass px-10 py-5 text-xl font-medium rounded-2xl inline-flex items-center justify-center hover:glass-strong transition-all"
                >
                  <span>لديك حساب؟</span>
                  <ArrowRight className="w-6 h-6 mr-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* الفوتر المبسط */}
        <footer className="py-10 px-4 border-t border-white/10">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <Link href="/" className="flex items-center space-x-2 space-x-reverse">
                  <div className="w-10 h-10 rounded-xl bg-gradient-cyber flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-dark-900" />
                  </div>
                  <span className="text-xl font-bold gradient-text">VeXaChat</span>
                </Link>
              </div>
              
              <div className="flex gap-6 mb-6 md:mb-0">
                <Link href="/security" className="text-gray-400 hover:text-electric transition-colors">
                  الأمان
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-electric transition-colors">
                  الخصوصية
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-electric transition-colors">
                  الشروط
                </Link>
                <a href="mailto:vexa@vexachat.world" className="text-gray-400 hover:text-electric transition-colors">
                  تواصل معنا
                </a>
              </div>
              
              <div className="text-gray-500 text-sm">
                © {new Date().getFullYear()} VeXaChat. جميع الحقوق محفوظة.
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* أنماط CSS الإضافية */}
      <style jsx global>{`
        .hero-section {
          background: linear-gradient(
            180deg,
            rgba(10, 10, 10, 0.8) 0%,
            rgba(10, 10, 10, 0.6) 50%,
            rgba(10, 10, 10, 0.8) 100%
          );
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .card {
          opacity: 0;
          animation: fadeUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
