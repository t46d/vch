// src/lib/i18n.js

/**
 * ãáÝ ÅÚÏÇÏ ÇáÊÏæíá (i18n) æÅÏÇÑÉ ÇáÞæÇãíÓ ÇááÛæíÉ.
 * äÓÊÎÏã åäÇ ßÇÆä ÈÓíØ áÅÏÇÑÉ ÇáäÕæÕ ÈÏáÇð ãä ãßÊÈÉ ÎÇÑÌíÉ áÊÈÓíØ ÇáãÔÑæÚ.
 */

// ÇáÞæÇãíÓ ÇááÛæíÉ
export const translations = {
  // ÇááÛÉ ÇáÅäÌáíÒíÉ - ÇáÇÝÊÑÇÖíÉ
  en: {
    // ÇáæÇÌåÉ ÇáÚÇãÉ
    app_name: "VeXachat",
    loading: "Loading...",
    send: "Send",
    save: "Save",
    cancel: "Cancel",
    welcome_title: "Experience the Future of Dating",
    
    // ÇáãÕÇÏÞÉ
    login_title: "Welcome Back, Cybernaut",
    signup_title: "Join the Neon Grid",
    email: "Email Address",
    password: "Password",
    name: "Full Name",
    login_button: "Login to Grid",
    signup_button: "Create Account",
    forgot_password: "Forgot Password?",
    no_account: "Don't have an account?",
    has_account: "Already on the Grid?",
    
    // ÕÝÍÉ ÇáÇÓÊßÔÇÝ (Discover)
    discover_title: "Discover New Connections",
    discover_subtitle: "Swipe to find your perfect match",
    matches_today: "Matches Today",
    profiles_remaining: "Profiles Remaining",
    no_more_profiles: "You've seen everyone!",
    check_back_later: "Check back later for more profiles",
    refresh_profiles: "Refresh Profiles",
    pass: "Pass",
    like: "Like",
    super_like: "Super Like",
    
    // ÇáãáÝ ÇáÔÎÕí (Profile)
    edit_profile: "Edit Profile",
    age: "Age",
    bio: "Bio",
    location: "Location",
    interests: "Interests",
    is_consultant: "Available for Consultation",
    consultant_rate: "Hourly Rate (USD)",
    specialties: "Specialties",
    
    // ÇáÑÓÇÆá æÇáÅÔÚÇÑÇÊ
    match_found: "It's a Match! Start Chatting.",
    message_new: "New Message from",
    
    // ÍÇáÇÊ ÇáãØÇÈÞÉ
    status_pending: "Pending",
    status_accepted: "Accepted",
    status_rejected: "Rejected",
  },

  // ÇááÛÉ ÇáÚÑÈíÉ
  ar: {
    // ÇáæÇÌåÉ ÇáÚÇãÉ
    app_name: "ÝíÔÇÊ",
    loading: "ÌÇÑí ÇáÊÍãíá...",
    send: "ÅÑÓÇá",
    save: "ÍÝÙ",
    cancel: "ÅáÛÇÁ",
    welcome_title: "ÇßÊÔÝ ãÓÊÞÈá ÇáãæÇÚÏÉ",
    
    // ÇáãÕÇÏÞÉ
    login_title: "ãÑÍÈÇð ÈÚæÏÊß ÃíåÇ ÇáÓÇíÈÑäÇæÊ",
    signup_title: "ÇäÖã Åáì ÇáÔÈßÉ ÇáäíæäíÉ",
    email: "ÇáÈÑíÏ ÇáÅáßÊÑæäí",
    password: "ßáãÉ ÇáãÑæÑ",
    name: "ÇáÇÓã ÇáßÇãá",
    login_button: "ÊÓÌíá ÇáÏÎæá",
    signup_button: "ÅäÔÇÁ ÍÓÇÈ",
    forgot_password: "äÓíÊ ßáãÉ ÇáãÑæÑ¿",
    no_account: "áíÓ áÏíß ÍÓÇÈ¿",
    has_account: "åá áÏíß ÍÓÇÈ ÈÇáÝÚá¿",
    
    // ÕÝÍÉ ÇáÇÓÊßÔÇÝ (Discover)
    discover_title: "ÇßÊÔÝ ÚáÇÞÇÊ ÌÏíÏÉ",
    discover_subtitle: "ÇÓÍÈ íãíäÇð ááÚËæÑ Úáì ÔÑíßß ÇáãËÇáí",
    matches_today: "ÊØÇÈÞÇÊ Çáíæã",
    profiles_remaining: "ÇáãáÝÇÊ ÇáãÊÈÞíÉ",
    no_more_profiles: "áÞÏ ÑÃíÊ ÇáÌãíÚ!",
    check_back_later: "ÊÍÞÞ áÇÍÞÇð áÑÄíÉ ÇáãÒíÏ ãä ÇáãáÝÇÊ",
    refresh_profiles: "ÊÍÏíË ÇáãáÝÇÊ",
    pass: "ÊÌÇæÒ",
    like: "ÅÚÌÇÈ",
    super_like: "ÅÚÌÇÈ ÎÇÑÞ",
    
    // ÇáãáÝ ÇáÔÎÕí (Profile)
    edit_profile: "ÊÚÏíá ÇáãáÝ ÇáÔÎÕí",
    age: "ÇáÚãÑ",
    bio: "ÇáÓíÑÉ ÇáÐÇÊíÉ",
    location: "ÇáãæÞÚ",
    interests: "ÇáÇåÊãÇãÇÊ",
    is_consultant: "ãÊÇÍ ááÇÓÊÔÇÑÉ",
    consultant_rate: "ÇáÓÚÑ ÈÇáÓÇÚÉ (ÈÇáÏæáÇÑ ÇáÃãÑíßí)",
    specialties: "ÇáÊÎÕÕÇÊ",
    
    // ÇáÑÓÇÆá æÇáÅÔÚÇÑÇÊ
    match_found: "ÊØÇÈÞ! ÇÈÏÃ ÇáÏÑÏÔÉ ÇáÂä.",
    message_new: "ÑÓÇáÉ ÌÏíÏÉ ãä",
    
    // ÍÇáÇÊ ÇáãØÇÈÞÉ
    status_pending: "ãÚáÞ",
    status_accepted: "ãÞÈæá",
    status_rejected: "ãÑÝæÖ",
  }
};

/**
 * ÞÇÆãÉ ÇááÛÇÊ ÇáãÏÚæãÉ æÇáÇÊÌÇå (LTR/RTL)
 */
export const locales = [
  { locale: 'en', direction: 'ltr', name: 'English' },
  { locale: 'ar', direction: 'rtl', name: 'ÇáÚÑÈíÉ' },
];

/**
 * æÙíÝÉ ÌáÈ ÇáäÕ ÇáãÊÑÌã
 * @param {string} locale - ßæÏ ÇááÛÉ ÇáãØáæÈ (ãËá 'en' Ãæ 'ar')
 * @param {string} key - ãÝÊÇÍ ÇáäÕ Ýí ÞÇãæÓ ÇáÊÑÌãÉ
 * @returns {string} ÇáäÕ ÇáãÊÑÌã Ãæ ÇáãÝÊÇÍ Ýí ÍÇá ÚÏã ÇáÚËæÑ Úáíå
 */
export function getTranslation(locale, key) {
  const dictionary = translations[locale] || translations.en;
  return dictionary[key] || key;
}