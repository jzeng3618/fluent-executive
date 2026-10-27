/**
 * FluentExecutive - Business & Spoken English Coach powered by Google Gemini
 */

// --- INITIAL PRESET PHRASEBOOK ---
const PRESET_PHRASES = [
  {
    id: "p1",
    phrase: "To piggyback on what [Name] mentioned...",
    category: "transitions",
    meaning: "To smoothly build upon a colleague's point in a meeting without interrupting.",
    example: "To piggyback on what David mentioned regarding latency, we've already profiled the auth service."
  },
  {
    id: "p2",
    phrase: "Help me understand the rationale behind...",
    category: "pushback",
    meaning: "A polite, non-defensive way to question a questionable decision or requirement.",
    example: "Help me understand the rationale behind accelerating the release to this Thursday."
  },
  {
    id: "p3",
    phrase: "I want to be mindful of everyone's time...",
    category: "executive",
    meaning: "Gracefully steering a meeting back on track when discussion is spiraling or running long.",
    example: "I want to be mindful of everyone's time, so let's park this offline and cover the remaining agenda."
  },
  {
    id: "p4",
    phrase: "Our bottom line up front (BLUF) is...",
    category: "executive",
    meaning: "Stating the core recommendation or decision immediately before sharing details.",
    example: "Our bottom line up front is that we recommend migrating to regional clusters to cut egress costs by 30%."
  },
  {
    id: "p5",
    phrase: "If we commit to X, what trade-offs are we willing to accept on Y?",
    category: "negotiation",
    meaning: "Assertively highlighting constraints without bluntly saying 'no'.",
    example: "If we commit to shipping the billing redesign this sprint, what trade-offs are we willing to accept on the analytics dashboard?"
  },
  {
    id: "p6",
    phrase: "I'd like to put a pin in that for now...",
    category: "transitions",
    meaning: "Acknowledging an off-topic point while firmly returning focus to the primary agenda.",
    example: "That's a valid point about long-term GDPR compliance; let's put a pin in that for sprint planning."
  },
  {
    id: "p7",
    phrase: "I have a differing perspective on this...",
    category: "pushback",
    meaning: "Expressing disagreement with authority or peers with maximum tact and respect.",
    example: "I have a differing perspective on this architecture based on our recent load testing findings."
  },
  {
    id: "p8",
    phrase: "Let's circle back once we have preliminary telemetry...",
    category: "negotiation",
    meaning: "Deferring a premature decision until concrete data is collected.",
    example: "Rather than speculate on adoption, let's circle back once we have preliminary telemetry from the beta cohort."
  },
  {
    id: "p9",
    phrase: "To ensure we are fully aligned...",
    category: "transitions",
    meaning: "Summarizing action items and ownership at the end of a call to avoid ambiguity.",
    example: "To ensure we are fully aligned: Jane owns the RFC draft, and I will benchmark API response times."
  },
  {
    id: "p10",
    phrase: "Could you speak to the business impact of...",
    category: "executive",
    meaning: "Prompting a speaker to elevate their update from technical weeds to commercial value.",
    example: "Could you speak to the business impact of this refactor on customer churn?"
  }
];

// --- SAMPLE DRAFTS FOR WRITING STUDIO ---
const SAMPLE_DRAFTS = [
  "Hey, we can't do this feature by Friday because backend is broken. You need to tell the client next week or they will be angry. Not our fault.",
  "Hi team, I looked at the proposal. It has a lot of problems and the numbers make no sense. We shouldn't do this.",
  "I want a promotion because I have worked here for 2 years and I do a lot of things. Other people who joined after me already got promoted.",
  "Can you give me the status of the report? I asked for it yesterday and didn't get any reply yet. Need it ASAP."
];

