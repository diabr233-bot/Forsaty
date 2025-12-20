disableScroll();
const logo = document.getElementById("logo");
const splash = document.getElementById("splash");
function startIntro() {
  logo.style.animation = "logoIntro 4s linear forwards";
  logo.addEventListener(
    "animationend",
    () => {
      splash.classList.add("hidden");
      enableScroll();
    },
    { once: true }
  );
}
if (logo.complete) {
  startIntro();
} else {
  logo.onload = startIntro;
}

// Default config for Element SDK
const defaultConfig = {
  main_title: " مستقبلك المهني إكتشف",
  main_subtitle:
    "منصة شاملة تربط بين المواهب والفرص، وتمكنك من تحقيق طموحاتك المهنية",
  journey_title: "ابدأ رحلتك معانا",
  journey_subtitle: "اغتنم فرصتك",
};

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig: defaultConfig,
    onConfigChange: async (config) => {
      const mainTitleEl = document.getElementById("main-title");
      if (mainTitleEl) {
        mainTitleEl.textContent = config.main_title || defaultConfig.main_title;
      }

      const mainSubtitleEl = document.getElementById("main-subtitle");
      if (mainSubtitleEl) {
        mainSubtitleEl.textContent =
          config.main_subtitle || defaultConfig.main_subtitle;
      }

      const journeyTitleEl = document.getElementById("journey-title");
      if (journeyTitleEl) {
        journeyTitleEl.textContent =
          config.journey_title || defaultConfig.journey_title;
      }

      const journeySubtitleEl = document.getElementById("journey-subtitle");
      if (journeySubtitleEl) {
        journeySubtitleEl.textContent =
          config.journey_subtitle || defaultConfig.journey_subtitle;
      }
    },
    mapToCapabilities: (config) => ({
      recolorables: [],
      borderables: [],
      fontEditable: undefined,
      fontSizeable: undefined,
    }),
    mapToEditPanelValues: (config) =>
      new Map([
        ["main_title", config.main_title || defaultConfig.main_title],
        ["main_subtitle", config.main_subtitle || defaultConfig.main_subtitle],
        ["journey_title", config.journey_title || defaultConfig.journey_title],
        [
          "journey_subtitle",
          config.journey_subtitle || defaultConfig.journey_subtitle,
        ],
      ]),
  });
}

// Page mapping
const pages = {
  home: document.getElementById("home-page"),
  "request-service": document.getElementById("request-service-page"),
  "find-job": document.getElementById("find-job-page"),
  "offer-service": document.getElementById("offer-service-page"),
  "post-job": document.getElementById("post-job-page"),
  training: document.getElementById("training-page"),
  "reading-space": document.getElementById("reading-space-page"),
  "forsaty-store": document.getElementById("forsaty-store-page"),
};

function disableScroll() {
  document.body.classList.add("no-scroll");
}

function enableScroll() {
  document.body.classList.remove("no-scroll");
}

// Toast Notification
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  // وضع النص
  toastMessage.textContent = message;

  // إظهار التوست
  toast.classList.remove("opacity-0", "pointer-events-none");

  // إخفاء التوست بعد المدة المحددة
  setTimeout(() => {
    toast.classList.add("opacity-0", "pointer-events-none");

    // تنظيف النص بعد انتهاء انميشن الاختفاء (0.5 ثانية)
    setTimeout(() => {
      toastMessage.textContent = "";
    }, 500);
  }, duration);
}

// Login Modal Management
const loginModalOverlay = document.getElementById("login-modal-overlay");
const loginModal = document.getElementById("login-modal");
const openLoginModalBtn = document.getElementById("open-login-modal-btn");
const closeLoginModalBtn = document.getElementById("close-login-modal");
const backLoginModalBtn = document.getElementById("back-login-modal");
const modalTitle = document.getElementById("modal-title");

const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");
const forgotPasswordForm = document.getElementById("forgot-password-form");

const showSignupBtn = document.getElementById("show-signup");
const showLoginFromSignupBtn = document.getElementById(
  "show-login-from-signup"
);
const forgotPasswordLink = document.getElementById("forgot-password-link");
const showLoginFromForgotBtn = document.getElementById(
  "show-login-from-forgot"
);

let currentModalView = "login"; // 'login', 'signup', 'forgot'

function openLoginModal() {
  loginModalOverlay.classList.remove("pointer-events-none", "opacity-0");
  loginModalOverlay.classList.add("opacity-100");
  loginModal.classList.remove("scale-95");
  loginModal.classList.add("scale-100");
  closeSidebar();
  setTimeout(() => {
    disableScroll();
  }, 500);
  showModalView("login");
}

function closeLoginModal() {
  loginModalOverlay.classList.add("pointer-events-none", "opacity-0");
  loginModalOverlay.classList.remove("opacity-100");
  loginModal.classList.add("scale-95");
  loginModal.classList.remove("scale-100");
  enableScroll();
}

function showModalView(view) {
  currentModalView = view;

  // Hide all forms
  loginForm.classList.add("hidden");
  signupForm.classList.add("hidden");
  forgotPasswordForm.classList.add("hidden");

  // Show/hide appropriate buttons
  if (view === "login") {
    loginForm.classList.remove("hidden");
    modalTitle.textContent =
      openLoginModalBtn.querySelector("span").textContent;
    closeLoginModalBtn.classList.remove("hidden");
    backLoginModalBtn.classList.add("hidden");
  } else if (view === "signup") {
    signupForm.classList.remove("hidden");
    modalTitle.textContent = showSignupBtn.textContent;
    closeLoginModalBtn.classList.add("hidden");
    backLoginModalBtn.classList.remove("hidden");
  } else if (view === "forgot") {
    forgotPasswordForm.classList.remove("hidden");
    let title = forgotPasswordLink.textContent.replace(/[؟?]/g, "").trim(); // إزالة علامة الاستفهام
    // إذا تستخدم مكتبة ترجمة، ضع هنا النص المترجم بدل title مباشرة
    // مثال: title = i18n('forgotPasswordTitle');
    modalTitle.textContent = title;
    closeLoginModalBtn.classList.add("hidden");
    backLoginModalBtn.classList.remove("hidden");
  }
  // التمرير للأعلى تلقائياً
  const modalContent = document.querySelector("#login-modal");
  if (modalContent) {
    modalContent.scrollTop = 0;
  }
}

// Event Listeners
openLoginModalBtn.addEventListener("click", () => {
  openLoginModal();
  closeSidebar();
});

closeLoginModalBtn.addEventListener("click", closeLoginModal);
loginModalOverlay.addEventListener("click", (e) => {
  if (e.target === loginModalOverlay) {
    closeLoginModal();
  }
});

backLoginModalBtn.addEventListener("click", () => {
  showModalView("login");
});

showSignupBtn.addEventListener("click", () => {
  showModalView("signup");
});

showLoginFromSignupBtn.addEventListener("click", () => {
  showModalView("login");
});

forgotPasswordLink.addEventListener("click", () => {
  showModalView("forgot");
});

showLoginFromForgotBtn.addEventListener("click", () => {
  showModalView("login");
});

document.addEventListener("DOMContentLoaded", () => {
  // اختيار كل Inputs من نوع Password
  document.querySelectorAll('input[type="password"]').forEach((input) => {
    const wrapper = input.parentElement; // div الذي يحتوي input
    const eye = wrapper.querySelector(".fa-eye");
    const eyeSlash = wrapper.querySelector(".fa-eye-slash");

    // التحقق من وجود الأيقونات داخل نفس الـ wrapper
    if (!eye || !eyeSlash) return;

    // في البداية نخفي Eye إذا الحقل فارغ
    if (input.value.length === 0) {
      eye.classList.add("hidden");
      eyeSlash.classList.add("hidden");
    }

    // إظهار Eye عند كتابة أول حرف
    input.addEventListener("input", () => {
      if (input.value.length > 0) {
        eye.classList.remove("hidden"); // تظهر Eye الأولى
      } else {
        eye.classList.add("hidden"); // إذا الحقل فارغ نخفيها
        eyeSlash.classList.add("hidden"); // نخفي Eye Slash أيضًا
      }
    });

    // Toggle عند الضغط على Eye
    eye.addEventListener("click", () => {
      input.type = "text"; // إظهار النص
      eye.classList.add("hidden"); // إخفاء Eye
      eyeSlash.classList.remove("hidden"); // إظهار Eye Slash
    });

    // Toggle عند الضغط على Eye Slash
    eyeSlash.addEventListener("click", () => {
      input.type = "password"; // إخفاء النص
      eyeSlash.classList.add("hidden"); // إخفاء Eye Slash
      if (input.value.length > 0) {
        eye.classList.remove("hidden"); // إعادة Eye الأولى إذا الحقل يحتوي نص
      }
    });
  });
});

document.querySelectorAll(".no-spaces").forEach((input) => {
  // منع إدخال المسافة أثناء الكتابة
  input.addEventListener("keydown", (e) => {
    if (e.key === " ") e.preventDefault();
  });

  // إزالة أي مسافات تم لصقها
  input.addEventListener("input", () => {
    input.value = input.value.replace(/\s/g, "");
  });
});

let currentPage = "home";
let searchActive = false;
let lastScrollY = window.scrollY;
const header = document.getElementById("main-header");

// Sidebar functionality
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const headerRightBtn = document.getElementById("header-right-btn");
const closeSidebarBtn = document.getElementById("close-sidebar-btn");
const menuIcon = document.getElementById("menu-icon");
const backIcon = document.getElementById("back-icon");
const headerLogo = document.getElementById("header-logo");
const headerTitle = document.getElementById("header-title");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const mainHeader = document.getElementById("main-header");

// =====================
// أدوات التحقق (Reusable)
// =====================

function isValidPassword(password) {
  return password.length >= 8;
}

function isValidName(name) {
  return name.trim().length >= 4;
}

function hasLetters(value) {
  return /[a-zA-Z]/.test(value);
}

function isOnlyNumbers(value) {
  return /^\d+$/.test(value);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^\d{10}$/; // 10 أرقام فقط
  return phoneRegex.test(phone);
}

function isOnlyNumbers(value) {
  return /^\d+$/.test(value);
}

// =====================
// Login Form
// =====================

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;

  // ===== Login Value Smart Validation =====
  if (hasLetters(email)) {
    // محاولة بريد إلكتروني
    if (!email.includes("@")) {
      showToast("يرجى إدخال الرمز @ في البريد الإلكتروني");
      return;
    }
    if (!isValidEmail(email)) {
      showToast("البريد الإلكتروني غير صالح");
      return;
    }
  } else if (isOnlyNumbers(email)) {
    // أرقام فقط → هاتف أو ID
    if (email.startsWith("0")) {
      // رقم هاتف
      if (email.length !== 10) {
        showToast("رقم الهاتف غير صالح");
        return;
      }
    } else {
      // ID
      if (email.length !== 7) {
        showToast("رقم ID غير صالح");
        return;
      }
    }
  } else {
    showToast("الادخال غير صالح");
    return;
  }

  if (!password) {
    showToast("يرجى إدخال كلمة المرور");
    return;
  }

  if (!isValidPassword(password)) {
    showToast("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل");
    return;
  }

  showToast("جاري تسجيل الدخول...");
  closeLoginModal();
});

