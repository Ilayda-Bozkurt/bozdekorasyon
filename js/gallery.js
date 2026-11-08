/**
 * gallery.js — Modüler Filtreleme & Lightbox
 * Bozdekorasyon | Latanwood Çizgisi Galeri Mantığı
 *
 * Modüller:
 *  - ProductData    : Ürün veri yapısı (görselleri değiştirmek için buraya bakın)
 *  - GalleryFilter  : Kategori filtreleme (fade animasyonlu)
 *  - Lightbox       : Tam ekran görsel önizleme (klavye & dokunmatik destekli)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * ÜRÜN EKLEME/DÜZENLEME KILAVUZU:
 * Yeni ürün eklemek veya mevcut ürünü düzenlemek için aşağıdaki
 * `PRODUCTS` dizisine bir nesne ekleyin/değiştirin.
 *
 * Her nesne şu alanları içerir:
 *   id       : Benzersiz ürün kimliği (string)
 *   category : 'masalar' | 'mutfak' | 'ozel-tasarim'
 *   title    : Ürün adı (kart ve lightbox'ta görünür)
 *   detail   : Kısa açıklama (malzeme, boyut vb.)
 *   img      : Görsel yolu — assets/images/products/<kategori>/<dosya>.jpg
 *   alt      : Erişilebilirlik için görsel açıklaması
 * ═══════════════════════════════════════════════════════════════════════════
 */

'use strict';

/* ==========================================================================
   1. ÜRÜN VERİ YAPISI
   --------------------------------------------------------------------------
   ★ Bu diziyi düzenleyerek ürünleri ekleyin, kaldırın veya güncelleyin.
   ★ Görsel yolunu değiştirmek için sadece `img` alanını güncelleyin.
   ========================================================================== */

const PRODUCTS = [

  /* ——— ÖZEL TASARIM & MİMARİ ——————————————————————————————————————————— */

  {
    id: 'ozel-01',
    category: 'ozel-tasarim',
    title: 'Akustik Çıtalı Duvar & Dresuar',
    detail: 'Doğal Ahşap Çıta Panel · Boy Aynası & Asma Giriş Konsolu',
    img: 'assets/images/products/ozel-tasarim/akustik-duvar.jpg',
    alt: 'Doğal ahşap çıtalı duvar paneli, entegre boy aynası ve asma dresuar konsolu',
  },
  {
    id: 'ozel-02',
    category: 'ozel-tasarim',
    title: 'Ahşap Duvar Panelli TV Ünitesi',
    detail: 'Doğal Ahşap Kaplama Panel · LED Aydınlatmalı Niş Vitrin & Oluklu Lake Alt Dolap',
    img: 'assets/images/products/ozel-tasarim/ahsap-tv-unitesi.jpg',
    alt: 'Ahşap duvar paneli ve LED aydınlatmalı vitrin raflı özel tasarım modern TV ünitesi',
  },
  {
    id: 'ozel-03',
    category: 'ozel-tasarim',
    title: 'Ahşap Çıtalı Ayna & Asma Konsol',
    detail: 'Masif Ahşap Çıta Kaplama Duvar · Entegre Dikdörtgen Ayna & Masif Konsol Rafı',
    img: 'assets/images/products/ozel-tasarim/citali-ayna-konsol.jpg',
    alt: 'Ahşap dikey çıta kaplama duvar üzerine asma konsol rafı ve ayna tasarımı',
  },
  {
    id: 'ozel-04',
    category: 'ozel-tasarim',
    title: 'Kahve Köşesi & Vitrinli Bölme Dolabı',
    detail: 'Füme Camlı & LED Aydınlatmalı Vitrin · Masif Ahşap Tezgah Arkası & Lake Alt Konsol',
    img: 'assets/images/products/ozel-tasarim/kahve-kosesi-vitrin.jpg',
    alt: 'Füme cam kapaklı vitrinli ve LED aydınlatmalı özel tasarım lüks kahve köşesi ünitesi',
  },

  /* ——— VESTİYER & GARDIROP ————————————————————————————————————————————— */

  {
    id: 'vestiyer-01',
    category: 'vestiyer-gardrop',
    title: 'Özel Tasarım Vestiyer & Portmanto',
    detail: 'Lake Beyaz Kapaklar · Ahşap Kulp Detayları & Açık Ahşap Teşhir Rafları',
    img: 'assets/images/products/mutfak/vestiyer-portmanto.jpg',
    alt: 'Özel üretim lake antre vestiyer dolabı ve ahşap köşe teşhir raf ünitesi',
  },
  {
    id: 'gardrop-01',
    category: 'vestiyer-gardrop',
    title: 'Özel Giyinme Odası Dolap Sistemi',
    detail: 'Mat Beyaz Gövde · Çekmeceli Modül · Askılık ve Açık Raf Düzeni',
    img: 'assets/images/products/mutfak/giyinme-odasi-dolabi.jpg',
    alt: 'Geniş depolama alanlı, çekmeceli ve raflı özel tasarım giyinme odası gardırop sistemi',
  },

  /* ——— MUTFAK DOLABI —————————————————————————————————————————————————— */

  {
    id: 'mutfak-01',
    category: 'mutfak',
    title: 'Country Mutfak Dolabı',
    detail: 'İki Renkli Tasarım (Lacivert & Beyaz Lake) · Çıtalı Kapaklar & Pirinç Kulplar',
    img: 'assets/images/products/mutfak/country-mutfak-dolabi.jpg',
    alt: 'Lacivert alt ve beyaz üst dolaplı, çıtalı kapaklı lüks country mutfak dolabı montajı',
  },

];