// --- SCENARIO DATA FOR VOICE ROLEPLAY ---
const SCENARIOS = {
  deadline_negotiation: {
    partnerName: "Sarah Jenkins",
    partnerRole: "VP of Product (Direct, busy, high-expectation)",
    avatar: "SJ",
    initialMessage: "Thanks for meeting. Look, executive leadership wants the enterprise sync engine delivered two weeks ahead of schedule for the Q4 board meeting. Can your team commit to shipping by the 15th?",
    systemPrompt: `You are Sarah Jenkins, a sharp, fast-paced VP of Product at a high-growth tech company. You are currently in a 1-on-1 meeting with the user, who is a team lead/engineer.
Goal: You are pushing for an aggressive deadline (2 weeks earlier).
Style: Speak naturally and concisely as in a spoken corporate meeting (keep each response to 2 to 3 sentences maximum).
Behavior: If the user pushes back diplomatically with clear trade-offs, scope reduction, or phased delivery, show appreciation for their realism and negotiate. If the user gives a blunt "no" without rationale, or just says "yes" without mentioning risk, challenge them firmly.
Stay in character! Do NOT give meta advice or break character.`
  },
  salary_review: {
    partnerName: "David Miller",
    partnerRole: "Director of Engineering (Supportive, metrics-driven)",
    avatar: "DM",
    initialMessage: "Good to sit down with you for our mid-year review. You mentioned wanting to discuss your compensation and leveling trajectory. What achievements would you like to highlight today?",
    systemPrompt: `You are David Miller, Director of Engineering. You value business impact, mentorship, and systematic delivery over tenure.
Goal: Discuss the user's performance and compensation expectations.
Style: Professional, encouraging but inquisitive (keep responses to 2 to 3 sentences max). Ask about specific metrics, scope of leadership, or cross-functional impact.
Stay in character! Do NOT give meta advice or break character.`
  },
  executive_standup: {
    partnerName: "Rachel Chen",
    partnerRole: "Chief of Staff (Time-sensitive, wants BLUF)",
    avatar: "RC",
    initialMessage: "We have 4 minutes left in this leadership sync. Give me your 30-second bottom line on where the auth migration stands and if there are any unmitigated launch blockers.",
    systemPrompt: `You are Rachel Chen, Chief of Staff to the CEO. You have zero tolerance for rambling or technical jargon without business context.
Goal: Hear a crisp, structured (BLUF) status update.
Style: Crisp, polite, fast-paced (1 to 2 sentences max). If they ramble, politely ask them to state the bottom line.
Stay in character! Do NOT break character.`
  },
  stakeholder_demo: {
    partnerName: "Dr. Marcus Vance",
    partnerRole: "Enterprise Architect (Skeptical, detail-oriented)",
    avatar: "MV",
    initialMessage: "I saw your proposed caching topology. In my experience, distributed invalidation at this scale causes subtle data consistency anomalies. How specifically does your solution address stale reads across multi-region instances?",
    systemPrompt: `You are Dr. Marcus Vance, a veteran Enterprise Architect known for tough technical scrutiny.
Goal: Test the user's composure, clarity, and diplomacy when addressing technical skepticism.
Style: Formal, analytical (2 to 3 sentences max). If the user explains calmly with clear architectural trade-offs, acknowledge their rigor.
Stay in character! Do NOT break character.`
  }
};

// --- PRACTICE DRILLS FOR SPEECH DIAGNOSTICS ---
const PRACTICE_PROMPTS = [
  "Explain a complex technical project you completed to a non-technical executive in 60 seconds (Use the PREP framework: Point, Reason, Example, Point).",
  "Pitch why your team needs one additional headcount for the upcoming quarter.",
  "You are announcing a 1-day delay on a critical production launch. Deliver the update diplomatically without shifting blame.",
  "Give a 60-second elevator pitch about yourself and your unique professional superpowers in an executive job interview.",
  "Politely decline an urgent ad-hoc request from a peer because your team is at 100% sprint capacity."
];

// --- APP STATE ---
const state = {
  apiKey: localStorage.getItem("gemini_api_key") || "",
  model: localStorage.getItem("gemini_model") || "gemini-2.5-flash",
  selectedVoiceName: localStorage.getItem("preferred_voice") || "",
  currentTab: "writing",
  activeScenarioKey: "deadline_negotiation",
  roleplayHistory: [],
  isListeningRoleplay: false,
  isListeningPitch: false,
  pitchStartTime: null,
  pitchTimerInterval: null,
  pitchTranscriptText: "",
  phrases: JSON.parse(localStorage.getItem("fluent_phrases") || "null") || PRESET_PHRASES,
  speechVoices: []
};