// =====================
// Signup Form
// =====================

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const phone = document.getElementById("signup-phone").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirmPassword = document.getElementById(
    "signup-confirm-password"
  ).value;

  // الاسم
  if (!name) {
    showToast("يرجى إدخال الاسم");
    return;
  }

  if (!isValidName(name)) {
    showToast("الاسم يجب أن يحتوي على 4 أحرف على الأقل");
    return;
  }

  // البريد
  // البريد الإلكتروني
  if (!email) {
    showToast("يرجى إدخال البريد الإلكتروني");
    return;
  }

  if (!isValidEmail(email)) {
    showToast("يرجى إدخال بريد إلكتروني صالح");
    return;
  }

  // الهاتف
  if (!phone) {
    showToast("يرجى إدخال رقم الهاتف");
    return;
  }

  if (!isOnlyNumbers(phone)) {
    showToast("رقم الهاتف غير صالح");
    return;
  }

  if (!isValidPhone(phone)) {
    showToast("رقم الهاتف غير صالح");
    return;
  }

  // كلمة المرور
  if (!password) {
    showToast("يرجى إدخال كلمة المرور");
    return;
  }

  if (!isValidPassword(password)) {
    showToast("كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل");
    return;
  }

  if (password !== confirmPassword) {
    showToast("كلمتا المرور غير متطابقتين");
    return;
  }

  showToast("جاري إنشاء الحساب...");
  closeLoginModal();
});

// =====================
// Forgot Password Form
// =====================

forgotPasswordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("forgot-email").value.trim();
  if (!email) {
    showToast("يرجى إدخال البريد الإلكتروني");
    return;
  }
  if (!isValidEmail(email)) {
    showToast("البريد الإلكتروني غير صالح");
    return;
  }
  showToast("تم إرسال رابط إعادة التعيين إلى بريدك");
  closeLoginModal();
});

signupForm.noValidate = true;
loginForm.noValidate = true;
forgotPasswordForm.noValidate = true;

// Settings Modal Management (نفس أسلوب نافذة الدخول)
const settingsModalOverlay = document.getElementById("settings-modal-overlay");
const settingsModal = document.getElementById("settings-modal");
const openSettingsModalBtn = document.getElementById("open-settings-modal-btn");
const closeSettingsModalBtn = document.getElementById("close-settings-modal");
const backSettingsModalBtn = document.getElementById("back-settings-modal");
const settingsModalTitle = document.getElementById("settings-modal-title");

// الشاشات الفرعية (تأكد أن الـ IDs موجودة في HTML)
const mainSettingsScreen = document.getElementById("settings-main-menu");
const accountSettingsScreen = document.getElementById(
  "account-settings-screen"
);
const notificationSettingsScreen = document.getElementById(
  "notification-settings-screen"
);
const privacySettingsScreen = document.getElementById(
  "privacy-settings-screen"
);
const languageSettingsScreen = document.getElementById(
  "language-settings-screen"
);
const appearanceSettingsScreen = document.getElementById(
  "appearance-settings-screen"
);

// أزرار فتح الأقسام (إن وجدت)
const openAccountSettingsBtn = document.getElementById("open-account-settings");
const openNotificationSettingsBtn = document.getElementById(
  "open-notification-settings"
);
const openPrivacySettingsBtn = document.getElementById("open-privacy-settings");
const openLanguageSettingsBtn = document.getElementById(
  "open-language-settings"
);
const openAppearanceSettingsBtn = document.getElementById(
  "open-appearance-settings"
);

let currentSettingsView = "main"; // 'main', 'account', 'notifications', 'privacy', 'language', 'appearance'

// خريطة الشاشات والعناوين (استخدمها في showSettingsView)
const settingsScreens = {
  main: mainSettingsScreen,
  account: accountSettingsScreen,
  notifications: notificationSettingsScreen,
  privacy: privacySettingsScreen,
  language: languageSettingsScreen,
  appearance: appearanceSettingsScreen,
};

const settingsTitles = {
  main: "الإعدادات",
  account: "الحساب",
  notifications: "الإشعارات",
  privacy: "الأمان",
  language: "اللغة",
  appearance: "المظهر",
};

// فتح نافذة الإعدادات
function openSettingsModal() {
  if (!settingsModalOverlay || !settingsModal) return;
  settingsModalOverlay.classList.remove("pointer-events-none", "opacity-0");
  settingsModalOverlay.classList.add("opacity-100");
  settingsModal.classList.remove("scale-95");
  settingsModal.classList.add("scale-100");
  closeSidebar();
  disableScroll();

  showSettingsView("main");
}

// غلق نافذة الإعدادات
function closeSettingsModal() {
  if (!settingsModalOverlay || !settingsModal) return;
  settingsModalOverlay.classList.add("pointer-events-none", "opacity-0");
  settingsModalOverlay.classList.remove("opacity-100");
  settingsModal.classList.add("scale-95");
  settingsModal.classList.remove("scale-100");

  enableScroll();
}

// عرض شاشة داخل نافذة الإعدادات (نفس أسلوب showModalView)
function showSettingsView(view) {
  currentSettingsView = view;
  // 1) إخفاء كل الشاشات
  Object.values(settingsScreens).forEach((screen) => {
    if (screen) screen.classList.add("hidden");
  });
  const target = settingsScreens[view];
  if (!target) return;
  // 2) إظهار الشاشة المطلوبة
  target.classList.remove("hidden");
  // 3) التحكم في العنوان والأزرار
  if (view === "main") {
    // ===== الرجوع إلى الشاشة الرئيسية =====
    // العنوان من زر Sidebar
    const sidebarBtnText =
      openSettingsModalBtn.querySelector("span").textContent ||
      openSettingsModalBtn.textContent;
    settingsModalTitle.textContent = sidebarBtnText.trim();
    // زر X يظهر
    closeSettingsModalBtn.classList.remove("hidden");
    // زر الرجوع يختفي
    backSettingsModalBtn.classList.add("hidden");
    // استعادة الإعدادات
    restoreAppliedLanguage();
    restoreAppliedSettings();
  } else {
    // ===== شاشة فرعية =====
    // العنوان من H4
    const h4 = target.querySelector("h4");
    settingsModalTitle.textContent = h4 ? h4.textContent.trim() : "";
    // زر X يختفي
    closeSettingsModalBtn.classList.add("hidden");
    // زر الرجوع يظهر
    backSettingsModalBtn.classList.remove("hidden");
  }
  // 4) الرجوع للأعلى
  settingsModal.scrollTop = 0;
}

function restoreAppliedLanguage() {
  const savedLang = localStorage.getItem("appLanguage") || "ar"; // القيمة المطبقة

  document.querySelectorAll(".language-option").forEach((opt) => {
    const lang = opt.getAttribute("onclick").match(/'(\w+)'/)[1]; // استخراج اللغة من onclick

    // إزالة الحالة النشطة
    opt.classList.remove("border-purple-400");
    opt.classList.add("border-gray-200");
    opt.classList.add("text-gray-700");
    opt.style.color = "";
    const checkmark = opt.querySelector(".checkmark");
    if (checkmark) checkmark.classList.add("hidden");

    // تفعيل الخيار المطبق
    if (lang === savedLang) {
      opt.classList.remove("border-gray-200");
      opt.classList.add("border-purple-400");
      opt.classList.remove("text-gray-700");
      opt.style.color = "var(--primary-color)";
      if (checkmark) checkmark.classList.remove("hidden");
    }
  });
}

function restoreAppliedSettings() {
  // --- Theme ---
  const savedTheme = localStorage.getItem("appTheme") || "light";
  document.querySelectorAll(".theme-option").forEach((opt) => {
    const theme = opt.getAttribute("onclick").match(/'(\w+)'/)[1]; // استخراج theme من onclick

    // إزالة الحالة النشطة
    opt.classList.remove("active");
    opt.classList.remove("border-purple-400");
    const text = opt.querySelector(".theme-text");
    text.style.color = "";
    text.classList.add("text-gray-700");

    // تفعيل الخيار المطبق
    if (theme === savedTheme) {
      opt.classList.add("active");
      opt.classList.remove("border-gray-200");
      opt.classList.add("border-purple-400");
      text.style.color = "var(--primary-color)";
      text.classList.remove("text-gray-700");
    }
    const savedFontSize = localStorage.getItem("appFontSize") || "16";
    const fontSizeInput = document.getElementById("font-size-input");
    if (fontSizeInput) {
      fontSizeInput.value = savedFontSize;
    }
  });

  // --- Color ---
  const savedColor = localStorage.getItem("appColor") || "purple";
  document.querySelectorAll(".color-option").forEach((opt) => {
    const color = opt.getAttribute("onclick").match(/'(\w+)'/)[1]; // استخراج اللون من onclick

    // إزالة الحالة النشطة
    opt.classList.remove("active");
    opt.classList.remove(
      "border-purple-400",
      "border-blue-400",
      "border-green-400",
      "border-orange-400",
      "border-pink-400"
    );
    opt.classList.add("border-white");

    // تفعيل الخيار المطبق
    if (color === savedColor) {
      opt.classList.add("active");
      opt.classList.remove("border-white");
      const borderColors = {
        purple: "border-purple-400",
        blue: "border-blue-400",
        green: "border-green-400",
        orange: "border-orange-400",
        pink: "border-pink-400",
      };
      opt.classList.add(borderColors[color]);
    }
  });
}

// ===== Event Listeners ===== //

// فتح النافذة
if (openSettingsModalBtn) {
  openSettingsModalBtn.addEventListener("click", () => {
    openSettingsModal();
    // لو عندك sidebar قابل للطي
    if (
      typeof sidebar !== "undefined" &&
      sidebar.classList &&
      sidebar.classList.contains("open") &&
      typeof toggleSidebar === "function"
    ) {
      toggleSidebar();
    }
  });
} else {
  console.warn("open-settings-modal-btn not found in DOM.");
}

// إغلاق النافذة بزر الإغلاق
if (closeSettingsModalBtn) {
  closeSettingsModalBtn.addEventListener("click", closeSettingsModal);
} else {
  console.warn("close-settings-modal not found in DOM.");
}

// إغلاق بالنقر على الخلفية (overlay)
if (settingsModalOverlay) {
  settingsModalOverlay.addEventListener("click", (e) => {
    if (e.target === settingsModalOverlay) closeSettingsModal();
  });
}

// زر الرجوع -> يعود للـ main
if (backSettingsModalBtn) {
  backSettingsModalBtn.addEventListener("click", () => {
    showSettingsView("main");
  });
} else {
  console.warn("back-settings-modal not found in DOM.");
}

// ربط أزرار فتح الأقسام الداخلية
openAccountSettingsBtn.addEventListener("click", () =>
  showSettingsView("account")
);
openNotificationSettingsBtn.addEventListener("click", () =>
  showSettingsView("notifications")
);
openPrivacySettingsBtn.addEventListener("click", () =>
  showSettingsView("privacy")
);
openLanguageSettingsBtn.addEventListener("click", () =>
  showSettingsView("language")
);
openAppearanceSettingsBtn.addEventListener("click", () =>
  showSettingsView("appearance")
);

// اختصار لوحة المفاتيح: Escape لغلق النافذة (مثل سلوك نافذة الدخول)
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    settingsModalOverlay &&
    settingsModalOverlay.classList.contains("opacity-100")
  ) {
    closeSettingsModal();
  }
});