/* ==========================================================================
   2. GALERİ FİLTRELEME
   ========================================================================== */

class GalleryFilter {
  /**
   * @param {Object} options
   * @param {string} options.gridSelector   — Ürün kartlarının bulunduğu grid konteyner
   * @param {string} options.filterSelector — Filtre butonları
   * @param {string} options.cardSelector   — Her bir kart öğesi
   */
  constructor(options = {}) {
    this.grid    = document.querySelector(options.gridSelector   || '.gallery-grid');
    this.filters = document.querySelectorAll(options.filterSelector || '.filter-btn');
    this.cardSel = options.cardSelector || '.product-card';

    if (!this.grid) return;

    this._currentFilter = 'all';
    this._init();
  }

  _init() {
    // Kartları veriden dinamik olarak oluştur
    this._renderCards();

    // Filtre butonlarına olay dinleyici ekle
    this.filters.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        if (filter === this._currentFilter) return;

        this._setActiveFilter(btn);
        this._filterCards(filter);
        this._currentFilter = filter;
      });
    });
  }

  /** PRODUCTS dizisinden tüm kartları DOM'a ekler */
  _renderCards() {
    this.grid.innerHTML = '';

    PRODUCTS.forEach((product, index) => {
      const card = this._createCard(product, index);
      this.grid.appendChild(card);
    });
  }

  /** Tek bir ürün kartı DOM öğesi oluşturur */
  _createCard(product, index) {
    const article = document.createElement('article');
    article.className = 'product-card reveal';
    article.style.transitionDelay = `${(index % 4) * 0.08}s`;
    article.dataset.category = product.category;
    article.dataset.id = product.id;

    const categoryLabels = {
      'mutfak':            'Mutfak Dolabı',
      'vestiyer-gardrop':  'Vestiyer & Gardırop',
      'ozel-tasarim':      'Özel Tasarım',
    };

    /*
     * [MEDYA GÜNCELLEME NOTU]:
     * Görsel yolunu değiştirmek için:
     *   1. Yeni görseli assets/images/products/<kategori>/ klasörüne koyun.
     *   2. PRODUCTS dizisinde ilgili ürünün `img` alanını güncelleyin.
     *   Görsel adı değişmedikçe HTML'ye dokunmanıza gerek yoktur.
     */
    article.innerHTML = `
      <div class="product-card__inner" role="button" tabindex="0"
           aria-label="${product.title} ürününü büyük boyutta görüntüle">
        <div class="product-card__media">
          <!-- [MEDYA GÜNCELLEME]: ${product.img} yolundaki görseli değiştirin -->
          <img
            class="product-card__img"
            src="${product.img}"
            alt="${product.alt}"
            loading="lazy"
            onerror="this.parentElement.innerHTML='<div class=\\'img-placeholder\\'>Görsel Yükleniyor</div>'"
          >
          <span class="product-card__category">
            ${categoryLabels[product.category] || product.category}
          </span>
          <div class="product-card__overlay" aria-hidden="true">
            <span class="product-card__view-label">Görüntüle</span>
          </div>
        </div>
        <div class="product-card__body">
          <h3 class="product-card__title">${product.title}</h3>
          <p class="product-card__detail">${product.detail}</p>
        </div>
      </div>
    `;

    return article;
  }

  /** Aktif filtre butonunu günceller */
  _setActiveFilter(activeBtn) {
    this.filters.forEach(btn => btn.classList.remove('is-active'));
    activeBtn.classList.add('is-active');
  }

  /** Kartları fade animasyonuyla filtreler */
  _filterCards(filter) {
    const cards = this.grid.querySelectorAll(this.cardSel);

    // Önce tümünü 'filtering-out' durumuna al
    cards.forEach(card => card.classList.add('is-filtering-out'));

    // Kısa gecikmeden sonra gizle/göster
    setTimeout(() => {
      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        card.classList.remove('is-filtering-out');

        if (match) {
          card.classList.remove('is-hidden');
          // Yeniden görünür olan kartlar için reveal animasyonu
          requestAnimationFrame(() => {
            card.classList.remove('is-visible');
            requestAnimationFrame(() => card.classList.add('is-visible'));
          });
        } else {
          card.classList.add('is-hidden');
        }
      });
    }, 220);
  }
}

/* ==========================================================================
   3. LIGHTBOX
   ========================================================================== */