// --- DOM ELEMENTS ---
const elements = {
  // Tabs
  tabButtons: document.querySelectorAll("[data-tab]"),
  tabContents: document.querySelectorAll(".tab-content"),
  
  // API & Settings
  apiKeyBadgeBtn: document.getElementById("apiKeyBadgeBtn"),
  apiStatusDot: document.getElementById("apiStatusDot"),
  apiStatusText: document.getElementById("apiStatusText"),
  openSettingsBtn: document.getElementById("openSettingsBtn"),
  settingsModal: document.getElementById("settingsModal"),
  closeSettingsModalBtn: document.getElementById("closeSettingsModalBtn"),
  apiKeyInput: document.getElementById("apiKeyInput"),
  modelSelect: document.getElementById("modelSelect"),
  voiceSelect: document.getElementById("voiceSelect"),
  testApiKeyBtn: document.getElementById("testApiKeyBtn"),
  saveApiKeyBtn: document.getElementById("saveApiKeyBtn"),

  // Writing Studio
  writingFormat: document.getElementById("writingFormat"),
  writingTone: document.getElementById("writingTone"),
  writingAudience: document.getElementById("writingAudience"),
  writingInput: document.getElementById("writingInput"),
  inputCharCount: document.getElementById("inputCharCount"),
  writingSampleBtn: document.getElementById("writingSampleBtn"),
  clearWritingBtn: document.getElementById("clearWritingBtn"),
  refineWritingBtn: document.getElementById("refineWritingBtn"),
  writingLoading: document.getElementById("writingLoading"),
  writingOutputContainer: document.getElementById("writingOutputContainer"),
  writingEmptyState: document.getElementById("writingEmptyState"),
  writingOutputBody: document.getElementById("writingOutputBody"),
  refinedText: document.getElementById("refinedText"),
  writingBreakdown: document.getElementById("writingBreakdown"),
  writingVocabBadges: document.getElementById("writingVocabBadges"),
  copyRefinedBtn: document.getElementById("copyRefinedBtn"),
  saveRefinedToVaultBtn: document.getElementById("saveRefinedToVaultBtn"),

  // Roleplay
  scenarioCards: document.querySelectorAll(".scenario-card"),
  roleplayPartnerAvatar: document.getElementById("roleplayPartnerAvatar"),
  roleplayPartnerName: document.getElementById("roleplayPartnerName"),
  roleplayPartnerRole: document.getElementById("roleplayPartnerRole"),
  voiceResponseToggle: document.getElementById("voiceResponseToggle"),
  roleplayChatBox: document.getElementById("roleplayChatBox"),
  recordingIndicator: document.getElementById("recordingIndicator"),
  roleplayMicBtn: document.getElementById("roleplayMicBtn"),
  roleplayMicIcon: document.getElementById("roleplayMicIcon"),
  roleplayInputText: document.getElementById("roleplayInputText"),
  roleplaySendBtn: document.getElementById("roleplaySendBtn"),
  endRoleplayDebriefBtn: document.getElementById("endRoleplayDebriefBtn"),
  resetRoleplayBtn: document.getElementById("resetRoleplayBtn"),
  roleplayDebriefCard: document.getElementById("roleplayDebriefCard"),
  roleplayDebriefContent: document.getElementById("roleplayDebriefContent"),
  closeDebriefBtn: document.getElementById("closeDebriefBtn"),

  // Speech Diagnostics
  presetPitchPromptBtn: document.getElementById("presetPitchPromptBtn"),
  activeDrillPrompt: document.getElementById("activeDrillPrompt"),
  pitchTimer: document.getElementById("pitchTimer"),
  togglePitchRecordBtn: document.getElementById("togglePitchRecordBtn"),
  pitchRecordBtnText: document.getElementById("pitchRecordBtnText"),
  speechLiveTranscript: document.getElementById("speechLiveTranscript"),
  speechWordCount: document.getElementById("speechWordCount"),
  fillerWordCount: document.getElementById("fillerWordCount"),
  fillerWordList: document.getElementById("fillerWordList"),
  wpmCounter: document.getElementById("wpmCounter"),
  analyzePitchBtn: document.getElementById("analyzePitchBtn"),
  pitchCritiqueCard: document.getElementById("pitchCritiqueCard"),
  pitchCritiqueBody: document.getElementById("pitchCritiqueBody"),

  // Phrasebook Vault
  phraseCardsGrid: document.getElementById("phraseCardsGrid"),
  phraseFilterBtns: document.querySelectorAll(".phrase-filter-btn"),
  addCustomPhraseBtn: document.getElementById("addCustomPhraseBtn"),

  // Toast
  toastContainer: document.getElementById("toastContainer")
};

// --- INITIALIZATION ---
window.addEventListener("DOMContentLoaded", () => {
  initIcons();
  initVoiceList();
  updateApiStatusUI();
  setupEventListeners();
  initRoleplayScenario(state.activeScenarioKey);
  renderPhraseGrid("all");
});

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- TOAST NOTIFICATIONS ---
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  const bg = type === "success" ? "bg-slate-900 text-white border-slate-700" :
             type === "error" ? "bg-rose-900 text-white border-rose-700" :
             "bg-indigo-900 text-white border-indigo-700";
  toast.className = `px-4 py-2.5 rounded-xl text-xs font-medium border shadow-lg transition-all transform translate-y-2 opacity-0 flex items-center gap-2 pointer-events-auto ${bg}`;
  toast.innerHTML = `<span>${message}</span>`;
  elements.toastContainer.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-2", "opacity-0");
  });

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 250);
  }, 3500);
}

// --- GEMINI API CALLER ---
async function callGemini(userPrompt, systemInstruction = "", temperature = 0.7) {
  if (!state.apiKey) {
    showToast("Please enter your Gemini API Key first", "error");
    openSettings();
    throw new Error("Missing Gemini API Key");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${state.model}:generateContent?key=${encodeURIComponent(state.apiKey)}`;

  const bodyPayload = {
    contents: [
      {
        role: "user",
        parts: [{ text: userPrompt }]
      }
    ],
    generationConfig: {
      temperature: temperature,
      maxOutputTokens: 2048
    }
  };

  if (systemInstruction) {
    bodyPayload.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || `API Error (${response.status})`;
    throw new Error(errorMsg);
  }

  const result = await response.json();
  const textOutput = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textOutput) {
    throw new Error("Empty response returned from Gemini.");
  }
  return textOutput;
}

// Multi-turn chat call for Roleplay
async function callGeminiChat(contentsHistory, systemInstruction = "") {
  if (!state.apiKey) {
    showToast("Please enter your Gemini API Key first", "error");
    openSettings();
    throw new Error("Missing Gemini API Key");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${state.model}:generateContent?key=${encodeURIComponent(state.apiKey)}`;

  const bodyPayload = {
    contents: contentsHistory,
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.75,
      maxOutputTokens: 1024
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyPayload)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || `API Error (${response.status})`;
    throw new Error(errorMsg);
  }

  const result = await response.json();
  return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
}

// --- API & SETTINGS LOGIC ---
function updateApiStatusUI() {
  if (state.apiKey && state.apiKey.trim().length > 10) {
    elements.apiStatusDot.className = "w-2 h-2 rounded-full bg-emerald-500";
    elements.apiStatusText.textContent = `${state.model.replace("gemini-", "")}`;
    elements.apiKeyBadgeBtn.className = "flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors";
  } else {
    elements.apiStatusDot.className = "w-2 h-2 rounded-full bg-amber-500 animate-pulse";
    elements.apiStatusText.textContent = "Setup Gemini Key";
    elements.apiKeyBadgeBtn.className = "flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors";
  }
}

