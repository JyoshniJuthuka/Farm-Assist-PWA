// Voice Recognition
const startVoice = document.getElementById("startVoice");
const voiceStatus = document.getElementById("voiceStatus");
const textQuery = document.getElementById("textQuery");
const sendQuery = document.getElementById("sendQuery");
const assistantOutput = document.getElementById("assistantOutput");
const voiceLang = document.getElementById("voiceLang");

let recognition;
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.interimResults = false;

  recognition.onstart = () => (voiceStatus.textContent = "Listening...");
  recognition.onend = () => (voiceStatus.textContent = "Voice status: idle");
  recognition.onerror = (e) => (voiceStatus.textContent = "Error: " + e.error);
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    textQuery.value = transcript;
  };

  startVoice.addEventListener("click", () => {
    recognition.lang = voiceLang.value;
    recognition.start();
  });
} else {
  voiceStatus.textContent = "Voice not supported in this browser.";
}

// Simple Query Response
sendQuery.addEventListener("click", () => {
  const q = textQuery.value.toLowerCase();
  if (q.includes("irrigation") || q.includes("water")) {
    assistantOutput.textContent = "Check soil moisture before watering. Use drip irrigation.";
  } else if (q.includes("pest") || q.includes("insect")) {
    assistantOutput.textContent = "Use neem oil spray or organic pesticides.";
  } else if (q.includes("soil")) {
    assistantOutput.textContent = "Test your soil. Add compost for better fertility.";
  } else {
    assistantOutput.textContent = "Your query has been recorded. Please upload an image for better help.";
  }
});

// Image Preview
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
    assistantOutput.textContent = "Image received. We’ll analyze and suggest remedies.";
  };
  reader.readAsDataURL(file);
});


// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then(() => console.log("✅ Service Worker Registered"))
      .catch((err) => console.error("❌ SW Registration Failed", err));
  });
}
// Get user location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    document.getElementById("locationInfo").innerHTML = "❌ Geolocation not supported.";
  }
}

// Show coordinates + generate advisory tips
function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  document.getElementById("locationInfo").innerHTML =
    `<p>📍 Your Location:<br>Latitude: ${lat.toFixed(4)}, Longitude: ${lon.toFixed(4)}</p>`;

  // Dummy advisory logic (replace later with real API)
  let tips = [];
  if (lat > 20 && lat < 30) {
    tips = [
      "Use **drip irrigation** to save water.",
      "Check soil moisture before watering.",
      "Neem oil spray helps against insects."
    ];
  } else if (lat >= 30) {
    tips = [
      "Irrigate crops early morning to reduce evaporation.",
      "Mulching helps retain soil moisture.",
      "Avoid over-fertilizing in dry conditions."
    ];
  } else {
    tips = [
      "Flood irrigation may cause water loss. Switch to drip/sprinkler.",
      "Test soil before applying fertilizer.",
      "Use bio-pesticides for safer crop protection."
    ];
  }
  const WEATHER_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // replace with your key

// Weather logic
function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeather, showError);
  } else {
    document.getElementById("weatherInfo").innerHTML = "❌ Geolocation not supported.";
  }
}

function fetchWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const condition = data.weather[0].description;
      const humidity = data.main.humidity;

      document.getElementById("weatherInfo").innerHTML = `
        <p>🌡️ Temperature: ${temp}°C</p>
        <p>☁️ Condition: ${condition}</p>
        <p>💧 Humidity: ${humidity}%</p>
      `;
    })
    .catch(err => {
      document.getElementById("weatherInfo").innerHTML = "⚠️ Unable to fetch weather data.";
      console.error(err);
    });
}

function showError(error) {
  let msg = "";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      msg = "❌ User denied location request.";
      break;
    case error.POSITION_UNAVAILABLE:
      msg = "❌ Location info unavailable.";
      break;
    case error.TIMEOUT:
      msg = "⏳ Location request timed out.";
      break;
    default:
      msg = "⚠️ An unknown error occurred.";
  }
  document.getElementById("weatherInfo").innerHTML = msg;
}

// Market price logic
function showMarket(crop) {
  let prices = {
    wheat: { price: 2000, quantity: "100 quintals" },
    rice: { price: 2200, quantity: "80 quintals" },
    maize: { price: 1800, quantity: "120 quintals" }
  };

  if (prices[crop]) {
    document.getElementById("marketInfo").innerHTML = `
      <p><strong>${crop.toUpperCase()}</strong></p>
      <p>💰 Price: ₹${prices[crop].price}/quintal</p>
      <p>📦 Available Quantity: ${prices[crop].quantity}</p>
    `;
  } else {
    document.getElementById("marketInfo").innerHTML = "⚠️ No data available.";
  }
}
function askAnimalQuery() {
  const query = document.getElementById("animalQuery").value;
  const type = document.getElementById("animalType").value;
  const responseDiv = document.getElementById("animalResponse");

  if (!query) {
    responseDiv.innerHTML = "<p>❗ Please enter your query first.</p>";
    return;
  }

  // Placeholder response (you can integrate API or AI backend here)
  responseDiv.innerHTML = `<p>🐾 Query about <strong>${type}</strong> received: "${query}"</p>
                           <p>✅ Our advisory team will provide guidance soon!</p>`;
}


  // Render tips as cards
  const tipsContainer = document.getElementById("advisoryTips");
  tipsContainer.innerHTML = tips.map(t => `<div class="card">${t}</div>`).join("");
}

// Handle location errors
function showError(error) {
  let msg = "";
  switch (error.code) {
    case error.PERMISSION_DENIED:
      msg = "❌ User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      msg = "❌ Location information is unavailable.";
      break;
    case error.TIMEOUT:
      msg = "⏳ The request to get user location timed out.";
      break;
    default:
      msg = "⚠️ An unknown error occurred.";
  }
  document.getElementById("locationInfo").innerHTML = msg;
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event so you can trigger it later.
  deferredPrompt = e;
  // Show the install button
  const btn = document.getElementById('installBtn');
  btn.removeAttribute('hidden');

  btn.addEventListener('click', () => {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the prompt so it can’t be used again
      deferredPrompt = null;
      btn.setAttribute('hidden', true);
    });
  });
});

window.addEventListener('appinstalled', (evt) => {
  console.log('PWA was installed');
});