class Lightbox {
  constructor() {
    this.lightbox  = document.querySelector('.lightbox');
    this.backdrop  = document.querySelector('.lightbox__backdrop');
    this.imgEl     = document.querySelector('.lightbox__img');
    this.titleEl   = document.querySelector('.lightbox__title');
    this.detailEl  = document.querySelector('.lightbox__detail');
    this.closeBtn  = document.querySelector('.lightbox__close');
    this.prevBtn   = document.querySelector('.lightbox__nav--prev');
    this.nextBtn   = document.querySelector('.lightbox__nav--next');

    if (!this.lightbox) return;

    this._currentIndex = 0;
    this._visibleProducts = [...PRODUCTS]; // Aktif filtreye göre güncellenir

    this._bindEvents();
  }

  _bindEvents() {
    // Galeri kartlarına tıklama (olay delegasyonu)
    const grid = document.querySelector('.gallery-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const inner = e.target.closest('.product-card__inner');
        if (!inner) return;

        const card = inner.closest('.product-card');
        if (!card) return;

        const productId = card.dataset.id;
        this._openById(productId);
      });

      // Klavye ile kart aktivasyonu (Enter/Space)
      grid.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        const inner = e.target.closest('.product-card__inner');
        if (!inner) return;

        e.preventDefault();
        const card = inner.closest('.product-card');
        const productId = card.dataset.id;
        this._openById(productId);
      });
    }

    // Kapatma
    this.closeBtn?.addEventListener('click', () => this.close());
    this.backdrop?.addEventListener('click', () => this.close());

    // Navigasyon
    this.prevBtn?.addEventListener('click', () => this._navigate(-1));
    this.nextBtn?.addEventListener('click', () => this._navigate(1));

    // Klavye kısayolları
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox?.classList.contains('is-open')) return;

      if (e.key === 'Escape')      this.close();
      if (e.key === 'ArrowLeft')   this._navigate(-1);
      if (e.key === 'ArrowRight')  this._navigate(1);
    });

    // Dokunmatik ekran swipe desteği
    this._bindSwipe();
  }

  _bindSwipe() {
    if (!this.lightbox) return;

    let startX = 0;

    this.lightbox.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.lightbox.addEventListener('touchend', (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 50) return; // Minimum swipe mesafesi

      this._navigate(diff > 0 ? 1 : -1);
    }, { passive: true });
  }

  /**
   * Görünür ürün listesini günceller.
   * Filtreleme değiştiğinde GalleryFilter tarafından çağrılır.
   * @param {string} filter — Kategori filtresi ('all' veya kategori adı)
   */
  updateVisibleProducts(filter) {
    this._visibleProducts = filter === 'all'
      ? [...PRODUCTS]
      : PRODUCTS.filter(p => p.category === filter);
  }

  _openById(productId) {
    const index = this._visibleProducts.findIndex(p => p.id === productId);
    if (index === -1) {
      // Görünür listede yoksa tüm listeden aç
      const globalIndex = PRODUCTS.findIndex(p => p.id === productId);
      if (globalIndex === -1) return;
      this._visibleProducts = [...PRODUCTS];
      this._open(globalIndex);
    } else {
      this._open(index);
    }
  }

  _open(index) {
    this._currentIndex = index;
    this._render();

    this.lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Erişilebilirlik: odağı lightbox'a taşı
    this.closeBtn?.focus();
  }

  close() {
    this.lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  _navigate(direction) {
    const total = this._visibleProducts.length;
    this._currentIndex = (this._currentIndex + direction + total) % total;
    this._render();
  }

  _render() {
    const product = this._visibleProducts[this._currentIndex];
    if (!product || !this.imgEl) return;

    // Görsel geçiş animasyonu
    this.imgEl.style.opacity = '0';
    this.imgEl.style.transform = 'scale(0.97)';

    // [MEDYA GÜNCELLEME NOTU]: Lightbox görsel kaynağı product.img'den gelir.
    // Kaynak değiştirmek için PRODUCTS dizisindeki ilgili `img` alanını güncelleyin.
    const newImg = new Image();
    newImg.src = product.img;
    newImg.onload = () => {
      this.imgEl.src = product.img;
      this.imgEl.alt = product.alt;
      requestAnimationFrame(() => {
        this.imgEl.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        this.imgEl.style.opacity = '1';
        this.imgEl.style.transform = 'scale(1)';
      });
    };
    newImg.onerror = () => {
      this.imgEl.src = '';
      this.imgEl.style.opacity = '1';
    };

    if (this.titleEl)  this.titleEl.textContent  = product.title;
    if (this.detailEl) this.detailEl.textContent = product.detail;
  }
}

/* ==========================================================================
   4. UYGULAMA BAŞLATMA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filter   = new GalleryFilter();
  const lightbox = new Lightbox();

  // GalleryFilter ve Lightbox'ı bağla
  // Filtre değiştiğinde lightbox'ın görünür listesini güncelle
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      lightbox.updateVisibleProducts(f);
    });
  });

  // Kartlar oluşturulduktan sonra RevealOnScroll'u yeniden tetikle
  if (window.__revealObserver) {
    document.querySelectorAll('.product-card.reveal').forEach(el => {
      window.__revealObserver.observe(el);
    });
  }
});