function openSettings() {
  elements.apiKeyInput.value = state.apiKey;
  elements.modelSelect.value = state.model;
  elements.settingsModal.classList.remove("hidden");
}

function closeSettings() {
  elements.settingsModal.classList.add("hidden");
}

// Speech Voices detection
function initVoiceList() {
  if (!("speechSynthesis" in window)) return;

  const populateVoices = () => {
    state.speechVoices = window.speechSynthesis.getVoices().filter(v => v.lang.startsWith("en"));
    elements.voiceSelect.innerHTML = `<option value="">System Default Voice</option>`;
    state.speechVoices.forEach(voice => {
      const option = document.createElement("option");
      option.value = voice.name;
      option.textContent = `${voice.name} (${voice.lang})`;
      if (voice.name === state.selectedVoiceName) option.selected = true;
      elements.voiceSelect.appendChild(option);
    });
  };

  populateVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }
}

function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel(); // Stop any pending speech

  const cleanText = text.replace(/[*#_`]/g, "").trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;

  if (state.selectedVoiceName) {
    const matchedVoice = state.speechVoices.find(v => v.name === state.selectedVoiceName);
    if (matchedVoice) utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
  // Tab Switching
  elements.tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetTab = btn.getAttribute("data-tab");
      switchTab(targetTab);
    });
  });

  // Settings
  elements.apiKeyBadgeBtn.addEventListener("click", openSettings);
  elements.openSettingsBtn.addEventListener("click", openSettings);
  elements.closeSettingsModalBtn.addEventListener("click", closeSettings);

  elements.saveApiKeyBtn.addEventListener("click", () => {
    const key = elements.apiKeyInput.value.trim();
    const model = elements.modelSelect.value;
    const voice = elements.voiceSelect.value;

    state.apiKey = key;
    state.model = model;
    state.selectedVoiceName = voice;

    localStorage.setItem("gemini_api_key", key);
    localStorage.setItem("gemini_model", model);
    localStorage.setItem("preferred_voice", voice);

    updateApiStatusUI();
    closeSettings();
    showToast("Settings saved successfully!", "success");
  });

  elements.testApiKeyBtn.addEventListener("click", async () => {
    const key = elements.apiKeyInput.value.trim();
    if (!key) {
      showToast("Please enter a key to test", "error");
      return;
    }
    const originalText = elements.testApiKeyBtn.textContent;
    elements.testApiKeyBtn.textContent = "Testing...";
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${elements.modelSelect.value}:generateContent?key=${encodeURIComponent(key)}`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: "Say 'ok' in one word." }] }]
        })
      });
      if (res.ok) {
        showToast("Key is valid & ready to go!", "success");
      } else {
        const err = await res.json().catch(() => ({}));
        showToast(`Test failed: ${err.error?.message || res.status}`, "error");
      }
    } catch (e) {
      showToast(`Connection failed: ${e.message}`, "error");
    } finally {
      elements.testApiKeyBtn.textContent = originalText;
    }
  });

  // Writing Studio Listeners
  elements.writingInput.addEventListener("input", () => {
    elements.inputCharCount.textContent = `${elements.writingInput.value.length} characters`;
  });

  elements.writingSampleBtn.addEventListener("click", () => {
    const sample = SAMPLE_DRAFTS[Math.floor(Math.random() * SAMPLE_DRAFTS.length)];
    elements.writingInput.value = sample;
    elements.writingInput.dispatchEvent(new Event("input"));
  });

  elements.clearWritingBtn.addEventListener("click", () => {
    elements.writingInput.value = "";
    elements.writingInput.dispatchEvent(new Event("input"));
    elements.writingOutputBody.classList.add("hidden");
    elements.writingEmptyState.classList.remove("hidden");
  });

  elements.refineWritingBtn.addEventListener("click", handleRefineWriting);

  elements.copyRefinedBtn.addEventListener("click", () => {
    const text = elements.refinedText.innerText;
    if (text) {
      navigator.clipboard.writeText(text);
      showToast("Copied refined text to clipboard!", "success");
    }
  });

  elements.saveRefinedToVaultBtn.addEventListener("click", handleSaveWritingToVault);

  // Roleplay Scenario Cards
  elements.scenarioCards.forEach(card => {
    card.addEventListener("click", () => {
      elements.scenarioCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      const scenarioKey = card.getAttribute("data-scenario");
      initRoleplayScenario(scenarioKey);
    });
  });

  // Roleplay Controls
  elements.roleplaySendBtn.addEventListener("click", handleSendRoleplayMessage);
  elements.roleplayInputText.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendRoleplayMessage();
    }
  });
  elements.resetRoleplayBtn.addEventListener("click", () => {
    initRoleplayScenario(state.activeScenarioKey);
    showToast("Scenario restarted", "info");
  });
  elements.endRoleplayDebriefBtn.addEventListener("click", handleGenerateRoleplayDebrief);
  elements.closeDebriefBtn.addEventListener("click", () => {
    elements.roleplayDebriefCard.classList.add("hidden");
  });

  // Roleplay Speech Recognition
  elements.roleplayMicBtn.addEventListener("click", toggleRoleplayMic);

  // Speech Diagnostics Listeners
  elements.presetPitchPromptBtn.addEventListener("click", () => {
    const prompt = PRACTICE_PROMPTS[Math.floor(Math.random() * PRACTICE_PROMPTS.length)];
    elements.activeDrillPrompt.textContent = `"${prompt}"`;
  });

  elements.togglePitchRecordBtn.addEventListener("click", togglePitchRecording);
  elements.analyzePitchBtn.addEventListener("click", handleAnalyzePitch);

  // Phrasebook Vault Listeners
  elements.phraseFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      elements.phraseFilterBtns.forEach(b => {
        b.classList.remove("active", "bg-slate-900", "text-white");
        b.classList.add("bg-white", "text-slate-700", "border");
      });
      btn.classList.add("active", "bg-slate-900", "text-white");
      btn.classList.remove("bg-white", "text-slate-700", "border");
      const cat = btn.getAttribute("data-category");
      renderPhraseGrid(cat);
    });
  });

  elements.addCustomPhraseBtn.addEventListener("click", handleAddCustomPhrase);
}

// --- TAB SWITCHER ---
function switchTab(tabId) {
  state.currentTab = tabId;
  elements.tabButtons.forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  elements.tabContents.forEach(content => {
    if (content.id === `tab-${tabId}`) {
      content.classList.remove("hidden");
      content.classList.add("block");
    } else {
      content.classList.add("hidden");
      content.classList.remove("block");
    }
  });

  initIcons();
}

// --- MODULE 1: BUSINESS WRITING & TONE STUDIO ---
async function handleRefineWriting() {
  const text = elements.writingInput.value.trim();
  if (!text) {
    showToast("Please enter a draft to refine", "error");
    return;
  }

  const format = elements.writingFormat.value;
  const tone = elements.writingTone.value;
  const audience = elements.writingAudience.value;

  elements.writingEmptyState.classList.add("hidden");
  elements.writingOutputBody.classList.add("hidden");
  elements.writingLoading.classList.remove("hidden");

  const systemPrompt = `You are an elite Executive Business Communication Coach and Chief of Staff.
Your mission is to rewrite rough or informal English drafts into exemplary, polished workplace communications.

Format of Request:
- Goal/Format: ${format}
- Target Tone: ${tone}
- Recipient Seniority: ${audience}

Return your response in STRICT JSON format with no markdown quotes around the JSON, with exactly these three keys:
{
  "refined_text": "The fully polished version ready to send",
  "rationale": [
    "Point 1 explaining why a specific change increases impact or diplomacy",
    "Point 2 explaining tone or structure improvements",
    "Point 3 explaining executive presence or clarity"
  ],
  "vocabulary_upgrades": [
    {"original": "phrase from draft", "upgrade": "executive equivalent"},
    {"original": "another phrase", "upgrade": "executive equivalent"}
  ]
}`;

  try {
    const rawResult = await callGemini(text, systemPrompt, 0.4);
    let parsed;
    try {
      const cleanJson = rawResult.replace(/```json/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = {
        refined_text: rawResult,
        rationale: ["Enhanced professional clarity and removed informal colloquialisms."],
        vocabulary_upgrades: []
      };
    }

    elements.refinedText.textContent = parsed.refined_text;

    // Render rationale points
    elements.writingBreakdown.innerHTML = (parsed.rationale || []).map(r => `
      <div class="flex items-start gap-2">
        <span class="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
        <span class="text-slate-700">${escapeHtml(r)}</span>
      </div>
    `).join("");

    // Render vocabulary upgrades
    if (parsed.vocabulary_upgrades && parsed.vocabulary_upgrades.length > 0) {
      elements.writingVocabBadges.innerHTML = parsed.vocabulary_upgrades.map(v => `
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-indigo-200 text-indigo-900 shadow-xs cursor-pointer hover:bg-indigo-100 transition-colors" title="Click to add to Phrase Vault" onclick="saveQuickVocab('${escapeJs(v.upgrade)}')">
          <span class="line-through text-slate-400 font-normal">${escapeHtml(v.original)}</span>
          <span class="text-indigo-600 font-bold">→</span>
          <span class="font-semibold">${escapeHtml(v.upgrade)}</span>
          <i data-lucide="plus" class="w-3 h-3 text-indigo-500"></i>
        </span>
      `).join("");
      initIcons();
    } else {
      elements.writingVocabBadges.innerHTML = `<span class="text-slate-400 italic">No direct phrase substitutions needed.</span>`;
    }

    elements.writingLoading.classList.add("hidden");
    elements.writingOutputBody.classList.remove("hidden");
    initIcons();
  } catch (err) {
    elements.writingLoading.classList.add("hidden");
    elements.writingEmptyState.classList.remove("hidden");
    showToast(`Refinement failed: ${err.message}`, "error");
  }
}