// ===== تهيئة افتراضية عند تحميل السكربت =====
/* إذا أردت التأكد بدايةً أن الشاشة الرئيسية مخفية أو مرئية يمكن تفعيل السطر التالي */
if (settingsScreens.main) {
  // تأكد أن باقي الشاشات مخفية و main ظاهرة
  Object.entries(settingsScreens).forEach(([k, el]) => {
    if (!el) return;
    if (k === "main") {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });
  settingsModalTitle.textContent = settingsTitles.main;
}

// Language selection functionality
let selectedLanguage = localStorage.getItem("appLanguage") || "ar";

function selectLanguage(button, lang) {
  selectedLanguage = lang;

  // Remove active state from all language options
  document.querySelectorAll(".language-option").forEach((opt) => {
    opt.classList.remove("border-purple-400");
    opt.classList.add("border-gray-200");
    opt.style.color = "";
    opt.classList.add("text-gray-700");
    const checkmark = opt.querySelector(".checkmark");
    if (checkmark) checkmark.classList.add("hidden");
  });

  // Add active state to selected option
  button.classList.remove("border-gray-200");
  button.classList.add("border-purple-400");
  button.classList.remove("text-gray-700");
  button.style.color = "var(--primary-color)";
  const checkmark = button.querySelector(".checkmark");
  if (checkmark) checkmark.classList.remove("hidden");
}

let translations = {};

async function loadTranslations(lang) {
  // 🔹 العربية = اللغة الافتراضية
  if (lang === "ar") {
    translations = {}; // تفريغ الترجمات
    localStorage.removeItem("appLanguage");
    return; // إيقاف الدالة
  }

  // 🔹 باقي اللغات
  const response = await fetch(`lang/${lang}.json`);
  translations = await response.json();
  updatePlaceholders();
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");

    if (!translations[key]) return; // ✅ لا تغيّر النص

    el.textContent = translations[key];
  });
}

function getTranslation(key, vars = {}) {
  let text = translations[key] || key;
  Object.keys(vars).forEach((k) => {
    text = text.replace(`{${k}}`, vars[k]);
  });
  return text;
}

function updatePlaceholders() {
  if (selectedLanguage === "ar") return; // لا تغيّر إذا العربية
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const translation = translations[key];
    if (!translation) return;
    if (el.tagName === "INPUT") {
      el.setAttribute("placeholder", translation);
    }
  });
}

function saveLanguage() {
  localStorage.setItem("appLanguage", selectedLanguage);
  document.documentElement.setAttribute(
    "dir",
    selectedLanguage === "ar" ? "rtl" : "ltr"
  );
  document.documentElement.setAttribute("lang", selectedLanguage);
  loadTranslations(selectedLanguage); // تحميل النصوص الجديدة
  const langNames = { ar: "العربية", en: "English", fr: "Français" };
  // نفترض أن loadTranslations ترجع Promise
  loadTranslations(selectedLanguage).then(() => {
    // توست آمن بعد تحميل الترجمات
    if (selectedLanguage === "ar") {
      showToast("تم حفظ اللغة");
    } else {
      showToast(getTranslation("toastLanguageSaved"));
    }
  });
  // إعادة تحميل الصفحة بعد 3 ثوانٍ (3000 مللي ثانية)
  setTimeout(() => {
    location.reload();
  }, 3000);
}

// تطبيق اللغة المحفوظة عند تحميل الصفحة
function applyLanguage() {
  const lang = localStorage.getItem("appLanguage") || "ar";
  selectedLanguage = lang;
  // تعيين اتجاه الصفحة
  document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  document.documentElement.setAttribute("lang", lang);
  // إضافة/إزالة كلاس ltr على الـ html حسب اللغة
  if (lang === "ar") {
    document.documentElement.classList.remove("ltr");
  } else if (lang === "fr" || lang === "en") {
    document.documentElement.classList.add("ltr");
  }
  // تحديث الزر النشط
  setTimeout(() => {
    const langButtons = document.querySelectorAll(".language-option");
    const langs = ["ar", "en", "fr"];
    langButtons.forEach((btn, index) => {
      if (langs[index] === lang) selectLanguage(btn, lang);
    });
  }, 100);
  loadTranslations(lang); // تحميل النصوص للغة المحفوظة
}

// Initialize app on page load
window.addEventListener("DOMContentLoaded", () => {
  // تطبيق اللغة أولاً
  applyLanguage();

  const savedTheme = localStorage.getItem("appTheme") || "light";
  const savedColor = localStorage.getItem("appColor") || "purple";
  const savedFontSize = parseInt(localStorage.getItem("appFontSize")) || 16;

  selectedTheme = savedTheme;
  selectedColor = savedColor;
  selectedFontSize = savedFontSize;

  // تطبيق السمة واللون وحجم الخط
  applyTheme(savedTheme);
  applyColor(savedColor);
  document.documentElement.style.fontSize = savedFontSize + "px";

  // ضبط قيمة الـ input range لحجم الخط
  const fontInput = document.getElementById("font-size-input");
  if (fontInput) {
    fontInput.value = savedFontSize; // تعيين المؤشر إلى القيمة المحفوظة
  }

  // Set active theme button
  setTimeout(() => {
    const themes = ["light", "dark", "auto"];
    const themeButtons = document.querySelectorAll(".theme-option");
    themeButtons.forEach((btn, index) => {
      if (themes[index] === savedTheme) {
        selectTheme(btn, savedTheme);
      }
    });

    // Set active color button
    const colors = ["purple", "blue", "green", "orange", "pink"];
    const colorButtons = document.querySelectorAll(".color-option");
    colorButtons.forEach((btn, index) => {
      if (colors[index] === savedColor) {
        selectColor(btn, savedColor);
      }
    });
  }, 200);
});

// Theme selection functionality
let selectedTheme = localStorage.getItem("appTheme") || "light";
let selectedFontSize = parseInt(localStorage.getItem("appFontSize")) || 16;

function selectTheme(button, theme) {
  selectedTheme = theme;

  // Remove active state from all theme options
  document.querySelectorAll(".theme-option").forEach((opt) => {
    opt.classList.remove("active");
    opt.classList.remove("border-purple-400");
    opt.classList.add("border-gray-200");
    const text = opt.querySelector(".theme-text");
    text.style.color = "";
    text.classList.add("text-gray-700");
  });

  // Add active state to selected option
  button.classList.add("active");
  button.classList.remove("border-gray-200");
  button.classList.add("border-purple-400");
  const text = button.querySelector(".theme-text");
  text.style.color = "var(--primary-color)";
  text.classList.remove("text-gray-700");
}

// Color selection functionality
let selectedColor = localStorage.getItem("appColor") || "purple";

function selectColor(button, color) {
  selectedColor = color;

  // Remove active state from all color options
  document.querySelectorAll(".color-option").forEach((opt) => {
    opt.classList.remove("active");
    opt.classList.remove(
      "border-purple-400",
      "border-blue-400",
      "border-green-400",
      "border-orange-400",
      "border-pink-400"
    );
    opt.classList.add("border-white");
  });

  // Add active state to selected option
  button.classList.add("active");
  button.classList.remove("border-white");
  const borderColors = {
    purple: "border-purple-400",
    blue: "border-blue-400",
    green: "border-green-400",
    orange: "border-orange-400",
    pink: "border-pink-400",
  };
  button.classList.add(borderColors[color]);
}

function applyTheme(theme) {
  document.body.classList.add("transition-color");
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document
      .querySelectorAll('[class*="hover:bg-purple-100"]')
      .forEach((el) => {
        el.classList.remove("hover:bg-purple-100");
        el.classList.add("hover:bg-white/20");
      });
  } else if (theme === "light") {
    document.body.classList.remove("dark-mode");
  } else {
    // Auto mode - detect system preference
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(isDark ? "dark" : "light");
  }
}

function applyColor(color) {
  document.body.classList.add("transition-color");
  // إذا اختار المستخدم اللون البنفسجي، ارجع للون الأصلي
  if (color === "purple") {
    localStorage.removeItem("appColor");
    return; // إيقاف تنفيذ باقي الدالة
  }
  const colorGradients = {
    purple: "#5c0035",
    blue: "#1e40af",
    green: "#15803d",
    orange: "#c2410c",
    pink: "#be185d",
  };
  const secondaryGradients = {
    purple: "#fce4ec",
    blue: "#e0e7ff",
    green: "#dcfce7",
    orange: "#ffedd5",
    pink: "#fce4ec",
  };

  const colorValues = {
    purple: "5c0035",
    blue: "#1e40af",
    green: "#15803d",
    orange: "#c2410c",
    pink: "#be185d",
  };

  // تحديث اللوجو مباشرة
  const logos = {
    purple: "img/Forsaty-title-logo.png",
    blue: "img/Forsaty-title-logo-blue.png",
    green: "img/Forsaty-title-logo-green.png",
    orange: "img/Forsaty-title-logo-orange.png",
    pink: "img/Forsaty-title-logo-pink.png",
  };
  const logo = document.getElementById("app-logo");
  if (logo && logos[color]) {
    logo.src = logos[color];
  }

  const toastGradients = {
    purple: {
      border: "#b33293",
      from: "rgba(179, 50, 147, 0.9)",
      to: "rgba(92, 0, 54, 0.9)",
    },
    blue: {
      border: "#3b82f6",
      from: "rgba(59, 130, 246, 0.9)",
      to: "rgba(30, 58, 138, 0.9)",
    },
    green: {
      border: "#22c55e",
      from: "rgba(34, 197, 94, 0.9)",
      to: "rgba(21, 128, 61, 0.9)",
    },
    orange: {
      border: "#f97316",
      from: "rgba(249, 115, 22, 0.9)",
      to: "rgba(154, 52, 18, 0.9)",
    },
    pink: {
      border: "#ec4899",
      from: "rgba(236, 72, 153, 0.9)",
      to: "rgba(131, 24, 67, 0.9)",
    },
  };

  const toast = document.getElementById("toast");
  if (toast) {
    toast.style.border = `1px solid ${toastGradients[color].border}`;
    toast.style.background = `
      linear-gradient(
      145deg,
      ${toastGradients[color].from} 10%,
      ${toastGradients[color].to} 20%,
      ${toastGradients[color].to} 85%,
      ${toastGradients[color].from} 95%
      )
      `;
  }

  // تطبيق التدرج على العناصر
  document
    .querySelectorAll(
      '.gradient-bg, [style*="linear-gradient"][style*="var(--primary-color)"][style*="#8e0052"]'
    )
    .forEach((el) => {
      el.style.background = colorGradients[color];
    });
  document
    .querySelectorAll('[style*="border"][style*="var(--primary-color)"]')
    .forEach((el) => {
      el.style.borderColor = colorGradients[color];
    });
  document.querySelectorAll('[class*="hover:bg-purple-100"]').forEach((el) => {
    el.classList.remove("hover:bg-purple-100");
    el.classList.add(`hover:bg-${color}-100`);
  });
  document.querySelectorAll('[class*="from-purple-50"]').forEach((el) => {
    el.classList.remove("from-purple-50");
    el.classList.add(`from-${color}-50`);
  });
  document
    .querySelectorAll('[class*="peer-checked:bg-purple-600"]')
    .forEach((el) => {
      el.classList.remove("peer-checked:bg-purple-600");
      el.classList.add(`peer-checked:bg-${color}-600`);
    });
  document
    .querySelectorAll('[class*="focus:border-purple-500"]')
    .forEach((el) => {
      el.classList.remove("focus:border-purple-500");
      el.classList.add(`focus:border-${color}-500`);
    });
  document.querySelectorAll('[class*="accent-purple-600"]').forEach((el) => {
    el.classList.remove("accent-purple-600");
    el.classList.add(`accent-${color}-600`);
  });
  document.querySelectorAll('[class*="border-purple-200"]').forEach((el) => {
    el.classList.remove("border-purple-200");
    el.classList.add(`border-${color}-200`);
  });
  document.querySelectorAll('[class*="border-purple-800"]').forEach((el) => {
    el.classList.remove("border-purple-800");
    el.classList.add(`border-${color}-800`);
  });
  document
    .querySelectorAll('[class*="hover:border-purple-400"]')
    .forEach((el) => {
      el.classList.remove("hover:border-purple-400");
      el.classList.add(`hover:border-${color}-400`);
    });
  document
    .querySelectorAll('[class*="hover:shadow-purple-200"]')
    .forEach((el) => {
      el.classList.remove("hover:shadow-purple-200");
      el.classList.add(`hover:shadow-${color}-200`);
    });

  // تطبيق اللون الأساسي
  document.documentElement.style.setProperty(
    "--primary-color",
    colorValues[color]
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    secondaryGradients[color]
  );
}

