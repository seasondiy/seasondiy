import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { locale } = router
  const isArabic = locale === 'ar'
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  const content = {
    ar: {
      title: 'SeasonDIY - تحليل الألوان الموسمية',
      subtitle: 'اكتشف الألوان التي تناسبك وتبرز جمالك الطبيعي',
      description: 'خدمة تحليل الألوان الموسمية باستخدام الذكاء الاصطناعي لمساعدتك في اختيار الألوان المناسبة لبشرتك ولون شعرك',
      features: {
        title: 'مميزات الخدمة',
        items: [
          {
            title: 'تحليل دقيق',
            description: 'تحليل متقدم باستخدام الذكاء الاصطناعي لتحديد موسمك الطبيعي',
            icon: '🎯'
          },
          {
            title: 'لوحة ألوان شخصية',
            description: 'احصل على لوحة ألوان مخصصة تناسب نوع بشرتك',
            icon: '🎨'
          },
          {
            title: 'نصائح الأناقة',
            description: 'نصائح شخصية لاختيار الملابس والمكياج المناسب',
            icon: '💄'
          },
          {
            title: 'تقرير PDF',
            description: 'تقرير شامل قابل للتحميل والطباعة',
            icon: '📄'
          }
        ]
      },
      seasons: {
        title: 'الفصول الطبيعية',
        subtitle: 'اكتشف أي من الفصول الاثني عشر يناسبك',
        spring: 'الربيع',
        summer: 'الصيف', 
        autumn: 'الخريف',
        winter: 'الشتاء'
      },
      cta: {
        primary: 'ابدأ التحليل الآن',
        secondary: 'تعرف على المزيد'
      },
      steps: {
        title: 'كيف يعمل التحليل؟',
        items: [
          {
            step: '1',
            title: 'ارفع صورتك',
            description: 'ارفع صورة واضحة لوجهك في إضاءة طبيعية'
          },
          {
            step: '2', 
            title: 'التحليل الآلي',
            description: 'سيقوم الذكاء الاصطناعي بتحليل ألوان بشرتك'
          },
          {
            step: '3',
            title: 'احصل على النتائج',
            description: 'استلم تقريرك الشخصي مع لوحة الألوان المناسبة'
          }
        ]
      }
    },
    en: {
      title: 'SeasonDIY - Seasonal Color Analysis',
      subtitle: 'Discover colors that complement you and enhance your natural beauty',
      description: 'AI-powered seasonal color analysis service to help you choose the right colors for your skin tone and hair color',
      features: {
        title: 'Service Features',
        items: [
          {
            title: 'Accurate Analysis',
            description: 'Advanced AI analysis to determine your natural season',
            icon: '🎯'
          },
          {
            title: 'Personal Color Palette',
            description: 'Get a customized color palette that suits your skin type',
            icon: '🎨'
          },
          {
            title: 'Style Tips',
            description: 'Personal tips for choosing appropriate clothing and makeup',
            icon: '💄'
          },
          {
            title: 'PDF Report',
            description: 'Comprehensive downloadable and printable report',
            icon: '📄'
          }
        ]
      },
      seasons: {
        title: 'Natural Seasons',
        subtitle: 'Discover which of the twelve seasons suits you',
        spring: 'Spring',
        summer: 'Summer',
        autumn: 'Autumn', 
        winter: 'Winter'
      },
      cta: {
        primary: 'Start Analysis Now',
        secondary: 'Learn More'
      },
      steps: {
        title: 'How does the analysis work?',
        items: [
          {
            step: '1',
            title: 'Upload Your Photo',
            description: 'Upload a clear photo of your face in natural lighting'
          },
          {
            step: '2',
            title: 'AI Analysis', 
            description: 'AI will analyze your skin colors'
          },
          {
            step: '3',
            title: 'Get Results',
            description: 'Receive your personal report with suitable color palette'
          }
        ]
      }
    }
  }

  const t = content[locale] || content.ar

  const seasonColors = {
    spring: 'bg-gradient-spring',
    summer: 'bg-gradient-summer', 
    autumn: 'bg-gradient-autumn',
    winter: 'bg-gradient-winter'
  }

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
      </Head>

      <div className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur-lg z-40 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0">
                <span className="text-2xl font-bold text-gradient">SeasonDIY</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/', '/', { locale: locale === 'ar' ? 'en' : 'ar' })}
                  className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  {locale === 'ar' ? 'English' : 'العربية'}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-20 pb-16 bg-gradient-primary text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                {isArabic ? 'اكتشف ألوانك المثالية' : 'Discover Your Perfect Colors'}
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-slide-up">
                {t.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                <Link href="/upload" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                  {t.cta.primary}
                </Link>
                <button className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                  {t.cta.secondary}
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-bounce-slow"></div>
            <div className="absolute top-40 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse-slow"></div>
            <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce-slow"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.features.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.features.items.map((feature, index) => (
                <div key={index} className="card p-6 text-center hover:scale-105 transition-transform">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.steps.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {t.steps.items.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Seasons Preview */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {t.seasons.title}
              </h2>
              <p className="text-xl text-gray-600">
                {t.seasons.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(seasonColors).map(([season, gradient]) => (
                <div key={season} className={`${gradient} rounded-2xl p-8 text-white text-center hover:scale-105 transition-transform cursor-pointer`}>
                  <h3 className="text-2xl font-bold">
                    {t.seasons[season]}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-secondary text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isArabic ? 'جاهز لاكتشاف ألوانك؟' : 'Ready to discover your colors?'}
            </h2>
            <p className="text-xl mb-8 opacity-90">
              {isArabic 
                ? 'ابدأ رحلتك نحو اكتشاف الألوان التي تبرز جمالك الطبيعي'
                : 'Start your journey to discover colors that enhance your natural beauty'
              }
            </p>
            <Link href="/upload" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
              {t.cta.primary}
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-4">SeasonDIY</div>
              <p className="text-gray-400 mb-6">
                {isArabic 
                  ? 'خدمة تحليل الألوان الموسمية باستخدام الذكاء الاصطناعي'
                  : 'AI-powered seasonal color analysis service'
                }
              </p>
              <div className="flex justify-center space-x-6">
                <button 
                  onClick={() => router.push('/', '/', { locale: locale === 'ar' ? 'en' : 'ar' })}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {locale === 'ar' ? 'English' : 'العربية'}
                </button>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400 text-sm">
                © 2024 SeasonDIY. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
