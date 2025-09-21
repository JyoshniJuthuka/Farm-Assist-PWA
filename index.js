/ ===================
// Language & i18n
// ===================
const translations = {
  en: {
    title: "FarmAssist – Farmer Query & Advisory System",
    nav_home: "Home",
    nav_query: "Voice/Text/Image",
    nav_irrigation: "Irrigation Tips",
    nav_animal: "Animal Care",
    nav_market: "Market",
    nav_community: "Schemes & Community",
    home_title: "FarmAssist",
    home_tagline: "Smart Farming Tools at Your Fingertips",
    chatbot_title: "🎙 Voice, Text & Image Query",
    voice_title: "🎤 Voice Query",
    btn_start_voice: "Start Voice",
    voice_status: "Voice status: idle",
    text_title: "⌨️ Text Query",
    text_placeholder: "Type your question here...",
    btn_send: "Send Query",
    image_title: "📷 Image Query",
    assistant_output: "Ask a query to get a response here.",
    irrigation_title: "🌦 Live Location & Irrigation Tips",
    weather_location: "🌍 Your Location",
    weather_info: "☀ Weather Info",
    btn_refresh_weather: "Refresh Weather",
    irrigation_tips: "💧 Irrigation Tips",
    tip_loading: "Loading tips...",
    animal_title: "🐄 Animal Care & Queries",
    animal_label: "💬 Ask a Question:",
    animal_placeholder: "Type your question about animals here...",
    animal_type_label: "🐾 Select Animal Type:",
    animal_livestock: "Livestock (Cows, Goats, etc.)",
    animal_poultry: "Poultry (Chickens, Ducks, etc.)",
    animal_other: "Other Animals",
    btn_ask: "Ask",
    animal_response: "💬 Your answer will appear here...",
    vet_title: "🐾 Nearby Veterinary Help",
    btn_find_vet: "Find Nearest Vets",
    vet_loading: "📍 Nearest veterinary hospitals/doctors will appear here...",
    market_title: "💰 Profits & Business",
    community_title: "📘 Govt. Schemes & Community",
    community_search: "Search schemes...",
    badge_income: "Income",
    pmkisan_name: "PM-Kisan Yojana",
    pmkisan_tooltip: "₹6,000/year in 3 installments for eligible farmers",
    btn_apply: "Apply Now"
  },
  hi: {
    title: "FarmAssist – किसान पूछताछ और सलाह प्रणाली",
    nav_home: "होम",
    nav_query: "वॉइस/टेक्स्ट/इमेज",
    nav_irrigation: "सिंचाई सुझाव",
    nav_animal: "पशु देखभाल",
    nav_market: "बाजार",
    nav_community: "योजनाएँ और समुदाय",
    home_title: "FarmAssist",
    home_tagline: "स्मार्ट कृषि उपकरण आपकी उंगलियों पर",
    chatbot_title: "🎙 वॉइस, टेक्स्ट और इमेज क्वेरी",
    voice_title: "🎤 वॉइस क्वेरी",
    btn_start_voice: "वॉइस शुरू करें",
    voice_status: "वॉइस स्थिति: निष्क्रिय",
    text_title: "⌨️ टेक्स्ट क्वेरी",
    text_placeholder: "यहाँ अपना प्रश्न टाइप करें...",
    btn_send: "प्रश्न भेजें",
    image_title: "📷 इमेज क्वेरी",
    assistant_output: "प्रश्न पूछें, उत्तर यहाँ मिलेगा।",
    irrigation_title: "🌦 लाइव लोकेशन और सिंचाई सुझाव",
    weather_location: "🌍 आपकी लोकेशन",
    weather_info: "☀ मौसम जानकारी",
    btn_refresh_weather: "मौसम ताज़ा करें",
    irrigation_tips: "💧 सिंचाई सुझाव",
    tip_loading: "लोड हो रहा है...",
    animal_title: "🐄 पशु देखभाल और प्रश्न",
    animal_label: "💬 प्रश्न पूछें:",
    animal_placeholder: "पशुओं के बारे में प्रश्न यहाँ टाइप करें...",
    animal_type_label: "🐾 पशु प्रकार चुनें:",
    animal_livestock: "पशुधन (गाय, बकरी आदि)",
    animal_poultry: "मुर्गियाँ (चिकन, बतख आदि)",
    animal_other: "अन्य जानवर",
    btn_ask: "पूछें",
    animal_response: "💬 आपका उत्तर यहाँ दिखाई देगा...",
    vet_title: "🐾 नजदीकी पशु चिकित्सालय",
    btn_find_vet: "नजदीकी पशु चिकित्सक खोजें",
    vet_loading: "📍 नजदीकी पशु चिकित्सालय/डॉक्टर यहाँ दिखेंगे...",
    market_title: "💰 लाभ और व्यापार",
    community_title: "📘 सरकारी योजनाएँ और समुदाय",
    community_search: "योजनाएँ खोजें...",
    badge_income: "आय",
    pmkisan_name: "पीएम-किसान योजना",
    pmkisan_tooltip: "पात्र किसानों के लिए सालाना ₹6,000, 3 किस्तों में",
    btn_apply: "अभी आवेदन करें"
  }
  // Repeat for te, ta, kn, ml if needed
};
// Simple assistant response handling
function getSmartResponse(query) {
  const q = query.toLowerCase();

  if (q.includes("irrigation")) return "💧 You should use drip irrigation for water efficiency.";
  if (q.includes("goat")) return "🐐 Goats need mineral supplements and regular deworming.";
  if (q.includes("weather")) return "☀ Today’s weather is sunny with mild humidity.";
  if (q.includes("soil")) return "🌱 Test your soil and add compost for better fertility.";
  if (q.includes("pest")) return "🪲 Use neem oil spray or organic pesticides.";
  return "🤖 Thank you for your question. Our advisory team will respond shortly.";
}