function saveAppearance() {
  selectedFontSize =
    parseInt(document.getElementById("font-size-input").value) || 16;
  localStorage.setItem("appTheme", selectedTheme);
  localStorage.setItem("appColor", selectedColor);
  localStorage.setItem("appFontSize", selectedFontSize);

  applyTheme(selectedTheme);
  applyColor(selectedColor);
  document.documentElement.style.fontSize = selectedFontSize + "px";
  // افترض أن الـ input له id="font-size-input"
  document.getElementById("font-size-input").value = selectedFontSize;
  const themeNames = {
    light: "فاتح",
    dark: "داكن",
    auto: "تلقائي",
  };
  const colorNames = {
    purple: "ارجواني",
    blue: "أزرق",
    green: "أخضر",
    orange: "برتقالي",
    pink: "وردي",
  };
  showToast(
    selectedLanguage === "ar"
      ? "تم حفظ المظهر"
      : getTranslation("toastAppearanceSaved")
  );
  // إعادة تحميل الصفحة بعد 3 ثوانٍ (3000 مللي ثانية)
  setTimeout(() => {
    location.reload();
  }, 3000);
}

function showChoosePhotoToast() {
  const lang = selectedLanguage; // مثال: "ar", "en", "fr"
  if (lang === "ar") {
    showToast("اختر صورة جديدة");
  } else {
    showToast(getTranslation("chooseNewPhoto"));
  }
}

// Page titles (AR / EN / FR)
const pageTitles = {
  home: {
    ar: "",
    en: "",
    fr: "",
  },
  "find-job": {
    ar: "البحث عن عمل",
    en: "Find Job",
    fr: "Trouver un emploi",
  },
  "offer-service": {
    ar: "تقديم خدمة",
    en: "Offer Service",
    fr: "Proposer un service",
  },
  "request-service": {
    ar: "طلب خدمة",
    en: "Request Service",
    fr: "Demander un service",
  },
  "post-job": {
    ar: "عرض وظيفة",
    en: "Post Job",
    fr: "Publier une offre",
  },
  training: {
    ar: "التدريب والتكوين",
    en: "Training",
    fr: "Formation",
  },
  "reading-space": {
    ar: "فضاء صحوة",
    en: "Sahwa Space",
    fr: "Espace Sahwa",
  },
  "forsaty-store": {
    ar: "متجر فرصتي",
    en: "Forsaty Store",
    fr: "Boutique Forsaty",
  },
};

// toggle search
function toggleSearch(show) {
  searchActive = show;
  if (show) {
    mainHeader.classList.add("search-active");
    setTimeout(() => searchInput.focus(), 300);
    disableScroll();
  } else {
    mainHeader.classList.remove("search-active");
    searchInput.value = "";
    enableScroll();
  }
}

// Navigate to page
function navigateToPage(pageName) {
  if (pages[pageName]) {
    Object.values(pages).forEach((page) => {
      if (page) page.classList.remove("active");
    });

    pages[pageName].classList.add("active");

    document.title = pageTitles[pageName][selectedLanguage];

    if (pageName === "home") {
      headerLogo.classList.remove("hidden");
      headerTitle.classList.add("hidden");
      menuIcon.classList.remove("hidden");
      backIcon.classList.add("hidden");
    } else {
      headerLogo.classList.add("hidden");
      headerTitle.classList.remove("hidden");
      headerTitle.querySelector("h1").textContent =
        pageTitles[pageName][selectedLanguage] || pageTitles[pageName]["ar"];
      menuIcon.classList.add("hidden");
      backIcon.classList.remove("hidden");
    }

    currentPage = pageName;

    if (sidebar.classList.contains("open")) {
      toggleSidebar();
    }

    if (searchActive) {
      toggleSearch(false);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function openSidebar() {
  sidebar.classList.add("open");
  sidebar.scrollTop = 0;
  sidebarOverlay.classList.add("active");
  disableScroll();
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("active");
  enableScroll();
}

headerRightBtn.addEventListener("click", () => {
  if (currentPage === "home") {
    openSidebar();
  } else {
    navigateToPage("home");
  }
});

closeSidebarBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

searchBtn.addEventListener("click", () => {
  toggleSearch(true);
});

const closeSearchBtn = document.getElementById("close-search-btn");
closeSearchBtn.addEventListener("click", () => {
  toggleSearch(false);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      performSearch(searchTerm);
    }
  }
});

// البحث المباشر أثناء الكتابة
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.trim();
  if (searchTerm.length > 0) {
    performSearch(searchTerm);
  } else {
    hideSearchResults();
  }
});

// إخفاء البحث والنتائج عند الضغط خارجهما
document.addEventListener("click", (e) => {
  if (searchActive) {
    const searchBar = document.querySelector(".search-bar");
    const searchBtnElement = document.getElementById("search-btn");
    const resultsContainer = document.getElementById(
      "search-results-container"
    );

    // التحقق من أن الضغط ليس على مربع البحث أو النتائج أو زر البحث
    if (
      !searchBar.contains(e.target) &&
      e.target !== searchBtnElement &&
      !searchBtnElement.contains(e.target) &&
      (!resultsContainer || !resultsContainer.contains(e.target))
    ) {
      toggleSearch(false);
      hideSearchResults();
    }
  }
});

// Section cards click handlers
document.querySelectorAll(".section-card").forEach((card) => {
  card.addEventListener("click", (e) => {
    const targetPage = card.dataset.page;
    if (targetPage && pages[targetPage]) {
      navigateToPage(targetPage);
    }
  });
});

// Service items click handlers
document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("click", () => {
    const serviceName = item.querySelector("h4").textContent;
    showMessage("تم اختيار الخدمة", serviceName);
  });
});

// job items click handlers
document.querySelectorAll(".job-item").forEach((item) => {
  item.addEventListener("click", () => {
    const jobName = item.querySelector("h4").textContent;
    showMessage("تم طلب التوظيف", jobName);
  });
});

// قاعدة بيانات البحث
const searchDatabase = [
  // خدمات رقمية
  {
    id: 1,
    title: "البرمجة",
    category: "خدمة",
    section: "تطبيق، موقع، تطوير...",
    page: "request-service",
    icon: "code",
  },
  {
    id: 2,
    title: "السوشل ميديا",
    category: "خدمة",
    section: "فيسبوك، واتساب، تيكتوك...",
    page: "request-service",
    icon: "msg",
  },
  {
    id: 3,
    title: "الجرافيك",
    category: "خدمة",
    section: "صورة، ايقونة، فوطوشوب...",
    page: "request-service",
    icon: "design",
  },
  {
    id: 4,
    title: "الصوت والتعليق",
    category: "خدمة",
    section: "تعليق، دبلجة، موسيقى...",
    page: "request-service",
    icon: "voice",
  },
  {
    id: 5,
    title: "التسويق",
    category: "خدمة",
    section: "اعلانات، مواقع التواصل...",
    page: "request-service",
    icon: "marketing",
  },
  {
    id: 6,
    title: "المونتاج",
    category: "خدمة",
    section: "فديو",
    page: "request-service",
    icon: "video",
  },
  {
    id: 7,
    title: "الكتابة",
    category: "خدمة",
    section: "مقال، بحث، مذكرة، تدقيق...",
    page: "request-service",
    icon: "write",
  },
  {
    id: 8,
    title: "الترجمة",
    category: "خدمة",
    section: "فرنسية، انجليزية، عربية...",
    page: "request-service",
    icon: "translat",
  },
  // خدمات مهنية
  {
    id: 9,
    title: "الحدادة",
    category: "خدمة",
    section: "غيار، حديد، نحاس، المنيوم...",
    page: "request-service",
    icon: "iron",
  },
  {
    id: 10,
    title: "الكهرباء",
    category: "خدمة",
    section: "سلك، تيار، كهربائي...",
    page: "request-service",
    icon: "electric",
  },
  {
    id: 11,
    title: "السباكة",
    category: "خدمة",
    section: "انبوب، مياه، مسخن...",
    page: "request-service",
    icon: "plumbing",
  },
  {
    id: 12,
    title: "النجارة",
    category: "خدمة",
    section: "اثاث، قطع محددة...",
    page: "request-service",
    icon: "carpenter",
  },
  {
    id: 13,
    title: "التوصيل",
    category: "خدمة",
    section: "دراجة نارية، طاكسي، طرد...",
    page: "request-service",
    icon: "delivery",
  },
  {
    id: 14,
    title: "الدهان",
    category: "خدمة",
    section: "منزل، سيارة، اثاث، طلاء...",
    page: "request-service",
    icon: "paint",
  },
  {
    id: 15,
    title: "الميكانيك",
    category: "خدمة",
    section: "عطل، سيارة، الة...",
    page: "request-service",
    icon: "mikanic",
  },
  {
    id: 16,
    title: "التكييف",
    category: "خدمة",
    section: "مبرد، مدفاة، مسخن...",
    page: "request-service",
    icon: "condit",
  },
  {
    id: 17,
    title: "الحلاقة",
    category: "خدمة",
    section: "شعر، حيوان...",
    page: "request-service",
    icon: "shaving",
  },
  {
    id: 18,
    title: "البناء والترميم",
    category: "خدمة",
    section: "منزل، هدم، حائط، سقف...",
    page: "request-service",
    icon: "building",
  },
  {
    id: 19,
    title: "صيانة الاجهزة",
    category: "خدمة",
    section: "هاتف، حاسوب، تلفاز...",
    page: "request-service",
    icon: "repar",
  },
  {
    id: 20,
    title: "التصوير",
    category: "خدمة",
    section: "كاميرا، مناسبة، حفل...",
    page: "request-service",
    icon: "photo",
  },
  // خدمات منزلية
  {
    id: 21,
    title: "التنظيف",
    category: "خدمة",
    section: "سيارة، تنظيف معمق، اوساخ...",
    page: "request-service",
    icon: "clean",
  },
  {
    id: 22,
    title: "الطهو",
    category: "خدمة",
    section: "مناسبة، حلويات، اكل، طبخ...",
    page: "request-service",
    icon: "cooking",
  },
  {
    id: 23,
    title: "الرعاية",
    category: "خدمة",
    section: "اطفال، كبار السن، حيوان...",
    page: "request-service",
    icon: "love",
  },
  {
    id: 24,
    title: "البستنة",
    category: "خدمة",
    section: "حديقة، اشجار، غرس، سقي...",
    page: "request-service",
    icon: "planting",
  },
  {
    id: 25,
    title: "الصيانة",
    category: "خدمة",
    section: "اجهزة كهربائية، مكيفات...",
    page: "request-service",
    icon: "mikanic",
  },
  {
    id: 26,
    title: "الغسيل",
    category: "خدمة",
    section: "سيارة، ملابس، افرشة...",
    page: "request-service",
    icon: "wash",
  },
  {
    id: 27,
    title: "التسوق",
    category: "خدمة",
    section: "شراء، بقالة، سوق...",
    page: "request-service",
    icon: "market",
  },
  {
    id: 28,
    title: "الامن والمراقبة",
    category: "خدمة",
    section: "حماية، أمن، كاميرات...",
    page: "request-service",
    icon: "security",
  },
  {
    id: 29,
    title: "الديكور والاثاث",
    category: "خدمة",
    section: "ترتيب، حمل، تقسيم، تزيين...",
    page: "request-service",
    icon: "dicor",
  },
  {
    id: 30,
    title: "مكافحة الحشرات",
    category: "خدمة",
    section: "حيوانات ضارة، افاعي، فئران...",
    page: "request-service",
    icon: "insect",
  },
  // خدمات اخرى
  {
    id: 31,
    title: "التعليم",
    category: "خدمة",
    section: "دراسة، دروس عن بعد...",
    page: "request-service",
    icon: "learn",
  },
  {
    id: 32,
    title: "الاستشارة",
    category: "خدمة",
    section: "طبية، نفسية، ادارية، نصيحة...",
    page: "request-service",
    icon: "consul",
  },
  {
    id: 33,
    title: "الادارة",
    category: "خدمة",
    section: "تنظيم، تخطيط، مناسبة، حفل...",
    page: "request-service",
    icon: "admin",
  },
  {
    id: 34,
    title: "الكراء",
    category: "خدمة",
    section: "سيارة، الة، مركبة، منزل...",
    page: "request-service",
    icon: "rental",
  },
  // وظائف
  {
    id: 35,
    title: "مطور ويب",
    category: "وظيفة",
    section: "شركة التقنية الحديثة",
    page: "find-job",
    icon: "job",
  },
  {
    id: 36,
    title: "مصمم جرافيك",
    category: "وظيفة",
    section: "وكالة الابداع الرقمي",
    page: "find-job",
    icon: "job",
  },
  {
    id: 37,
    title: "مدير مبيعات",
    category: "وظيفة",
    section: "شركة التسويق المتقدم",
    page: "find-job",
    icon: "job",
  },
  {
    id: 38,
    title: "كاتب محتوى",
    category: "وظيفة",
    section: "منصة المحتوى الابداعي",
    page: "find-job",
    icon: "job",
  },
  // دورات تدريبية
  {
    id: 39,
    title: "تطوير تطبيقات الويب الحديثة",
    category: "تكوين",
    section: "البرمجة",
    page: "training",
    icon: "course",
  },
  {
    id: 40,
    title: "التصميم الجرافيكي المتقدم",
    category: "تكوين",
    section: "الجرافيك",
    page: "training",
    icon: "course",
  },
  {
    id: 41,
    title: "التسويق الرقمي الشامل",
    category: "تكوين",
    section: "التسويق",
    page: "training",
    icon: "course",
  },
  {
    id: 42,
    title: "تطوير تطبيقات الموبايل",
    category: "تكوين",
    section: "البرمجة",
    page: "training",
    icon: "course",
  },
  {
    id: 43,
    title: "الامن السيبراني",
    category: "تكوين",
    section: "البرمجة",
    page: "training",
    icon: "course",
  },
  {
    id: 44,
    title: "انتاج الموسيقى الرقمية",
    category: "تكوين",
    section: "الصوت والتعليق",
    page: "training",
    icon: "course",
  },
];

