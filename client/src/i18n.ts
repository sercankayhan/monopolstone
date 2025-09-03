import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      brand: 'Monopol Stone',
      premiumQuality: 'Premium Quality',
      nav: {
        home: 'Home',
        products: 'Products',
        about: 'About',
        services: 'Services',
        contact: 'Contact'
      },
      cta: {
        getQuote: 'Get Quote'
      },
      hero: {
        title: 'Premium Stone Solutions',
        subtitle: 'Transform your space with our high-quality stone products designed for beauty, durability, and style',
        cta: 'Explore Products',
        secondaryCta: 'Get Quote',
        scroll: 'Scroll Down',
        features: [
          'Premium Quality Materials',
          'Professional Installation',
          'Custom Design Solutions',
          'Lifetime Warranty'
        ],
        slide1: {
          title: 'Premium Stone',
          subtitle: 'Crafted for Perfection',
          description: 'Transform your spaces with our premium stone solutions. Durable, elegant, and designed to last a lifetime.',
          ctaPrimary: 'Explore Products',
          ctaSecondary: 'Get Quote'
        },
        slide2: {
          title: 'Custom Design Solutions',
          subtitle: 'Tailored to Your Vision',
          description: 'Create unique architectural elements with our custom stone designs. From concept to installation.',
          ctaPrimary: 'View Gallery',
          ctaSecondary: 'Contact Us'
        },
        slide3: {
          title: 'Professional Installation',
          subtitle: 'Expert Craftsmanship',
          description: 'Our certified professionals ensure perfect installation with attention to every detail. Quality guaranteed.',
          ctaPrimary: 'Our Services',
          ctaSecondary: 'Schedule Consultation'
        }
      },
      about: {
        title: 'About Monopol Stone',
        subtitle: 'Leading manufacturer of premium stone products',
        mainTitle: 'Your Trusted Partner in Stone Solutions',
        description1: 'Monopol Stone has become a trusted brand for quality, innovation, and customer satisfaction. Our commitment to excellence enables us to create products that not only meet but exceed industry standards.',
        description2: 'We specialize in producing premium stone products that combine aesthetic appeal with extraordinary durability. Our state-of-the-art manufacturing facilities and rigorous quality control processes ensure that every product meets the highest standards of excellence.',
        description3: 'From residential projects to large-scale commercial developments, we provide comprehensive solutions that transform spaces and create lasting impressions. Our expert team works closely with architects, designers, and contractors to deliver customized solutions that exceed expectations.',
        description4: 'Monopol Stone aims to be a trusted brand not only in Turkey but also globally with its innovative approach and quality-focused vision.',
        certifiedQuality: 'Certified Quality',

        features: {
          quality: {
            title: 'Design & Planning',
            description: 'We bring your projects to life with our professional design team'
          },
          custom: {
            title: 'Professional Installation',
            description: 'We provide perfect installation service with our expert team'
          },
          certified: {
            title: 'Maintenance & Care',
            description: 'Comprehensive maintenance service for long-lasting products'
          },
          support: {
            title: 'Expert Consultation',
            description: 'Get professional consultation from our experienced team'
          }
        },
        values: {
          title: 'Our Values',
          quality: {
            title: 'Quality',
            description: 'We never compromise on quality, ensuring every product meets the highest standards.'
          },
          innovation: {
            title: 'Innovation',
            description: 'We continuously innovate to bring you the latest trends and technologies.'
          },
          customer: {
            title: 'Customer Focus',
            description: 'Your satisfaction is our priority from design to installation.'
          },
          sustainability: {
            title: 'Sustainability',
            description: 'We are committed to environmentally friendly production practices.'
          }
        },
        imageAlt: 'Design and Planning'
      },
      contact: {
        title: 'Get In Touch',
        subtitle: 'Ready to start your project? Contact us today for a free consultation.',
        form: {
          name: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          company: 'Company (Optional)',
          subject: 'Subject',
          message: 'Message',
          messagePlaceholder: 'Tell us about your project requirements...',
          submit: 'Send Message',
          submitting: 'Sending...',
          success: 'Thank you! Your message has been sent successfully.',
          error: 'Sorry, there was an error sending your message. Please try again.'
        },
        labels: {
          address: 'Address',
          phone: 'Phone',
          email: 'Email',
          workingHours: 'Working Hours',
          description: 'Transform your spaces with our premium stone solutions.'
        },
        info: {
          address: 'İzzettin, Candemir Sk No: 6/33, 34540 Çatalca/İstanbul',
          phone: '+90 (531) 472 02 69',
          email: 'info@monopolstone.com',
          hours: 'Business Hours',
          hoursValue: 'Weekdays: 08:00 - 18:00\nSaturday: 9:00 - 16:00'
        },
        whatsapp: {
          title: 'Contact Us on WhatsApp',
          message: 'Hello! I would like to get information about your products.'
        }
      },
      services: {
        title: 'Our Services',
        subtitle: 'Comprehensive solutions for all your stone needs',
        needHelp: 'Need Help?',
        needHelpText: 'Our experts are here to guide you through every step of your project',
        getConsultation: 'Get Free Consultation',
        whatIncluded: 'What\'s Included',
        getQuote: 'Get Quote',
        learnMore: 'Learn More',
        readyToStart: 'Ready to Start Your Project?',
        readyText: 'Let\'s discuss your requirements and create the perfect solution for your space',
        getFreeConsultation: 'Get Free Consultation',
        callNow: 'Call Now',
        design: {
          title: 'Design & Planning',
          description: 'Professional design services to create stunning stone installations that perfectly match your vision and space requirements.',
          features: [
            'Custom design consultation',
            '3D visualization and mockups',
            'Material selection guidance',
            'Technical specifications',
            'Project timeline planning'
          ],
          processTitle: 'Design Process',
          processSteps: [
            'Initial consultation and requirements gathering',
            'Site assessment and measurements',
            'Design concept development',
            '3D visualization and approval',
            'Final technical specifications'
          ]
        },
        installation: {
          title: 'Professional Installation',
          description: 'Expert installation services ensuring perfect fit, durability, and stunning results for your stone projects.',
          features: [
            'Professional installation team',
            'Quality assurance protocols',
            'Proper surface preparation',
            'Precise cutting and fitting',
            'Post-installation inspection'
          ],
          processTitle: 'Installation Process',
          processSteps: [
            'Surface preparation and assessment',
            'Material preparation and cutting',
            'Installation and fitting',
            'Quality control and adjustments',
            'Final inspection and handover'
          ]
        },
        maintenance: {
          title: 'Maintenance & Care',
          description: 'Comprehensive maintenance services to keep your stone surfaces looking beautiful and lasting for years.',
          features: [
            'Regular maintenance schedules',
            'Cleaning and sealing services',
            'Damage assessment and repair',
            'Preventive care recommendations',
            'Warranty support'
          ],
          processTitle: 'Maintenance Process',
          processSteps: [
            'Initial assessment and planning',
            'Regular cleaning and maintenance',
            'Periodic inspections',
            'Repair and restoration',
            'Preventive care recommendations'
          ]
        },
        consultation: {
          title: 'Expert Consultation',
          description: 'Professional consultation services to help you make informed decisions about your stone projects.',
          features: [
            'Expert technical advice',
            'Material selection guidance',
            'Cost optimization strategies',
            'Project feasibility assessment',
            'Long-term maintenance planning'
          ],
          processTitle: 'Consultation Process',
          processSteps: [
            'Initial project discussion',
            'Technical requirements analysis',
            'Solution recommendations',
            'Cost and timeline estimates',
            'Implementation planning'
          ]
        }
      },
      gallery: {
        all: 'All',
        title: 'Our Product Gallery',
        subtitle: 'Explore our extensive collection of premium stone products designed for every application',
        searchPlaceholder: 'Search products...',
        showing: 'Showing {{count}} of {{total}} products',
        featured: 'Featured',
        viewDetails: 'View Details',
        emptyTitle: 'No products found',
        emptySubtitle: 'Try adjusting your search or filter criteria',
        categories: {
          'kultur-tasi': 'Culture Stone',
          'kultur-tuglasi': 'Culture Brick'
        },
        specs: {
          title: 'Specifications',
          dimensions: 'Dimensions:',
          material: 'Material:',
          finish: 'Finish:',
          colors: 'Available Colors:'
        },
        tags: 'Tags',
        requestQuote: 'Request Quote',
        downloadSpecs: 'Download Specs'
      },
      products: {
        mitra: {
          description: 'Premium culture stone collection with rich texture and natural appearance.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Stone',
            finish: 'Natural Texture',
            colors: ['Shadow', 'Mist', 'Earth']
          }
        },
        luminar: {
          description: 'Modern line culture stone, compatible with indoor and outdoor spaces.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Stone',
            finish: 'Matte',
            colors: ['Shadow', 'Mist', 'Earth']
          }
        },
        belezza: {
          description: 'Adds a sophisticated atmosphere to spaces with its elegant texture.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Stone',
            finish: 'Semi-Matte',
            colors: ['Sunset', 'Star']
          }
        },
        arvion: {
          description: 'Natural stone feeling with strong character.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Stone',
            finish: 'Natural Break',
            colors: ['Shadow', 'Mist', 'Earth']
          }
        },
        tivoli: {
          description: 'Modern and natural appearance with timeless lines.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Stone',
            finish: 'Natural Texture',
            colors: ['Shadow', 'Mist', 'Earth', 'Anthracite']
          }
        },
        leon: {
          description: 'Warm and friendly appearance reflecting natural brick texture.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Brick',
            finish: 'Matte',
            colors: ['Pearl', 'Pebble', 'Desert', 'Ember', 'Lava', 'Mix']
          }
        },
        leila: {
          description: 'Brings together modern and classic lines with elegant brick texture.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Brick',
            finish: 'Semi-Matte',
            colors: ['Pearl', 'Pebble', 'Desert', 'Ember', 'Lava', 'Mix']
          }
        },
        lora: {
          description: 'Natural brick appearance with minimal lines.',
          specifications: {
            dimensions: 'Variable',
            material: 'Composite Brick',
            finish: 'Matte',
            colors: ['Pearl', 'Pebble', 'Desert', 'Ember', 'Lava', 'Mix']
          }
        }
      },
      tags: {
        'kultur-tasi': 'Culture Stone',
        'kultur-tuglasi': 'Culture Brick', 
        'dekoratif': 'Decorative',
        'duvar': 'Wall',
        'modern': 'Modern',
        'dis-cephe': 'Exterior Facade',
        'zarif': 'Elegant',
        'ic-mekan': 'Interior',
        'rustik': 'Rustic',
        'duvar-kaplama': 'Wall Cladding',
        'mimari': 'Architectural',
        'ic-dis-mekan': 'Indoor & Outdoor',
        'minimal': 'Minimal'
      },
      footer: {
        description: 'Premium stone solutions for modern spaces. Quality, innovation, and customer satisfaction guaranteed.',
        quickLinks: 'Quick Links',
        services: 'Services',
        products: 'Products',
        about: 'About',
        contact: 'Contact',
        support: 'Support',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        copyright: '© 2024 Monopol Stone. All rights reserved.',
        social: 'Follow Us',
        servicesList: {
          design: 'Custom Design',
          installation: 'Installation',
          maintenance: 'Maintenance',
          consultation: 'Consultation'
        }
      },
      header: {
        language: 'Language',
        login: 'Login',
        logout: 'Logout',
        admin: 'Admin Panel'
      }
    }
  },
  tr: {
    translation: {
      brand: 'Monopol Stone',
      premiumQuality: 'Üstün Kalite',
      nav: {
        home: 'Ana Sayfa',
        products: 'Ürünler',
        about: 'Hakkımızda',
        services: 'Hizmetler',
        contact: 'İletişim'
      },
      cta: {
        getQuote: 'Teklif Al'
      },
      hero: {
        title: 'Premium Taş Çözümleri',
        subtitle: 'Mekanınızı güzellik, dayanıklılık ve stil için tasarlanmış yüksek kaliteli taş ürünlerimizle dönüştürün',
        cta: 'Ürünleri Keşfet',
        secondaryCta: 'Teklif Al',
        scroll: 'Aşağı Kaydır',
        features: [
          'Premium Kalite Malzemeler',
          'Profesyonel Kurulum',
          'Özel Tasarım Çözümleri',
          'Ömür Boyu Garanti'
        ],
        slide1: {
          title: 'Premium Taş',
          subtitle: 'Mükemmellik İçin Üretildi',
          description: 'Mekanlarınızı premium taş çözümlerimizle dönüştürün. Dayanıklı, zarif ve ömür boyu tasarlandı.',
          ctaPrimary: 'Ürünleri Keşfet',
          ctaSecondary: 'Teklif Al'
        },
        slide2: {
          title: 'Özel Tasarım Çözümleri',
          subtitle: 'Vizyonunuza Göre Tasarlanmış',
          description: 'Özel taş tasarımlarımızla benzersiz mimari unsurlar yaratın. Konseptten kuruluma kadar.',
          ctaPrimary: 'Galeriyi Görüntüle',
          ctaSecondary: 'Bizimle İletişime Geçin'
        },
        slide3: {
          title: 'Profesyonel Kurulum',
          subtitle: 'Uzman İşçilik',
          description: 'Sertifikalı profesyonellerimiz her detaya dikkat ederek mükemmel kurulum sağlar. Kalite garantili.',
          ctaPrimary: 'Hizmetlerimiz',
          ctaSecondary: 'Danışmanlık Planla'
        }
      },
      about: {
        title: 'Monopol Stone Hakkında',
        subtitle: 'Premium taş ürünlerinin önde gelen üreticisi',
        mainTitle: 'Taş Çözümlerinde Güvenilir Partneriniz',
        description1: 'Monopol Stone, kalite, yenilik ve müşteri memnuniyeti konusunda güvenilir bir marka haline gelmiştir. Mükemmellik taahhüdümüz, sadece endüstri standartlarını karşılamakla kalmayıp aşan ürünler yaratmamızı sağlar.',
        description2: 'Estetik çekiciliği olağanüstü dayanıklılıkla birleştiren premium taş ürünleri üretiminde uzmanız. En son teknoloji üretim tesislerimiz ve titiz kalite kontrol süreçlerimiz, her ürünün en yüksek mükemmellik standartlarını karşılamasını sağlar.',
        description3: 'Konut projelerinden büyük ölçekli ticari geliştirmelere kadar, mekanları dönüştüren ve kalıcı izlenimler yaratan kapsamlı çözümler sunuyoruz. Uzman ekibimiz, beklentileri aşan özelleştirilmiş çözümler sunmak için mimarlar, tasarımcılar ve müteahhitlerle yakın çalışır.',
        certifiedQuality: 'Sertifikalı Kalite',
        stats: {
          experience: 'Yıl Deneyim',
          projects: 'Tamamlanan Proje',
          products: 'Ürün Çeşidi',
          satisfaction: 'Müşteri Memnuniyeti'
        },
        features: {
          quality: {
            title: 'Premium Kalite',
            description: 'Her ürün, olağanüstü standartları sağlamak için titiz kalite kontrolünden geçer.'
          },
          custom: {
            title: 'Özel Çözümler',
            description: 'Benzersiz proje gereksinimlerinizi karşılamak için özel tasarımlar ve özellikler.'
          },
          certified: {
            title: 'Sertifikalı Ürünler',
            description: 'Tüm ürünler uluslararası kalite ve güvenlik standartlarını karşılar.'
          },
          support: {
            title: 'Uzman Destek',
            description: 'Proje yolculuğunuz boyunca profesyonel rehberlik ve destek.'
          }
        },
        values: {
          title: 'Değerlerimiz',
          quality: {
            title: 'Kalite Önceliği',
            description: 'Kaliteden asla ödün vermeyiz, her ürünün en yüksek standartları karşılamasını sağlarız.'
          },
          innovation: {
            title: 'Yenilik',
            description: 'Size en son trendleri ve teknolojileri getirmek için sürekli yenilik yapıyoruz.'
          },
          customer: {
            title: 'Müşteri Odaklılık',
            description: 'Tasarımdan kuruluma kadar memnuniyetiniz önceliğimizdir.'
          },
          sustainability: {
            title: 'Sürdürülebilirlik',
            description: 'Çevre dostu üretim uygulamalarına bağlıyız.'
          }
        },
        imageAlt: 'Tasarım ve Planlama'
      },
      contact: {
        title: 'İletişime Geçin',
        subtitle: 'Projenizi başlatmaya hazır mısınız? Ücretsiz danışmanlık için bugün bizimle iletişime geçin.',
        form: {
          name: 'Ad Soyad',
          email: 'E-posta Adresi',
          phone: 'Telefon Numarası',
          company: 'Şirket (İsteğe Bağlı)',
          subject: 'Konu',
          message: 'Mesaj',
          messagePlaceholder: 'Proje gereksinimleriniz hakkında bize bilgi verin...',
          submit: 'Mesaj Gönder',
          submitting: 'Gönderiliyor...',
          success: 'Teşekkürler! Mesajınız başarıyla gönderildi.',
          error: 'Üzgünüz, mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.'
        },
        labels: {
          address: 'Adres',
          phone: 'Telefon',
          email: 'E-posta',
          workingHours: 'Çalışma Saatleri',
          description: 'Mekanlarınızı premium taş çözümlerimizle dönüştürün.'
        },
        info: {
          address: 'İzzettin, Candemir Sk No: 6/33, 34540 Çatalca/İstanbul',
          phone: '+90 (531) 472 02 69',
          email: 'info@monopolstone.com',
          hours: 'Çalışma Saatları',
          hoursValue: 'Hafta İçi : 08:00 - 18:00\nCumartesi: 9:00 - 16:00'
        },
        whatsapp: {
          title: 'WhatsApp ile İletişime Geçin',
          message: 'Merhaba! Ürünleriniz hakkında bilgi almak istiyorum.'
        }
      },
      services: {
        title: 'Hizmetlerimiz',
        subtitle: 'Taş ihtiyaçlarınız için kapsamlı çözümler',
        needHelp: 'Yardıma mı ihtiyacınız var?',
        needHelpText: 'Uzmanlarımız projenizin her adımında size rehberlik etmek için burada',
        getConsultation: 'Ücretsiz Danışmanlık Al',
        whatIncluded: 'Neler Dahil',
        getQuote: 'Teklif Al',
        learnMore: 'Daha Fazla Bilgi',
        readyToStart: 'Projenizi Başlatmaya Hazır mısınız?',
        readyText: 'Gereksinimlerinizi tartışalım ve mekanınız için mükemmel çözümü oluşturalım',
        getFreeConsultation: 'Ücretsiz Danışmanlık Al',
        callNow: 'Şimdi Ara',
        design: {
          title: 'Tasarım & Planlama',
          description: 'Görüşünüzü ve mekan gereksinimlerinizi mükemmel şekilde eşleştiren etkileyici taş kurulumları oluşturmak için profesyonel tasarım hizmetleri.',
          features: [
            'Özel tasarım danışmanlığı',
            '3D görselleştirme ve maketler',
            'Malzeme seçimi rehberliği',
            'Teknik özellikler',
            'Proje zaman çizelgesi planlaması'
          ],
          processTitle: 'Tasarım Süreci',
          processSteps: [
            'İlk danışma ve gereksinim toplama',
            'Saha değerlendirmesi ve ölçümler',
            'Tasarım konsepti geliştirme',
            '3D görselleştirme ve onay',
            'Final teknik özellikler'
          ]
        },
        installation: {
          title: 'Profesyonel Kurulum',
          description: 'Taş projeleriniz için mükemmel uyum, dayanıklılık ve etkileyici sonuçlar sağlayan uzman kurulum hizmetleri.',
          features: [
            'Profesyonel kurulum ekibi',
            'Kalite güvence protokolleri',
            'Uygun yüzey hazırlığı',
            'Hassas kesim ve montaj',
            'Kurulum sonrası kontrol'
          ],
          processTitle: 'Kurulum Süreci',
          processSteps: [
            'Yüzey hazırlığı ve değerlendirme',
            'Malzeme hazırlığı ve kesim',
            'Kurulum ve montaj',
            'Kalite kontrolü ve ayarlamalar',
            'Final kontrol ve teslim'
          ]
        },
        maintenance: {
          title: 'Bakım & Koruma',
          description: 'Taş yüzeylerinizin güzel görünmesini ve yıllarca dayanmasını sağlayan kapsamlı bakım hizmetleri.',
          features: [
            'Düzenli bakım programları',
            'Temizlik ve koruma hizmetleri',
            'Hasar değerlendirmesi ve onarım',
            'Önleyici bakım önerileri',
            'Garanti desteği'
          ],
          processTitle: 'Bakım Süreci',
          processSteps: [
            'İlk değerlendirme ve planlama',
            'Düzenli temizlik ve bakım',
            'Periyodik kontroller',
            'Onarım ve restorasyon',
            'Önleyici bakım önerileri'
          ]
        },
        consultation: {
          title: 'Uzman Danışmanlık',
          description: 'Taş projeleriniz hakkında bilinçli kararlar almanıza yardımcı olacak profesyonel danışmanlık hizmetleri.',
          features: [
            'Uzman teknik tavsiye',
            'Malzeme seçimi rehberliği',
            'Maliyet optimizasyon stratejileri',
            'Proje uygulanabilirlik değerlendirmesi',
            'Uzun vadeli bakım planlaması'
          ],
          processTitle: 'Danışmanlık Süreci',
          processSteps: [
            'İlk proje tartışması',
            'Teknik gereksinim analizi',
            'Çözüm önerileri',
            'Maliyet ve zaman çizelgesi tahminleri',
            'Uygulama planlaması'
          ]
        }
      },
      gallery: {
        all: 'Tümü',
        title: 'Ürün Galerimiz',
        subtitle: 'Her uygulama için tasarlanmış premium taş ürünlerimizi keşfedin',
        searchPlaceholder: 'Ürün ara...',
        showing: '{{total}} üründen {{count}} tanesi gösteriliyor',
        featured: 'Öne Çıkan',
        viewDetails: 'Detayları Gör',
        emptyTitle: 'Ürün bulunamadı',
        emptySubtitle: 'Arama veya filtre kriterlerinizi değiştirin',
        categories: {
          'kultur-tasi': 'Kültür Taşı',
          'kultur-tuglasi': 'Kültür Tuğlası'
        },
        specs: {
          title: 'Teknik Özellikler',
          dimensions: 'Ölçüler:',
          material: 'Malzeme:',
          finish: 'Yüzey:',
          colors: 'Mevcut Renkler:'
        },
        tags: 'Etiketler',
        requestQuote: 'Teklif İste',
        downloadSpecs: 'Teknik Döküman'
      },
      products: {
        mitra: {
          description: 'Zengin doku ve doğal görünüm sunan kültür taşı koleksiyonu.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Taş',
            finish: 'Doğal Doku',
            colors: ['Gölge', 'Sis', 'Toprak']
          }
        },
        luminar: {
          description: 'Modern çizgilere sahip, iç ve dış mekânlarda uyumlu kültür taşı.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Taş',
            finish: 'Mat',
            colors: ['Gölge', 'Sis', 'Toprak']
          }
        },
        belezza: {
          description: 'Zarif dokusuyla mekanlara sofistike bir hava katar.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Taş',
            finish: 'Yarı Mat',
            colors: ['Günbatımı', 'Yıldız']
          }
        },
        arvion: {
          description: 'Güçlü karaktere sahip doğal taş hissi.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Taş',
            finish: 'Doğal Kırık',
            colors: ['Gölge', 'Sis', 'Toprak']
          }
        },
        tivoli: {
          description: 'Zamanı aşan çizgilerle modern ve doğal bir görünüm.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Taş',
            finish: 'Doğal Doku',
            colors: ['Gölge', 'Sis', 'Toprak', 'Antrasit']
          }
        },
        leon: {
          description: 'Doğal tuğla dokusunu yansıtan, sıcak ve samimi görünüm.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Tuğla',
            finish: 'Mat',
            colors: ['İnci', 'Çakıl', 'Çöl', 'Köz', 'Lav', 'Mix']
          }
        },
        leila: {
          description: 'Zarif tuğla dokusuyla modern ve klasik çizgileri buluşturur.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Tuğla',
            finish: 'Yarı Mat',
            colors: ['İnci', 'Çakıl', 'Çöl', 'Köz', 'Lav', 'Mix']
          }
        },
        lora: {
          description: 'Minimal hatlarla doğal tuğla görünümü.',
          specifications: {
            dimensions: 'Değişken',
            material: 'Kompozit Tuğla',
            finish: 'Mat',
            colors: ['İnci', 'Çakıl', 'Çöl', 'Köz', 'Lav', 'Mix']
          }
        }
      },
      tags: {
        'kultur-tasi': 'Kültür Taşı',
        'kultur-tuglasi': 'Kültür Tuğlası',
        'dekoratif': 'Dekoratif', 
        'duvar': 'Duvar',
        'modern': 'Modern',
        'dis-cephe': 'Dış Cephe',
        'zarif': 'Zarif',
        'ic-mekan': 'İç Mekan',
        'rustik': 'Rustik',
        'duvar-kaplama': 'Duvar Kaplama',
        'mimari': 'Mimari',
        'ic-dis-mekan': 'İç & Dış Mekan',
        'minimal': 'Minimal'
      },
      footer: {
        description: 'Modern mekanlar için premium taş çözümleri. Kalite, yenilik ve müşteri memnuniyeti garantili.',
        quickLinks: 'Hızlı Bağlantılar',
        services: 'Hizmetler',
        products: 'Ürünler',
        about: 'Hakkımızda',
        contact: 'İletişim',
        support: 'Destek',
        privacy: 'Gizlilik Politikası',
        terms: 'Kullanım Şartları',
        copyright: '© 2024 Monopol Stone. Tüm hakları saklıdır.',
        social: 'Bizi Takip Edin',
        servicesList: {
          design: 'Özel Tasarım',
          installation: 'Kurulum',
          maintenance: 'Bakım',
          consultation: 'Danışmanlık'
        }
      },
      header: {
        language: 'Dil',
        login: 'Giriş Yap',
        logout: 'Çıkış Yap',
        admin: 'Admin Paneli'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    supportedLngs: ['en', 'tr'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'querystring', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;


