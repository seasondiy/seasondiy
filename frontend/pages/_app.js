import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import '../styles/globals.css'

// Global error boundary component
function ErrorBoundary({ children, hasError, error }) {
  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-gray-600 mb-4">
            عذراً، حدث خطأ أثناء تشغيل التطبيق
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      </div>
    )
  }

  return children
}

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { locale } = router
  const isArabic = locale === 'ar'

  useEffect(() => {
    // Set document direction based on locale
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    document.documentElement.lang = locale
  }, [locale, isArabic])

  // Global loading state
  useEffect(() => {
    const handleStart = () => {
      document.body.classList.add('loading')
    }
    const handleComplete = () => {
      document.body.classList.remove('loading')
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  // Global error handling
  useEffect(() => {
    const handleError = (event) => {
      console.error('Global error:', event.error)
      // You could send errors to a logging service here
    }

    const handleUnhandledRejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      // You could send errors to a logging service here
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return (
    <>
      <Head>
        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#667eea" />
        
        {/* SEO */}
        <meta name="description" content={
          isArabic 
            ? "تحليل الألوان الموسمية - اكتشف الألوان التي تناسبك وتبرز جمالك الطبيعي"
            : "Seasonal Color Analysis - Discover colors that complement you and enhance your natural beauty"
        } />
        <meta name="keywords" content={
          isArabic
            ? "تحليل الألوان, الألوان الموسمية, استشارة الألوان, جمال, أناقة"
            : "color analysis, seasonal colors, color consultation, beauty, style"
        } />
        <meta name="author" content="SeasonDIY Team" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={
          isArabic ? "SeasonDIY - تحليل الألوان الموسمية" : "SeasonDIY - Seasonal Color Analysis"
        } />
        <meta property="og:description" content={
          isArabic 
            ? "اكتشف الألوان التي تناسبك وتبرز جمالك الطبيعي"
            : "Discover colors that complement you and enhance your natural beauty"
        } />
        <meta property="og:site_name" content="SeasonDIY" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={
          isArabic ? "SeasonDIY - تحليل الألوان الموسمية" : "SeasonDIY - Seasonal Color Analysis"
        } />
        <meta name="twitter:description" content={
          isArabic 
            ? "اكتشف الألوان التي تناسبك وتبرز جمالك الطبيعي"
            : "Discover colors that complement you and enhance your natural beauty"
        } />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Fonts preload */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Arabic:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        
        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "SeasonDIY",
              "description": isArabic 
                ? "تحليل الألوان الموسمية - اكتشف الألوان التي تناسبك"
                : "Seasonal Color Analysis - Discover your perfect colors",
              "applicationCategory": "LifestyleApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            })
          }}
        />
      </Head>

      <ErrorBoundary>
        <div className={`min-h-screen ${isArabic ? 'arabic-text' : 'english-text'}`}>
          {/* Loading overlay */}
          <div id="loading-overlay" className="fixed inset-0 bg-white bg-opacity-90 z-50 hidden items-center justify-center">
            <div className="text-center">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p className="text-gray-600">
                {isArabic ? 'جاري التحميل...' : 'Loading...'}
              </p>
            </div>
          </div>

          {/* Main app content */}
          <Component {...pageProps} />
        </div>
      </ErrorBoundary>

      {/* Global styles for loading state */}
      <style jsx>{`
        body.loading #loading-overlay {
          display: flex !important;
        }
      `}</style>
    </>
  )
}

export default MyApp