// الحصول على الأيقونة المناسبة
function getIcon(iconType) {
  const icons = {
    code: '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    msg: '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/></svg>',
    design:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    voice:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>',
    marketing:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>',
    video:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>',
    write:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>',
    translat:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/></svg>',
    clean:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
    electric:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    plumbing:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>',
    carpenter:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>',
    cooking:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>',
    iron: '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>',
    delivery:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>',
    paint:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    mikanic:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    condit:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>',
    building:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
    shaving:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/></svg>',
    repar:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    photo:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>',
    love: '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>',
    planting:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/></svg>',
    wash: '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>',
    market:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>',
    security:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
    dicor:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M2 6h28v20H2V6zm2 2v16h24V8H4zm2 2h20v2H6v-2zm0 4h20v2H6v-2zm0 4h20v2H6v-2z"/></svg>',
    insect:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 2c-1.1 0-2 .9-2 2v1H7l-2-2-1.5 1.5L7 6H4c-1.1 0-2 .9-2 2v1h5v2H2v1c0 1.1.9 2 2 2h3v3c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3h3c1.1 0 2-.9 2-2v-1h-5v-2h5V8c0-1.1-.9-2-2-2h-3l3.5-3.5L17 3l-2 2h-2V4c0-1.1-.9-2-2-2h-4z"/></svg>',
    learn:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>',
    consul:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
    admin:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    rental:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>',
    job: '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    course:
      '<svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /> <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/></svg>',
  };
  return icons[iconType] || icons.job;
}

// وظيفة البحث
function performSearch(searchTerm) {
  const results = searchDatabase.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  displaySearchResults(results, searchTerm);
}

// عرض نتائج البحث
function displaySearchResults(results, searchTerm) {
  let existingResults = document.getElementById("search-results-container");
  if (existingResults) {
    existingResults.remove();
  }

  if (results.length === 0) {
    showNoResults(searchTerm);
    return;
  }

  const resultsContainer = document.createElement("div");
  resultsContainer.id = "search-results-container";
  resultsContainer.className =
    "fixed bg-white shadow-2xl overflow-y-auto z-30 rounded-b-3xl border-t-2";
  resultsContainer.style.top = mainHeader.offsetHeight + "px";
  resultsContainer.style.left = "5%";
  resultsContainer.style.right = "5%";
  resultsContainer.style.maxHeight = "70vh";
  resultsContainer.style.borderTopColor = "var(--primary-color)";
  resultsContainer.style.width = "90%";

  const header = document.createElement("div");
  header.className = "p-3 border-b-2 border-purple-100";
  header.innerHTML = `
    <div class="flex items-center justify-between">
    <button id="close-results" class="p-2 hover:bg-purple-100 rounded-lg transition-colors">
    <svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-xl font-black" style="color: var(--primary-color); margin-left:30%;">نتائج البحث (${results.length})</h3>
    </div>
    `;

  const resultsList = document.createElement("div");
  resultsList.className = "p-2";

  // تجميع النتائج حسب الفئة
  const groupedResults = {
    خدمة: [],
    وظيفة: [],
    تكوين: [],
  };

  results.forEach((result) => {
    groupedResults[result.category].push(result);
  });

  // عرض النتائج مجمعة
  Object.keys(groupedResults).forEach((category) => {
    if (groupedResults[category].length > 0) {
      const categorySection = document.createElement("div");
      categorySection.className = "mb-3";

      groupedResults[category].forEach((result) => {
        const resultItem = document.createElement("div");
        resultItem.className =
          "bg-gradient-to-br from-purple-50 to-white rounded-xl p-2 mb-1 border-2 border-purple-100 hover:border-purple-400 transition-all cursor-pointer hover:shadow-lg";

        resultItem.innerHTML = `
    <div class="flex items-center gap-2">
    <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
    ${getIcon(result.icon)}
    </div>
    <div class="flex-1">
    <h5 class="text-lg font-black text-gray-800">${result.title}</h5>
    <p class="text-sm text-gray-600 font-semibold">${result.section}</p>
    </div>
    <div class="px-3 py-1 rounded-full text-xs font-bold text-white" style="background-color: var(--primary-color)">
    ${result.category}
    </div>
    </div>
    `;

        resultItem.addEventListener("click", () => {
          hideSearchResults();
          toggleSearch(false);
          if (pages[result.page]) {
            navigateToPage(result.page);
            // الانتظار حتى يتم تحميل الصفحة ثم التمرير إلى العنصر
            setTimeout(() => {
              scrollToServiceItem(result.title);
            }, 300);
            setTimeout(() => {
              scrollToJobItem(result.title);
            }, 300);
            setTimeout(() => {
              scrollToTrainingItem(result.title);
            }, 300);
          }
        });

        categorySection.appendChild(resultItem);
      });

      resultsList.appendChild(categorySection);
    }
  });

  resultsContainer.appendChild(header);
  resultsContainer.appendChild(resultsList);
  document.body.appendChild(resultsContainer);

  // إغلاق النتائج
  const closeBtn = resultsContainer.querySelector("#close-results");
  closeBtn.addEventListener("click", hideSearchResults);

  // إغلاق عند الضغط خارج النتائج
  setTimeout(() => {
    document.addEventListener("click", handleClickOutsideResults);
  }, 100);
}

// عرض رسالة عدم وجود نتائج
function showNoResults(searchTerm) {
  let existingResults = document.getElementById("search-results-container");
  if (existingResults) {
    existingResults.remove();
  }

  const resultsContainer = document.createElement("div");
  resultsContainer.id = "search-results-container";
  resultsContainer.className =
    "fixed bg-white shadow-2xl z-30 rounded-b-3xl border-t-2";
  resultsContainer.style.top = mainHeader.offsetHeight + "px";
  resultsContainer.style.left = "5%";
  resultsContainer.style.right = "5%";
  resultsContainer.style.borderTopColor = "var(--primary-color)";
  resultsContainer.style.width = "90%";

  resultsContainer.innerHTML = `
    <div class="p-12 text-center">
    <div class="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style="background-color: var(--secondary-color);">
    <svg class="w-10 h-10" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
    </div>
    <h3 class="text-2xl font-black mb-3" style="color: var(--primary-color)">لا توجد نتائج</h3>
    <p class="text-gray-600 font-semibold">لم نجد أي نتائج مطابقة لـ "${searchTerm}"</p>
    </div>
    `;

  document.body.appendChild(resultsContainer);

  setTimeout(() => {
    document.addEventListener("click", handleClickOutsideResults);
  }, 100);
}

// إخفاء نتائج البحث
function hideSearchResults() {
  const existingResults = document.getElementById("search-results-container");
  if (existingResults) {
    existingResults.remove();
  }
  document.removeEventListener("click", handleClickOutsideResults);
}

// التعامل مع الضغط خارج النتائج
function handleClickOutsideResults(e) {
  const resultsContainer = document.getElementById("search-results-container");
  const searchBar = document.querySelector(".search-bar");

  if (
    resultsContainer &&
    !resultsContainer.contains(e.target) &&
    !searchBar.contains(e.target)
  ) {
    hideSearchResults();
  }
}

// وظيفة التمرير إلى الخدمة المحددة
function scrollToServiceItem(serviceTitle) {
  // البحث عن جميع عناصر الخدمات
  const serviceItems = document.querySelectorAll(".service-item h4");

  for (let item of serviceItems) {
    if (item.textContent === serviceTitle) {
      const serviceCard = item.closest(".service-item");
      if (serviceCard) {
        // التمرير بسلاسة إلى العنصر
        serviceCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // إضافة تأثير بصري للتركيز على العنصر
        serviceCard.style.animation = "pulse 1.5s ease-in-out";
        serviceCard.style.transform = "scale(1.05)";
        setTimeout(() => {
          serviceCard.style.transform = "scale(1)";
        }, 1500);

        break;
      }
    }
  }
}

// وظيفة التمرير إلى الوظيفة المحددة
function scrollToJobItem(jobTitle) {
  // البحث عن جميع عناصر الوظائف
  const jobItems = document.querySelectorAll(".job-item h4");

  for (let item of jobItems) {
    if (item.textContent === jobTitle) {
      const jobCard = item.closest(".job-item");
      if (jobCard) {
        // التمرير بسلاسة إلى العنصر
        jobCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // إضافة تأثير بصري للتركيز على العنصر
        jobCard.style.animation = "pulse 1.5s ease-in-out";
        jobCard.style.transform = "scale(1.05)";
        setTimeout(() => {
          jobCard.style.transform = "scale(1)";
        }, 1500);

        break;
      }
    }
  }
}

