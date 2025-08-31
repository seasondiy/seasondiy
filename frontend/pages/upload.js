import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'

export default function Upload() {
  const router = useRouter()
  const { locale } = router
  const isArabic = locale === 'ar'
  const fileInputRef = useRef(null)
  
  const [mounted, setMounted] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [qualityCheck, setQualityCheck] = useState(null)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(1) // 1: upload, 2: preview & quality, 3: analyzing

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const content = {
    ar: {
      title: 'رفع الصورة - تحليل الألوان الموسمية',
      heading: 'ارفع صورتك للتحليل',
      subtitle: 'ارفع صورة واضحة لوجهك في إضاءة طبيعية للحصول على أفضل النتائج',
      dragText: 'اسحب الصورة هنا أو انقر للاختيار',
      fileTypes: 'JPG, PNG, WEBP (حد أقصى 10 ميجابايت)',
      guidelines: {
        title: 'إرشادات الصورة المثالية',
        items: [
          'استخدم إضاءة طبيعية من النافذة',
          'تأكد من وضوح الوجه بدون ظلال قوية',
          'استخدم خلفية بسيطة وموحدة',
          'تجنب استخدام المكياج الثقيل',
          'انظر مباشرة إلى الكاميرا'
        ]
      },
      buttons: {
        analyze: 'تحليل الصورة',
        newPhoto: 'اختر صورة جديدة',
        back: 'العودة للخلف'
      },
      quality: {
        title: 'فحص جودة الصورة',
        excellent: 'ممتازة',
        good: 'جيدة', 
        fair: 'مقبولة',
        poor: 'ضعيفة',
        warnings: 'تحذيرات',
        recommendations: 'التوصيات'
      },
      analyzing: {
        title: 'جاري تحليل صورتك...',
        steps: [
          'فحص جودة الصورة',
          'تحليل ألوان البشرة',
          'تحديد الموسم الطبيعي',
          'إنشاء لوحة الألوان'
        ]
      },
      errors: {
        fileSize: 'حجم الملف كبير جداً (الحد الأقصى 10 ميجابايت)',
        fileType: 'نوع الملف غير مدعوم. يرجى استخدام JPG أو PNG أو WEBP',
        uploadFailed: 'فشل في رفع الصورة. يرجى المحاولة مرة أخرى',
        analysisFailed: 'فشل في تحليل الصورة. يرجى المحاولة مرة أخرى',
        networkError: 'خطأ في الاتصال. يرجى التحقق من اتصال الإنترنت'
      }
    },
    en: {
      title: 'Upload Photo - Seasonal Color Analysis',
      heading: 'Upload Your Photo for Analysis',
      subtitle: 'Upload a clear photo of your face in natural lighting for best results',
      dragText: 'Drag image here or click to select',
      fileTypes: 'JPG, PNG, WEBP (max 10MB)',
      guidelines: {
        title: 'Perfect Photo Guidelines',
        items: [
          'Use natural lighting from a window',
          'Ensure face is clear without harsh shadows',
          'Use simple, uniform background',
          'Avoid heavy makeup',
          'Look directly at the camera'
        ]
      },
      buttons: {
        analyze: 'Analyze Image',
        newPhoto: 'Choose New Photo',
        back: 'Go Back'
      },
      quality: {
        title: 'Image Quality Check',
        excellent: 'Excellent',
        good: 'Good',
        fair: 'Fair', 
        poor: 'Poor',
        warnings: 'Warnings',
        recommendations: 'Recommendations'
      },
      analyzing: {
        title: 'Analyzing your image...',
        steps: [
          'Checking image quality',
          'Analyzing skin colors',
          'Determining natural season',
          'Creating color palette'
        ]
      },
      errors: {
        fileSize: 'File size too large (max 10MB)',
        fileType: 'Unsupported file type. Please use JPG, PNG, or WEBP',
        uploadFailed: 'Failed to upload image. Please try again',
        analysisFailed: 'Failed to analyze image. Please try again',
        networkError: 'Network error. Please check your internet connection'
      }
    }
  }

  const t = content[locale] || content.ar
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    setError(null)
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError(t.errors.fileSize)
      return
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError(t.errors.fileType)
      return
    }
    
    setSelectedFile(file)
    
    // Create preview URL
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    
    // Move to preview step
    setStep(2)
    
    // Check quality
    checkImageQuality(file)
  }

  const checkImageQuality = async (file) => {
    try {
      const formData = new FormData()
      formData.append('image', file)
      
      const response = await axios.post(`${backendUrl}/api/quality-check`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      setQualityCheck(response.data)
    } catch (error) {
      console.error('Quality check failed:', error)
      // Continue without quality check
    }
  }

  const analyzeImage = async () => {
    if (!selectedFile) return
    
    setIsAnalyzing(true)
    setStep(3)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      
      const response = await axios.post(`${backendUrl}/api/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      // Redirect to backend result page
      const sessionId = response.data.session_id
      window.location.href = `${backendUrl}/result/${sessionId}`
      
    } catch (error) {
      console.error('Analysis failed:', error)
      setIsAnalyzing(false)
      setStep(2)
      
      if (error.response) {
        setError(error.response.data.detail || t.errors.analysisFailed)
      } else if (error.request) {
        setError(t.errors.networkError)
      } else {
        setError(t.errors.analysisFailed)
      }
    }
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setQualityCheck(null)
    setError(null)
    setStep(1)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getQualityBadge = (quality) => {
    const badges = {
      excellent: 'quality-excellent px-3 py-1 rounded-full text-sm font-medium',
      good: 'quality-good px-3 py-1 rounded-full text-sm font-medium',
      fair: 'quality-fair px-3 py-1 rounded-full text-sm font-medium',
      poor: 'quality-poor px-3 py-1 rounded-full text-sm font-medium'
    }
    
    return badges[quality] || badges.fair
  }

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.subtitle} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => router.push('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <span className="text-xl">←</span>
                <span>{t.buttons.back}</span>
              </button>
              <span className="text-2xl font-bold text-gradient">SeasonDIY</span>
              <div className="w-16"></div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Step 1: Upload */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t.heading}
                </h1>
                <p className="text-xl text-gray-600">
                  {t.subtitle}
                </p>
              </div>

              {/* Upload Area */}
              <div className="card p-8 mb-8">
                <div
                  className={`upload-area ${dragActive ? 'dragover' : ''}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">📸</div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">
                      {t.dragText}
                    </p>
                    <p className="text-sm text-gray-500">
                      {t.fileTypes}
                    </p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}
              </div>

              {/* Guidelines */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {t.guidelines.title}
                </h3>
                <ul className="space-y-2">
                  {t.guidelines.items.map((item, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Step 2: Preview & Quality Check */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {t.quality.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Preview */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {isArabic ? 'معاينة الصورة' : 'Image Preview'}
                  </h3>
                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <button
                    onClick={resetUpload}
                    className="btn-secondary w-full mt-4"
                  >
                    {t.buttons.newPhoto}
                  </button>
                </div>

                {/* Quality Results */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {t.quality.title}
                  </h3>
                  
                  {qualityCheck ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          {isArabic ? 'الجودة العامة:' : 'Overall Quality:'}
                        </span>
                        <span className={getQualityBadge(qualityCheck.overall_quality)}>
                          {t.quality[qualityCheck.overall_quality]}
                        </span>
                      </div>

                      {qualityCheck.warnings && qualityCheck.warnings.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            {t.quality.warnings}:
                          </h4>
                          <div className="space-y-2">
                            {qualityCheck.warnings.map((warning, index) => (
                              <div
                                key={index}
                                className={`p-3 rounded-lg warning-${warning.severity}`}
                              >
                                <div className="text-sm">
                                  {isArabic ? warning.message_ar : warning.message_en}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {qualityCheck.recommendations_ar && qualityCheck.recommendations_ar.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            {t.quality.recommendations}:
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {(isArabic ? qualityCheck.recommendations_ar : qualityCheck.recommendations_en).map((rec, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <span className="text-blue-500 mt-1">•</span>
                                <span>{rec}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="loading-spinner mx-auto mb-4"></div>
                      <p className="text-gray-600">
                        {isArabic ? 'جاري فحص الجودة...' : 'Checking quality...'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Analyze Button */}
              <div className="text-center mt-8">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="btn-primary text-lg px-8 py-4"
                >
                  {t.buttons.analyze}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Analyzing */}
          {step === 3 && (
            <div className="animate-fade-in text-center">
              <div className="card p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-6">🎨</div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {t.analyzing.title}
                </h1>
                
                <div className="loading-dots justify-center mb-8">
                  <div></div>
                  <div></div>
                  <div></div>
                </div>

                <div className="space-y-4 text-left max-w-md mx-auto">
                  {t.analyzing.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-primary-600 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-600 mt-6">
                  {isArabic 
                    ? 'هذا قد يستغرق بضع ثوانٍ...'
                    : 'This may take a few seconds...'
                  }
                </p>

                {error && (
                  <div className="mt-6 p-4 bg-red-100 border border-red-200 rounded-lg text-red-700">
                    {error}
                    <button
                      onClick={() => setStep(2)}
                      className="block mx-auto mt-2 text-sm underline"
                    >
                      {isArabic ? 'المحاولة مرة أخرى' : 'Try Again'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
