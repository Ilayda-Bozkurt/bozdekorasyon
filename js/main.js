/**
 * main.js — Global Olaylar & Scroll Efektleri
 * Bozdekorasyon | Latanwood Çizgisi Interaktivite
 *
 * Modüller:
 *  - StickyHeader   : Scroll ile glassmorphism efekti
 *  - MobileNav      : Hamburger menü açma/kapama
 *  - SmoothScroll   : Anchor linklerde yumuşak kaydırma
 *  - RevealOnScroll : IntersectionObserver ile fade-in animasyonları
 *  - HeroInit       : Hero section'ı yüklendikten sonra aktif eder
 */

'use strict';

/* ==========================================================================
   1. STICKY HEADER & GLASSMORPHISM
   ========================================================================== */

class StickyHeader {
  constructor() {
    this.header = document.querySelector('.site-header');
    if (!this.header) return;

    this.scrollThreshold = 60; // px — Bu değeri geçince glassmorphism aktif
    this._onScroll = this._onScroll.bind(this);
    this._init();
  }

  _init() {
    // İlk yükleme kontrolü
    this._onScroll();
    window.addEventListener('scroll', this._onScroll, { passive: true });
  }

  _onScroll() {
    const isScrolled = window.scrollY > this.scrollThreshold;
    this.header.classList.toggle('is-scrolled', isScrolled);
  }
}

/* ==========================================================================
   2. MOBİL NAVİGASYON — Hamburger Menü
   ========================================================================== */

class MobileNav {
  constructor() {
    this.toggle = document.querySelector('.nav-toggle');
    this.menu   = document.querySelector('.nav-menu');
    this.overlay = document.querySelector('.nav-overlay');
    if (!this.toggle || !this.menu) return;

    this._bindEvents();
  }

  _bindEvents() {
    // Hamburger butonu
    this.toggle.addEventListener('click', () => this._toggleMenu());

    // Overlay'e tıklandığında kapat
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this._closeMenu());
    }

    // Nav linklerine tıklandığında kapat (single-page smooth scroll için)
    this.menu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => this._closeMenu());
    });

    // Escape tuşuyla kapat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this._closeMenu();
    });
  }

  _toggleMenu() {
    const isOpen = this.menu.classList.toggle('is-open');
    this.toggle.classList.toggle('is-active', isOpen);

    if (this.overlay) {
      this.overlay.classList.toggle('is-active', isOpen);
    }

    // Erişilebilirlik
    this.toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  _closeMenu() {
    this.menu.classList.remove('is-open');
    this.toggle.classList.remove('is-active');

    if (this.overlay) {
      this.overlay.classList.remove('is-active');
    }

    this.toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. SCROLL-REVEAL (IntersectionObserver Tabanlı Fade-in)
   ========================================================================== */

class RevealOnScroll {
  constructor() {
    // Tüm .reveal sınıflı öğeleri gözlemle
    this.elements = document.querySelectorAll('.reveal');
    if (!this.elements.length) return;

    this._createObserver();
  }

  _createObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -60px 0px', // Ekranın %60'ı görünce tetikle
      threshold: 0.08,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Bir kez görününce gözlemlemeyi bırak (performans)
          this.observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach(el => this.observer.observe(el));
  }
}

/* ==========================================================================
   4. HERO SECTION — Yükleme Animasyonu Tetikleyici
   ========================================================================== */

class HeroInit {
  constructor() {
    this.hero   = document.querySelector('.hero');
    this.header = document.querySelector('.site-header');
    if (!this.hero) return;

    this._init();
  }

  _init() {
    // Hero üzerindeyken header'ı koyu overlay moduna al
    if (this.header) {
      this.header.classList.add('is-hero-mode');
    }

    // Sayfa yüklenince CSS animasyonlarını tetikle
    if (document.readyState === 'complete') {
      this._activate();
    } else {
      window.addEventListener('load', () => this._activate());
    }

    // Hero section'dan çıkılınca header'dan hero-mode kaldır
    if (this.header) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          this.header.classList.toggle('is-hero-mode', entry.isIntersecting);
        },
        { threshold: 0.1 }
      );
      observer.observe(this.hero);
    }
  }

  _activate() {
    // Kısa bir gecikmeyle sınıfı ekle (ilk çizim tamamlandıktan sonra)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.hero.classList.add('is-loaded');
      });
    });
  }
}

/* ==========================================================================
   5. SMOOTH SCROLL — Anchor Linkleri için
   ========================================================================== */

class SmoothScroll {
  constructor() {
    this._init();
  }

  _init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const headerHeight = parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue('--header-height') || '80'
        );

        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }
}

/* ==========================================================================
   6. UYGULAMA BAŞLATMA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  new HeroInit();
  new StickyHeader();
  new MobileNav();
  new SmoothScroll();
  new RevealOnScroll();
});