// وظيفة التمرير إلى الدورة المحددة
function scrollToTrainingItem(trainingTitle) {
  // البحث عن جميع عناصر الدورات
  const trainingItems = document.querySelectorAll(".training-item h5");

  for (let item of trainingItems) {
    if (item.textContent === trainingTitle) {
      const trainingCard = item.closest(".training-item");
      if (trainingCard) {
        // التمرير بسلاسة إلى العنصر
        trainingCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // إضافة تأثير بصري للتركيز على العنصر
        trainingCard.style.animation = "pulse 1.5s ease-in-out";
        trainingCard.style.transform = "scale(1.05)";
        setTimeout(() => {
          trainingCard.style.transform = "scale(1)";
        }, 1500);

        break;
      }
    }
  }
}

// Header scroll hide/show functionality
window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down
    header.classList.add("header-hidden");
  } else {
    // Scrolling up
    header.classList.remove("header-hidden");
  }

  lastScrollY = currentScrollY;
});

// Section card navigation
const sectionCards = document.querySelectorAll(".section-card");
sectionCards.forEach((card) => {
  card.addEventListener("click", () => {
    const targetPage = card.getAttribute("data-page");
    if (targetPage) {
      navigateToPage(targetPage);
    }
  });
});

// Job Page Functionality
// Add Job Button
const addJobBtn = document.getElementById("add-job-btn");
if (addJobBtn) {
  addJobBtn.addEventListener("click", () => {
    showMessage("إضافة وظيفة", "سيتم فتح نموذج إضافة وظيفة جديدة قريباً");
  });
}

// Share Buttons
document.querySelectorAll(".job-share-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const jobTitle = btn
      .closest(".bg-gradient-to-br")
      .querySelector("h5").textContent;
    showMessage("مشاركة الإعلان", `تمت مشاركة إعلان "${jobTitle}" بنجاح`);
  });
});

// Edit Buttons
document.querySelectorAll(".job-edit-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const jobTitle = btn
      .closest(".bg-gradient-to-br")
      .querySelector("h5").textContent;
    showMessage("تعديل الإعلان", `سيتم فتح نموذج تعديل "${jobTitle}" قريباً`);
  });
});

// Delete Buttons
document.querySelectorAll(".job-delete-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".bg-gradient-to-br");
    const jobTitle = card.querySelector("h5").textContent;

    // Show confirmation
    const confirmOverlay = document.createElement("div");
    confirmOverlay.className =
      "fixed inset-0 bg-black/50 z-50 flex items-center justify-center";
    confirmOverlay.style.width = "100%";

    const confirmBox = document.createElement("div");
    confirmBox.className = "bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl";

    confirmBox.innerHTML = `
    <div class="text-center">
    <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style="background-color: #fee;">
    <svg class="w-8 h-8" style="color: #dc2626" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
    </svg>
    </div>
    <h3 class="text-2xl font-black mb-3" style="color: var(--primary-color)">تأكيد الحذف</h3>
    <p class="text-gray-600 font-semibold mb-6">هل أنت متأكد من حذف إعلان "${jobTitle}"؟</p>
    <div class="flex gap-3">
    <button id="confirm-delete" class="flex-1 font-bold py-3 px-6 rounded-xl transition-all shadow-sm text-white" style="background-color: #dc2626;">
    حذف
    </button>
    <button id="cancel-delete" class="flex-1 font-bold py-3 px-6 rounded-xl transition-all shadow-sm" style="background-color: #f5f5f5; color: #666;">
    إلغاء
    </button>
    </div>
    </div>
    `;

    confirmOverlay.appendChild(confirmBox);
    document.body.appendChild(confirmOverlay);

    confirmBox
      .querySelector("#confirm-delete")
      .addEventListener("click", () => {
        card.remove();
        confirmOverlay.remove();
        showMessage("تم الحذف", `تم حذف إعلان "${jobTitle}" بنجاح`);
      });

    confirmBox.querySelector("#cancel-delete").addEventListener("click", () => {
      confirmOverlay.remove();
    });

    confirmOverlay.addEventListener("click", (e) => {
      if (e.target === confirmOverlay) {
        confirmOverlay.remove();
      }
    });
  });
});

// Contact Buttons
document.querySelectorAll(".contact-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const applicantName = btn
      .closest(".bg-gradient-to-br")
      .querySelector("h5").textContent;
    showMessage("تواصل", `سيتم فتح محادثة مع ${applicantName} قريباً`);
  });
});

// Ignore Buttons
document.querySelectorAll(".ignore-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const card = btn.closest(".bg-gradient-to-br");
    const applicantName = card.querySelector("h5").textContent;

    card.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    card.style.opacity = "0";
    card.style.transform = "translateX(20px)";

    setTimeout(() => {
      card.remove();
      showMessage("تم التجاهل", `تم تجاهل طلب ${applicantName}`);
    }, 300);
  });
});

// Helper function to show messages
function showMessage(title, message) {
  const messageOverlay = document.createElement("div");
  messageOverlay.className =
    "fixed inset-0 bg-black/50 z-50 flex items-center justify-center";
  messageOverlay.style.width = "100%";

  const messageBox = document.createElement("div");
  messageBox.className = "bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl";

  messageBox.innerHTML = `
    <div class="text-center">
    <div class="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style="background-color: var(--secondary-color);">
    <svg class="w-8 h-8" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
    </div>
    <h3 class="text-2xl font-black mb-3" style="color: var(--primary-color)">${title}</h3>
    <p class="text-gray-600 font-semibold mb-6">${message}</p>
    <button id="close-message" class="w-full font-bold py-4 px-6 rounded-xl transition-all shadow-sm text-center text-white" style="background-color: var(--primary-color);">
    موافق
    </button>
    </div>
    `;

  messageOverlay.appendChild(messageBox);
  document.body.appendChild(messageOverlay);

  const closeBtn = messageBox.querySelector("#close-message");
  closeBtn.addEventListener("click", () => {
    messageOverlay.remove();
  });

  messageOverlay.addEventListener("click", (e) => {
    if (e.target === messageOverlay) {
      messageOverlay.remove();
    }
  });
}
// Training Page Functionality
const savedCoursesContainer = document.getElementById(
  "saved-courses-container"
);
const emptySavedState = document.getElementById("empty-saved-state");
const enrolledCoursesContainer = document.getElementById(
  "enrolled-courses-container"
);
const emptyEnrolledState = document.getElementById("empty-enrolled-state");
let savedCourses = [];
let enrolledCourses = [];

// Course Share Buttons
document.addEventListener("click", (e) => {
  if (e.target.closest(".course-share-btn")) {
    const courseCard = e.target.closest(".course-card");
    const courseTitle = courseCard.querySelector("h5").textContent;
    showMessage("مشاركة الدورة", `تمت مشاركة دورة "${courseTitle}" بنجاح`);
  }
});

// Course Comment Buttons
document.addEventListener("click", (e) => {
  if (e.target.closest(".course-comment-btn")) {
    const courseCard = e.target.closest(".course-card");
    const courseTitle = courseCard.querySelector("h5").textContent;
    showMessage(
      "التعليقات",
      `سيتم فتح صفحة التعليقات لدورة "${courseTitle}" قريباً`
    );
  }
});

// Course Save Buttons
document.addEventListener("click", (e) => {
  if (e.target.closest(".course-save-btn")) {
    e.stopPropagation();
    const saveBtn = e.target.closest(".course-save-btn");
    const courseCard = e.target.closest(".course-card");
    const courseTitle = courseCard.querySelector("h5").textContent;
    const courseDesc = courseCard.querySelector("p").textContent;
    const courseRating = courseCard.querySelector(".text-gray-700").textContent;
    const courseDuration =
      courseCard.querySelectorAll(".text-gray-600")[1].textContent;

    // Check if already saved
    const isAlreadySaved = savedCourses.some(
      (course) => course.title === courseTitle
    );

    if (!isAlreadySaved) {
      // Add to saved courses
      const savedCourse = {
        title: courseTitle,
        description: courseDesc,
        rating: courseRating,
        duration: courseDuration,
      };

      savedCourses.push(savedCourse);

      // Update saved courses section
      updateSavedCoursesDisplay();

      // Change icon to filled
      const svg = saveBtn.querySelector("svg");
      svg.setAttribute("fill", "currentColor");

      showMessage("تم الحفظ", `تم حفظ دورة "${courseTitle}" بنجاح`);
    } else {
      showMessage("محفوظة مسبقاً", `دورة "${courseTitle}" محفوظة بالفعل`);
    }
  }
});

// Update saved courses display
function updateSavedCoursesDisplay() {
  if (savedCourses.length === 0) {
    emptySavedState.classList.remove("hidden");
  } else {
    emptySavedState.classList.add("hidden");

    // Remove existing saved course cards (except empty state)
    const existingCards =
      savedCoursesContainer.querySelectorAll(".course-card");
    existingCards.forEach((card) => card.remove());

    // Add saved courses
    savedCourses.forEach((course, index) => {
      const courseCard = document.createElement("div");
      courseCard.className =
        "course-card bg-gradient-to-br from-purple-50 to-white rounded-2xl shadow-lg border-2 border-purple-200 hover:shadow-purple-200 transition-all overflow-hidden";

      courseCard.innerHTML = `
    <div class="relative">
    <div class="w-full h-48 flex items-center justify-center" style="background: linear-gradient(135deg, var(--primary-color) 0%, #8e0052 100%);">
    <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"/>
    </svg>
    </div>
    </div>
    
    <div class="p-6">
    <h5 class="text-xl font-black text-gray-800 mb-2">${course.title}</h5>
    <p class="text-gray-600 font-semibold text-sm mb-4">${course.description}</p>
    
    <div class="flex items-center gap-2 mb-4">
    <div class="flex items-center gap-1">
    <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
    <span class="text-gray-700 font-bold text-sm">${course.rating}</span>
    </div>
    <span class="text-gray-400">•</span>
    <span class="text-gray-600 font-semibold text-sm">${course.duration}</span>
    </div>
    
    <div class="flex gap-3">
    <button class="remove-saved-btn flex-1 font-bold py-3 px-4 rounded-xl transition-all hover:opacity-90" style="background-color: #dc2626; color: white;" data-index="${index}">
    إزالة
    </button>
    <button class="flex-1 font-bold py-3 px-4 rounded-xl text-white transition-all hover:opacity-90" style="background-color: var(--primary-color);">
    سجل الآن
    </button>
    </div>
    </div>
    `;

      savedCoursesContainer.appendChild(courseCard);
    });
  }
}

// Remove saved course
document.addEventListener("click", (e) => {
  if (e.target.closest(".remove-saved-btn")) {
    const btn = e.target.closest(".remove-saved-btn");
    const index = parseInt(btn.dataset.index);
    const courseTitle = savedCourses[index].title;

    // Remove from array
    savedCourses.splice(index, 1);

    // Update display
    updateSavedCoursesDisplay();

    showMessage("تم الإزالة", `تم إزالة دورة "${courseTitle}" من المحفوظات`);
  }
});