// Handle text query button
document.getElementById("sendQuery").addEventListener("click", () => {
  const query = document.getElementById("textQuery").value.trim();
  if (!query) {
    document.getElementById("assistantText").textContent = "❗ Please enter a question.";
    return;
  }
  const response = getSmartResponse(query);
  document.getElementById("assistantText").textContent = response;
});

// Optional: voice recognition (simplified)
const startVoiceBtn = document.getElementById("startVoice");
const voiceStatus = document.getElementById("voiceStatus");
const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (recognition) {
  const rec = new recognition();
  rec.interimResults = false;
  rec.onstart = () => (voiceStatus.textContent = "🎤 Listening...");
  rec.onend = () => (voiceStatus.textContent = "Voice status: idle");
  rec.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("textQuery").value = transcript;
    const response = getSmartResponse(transcript);
    document.getElementById("assistantText").textContent = response;
  };

  startVoiceBtn.addEventListener("click", () => {
    rec.lang = document.getElementById("voiceLang").value;
    rec.start();
  });
} else {
  voiceStatus.textContent = "Voice not supported in this browser.";
}

// Optional: Image query preview
document.getElementById("imageInput").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById("imagePreview").innerHTML = `<img src="${e.target.result}" alt="Preview" style="max-width:200px;">`;
    document.getElementById("assistantText").textContent = "🖼 Image received. We will analyze and suggest remedies soon.";
  };
  reader.readAsDataURL(file);
});


// ===================
// Apply translations
// ===================
function applyTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.setAttribute("placeholder", translations[lang][key]);
    }
  });

  localStorage.setItem("appLang", lang);
}

// ===================
// Detect language
// ===================
function detectAppLanguage() {
  const supported = Object.keys(translations);
  const stored = localStorage.getItem("appLang");
  if (stored && supported.includes(stored)) return stored;
  const userLang = (navigator.language || navigator.userLanguage).split("-")[0];
  return supported.includes(userLang) ? userLang : "en";
}

// ===================
// Backend API Call (Step 2)
// ===================
async function callBackendAPI(endpoint) {
  try {
    const response = await fetch(`http://localhost:3000/${endpoint}`);
    const data = await response.json();
    console.log("Response from backend:", data);
  } catch (error) {
    console.error("Error calling backend:", error);
  }
}

// ===================
// On DOM load
// ===================
document.addEventListener("DOMContentLoaded", () => {
  const lang = detectAppLanguage();
  applyTranslations(lang);

  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = lang;
    langSelect.addEventListener("change", e => applyTranslations(e.target.value));
  }

  // Test backend when page loads
  callBackendAPI("test");
});
