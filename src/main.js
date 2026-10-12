/**
 * Lady Clinic - Dr. Shahira El Ghalban
 * Interactive Landing Page JavaScript
 * With Bilingual (Arabic / English) and Dark/Light Mode support
 */

import { translations, branchDataByLang } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  // ----------------------------------------------------
  // State Management: Theme & Language
  // ----------------------------------------------------
  let currentLang = localStorage.getItem('lady_clinic_lang') || 'ar';
  let currentTheme = localStorage.getItem('lady_clinic_theme') || (
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  let currentBranch = 'tanta';

  // DOM Elements for Switchers
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const mobileThemeText = document.getElementById('mobileThemeText');

  const langToggleBtn = document.getElementById('langToggleBtn');
  const langLabel = document.getElementById('langLabel');
  const mobileLangToggleBtn = document.getElementById('mobileLangToggleBtn');
  const mobileLangText = document.getElementById('mobileLangText');

  // Branch UI Elements
  const branchTabBtns = document.querySelectorAll('.branch-tab-btn');
  const branchTitle = document.getElementById('branchTitle');
  const branchDesc = document.getElementById('branchDesc');
  const branchAddress = document.getElementById('branchAddress');
  const branchHours = document.getElementById('branchHours');
  const branchPhones = document.getElementById('branchPhones');
  const branchStatusPill = document.getElementById('branchStatusPill');
  const branchWaBtn = document.getElementById('branchWaBtn');
  const branchCallBtn = document.getElementById('branchCallBtn');
  const mapBranchTag = document.getElementById('mapBranchTag');
  const branchMapLink = document.getElementById('branchMapLink');
  const topBarBranchSelect = document.getElementById('topBarBranchSelect');
  const bookingBranchSelect = document.getElementById('bookingBranch');
  const bookingServiceDropdown = document.getElementById('bookingService');

  // ----------------------------------------------------
  // Theme Toggle Functions
  // ----------------------------------------------------
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lady_clinic_theme', theme);

    const isDark = theme === 'dark';
    const iconStr = isDark ? '☀️' : '🌙';
    const textStr = isDark
      ? (currentLang === 'ar' ? 'الوضع النهاري' : 'Light Mode')
      : (currentLang === 'ar' ? 'الوضع الليلي' : 'Dark Mode');

    if (themeIcon) themeIcon.textContent = iconStr;
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('title', textStr);
      themeToggleBtn.setAttribute('aria-label', textStr);
    }
    if (mobileThemeIcon) mobileThemeIcon.textContent = iconStr;
    if (mobileThemeText) mobileThemeText.textContent = textStr;
  }

  function toggleTheme() {
    applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  // ----------------------------------------------------
  // Language Functions
  // ----------------------------------------------------
  function applyLanguage(lang) {
    currentLang = lang;
    const t = translations[lang] || translations.ar;
    localStorage.setItem('lady_clinic_lang', lang);

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.title = t.metaTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.metaDesc);

    // Update text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.textContent = t[key];
      }
    });

    // Update HTML elements with data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });

    // Update placeholder attributes with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (t[key] !== undefined) {
        el.setAttribute('placeholder', t[key]);
      }
    });

    // Update ARIA labels with data-i18n-aria
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      if (t[key] !== undefined) {
        el.setAttribute('aria-label', t[key]);
      }
    });

    // Update directional arrows
    document.querySelectorAll('.btn-arrow').forEach(el => {
      el.textContent = lang === 'ar' ? '←' : '→';
    });

    // Update top bar branch options
    if (topBarBranchSelect && t.topBranches) {
      Array.from(topBarBranchSelect.options).forEach(opt => {
        if (t.topBranches[opt.value]) {
          opt.textContent = t.topBranches[opt.value];
        }
      });
    }

    // Update booking form branch select options
    if (bookingBranchSelect && t.branchOptions) {
      const selectedIndex = bookingBranchSelect.selectedIndex;
      const firstOpt = bookingBranchSelect.options[0];
      if (firstOpt) firstOpt.textContent = t.formSelectBranchPlaceholder;
      
      t.branchOptions.forEach((item, index) => {
        const opt = bookingBranchSelect.options[index + 1];
        if (opt) {
          opt.textContent = item.label;
        }
      });
      bookingBranchSelect.selectedIndex = selectedIndex;
    }

    // Update booking form service select options
    if (bookingServiceDropdown && t.serviceOptions) {
      const selectedIndex = bookingServiceDropdown.selectedIndex;
      const firstOpt = bookingServiceDropdown.options[0];
      if (firstOpt) firstOpt.textContent = t.formSelectServicePlaceholder;

      t.serviceOptions.forEach((item, index) => {
        const opt = bookingServiceDropdown.options[index + 1];
        if (opt) {
          opt.textContent = item.label;
        }
      });
      bookingServiceDropdown.selectedIndex = selectedIndex;
    }

    // Update toggle buttons labels
    if (langLabel) {
      langLabel.textContent = lang === 'ar' ? 'English' : 'العربية';
    }
    if (mobileLangText) {
      mobileLangText.textContent = lang === 'ar' ? 'English' : 'العربية';
    }

    // Update theme toggle label in new language
    applyTheme(currentTheme);

    // Re-render active branch in current language
    updateBranchUI(currentBranch);
  }

  function toggleLanguage() {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
  }

  if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);
  if (mobileLangToggleBtn) mobileLangToggleBtn.addEventListener('click', toggleLanguage);

  // ----------------------------------------------------
  // Branch Locator UI
  // ----------------------------------------------------
  function updateBranchUI(branchKey) {
    currentBranch = branchKey;
    const branches = branchDataByLang[currentLang] || branchDataByLang.ar;
    const data = branches[branchKey];
    if (!data) return;

    if (branchTitle) branchTitle.textContent = data.title;
    if (branchDesc) branchDesc.textContent = data.desc;
    if (branchAddress) branchAddress.textContent = data.address;
    if (branchHours) branchHours.textContent = data.hours;
    if (branchPhones) branchPhones.textContent = data.phones;
    if (branchStatusPill) branchStatusPill.textContent = data.status;
    if (mapBranchTag) mapBranchTag.textContent = data.mapTag;

    if (branchWaBtn) {
      const encodedMsg = encodeURIComponent(data.waMessage);
      branchWaBtn.href = `https://wa.me/201030302398?text=${encodedMsg}`;
    }

    if (branchCallBtn) {
      const primaryPhone = data.phones.split('/')[0].trim();
      branchCallBtn.href = `tel:${primaryPhone}`;
    }

    if (branchMapLink) {
      branchMapLink.href = `https://maps.google.com/?q=${data.mapQuery}`;
    }

    // Sync tabs
    branchTabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-branch') === branchKey);
    });

    // Sync topbar
    if (topBarBranchSelect) {
      topBarBranchSelect.value = branchKey;
    }
  }

  branchTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const branchKey = btn.getAttribute('data-branch');
      updateBranchUI(branchKey);
    });
  });

  if (topBarBranchSelect) {
    topBarBranchSelect.addEventListener('change', () => {
      updateBranchUI(topBarBranchSelect.value);
      const branchSection = document.getElementById('branches');
      if (branchSection) {
        branchSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ----------------------------------------------------
  // Header Sticky Effect
  // ----------------------------------------------------
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // ----------------------------------------------------
  // Mobile Drawer Navigation
  // ----------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-btn');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      mobileDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  // ----------------------------------------------------
  // Services Filter Tabs
  // ----------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      serviceCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ----------------------------------------------------
  // Service Card "Book Now" Auto-Select
  // ----------------------------------------------------
  const serviceBookBtns = document.querySelectorAll('.btn-service-book');

  serviceBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceIndex = btn.getAttribute('data-service-index');
      if (bookingServiceDropdown && serviceIndex !== null) {
        const targetIndex = parseInt(serviceIndex, 10);
        if (targetIndex >= 0 && targetIndex < bookingServiceDropdown.options.length) {
          bookingServiceDropdown.selectedIndex = targetIndex;
        }
      }
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ----------------------------------------------------
  // FAQ Accordion
  // ----------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ----------------------------------------------------
  // Booking Form Validation & Actions
  // ----------------------------------------------------
  const appointmentForm = document.getElementById('appointmentForm');
  const patientNameInput = document.getElementById('patientName');
  const patientPhoneInput = document.getElementById('patientPhone');
  const bookingTimeInput = document.getElementById('bookingTime');
  const bookingNotesInput = document.getElementById('bookingNotes');
  const submitWhatsAppBtn = document.getElementById('submitWhatsAppBtn');
  const formSuccessBanner = document.getElementById('formSuccessBanner');

  function validateForm() {
    let isValid = true;

    // Validate Name
    const nameVal = patientNameInput.value.trim();
    const nameGroup = patientNameInput.closest('.form-group');
    if (!nameVal || nameVal.length < 2) {
      nameGroup.classList.add('has-error');
      isValid = false;
    } else {
      nameGroup.classList.remove('has-error');
    }

    // Validate Phone
    const phoneVal = patientPhoneInput.value.trim();
    const phoneGroup = patientPhoneInput.closest('.form-group');
    const phoneRegex = /^[0-9+ ]{10,15}$/;
    if (!phoneVal || !phoneRegex.test(phoneVal)) {
      phoneGroup.classList.add('has-error');
      isValid = false;
    } else {
      phoneGroup.classList.remove('has-error');
    }

    return isValid;
  }

  // WhatsApp Button Click
  if (submitWhatsAppBtn) {
    submitWhatsAppBtn.addEventListener('click', () => {
      if (!validateForm()) {
        return;
      }

      const name = patientNameInput.value.trim();
      const phone = patientPhoneInput.value.trim();
      const branchText = bookingBranchSelect.options[bookingBranchSelect.selectedIndex]?.text || (currentLang === 'ar' ? 'أقرب فرع متاح' : 'Nearest branch');
      const serviceText = bookingServiceDropdown.options[bookingServiceDropdown.selectedIndex]?.text || (currentLang === 'ar' ? 'استشارة جلدية وتجميلية' : 'General consultation');
      const time = bookingTimeInput.value.trim() || (currentLang === 'ar' ? 'في أقرب موعد متاح' : 'Earliest available');
      const notes = bookingNotesInput.value.trim() || (currentLang === 'ar' ? 'لا توجد ملاحظات إضافية' : 'None');

      let message = '';
      if (currentLang === 'ar') {
        message = `السلام عليكم ورحمة الله،
أود حجز موعد في Lady Clinic:
- الاسم: ${name}
- رقم الهاتف: ${phone}
- الفرع المفضل: ${branchText}
- الخدمة المطلوبة: ${serviceText}
- الوقت المفضل: ${time}
- ملاحظات: ${notes}`;
      } else {
        message = `Hello,
I would like to book an appointment at Lady Clinic:
- Name: ${name}
- Phone: ${phone}
- Preferred Branch: ${branchText}
- Requested Service: ${serviceText}
- Preferred Time: ${time}
- Notes: ${notes}`;
      }

      const waUrl = `https://wa.me/201030302398?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');

      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'block';
      }
    });
  }

  // Direct Submit Form
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateForm()) {
        return;
      }

      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'block';
        appointmentForm.reset();
        setTimeout(() => {
          formSuccessBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  }

  // ----------------------------------------------------
  // Floating WhatsApp Widget Popup Toggle
  // ----------------------------------------------------
  const waToggleBtn = document.getElementById('waToggleBtn');
  const waPopupMenu = document.getElementById('waPopupMenu');
  const waPopupClose = document.getElementById('waPopupClose');

  if (waToggleBtn && waPopupMenu) {
    waToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      waPopupMenu.classList.toggle('show');
    });

    if (waPopupClose) {
      waPopupClose.addEventListener('click', (e) => {
        e.stopPropagation();
        waPopupMenu.classList.remove('show');
      });
    }

    document.addEventListener('click', (e) => {
      if (!waPopupMenu.contains(e.target) && e.target !== waToggleBtn) {
        waPopupMenu.classList.remove('show');
      }
    });
  }

  // ----------------------------------------------------
  // Initialize Theme and Language
  // ----------------------------------------------------
  applyTheme(currentTheme);
  applyLanguage(currentLang);
});