function handleSaveWritingToVault() {
  const text = elements.refinedText.innerText.trim();
  if (!text) return;
  const snippet = text.length > 90 ? text.substring(0, 90) + "..." : text;
  saveNewPhrase(snippet, "executive", "Refined sentence from Writing Studio", text);
  showToast("Saved to Phrase Vault!", "success");
}

window.saveQuickVocab = function(phrase) {
  saveNewPhrase(phrase, "executive", "Vocabulary upgrade from writing studio", phrase);
  showToast(`Added "${phrase}" to Phrase Vault!`, "success");
};

// --- MODULE 2: VOICE ROLEPLAY & SCENARIO ARENA ---
function initRoleplayScenario(scenarioKey) {
  state.activeScenarioKey = scenarioKey;
  const scenario = SCENARIOS[scenarioKey];
  if (!scenario) return;

  elements.roleplayPartnerName.textContent = scenario.partnerName;
  elements.roleplayPartnerRole.textContent = `Persona: ${scenario.partnerRole}`;
  elements.roleplayPartnerAvatar.textContent = scenario.avatar;

  state.roleplayHistory = [
    {
      role: "model",
      parts: [{ text: scenario.initialMessage }]
    }
  ];

  renderRoleplayMessages();
  elements.endRoleplayDebriefBtn.classList.add("hidden");
  elements.roleplayDebriefCard.classList.add("hidden");

  // Read aloud first greeting if enabled
  if (elements.voiceResponseToggle.checked) {
    setTimeout(() => speakText(scenario.initialMessage), 400);
  }
}