// Enroll in course (Register Now button)
document.addEventListener("click", (e) => {
  const registerBtn = e.target.closest("button");
  if (registerBtn && registerBtn.textContent.includes("سجل الآن")) {
    e.stopPropagation();
    const courseCard = registerBtn.closest(".course-card");
    const courseTitle = courseCard.querySelector("h5").textContent;
    const courseDesc = courseCard.querySelector("p").textContent;
    const courseRating =
      courseCard.querySelector(".text-gray-700")?.textContent || "4.8";
    const courseDuration =
      courseCard.querySelectorAll(".text-gray-600")[1]?.textContent ||
      "عدة أسابيع";
    const coursePrice =
      courseCard.querySelector(".text-3xl")?.textContent || "مجاناً";

    // Check if already enrolled
    const isAlreadyEnrolled = enrolledCourses.some(
      (course) => course.title === courseTitle
    );

    if (!isAlreadyEnrolled) {
      // Add to enrolled courses
      const enrolledCourse = {
        title: courseTitle,
        description: courseDesc,
        rating: courseRating,
        duration: courseDuration,
        price: coursePrice,
        progress: 0,
      };

      enrolledCourses.push(enrolledCourse);

      // Update enrolled courses section
      updateEnrolledCoursesDisplay();

      showMessage("تم التسجيل", `تم تسجيلك في دورة "${courseTitle}" بنجاح`);
    } else {
      showMessage("مسجل مسبقاً", `أنت مسجل في دورة "${courseTitle}" بالفعل`);
    }
  }
});

// Update enrolled courses display
function updateEnrolledCoursesDisplay() {
  if (enrolledCourses.length === 0) {
    emptyEnrolledState.classList.remove("hidden");
  } else {
    emptyEnrolledState.classList.add("hidden");

    // Remove existing enrolled course cards (except empty state)
    const existingCards =
      enrolledCoursesContainer.querySelectorAll(".course-card");
    existingCards.forEach((card) => card.remove());

    // Add enrolled courses
    enrolledCourses.forEach((course, index) => {
      const courseCard = document.createElement("div");
      courseCard.className =
        "course-card bg-gradient-to-br from-green-50 to-white rounded-2xl shadow-lg border-2 border-green-200 hover:shadow-green-200 transition-all overflow-hidden";

      courseCard.innerHTML = `
    <div class="relative">
    <div class="w-full h-48 flex items-center justify-center" style="background: linear-gradient(135deg, #2e7d32 0%, #4caf50 100%);">
    <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    </div>
    <div class="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white" style="background-color: #2e7d32;">
    ✓ مسجل
    </div>
    </div>
    
    <div class="p-6">
    <h5 class="text-xl font-black text-gray-800 mb-2">${course.title}</h5>
    <p class="text-gray-600 font-semibold text-sm mb-4">${course.description}</p>
    
    <div class="flex items-center gap-2 mb-4">
    <div class="flex items-center gap-1">
    <svg class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
    <span class="text-gray-700 font-bold text-sm">${course.rating}</span>
    </div>
    <span class="text-gray-400">•</span>
    <span class="text-gray-600 font-semibold text-sm">${course.duration}</span>
    </div>
    
    <!-- Progress Bar -->
    <div class="mb-4">
    <div class="flex items-center justify-between mb-2">
    <span class="text-sm font-bold text-gray-700">التقدم</span>
    <span class="text-sm font-bold" style="color: #2e7d32">${course.progress}%</span>
    </div>
    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div class="h-full rounded-full transition-all" style="background-color: #2e7d32; width: ${course.progress}%"></div>
    </div>
    </div>
    
    <div class="flex gap-3">
    <button class="continue-learning-btn flex-1 font-bold py-3 px-4 rounded-xl text-white transition-all hover:opacity-90" style="background-color: #2e7d32;" data-index="${index}">
    متابعة التعلم
    </button>
    <button class="unenroll-btn py-3 px-4 rounded-xl font-bold transition-all hover:opacity-90" style="background-color: #fee; color: #dc2626;" data-index="${index}" title="إلغاء التسجيل">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    </div>
    </div>
    `;

      enrolledCoursesContainer.appendChild(courseCard);
    });
  }
}

function copyID(btn) {
  const textEl = btn.closest("div")?.querySelector(".id-text");
  if (!textEl) return;

  // نص للنسخ
  const text = textEl.innerText.replace("ID: ", "").trim();

  // طريقة احتياطية للنسخ (input مؤقت)
  const tempInput = document.createElement("input");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  tempInput.setSelectionRange(0, 99999); // للأجهزة المحمولة
  document.execCommand("copy");
  document.body.removeChild(tempInput);

  // تأثير على الأيقونة
  const icon = btn.querySelector("i");
  if (!icon) return;
  icon.style.opacity = "0.7";
  icon.style.transition = "opacity 0.3s";
  setTimeout(() => {
    icon.style.opacity = "1";
  }, 3000);
  const lang = selectedLanguage; // مثال: "ar", "en", "fr"
  if (lang === "ar") {
    showToast("تم نسخ المعرف الى المحفظة");
  } else {
    showToast(getTranslation("CopyID"));
  }
}

// Continue learning button
document.addEventListener("click", (e) => {
  if (e.target.closest(".continue-learning-btn")) {
    const btn = e.target.closest(".continue-learning-btn");
    const index = parseInt(btn.dataset.index);
    const courseTitle = enrolledCourses[index].title;

    // Simulate progress increase
    enrolledCourses[index].progress = Math.min(
      enrolledCourses[index].progress + 10,
      100
    );
    updateEnrolledCoursesDisplay();

    showMessage("متابعة التعلم", `جاري فتح دورة "${courseTitle}"...`);
  }
});

// Unenroll from course
document.addEventListener("click", (e) => {
  if (e.target.closest(".unenroll-btn")) {
    const btn = e.target.closest(".unenroll-btn");
    const index = parseInt(btn.dataset.index);
    const courseTitle = enrolledCourses[index].title;

    // Remove from array
    enrolledCourses.splice(index, 1);

    // Update display
    updateEnrolledCoursesDisplay();

    showMessage("تم إلغاء التسجيل", `تم إلغاء تسجيلك من دورة "${courseTitle}"`);
  }
});
// Sidebar Menu Item Functionality
const sidebarMenuItems = document.querySelectorAll("#sidebar nav a");

sidebarMenuItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (sidebar.classList.contains("open")) {
      sidebar.classList.remove("open");
      sidebarOverlay.classList.remove("active");
    }

    const menuTitle = item.querySelector("span").textContent;
    const menuIcon = item.querySelector("svg").cloneNode(true);

    setTimeout(() => {
      showSidebarModal(menuTitle, menuIcon, index);
    }, 300);
  });
});

