# Bozdekorasyon 🌳

**El Yapımı Ahşap Mobilya & Özel Tasarım Atölyesi**  
Latanwood çizgisinde lüks minimalist, production-ready statik web sitesi.

---

## 📂 Klasör Yapısı

```
bozdekorasyon/
├── index.html                        # Ana sayfa (single-page, smooth scroll)
├── assets/
│   ├── images/
│   │   ├── hero/                     # Kapak alanı (hero-bg.jpg + hero-video.mp4)
│   │   ├── products/
│   │   │   ├── masalar/              # Masa ürün görselleri
│   │   │   ├── mutfak/               # Mutfak & dolap ürün görselleri
│   │   │   └── ozel-tasarim/         # Özel tasarım ürün görselleri
│   │   ├── about/                    # Atölye ve Instagram önizleme görselleri
│   │   └── brand/                    # Logo, favicon, og-image
│   └── docs/                         # PDF katalog (opsiyonel)
├── css/
│   ├── variables.css                 # Design token'lar (renkler, fontlar, boşluklar)
│   ├── reset.css                     # CSS normalize & temel tipografi
│   ├── layout.css                    # Header, footer, section iskelet yapıları
│   ├── components.css                # Butonlar, kartlar, filtreler, lightbox, hero
│   └── style.css                     # @import ile tüm modülleri birleştirir
└── js/
    ├── main.js                       # Sticky header, hamburger menü, scroll animasyonları
    └── gallery.js                    # Ürün veri yapısı, filtreleme, lightbox
```

---

## 🚀 Hızlı Başlangıç

Sitenin çalışması için herhangi bir derleme adımı **gerekmez**. Doğrudan tarayıcıda açılır:

```bash
# Yöntem 1: VS Code Live Server (önerilen)
# - index.html dosyasına sağ tıklayın → "Open with Live Server"

# Yöntem 2: Python ile yerel sunucu
cd bozdekorasyon
python -m http.server 8080
# → http://localhost:8080

# Yöntem 3: Node.js ile
npx serve .
```

> ⚠️ **Not:** `file://` protokolüyle doğrudan açıldığında CSS `@import` bazı tarayıcılarda çalışmayabilir. Yerel sunucu kullanın.

---

## 🖼️ Medya Güncelleme Kılavuzu

### Hero (Kapak Alanı)
| Dosya | Açıklama |
|-------|----------|
| `assets/images/hero/hero-bg.jpg` | Hero arka plan görseli (1920×1080px önerilir) |
| `assets/images/hero/hero-video.mp4` | Hero arka plan videosu (opsiyonel) |
| `assets/images/hero/hero-poster.jpg` | Video yüklenene kadar gösterilecek fallback |

Video kullanmak için `index.html`'deki `<!-- video yorumunu -->` açıp `<img>` etiketini kaldırın.

### Ürün Görselleri
Görselleri doğrudan ilgili klasöre ekleyin, ardından `js/gallery.js` dosyasındaki `PRODUCTS` dizisini güncelleyin:

```js
// js/gallery.js — PRODUCTS dizisi
{
  id: 'masa-01',
  category: 'masalar',          // 'masalar' | 'mutfak' | 'ozel-tasarim'
  title: 'Ceviz Yemek Masası',
  detail: 'Amerikan Cevizi · 220 × 100 cm',
  img: 'assets/images/products/masalar/masa-01.jpg',  // ← Burası
  alt: 'Görsel açıklaması (SEO & erişilebilirlik)',
},
```

### Marka Varlıkları
| Dosya | Boyut |
|-------|-------|
| `assets/images/brand/favicon.ico` | 32×32px |
| `assets/images/brand/favicon-32x32.png` | 32×32px |
| `assets/images/brand/apple-touch-icon.png` | 180×180px |
| `assets/images/brand/og-image.jpg` | 1200×630px (sosyal medya paylaşımı) |

---

## 📞 İletişim Bilgilerini Güncelleme

`index.html` dosyasında `[GÜNCELLEME]` yorumlarını arayın:

- **Telefon:** `href="tel:+905XXXXXXXXX"` → kendi numaranızla değiştirin
- **WhatsApp:** `href="https://wa.me/905XXXXXXXXX"` → kendi numaranızla değiştirin
- **E-posta:** `href="mailto:info@..."` → kendi e-postanızla değiştirin
- **Adres:** Atölye adresinizi girin
- **Instagram:** `@bozdekorasyonn` → Instagram kullanıcı adınızla değiştirin
- **Canonical URL:** `https://bozdekorasyon.com.tr/` → kendi alan adınızla değiştirin

---

## 🎨 Renk Paleti (Design Tokens)

`css/variables.css` dosyasındaki değişkenleri düzenleyin:

| Token | Değer | Kullanım |
|-------|-------|----------|
| `--color-brand-dark` | `#2c221e` | Logo, başlıklar |
| `--color-brand-mid` | `#8c7355` | Vurgular, hover |
| `--color-brand-warm` | `#b09070` | İkincil vurgular |
| `--color-brand-cream` | `#f8f7f4` | Ana arka plan |

---

## ⚡ Performans Özellikleri

- ✅ Sıfır framework — saf HTML/CSS/JS
- ✅ Lazy loading görseller (`loading="lazy"`)
- ✅ Font Display Swap (`font-display: swap`)
- ✅ IntersectionObserver scroll animasyonları (layout thrashing yok)
- ✅ Passive event listeners (scroll performansı)
- ✅ CSS Custom Properties (runtime değiştirilebilir, minimum override)
- ✅ Fluid typography (`clamp()` ile viewport bazlı ölçekleme)
- ✅ Prefers-reduced-motion desteği (erişilebilirlik)

---

## 🌐 Yayına Alma

Statik dosya olduğu için herhangi bir hosting hizmetinde çalışır:

- **Netlify:** `bozdekorasyon/` klasörünü sürükle-bırak
- **Vercel:** `vercel deploy`
- **GitHub Pages:** Repoyu pages olarak yayınla
- **cPanel / FTP:** Dosyaları `public_html/` klasörüne yükle

---

## 📄 Lisans

© 2024 Bozdekorasyon. Tüm hakları saklıdır.