function renderRoleplayMessages() {
  const scenario = SCENARIOS[state.activeScenarioKey];
  elements.roleplayChatBox.innerHTML = state.roleplayHistory.map(msg => {
    const isModel = msg.role === "model";
    const text = msg.parts[0].text;
    if (isModel) {
      return `
        <div class="flex items-start gap-3 max-w-xl">
          <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            ${scenario.avatar}
          </div>
          <div class="bg-slate-100 p-3.5 rounded-2xl rounded-tl-sm text-sm text-slate-800 leading-relaxed shadow-xs">
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-[11px] font-bold text-indigo-900">${scenario.partnerName}</span>
              <button onclick="speakText('${escapeJs(text)}')" title="Listen" class="text-slate-400 hover:text-indigo-600">
                <i data-lucide="volume-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
            <p>${escapeHtml(text)}</p>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="flex items-start gap-3 max-w-xl ml-auto justify-end">
          <div class="bg-indigo-600 text-white p-3.5 rounded-2xl rounded-tr-sm text-sm leading-relaxed shadow-xs">
            <span class="text-[11px] font-semibold text-indigo-200 block mb-1">You</span>
            <p>${escapeHtml(text)}</p>
          </div>
          <div class="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
            You
          </div>
        </div>
      `;
    }
  }).join("");

  elements.roleplayChatBox.scrollTop = elements.roleplayChatBox.scrollHeight;
  initIcons();
}

