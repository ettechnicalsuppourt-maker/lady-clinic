/**
 * Lady Clinic - Dr. Shahira El Ghalban
 * Interactive Landing Page JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header Sticky Effect
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // 2. Mobile Drawer Navigation
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

  // 3. Services Filter Tabs
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

  // 4. Service Card "Book Now" Auto-Select
  const serviceBookBtns = document.querySelectorAll('.btn-service-book');
  const bookingServiceSelect = document.getElementById('bookingService');

  serviceBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (bookingServiceSelect && serviceName) {
        // Find matching option
        for (let i = 0; i < bookingServiceSelect.options.length; i++) {
          if (bookingServiceSelect.options[i].value === serviceName) {
            bookingServiceSelect.selectedIndex = i;
            break;
          }
        }
      }
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Interactive Branch Locator Data & Switcher
  const branchData = {
    tanta: {
      title: 'فرع طنطا (الفرع الجديد ✨)',
      desc: 'أحدث فروع Lady Clinic لخدمة مريضاتنا في الغربية والدلتا بأحدث أجهزة التجميل والليزر ونفس المستوى الرفيع من الخصوصية والراحة.',
      address: 'طنطا، شارع الجيش / منطقة النحاس، الغربية',
      hours: 'يومياً من السبت إلى الخميس (من 12:00 ظهراً وحتى 9:00 مساءً)',
      phones: '01030302398 / 01026601000',
      status: 'متاح للحجز الآن',
      mapTag: 'Lady Clinic - طنطا',
      mapQuery: 'Lady+Clinic+Tanta',
      waMessage: 'مرحبا، أود حجز موعد في فرع طنطا عيادة Lady Clinic'
    },
    mohandessin: {
      title: 'فرع المهندسين (القاهرة الكبرى)',
      desc: 'فرعنا الرئيسي في قلب الجيزة، مجهز بأحدث عيادات الجلدية وغرف الليزر المستقلة بأعلى درجات الخصوصية.',
      address: 'شارع جامعة الدول العربية، المهندسين، الجيزة',
      hours: 'يومياً من السبت إلى الخميس (من 12:00 ظهراً وحتى 9:00 مساءً)',
      phones: '01030302398 / 01145320668',
      status: 'متاح للحجز الآن',
      mapTag: 'Lady Clinic - المهندسين',
      mapQuery: 'Lady+Clinic+Mohandessin',
      waMessage: 'مرحبا، أود حجز موعد في فرع المهندسين عيادة Lady Clinic'
    },
    nasrcity: {
      title: 'فرع مدينة نصر (شرق القاهرة)',
      desc: 'خدمة متكاملة لسيدات وفتيات شرق القاهرة والتجمع، مع نخبة من طبيبات الجلدية والتجميل المتخصصات.',
      address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
      hours: 'يومياً من السبت إلى الخميس (من 12:00 ظهراً وحتى 9:00 مساءً)',
      phones: '01030302398 / 01145320668',
      status: 'متاح للحجز الآن',
      mapTag: 'Lady Clinic - مدينة نصر',
      mapQuery: 'Lady+Clinic+Nasr+City',
      waMessage: 'مرحبا، أود حجز موعد في فرع مدينة نصر عيادة Lady Clinic'
    },
    october: {
      title: 'فرع 6 أكتوبر (غرب الجيزة)',
      desc: 'موقع مميز وراحة استثنائية لخدمة سكان أكتوبر والشيخ زايد وغرب القاهرة بكامل التجهيزات والتعقيم.',
      address: 'المحور المركزي، بالقرب من ميدان الحصري، 6 أكتوبر',
      hours: 'يومياً من السبت إلى الخميس (من 12:00 ظهراً وحتى 9:00 مساءً)',
      phones: '01030302398 / 01286607231',
      status: 'متاح للحجز الآن',
      mapTag: 'Lady Clinic - 6 أكتوبر',
      mapQuery: 'Lady+Clinic+6th+October',
      waMessage: 'مرحبا، أود حجز موعد في فرع 6 أكتوبر عيادة Lady Clinic'
    },
    shebin: {
      title: 'فرع شبين الكوم (المنوفية)',
      desc: 'الفرع العريق لـ Lady Clinic في المنوفية، والذي شهد انطلاقة قصة النجاح وثقة عشرات الآلاف من المريضات.',
      address: 'ميدان شرف، عمارة الحكمة، بجوار مركز النخبة، الدور الأول',
      hours: 'يومياً من السبت إلى الخميس (من 12:00 ظهراً وحتى 9:00 مساءً)',
      phones: '01030302398 / 01286607231',
      status: 'متاح للحجز الآن',
      mapTag: 'Lady Clinic - شبين الكوم',
      mapQuery: 'Lady+Clinic+Shebin+El+Kom',
      waMessage: 'مرحبا، أود حجز موعد في فرع شبين الكوم عيادة Lady Clinic'
    },
    menouf: {
      title: 'فرع منوف (المنوفية)',
      desc: 'فرع متكامل لخدمة أهالي منوف والمناطق المجاورة بأعلى معايير الرعاية والخصوصية النسائية.',
      address: 'شارع الجيش، برج داون تاون، فوق ويل مارت، الدور السادس',
      hours: 'يومياً من السبت إلى الخميس (من 12:00 ظهراً وحتى 9:00 مساءً)',
      phones: '01030302398 / 01286607231',
      status: 'متاح للحجز الآن',
      mapTag: 'Lady Clinic - منوف',
      mapQuery: 'Lady+Clinic+Menouf',
      waMessage: 'مرحبا، أود حجز موعد في فرع منوف عيادة Lady Clinic'
    }
  };

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

  function updateBranchUI(branchKey) {
    const data = branchData[branchKey];
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

  // 6. FAQ Accordion
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

  // 7. Booking Form Validation & Actions
  const appointmentForm = document.getElementById('appointmentForm');
  const patientNameInput = document.getElementById('patientName');
  const patientPhoneInput = document.getElementById('patientPhone');
  const bookingBranchSelect = document.getElementById('bookingBranch');
  const bookingServiceDropdown = document.getElementById('bookingService');
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
      const branch = bookingBranchSelect.value || 'أقرب فرع متاح';
      const service = bookingServiceDropdown.value || 'استشارة جلدية وتجميلية';
      const time = bookingTimeInput.value.trim() || 'في أقرب موعد متاح';
      const notes = bookingNotesInput.value.trim() || 'لا توجد ملاحظات إضافية';

      const message = `السلام عليكم ورحمة الله،
أود حجز موعد في Lady Clinic:
- الاسم: ${name}
- رقم الهاتف: ${phone}
- الفرع المفضل: ${branch}
- الخدمة المطلوبة: ${service}
- الوقت المفضل: ${time}
- ملاحظات: ${notes}`;

      const waUrl = `https://wa.me/201030302398?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');

      if (formSuccessBanner) {
        formSuccessBanner.style.display = 'block';
      }
    });
  }

  // Standard Submit Form
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

  // 8. Floating WhatsApp Widget Popup Toggle
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
});