function showSidebarModal(title, icon, menuIndex) {
  const modalOverlay = document.createElement("div");
  modalOverlay.className =
    "fixed inset-0 bg-black/60 flex items-center justify-center p-4 opacity-0";
  modalOverlay.style.width = "100%";
  modalOverlay.style.backdropFilter = "blur(8px)";
  modalOverlay.style.zIndex = "44";
  modalOverlay.style.transition = "opacity 0.3s ease";

  const modalBox = document.createElement("div");
  modalBox.className =
    "bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden overflow-y-auto transform transition-all";
  modalBox.style.maxHeight = "90vh";
  modalBox.style.transform = "translateY(-20px) scale(0.95)";
  modalBox.style.opacity = "0";
  modalBox.style.transition = "all 0.3s ease-out";

  modalOverlay.appendChild(modalBox);
  document.body.appendChild(modalOverlay);

  requestAnimationFrame(() => {
    modalOverlay.style.opacity = "1";
    modalBox.style.transform = "translateY(0) scale(1)";
    modalBox.style.opacity = "1";
  });

  let modalContent = "";

  switch (menuIndex) {
    case 0: // الرسائل
      modalContent = `
    <div class="p-5 text-center relative" style="background-color: var(--primary-color)">
    <button class="modal-close-x absolute top-3 right-3 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all z-10">
    <svg class="w-7 h-7 text-white drop-shadow-lg pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-2xl font-black text-white drop-shadow-lg">${title}</h3>
    </div>
    
    <div class="p-8">
    <div class="text-center py-4">
    <div class="w-24 h-24 mx-auto mb-6 bg-purple-200 rounded-full flex items-center justify-center">
    <svg class="w-12 h-12" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"/>
    </svg>
    </div>
    <h4 class="text-2xl font-black text-gray-800 mb-3">غير ممكن</h4>
    <p class="text-gray-600 font-semibold text-lg mb-8 max-w-sm mx-auto">
سجل الدخول لتتمكن من استخدام الرسائل.
    </p>
    <button type="submit" class="w-full font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:opacity-80 text-white text-lg" style="background-color: var(--primary-color)" onclick="openLoginModal()">
    تسجيل الدخول
    </button>
    </div>
    </div>
    `;
      break;

    case 1: // النقاط
      modalContent = `
    <div class="p-5 text-center relative" style="background-color: var(--primary-color)">
    <button class="modal-close-x absolute top-3 right-3 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all z-10">
    <svg class="w-7 h-7 text-white drop-shadow-lg pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-2xl font-black text-white drop-shadow-lg">${title}</h3>
    </div>
    
    <div class="p-8">
    <div class="text-center py-4">
    <div class="w-24 h-24 mx-auto mb-6 bg-purple-200 rounded-full flex items-center justify-center">
    <svg class="w-12 h-12" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
    </svg>
    </div>
    <h4 class="text-2xl font-black text-gray-800 mb-3">غير ممكن</h4>
    <p class="text-gray-600 font-semibold text-lg mb-8 max-w-sm mx-auto">
    سجل الدخول لتتمكن من جمع النقاط وتحويلها الى رصيد.
    </p>
    <button type="submit" class="w-full font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:opacity-80 text-white text-lg" style="background: var(--primary-color)" onclick="openLoginModal()">
    تسجيل الدخول
    </button>
    </div>
    </div>
    `;
      break;

    case 3: // السجل
      modalContent = `
    <div class="p-5 text-center relative" style="background-color: var(--primary-color)">
    <button class="modal-close-x absolute top-3 right-3 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all z-10">
    <svg class="w-7 h-7 text-white drop-shadow-lg pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-2xl font-black text-white drop-shadow-lg">${title}</h3>
    </div>
    
    <div class="p-8">
    <div class="text-center py-12">
    <div class="w-24 h-24 mx-auto mb-6 bg-purple-200 rounded-full flex items-center justify-center">
    <svg class="w-12 h-12" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
    </div>
    <h4 class="text-2xl font-black text-gray-800 mb-3">السجل فارغ</h4>
    <p class="text-gray-600 font-semibold text-lg mb-8 max-w-sm mx-auto">
    لا توجد أي سجلات حتى الآن. ستظهر هنا جميع أنشطتك وعملياتك.
    </p>
    <div class="inline-flex items-center gap-2 px-6 py-3 bg-purple-200 rounded-xl" style="color: var(--primary-color)">
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    <span class="font-bold text-sm">ابدأ باستخدام المنصة لبناء سجلك</span>
    </div>
    </div>
    </div>
    `;
      break;

    case 2: // المحفظة
      modalContent = `
    <div class="p-5 text-center relative" style="background-color: var(--primary-color)">
    <button class="modal-close-x absolute top-3 right-3 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all z-10">
    <svg class="w-7 h-7 text-white drop-shadow-lg pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-2xl font-black text-white drop-shadow-lg">${title}</h3>
    </div>
    
    <div class="p-8">
    <div class="rounded-2xl p-6 mb-3 text-white shadow-xl relative overflow-hidden" style="background: linear-gradient(135deg, var(--primary-color) 0%, #8e0052 100%);">
    <div class="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
    <div class="absolute bottom-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl -ml-36 -mb-36"></div>
    
    <div class="relative z-10">
    <div class="flex items-center justify-between mb-4">
    <span class="text-xs font-bold opacity-80">الرصيد الحالي</span>
    <span class="text-base font-black opacity-90">Forsaty</span>
    </div>
    
    <div class="text-center mb-4">
    <div class="text-3xl font-black">0 د.ج</div>
    </div>
    
    <div class="flex items-center justify-between">
    <svg class="w-10 h-10 opacity-70" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
    </svg>
    <div class="flex items-center gap-2">
    <button class="copy-id-btn p-1.5 hover:bg-white/20 rounded-lg transition-all" onclick="navigator.clipboard.writeText('123456').then(() => { const btn = event.currentTarget; const originalHTML = btn.innerHTML; btn.innerHTML = '<svg class=\'w-4 h-4\' fill=\'none\' stroke=\'currentColor\' viewBox=\'0 0 24 24\' stroke-width=\'2\'><path stroke-linecap=\'round\' stroke-linejoin=\'round\' d=\'M5 13l4 4L19 7\'/></svg>'; setTimeout(() => btn.innerHTML = originalHTML, 1500); })">
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
    </svg>
    </button>
    <span class="text-xs font-semibold opacity-80">ID: 123456</span>
    </div>
    </div>
    </div>
    </div>
    
    <div class="grid grid-cols-3 gap-3 mb-3">
    <button class="wallet-action-btn bg-purple-200 font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg" style="color: var(--primary-color);">
    إيداع
    </button>
    <button class="wallet-action-btn bg-purple-200 font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg" style="color: var(--primary-color);">
    سحب
    </button>
    <button class="wallet-action-btn bg-purple-200 font-bold py-3 px-4 rounded-xl transition-all shadow-md hover:shadow-lg" style="color: var(--primary-color);">
    تحويل
    </button>
    </div>
    
    <div class="bg-gray-50 rounded-xl p-4">
    <h4 class="text-base font-black text-gray-800 mb-2 flex items-center gap-2">
    <svg class="w-4 h-4" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
    </svg>
    سجل العمليات
    </h4>
    <div class="text-center py-4">
    <svg class="w-10 h-10 mx-auto mb-2 opacity-30" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
    </svg>
    <p class="text-sm text-gray-500 font-semibold">لا توجد عمليات حتى الآن</p>
    </div>
    </div>
    </div>
    `;
      break;

    case 4: // الاشتراك في pro
      modalContent = `
    <div class="p-5 text-center relative" style="background-color: var(--primary-color)">
    <button class="modal-close-x absolute top-3 right-3 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all z-10">
    <svg class="w-7 h-7 text-white drop-shadow-lg pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-2xl font-black text-white drop-shadow-lg">${title}</h3>
    </div>
    
    <div class="p-8">
          <!-- المزايا -->
          <div class="mb-8">
            <h4 class="text-2xl font-black mb-6 text-center" style="color: var(--primary-color)">مزايا Pro الحصرية</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
                  <svg class="w-5 h-5" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <div>
                  <h5 class="font-black text-gray-800 mb-1">أولوية في الظهور</h5>
                  <p class="text-sm text-gray-600 font-semibold">خدماتك تظهر أولاً في نتائج البحث</p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
                  <svg class="w-5 h-5" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                </div>
                <div>
                  <h5 class="font-black text-gray-800 mb-1">عروض غير محدودة</h5>
                  <p class="text-sm text-gray-600 font-semibold">قدم عدد لا محدود من الخدمات والعروض</p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
                  <svg class="w-5 h-5" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <div>
                  <h5 class="font-black text-gray-800 mb-1">إحصائيات متقدمة</h5>
                  <p class="text-sm text-gray-600 font-semibold">تحليلات شاملة لأدائك وعروضك</p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
                  <svg class="w-5 h-5" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </div>
                <div>
                  <h5 class="font-black text-gray-800 mb-1">شارة Pro المميزة</h5>
                  <p class="text-sm text-gray-600 font-semibold">شارة ذهبية تميزك عن المنافسين</p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
                  <svg class="w-5 h-5" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <div>
                  <h5 class="font-black text-gray-800 mb-1">دعم فني مخصص</h5>
                  <p class="text-sm text-gray-600 font-semibold">فريق دعم متاح على مدار الساعة</p>
                </div>
              </div>

              <div class="flex items-start gap-3 bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border-2 border-purple-200">
                <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
                  <svg class="w-5 h-5" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h5 class="font-black text-gray-800 mb-1">عمولة مخفضة</h5>
                  <p class="text-sm text-gray-600 font-semibold">نسبة عمولة أقل على جميع المعاملات</p>
                </div>
              </div>
            </div>
          </div>

          <!-- الباقات -->
          <div class="mb-6">
            <h4 class="text-2xl font-black mb-6 text-center" style="color: var(--primary-color)">اختر الباقة المناسبة</h4>
            <div class="grid grid-cols-1 gap-4">
              <!-- باقة شهرية -->
              <div class="pro-plan bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer hover:shadow-xl" data-plan="monthly">
                <div class="text-center mb-4">
                  <h5 class="text-xl font-black text-gray-800 mb-2">الباقة الشهرية</h5>
                  <div class="text-4xl font-black mb-1" style="color: var(--primary-color)">2,500 دج</div>
                  <p class="text-sm text-gray-600 font-semibold">شهرياً</p>
                </div>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    جميع المزايا
                  </li>
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    إلغاء في أي وقت
                  </li>
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    تجديد تلقائي
                  </li>
                </ul>
                <button class="w-full py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg" style="background: var(--primary-color)">
                  اشترك الآن
                </button>
              </div>

              <!-- باقة نصف سنوية (الأكثر شعبية) -->
              <div class="pro-plan bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border-4 transition-all cursor-pointer hover:shadow-2xl relative overflow-hidden" style="border-color: var(--primary-color);" data-plan="semi-annual">
                <div class="absolute top-0 left-0 right-0 text-center py-1 text-white text-xs font-black" style="background: var(--primary-color);">
                  الأكثر شعبية 🔥
                </div>
                <div class="text-center mb-4 mt-4">
                  <h5 class="text-xl font-black text-gray-800 mb-2">الباقة النصف سنوية</h5>
                  <div class="text-4xl font-black mb-1" style="color: var(--primary-color)">12,000 دج</div>
                  <p class="text-sm text-gray-600 font-semibold">6 أشهر</p>
                  <div class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black text-white" style="background-color: var(--primary-color)">
                    وفر 3,000 دج
                  </div>
                </div>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    جميع المزايا
                  </li>
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    خصم 20%
                  </li>
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    تدريب مجاني
                  </li>
                </ul>
                <button class="w-full py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg shadow-md" style="background: var(--primary-color)">
                  اشترك الآن
                </button>
              </div>

              <!-- باقة سنوية -->
              <div class="pro-plan bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer hover:shadow-xl" data-plan="annual">
                <div class="text-center mb-4">
                  <h5 class="text-xl font-black text-gray-800 mb-2">الباقة السنوية</h5>
                  <div class="text-4xl font-black mb-1" style="color: var(--primary-color)">20,000 دج</div>
                  <p class="text-sm text-gray-600 font-semibold">سنة كاملة</p>
                  <div class="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black text-white" style="background-color: var(--primary-color)">
                    وفر 10,000 دج
                  </div>
                </div>
                <ul class="space-y-2 mb-6">
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    جميع المزايا
                  </li>
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    خصم 33%
                  </li>
                  <li class="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <svg class="w-5 h-5 flex-shrink-0" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    استشارة مجانية
                  </li>
                </ul>
                <button class="w-full py-3 rounded-xl font-bold text-white transition-all hover:shadow-lg" style="background: var(--primary-color)">
                  اشترك الآن
                </button>
              </div>
            </div>
          </div>

          <!-- معلومات إضافية -->
          <div class="text-center text-sm text-gray-600 font-semibold">
            <p>✨ ضمان استرجاع المال خلال 7 أيام | 🔒 دفع آمن ومشفر</p>
          </div>
        </div>
    `;
      break;

    case 5: // المساعدة والدعم
      modalContent = `
    <div class="p-5 text-center relative" style="background-color: var(--primary-color)">
    <button class="modal-close-x absolute top-3 right-3 w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all z-10">
    <svg class="w-7 h-7 text-white drop-shadow-lg pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
    </svg>
    </button>
    <h3 class="text-2xl font-black text-white drop-shadow-lg">${title}</h3>
    </div>
    
    <div class="p-8">
    <div class="space-y-4">
    <div class="help-item bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer hover:shadow-lg">
    <div class="flex items-start gap-4">
    <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
    <svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
    </div>
    <div>
    <h4 class="text-lg font-black text-gray-800 mb-1">طرح تساؤل</h4>
    <p class="text-sm text-gray-600 font-semibold">أسئلة شائعة وأدلة إرشادية</p>
    </div>
    </div>
    </div>
    
    <div class="help-item bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer hover:shadow-lg">
    <div class="flex items-start gap-4">
    <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
    <svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
    </svg>
    </div>
    <div>
    <h4 class="text-lg font-black text-gray-800 mb-1">الابلاغ عن مشكلة</h4>
    <p class="text-sm text-gray-600 font-semibold">مالمشكلة التي واجهتك</p>
    </div>
    </div>
    </div>
    
    <div class="help-item bg-gradient-to-br from-purple-50 to-white rounded-2xl p-5 border-2 border-purple-200 hover:border-purple-400 transition-all cursor-pointer hover:shadow-lg">
    <div class="flex items-start gap-4">
    <div class="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: var(--secondary-color);">
    <svg class="w-6 h-6" style="color: var(--primary-color)" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
    </svg>
    </div>
    <div>
    <h4 class="text-lg font-black text-gray-800 mb-1">تقديم اقتراح</h4>
    <p class="text-sm text-gray-600 font-semibold">اقتراحك لتحسين المنصة</p>
    </div>
    </div>
    </div>
    </div>
    </div>
    `;
      break;
  }

  // الاستماع لأي زر إغلاق في الصفحة - باستخدام event delegation
  document.addEventListener("click", function (e) {
    if (e.target.closest(".modal-close-x")) {
      const modalOverlay = e.target.closest(".fixed.inset-0.bg-black\\/60");
      if (modalOverlay) {
        modalOverlay.style.opacity = "0";
        const modalBox = modalOverlay.querySelector(".bg-white.rounded-3xl");
        if (modalBox) {
          modalBox.style.transform = "translateY(-20px) scale(0.95)";
          modalBox.style.opacity = "0";
        }
        setTimeout(() => {
          if (modalOverlay.parentNode) {
            modalOverlay.remove();
            enableScroll();
          }
        }, 300);
      }
    }
  });

  modalBox.innerHTML = modalContent;

  const closeModal = () => {
    modalOverlay.style.opacity = "0";
    modalBox.style.transform = "translateY(-20px) scale(0.95)";
    modalBox.style.opacity = "0";
    setTimeout(() => {
      if (modalOverlay.parentNode) {
        modalOverlay.remove();
        enableScroll();
      }
    }, 300);
  };

  setTimeout(() => {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.querySelectorAll(".help-item").forEach((item) => {
      item.addEventListener("click", () => {
        const title = item.querySelector("h4").textContent;
        closeModal();
        setTimeout(() => {
          showMessage(title, "جاري توجيهك إلى " + title + "...");
        }, 300);
      });
    });

    document.querySelectorAll(".wallet-action-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const actionName = btn.textContent.trim();
        closeModal();
        setTimeout(() => {
          showMessage(
            "عملية " + actionName,
            "جاري تنفيذ عملية " + actionName + "..."
          );
        }, 300);
      });
    });
  }, 100);
}