async function handleSendRoleplayMessage() {
  const text = elements.roleplayInputText.value.trim();
  if (!text) return;

  elements.roleplayInputText.value = "";

  // Append user message to history
  state.roleplayHistory.push({
    role: "user",
    parts: [{ text: text }]
  });

  renderRoleplayMessages();
  elements.endRoleplayDebriefBtn.classList.remove("hidden");

  // Show partner typing indicator
  const typingId = "roleplay-typing-bubble";
  const scenario = SCENARIOS[state.activeScenarioKey];
  const typingBubble = document.createElement("div");
  typingBubble.id = typingId;
  typingBubble.className = "flex items-start gap-3 max-w-xl";
  typingBubble.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
      ${scenario.avatar}
    </div>
    <div class="bg-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm text-xs text-slate-500 flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.15s"></span>
      <span class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style="animation-delay: 0.3s"></span>
    </div>
  `;
  elements.roleplayChatBox.appendChild(typingBubble);
  elements.roleplayChatBox.scrollTop = elements.roleplayChatBox.scrollHeight;

  try {
    const aiReply = await callGeminiChat(state.roleplayHistory, scenario.systemPrompt);
    document.getElementById(typingId)?.remove();

    state.roleplayHistory.push({
      role: "model",
      parts: [{ text: aiReply }]
    });

    renderRoleplayMessages();

    if (elements.voiceResponseToggle.checked) {
      speakText(aiReply);
    }
  } catch (err) {
    document.getElementById(typingId)?.remove();
    showToast(`Error: ${err.message}`, "error");
  }
}

// Roleplay Speech Recognition
let roleplaySpeechRecognizer = null;
function toggleRoleplayMic() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Web Speech Recognition is not supported by your browser. Please use Chrome, Safari or Edge.", "error");
    return;
  }

  if (state.isListeningRoleplay) {
    roleplaySpeechRecognizer?.stop();
    return;
  }

  try {
    roleplaySpeechRecognizer = new SpeechRecognition();
    roleplaySpeechRecognizer.continuous = false;
    roleplaySpeechRecognizer.interimResults = true;
    roleplaySpeechRecognizer.lang = "en-US";

    roleplaySpeechRecognizer.onstart = () => {
      state.isListeningRoleplay = true;
      elements.recordingIndicator.classList.remove("hidden");
      elements.roleplayMicBtn.classList.replace("bg-slate-900", "bg-red-600");
    };

    roleplaySpeechRecognizer.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      elements.roleplayInputText.value = transcript;
    };

    roleplaySpeechRecognizer.onerror = (e) => {
      console.warn("Speech error:", e.error);
      stopRoleplayListening();
    };

    roleplaySpeechRecognizer.onend = () => {
      stopRoleplayListening();
      if (elements.roleplayInputText.value.trim().length > 0) {
        handleSendRoleplayMessage();
      }
    };

    roleplaySpeechRecognizer.start();
  } catch (err) {
    showToast(`Mic initialization error: ${err.message}`, "error");
    stopRoleplayListening();
  }
}

function stopRoleplayListening() {
  state.isListeningRoleplay = false;
  elements.recordingIndicator.classList.add("hidden");
  elements.roleplayMicBtn.classList.replace("bg-red-600", "bg-slate-900");
}

async function handleGenerateRoleplayDebrief() {
  const scenario = SCENARIOS[state.activeScenarioKey];
  elements.roleplayDebriefCard.classList.remove("hidden");
  elements.roleplayDebriefContent.innerHTML = `
    <div class="flex items-center gap-3 py-6 justify-center text-slate-500">
      <div class="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      <span>Compiling your executive communication debrief...</span>
    </div>
  `;
  elements.roleplayDebriefCard.scrollIntoView({ behavior: "smooth" });

  const conversationTranscript = state.roleplayHistory.map(m => `${m.role.toUpperCase()}: ${m.parts[0].text}`).join("\n");

  const prompt = `Review this mock workplace dialogue for the scenario "${scenario.partnerName} (${scenario.partnerRole})".
Provide an executive communication debrief covering:
1. Overall Performance Score (out of 10) and executive summary.
2. Strengths: What the user did well (diplomacy, boundary setting, poise).
3. Areas for Growth: Specific weak phrases and how to phrase them better with corporate idioms.
4. Optimal Alternate Script: Write 1 or 2 high-impact phrases they should have used instead.

Conversation Transcript:
${conversationTranscript}
`;

  try {
    const debrief = await callGemini(prompt, "You are a Fortune 500 Executive Speech & Negotiation Coach.", 0.3);
    elements.roleplayDebriefContent.innerHTML = formatMarkdownText(debrief);
  } catch (err) {
    elements.roleplayDebriefContent.innerHTML = `<p class="text-rose-600">Failed to generate debrief: ${err.message}</p>`;
  }
}

// --- MODULE 3: SPEECH DIAGNOSTICS & PITCH COACH ---
let pitchSpeechRecognizer = null;
const FILLER_WORDS = ["um", "uh", "you know", "like", "actually", "basically", "sort of", "kind of", "literally"];

function togglePitchRecording() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast("Speech Recognition requires Chrome, Safari, or Edge.", "error");
    return;
  }

  if (state.isListeningPitch) {
    stopPitchDrill();
  } else {
    startPitchDrill(SpeechRecognition);
  }
}

function startPitchDrill(SpeechRecognition) {
  state.isListeningPitch = true;
  state.pitchStartTime = Date.now();
  state.pitchTranscriptText = "";
  elements.speechLiveTranscript.innerHTML = `<span class="text-indigo-600 animate-pulse font-medium">Recording and listening... Speak clearly!</span>`;
  elements.togglePitchRecordBtn.classList.replace("bg-red-600", "bg-slate-900");
  elements.pitchRecordBtnText.textContent = "Stop Recording";

  // Reset counters
  elements.fillerWordCount.textContent = "0";
  elements.wpmCounter.textContent = "--";
  elements.speechWordCount.textContent = "0 words";

  // Start timer interval
  elements.pitchTimerInterval = setInterval(updatePitchTimer, 500);

  pitchSpeechRecognizer = new SpeechRecognition();
  pitchSpeechRecognizer.continuous = true;
  pitchSpeechRecognizer.interimResults = true;
  pitchSpeechRecognizer.lang = "en-US";

  pitchSpeechRecognizer.onresult = (event) => {
    let interim = "";
    let final = "";
    for (let i = 0; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        final += event.results[i][0].transcript + " ";
      } else {
        interim += event.results[i][0].transcript;
      }
    }

    state.pitchTranscriptText = (final + " " + interim).trim();
    elements.speechLiveTranscript.textContent = state.pitchTranscriptText || "Listening...";

    // Analyze fillers & word counts live
    analyzeRealtimeSpeech(state.pitchTranscriptText);
  };

  pitchSpeechRecognizer.onerror = (e) => {
    console.warn("Pitch speech error:", e.error);
  };

  pitchSpeechRecognizer.start();
}

function stopPitchDrill() {
  state.isListeningPitch = false;
  clearInterval(elements.pitchTimerInterval);
  pitchSpeechRecognizer?.stop();
  elements.togglePitchRecordBtn.classList.replace("bg-slate-900", "bg-red-600");
  elements.pitchRecordBtnText.textContent = "Start Speaking Drill";
  showToast("Recording finished. Click 'Analyze Pitch with Gemini'!", "info");
}

function updatePitchTimer() {
  if (!state.pitchStartTime) return;
  const elapsedSecs = Math.floor((Date.now() - state.pitchStartTime) / 1000);
  const mins = String(Math.floor(elapsedSecs / 60)).padStart(2, "0");
  const secs = String(elapsedSecs % 60).padStart(2, "0");
  elements.pitchTimer.textContent = `${mins}:${secs}`;

  // Update WPM
  if (elapsedSecs > 3) {
    const words = state.pitchTranscriptText.trim().split(/\s+/).filter(Boolean).length;
    const wpm = Math.round((words / elapsedSecs) * 60);
    elements.wpmCounter.textContent = String(wpm);
  }
}

function analyzeRealtimeSpeech(text) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  elements.speechWordCount.textContent = `${words.length} words`;

  let fillerCount = 0;
  const lowerText = text.toLowerCase();
  FILLER_WORDS.forEach(filler => {
    const regex = new RegExp(`\\b${filler}\\b`, "g");
    const matches = lowerText.match(regex);
    if (matches) fillerCount += matches.length;
  });

  elements.fillerWordCount.textContent = String(fillerCount);
}

async function handleAnalyzePitch() {
  const text = state.pitchTranscriptText.trim();
  if (!text || text.length < 15) {
    showToast("Please record a spoken response of at least 1-2 sentences first.", "error");
    return;
  }

  elements.pitchCritiqueCard.classList.remove("hidden");
  elements.pitchCritiqueBody.innerHTML = `
    <div class="flex items-center gap-3 py-6 justify-center text-slate-500">
      <div class="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      <span>Analyzing speech structure, filler words, and impact...</span>
    </div>
  `;
  elements.pitchCritiqueCard.scrollIntoView({ behavior: "smooth" });

  const prompt = `Critique this spoken elevator pitch/response for prompt: ${elements.activeDrillPrompt.textContent}
User's Spoken Transcript:
"${text}"

Provide a structured coaching breakdown:
1. Delivery & Structure: Did they follow a clean framework (e.g., PREP: Point, Reason, Example, Point)?
2. Conciseness & Filler Words: Note any hesitation or rambling patterns.
3. Power Vocabulary: Identify 2-3 higher-impact corporate verbs or idioms to replace weak phrases.
4. The Executive Polished Version: Provide an exemplary version that can be delivered smoothly in under 45 seconds.`;

  try {
    const critique = await callGemini(prompt, "You are a TEDx Speaker Coach and Executive Presence Consultant.", 0.4);
    elements.pitchCritiqueBody.innerHTML = formatMarkdownText(critique);
  } catch (err) {
    elements.pitchCritiqueBody.innerHTML = `<p class="text-rose-600">Critique failed: ${err.message}</p>`;
  }
}

// --- MODULE 4: PHRASEBOOK VAULT ---
function renderPhraseGrid(category = "all") {
  const filtered = category === "all" ?
    state.phrases :
    state.phrases.filter(p => p.category === category);

  elements.phraseCardsGrid.innerHTML = filtered.map(p => `
    <div class="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all p-4 flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryBadgeClass(p.category)}">
            ${p.category}
          </span>
          <button onclick="speakText('${escapeJs(p.phrase)}')" title="Listen to pronunciation" class="text-slate-400 hover:text-indigo-600 p-1 rounded-md hover:bg-slate-50">
            <i data-lucide="volume-2" class="w-4 h-4"></i>
          </button>
        </div>
        <h4 class="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">${escapeHtml(p.phrase)}</h4>
        <p class="text-xs text-slate-500 mt-1.5 leading-relaxed">${escapeHtml(p.meaning)}</p>
      </div>

      <div class="mt-3 pt-3 border-t border-slate-100">
        <span class="text-[11px] font-semibold text-slate-400 block mb-1">Example in context:</span>
        <p class="text-xs text-slate-700 italic bg-slate-50 p-2 rounded-lg border border-slate-100 font-sans">
          "${escapeHtml(p.example || p.phrase)}"
        </p>
      </div>
    </div>
  `).join("");

  initIcons();
}

function getCategoryBadgeClass(cat) {
  switch (cat) {
    case "pushback": return "bg-rose-50 text-rose-700 border border-rose-200";
    case "executive": return "bg-indigo-50 text-indigo-700 border border-indigo-200";
    case "transitions": return "bg-amber-50 text-amber-700 border border-amber-200";
    case "negotiation": return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    default: return "bg-slate-100 text-slate-700";
  }
}

function saveNewPhrase(phrase, category, meaning, example) {
  const newObj = {
    id: "p_" + Date.now(),
    phrase,
    category,
    meaning,
    example
  };
  state.phrases.unshift(newObj);
  localStorage.setItem("fluent_phrases", JSON.stringify(state.phrases));
  renderPhraseGrid("all");
}

function handleAddCustomPhrase() {
  const phrase = prompt("Enter the business expression or idiom:");
  if (!phrase) return;
  const meaning = prompt("Enter when/why to use this expression:") || "General business communication";
  const example = prompt("Enter an example sentence:") || phrase;
  saveNewPhrase(phrase, "executive", meaning, example);
  showToast("Phrase added to vault!", "success");
}

// --- UTILITIES ---
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeJs(str) {
  return String(str || "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");
}

function formatMarkdownText(markdown) {
  return String(markdown)
    .replace(/^### (.*$)/gim, '<h4 class="text-sm font-bold text-slate-900 mt-3 mb-1">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-base font-bold text-slate-900 mt-4 mb-2">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-lg font-bold text-slate-900 mt-5 mb-2">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/^\- (.*$)/gim, '<li class="ml-4 list-disc text-slate-700">$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal text-slate-700 font-medium">$1</li>')
    .replace(/\n\n/g, '<div class="h-2"></div>');
}
