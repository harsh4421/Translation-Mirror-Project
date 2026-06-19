# 🎙 Web Speech API Intermittent Translation Mirror

A production-ready, frontend-only speech recognition and real-time translation platform built with React + Vite + TypeScript.

No backend. No cloud API keys. Everything runs in the browser.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎤 Web Speech API | Continuous/interim speech recognition |
| 🌐 Client-side Translation | 200+ word dictionary (EN→HI/FR/ES/DE) |
| 📊 Confidence Tracker | Green/Yellow/Red confidence bands with sparkline graph |
| 📡 Telemetry HUD | 8 animated real-time metric cards |
| 📜 Split-screen Mirror | Live transcription + translated mirror side-by-side |
| 💾 LocalStorage Persistence | Auto-saves transcript, translations, preferences |
| 📤 Export System | Download as `.md`, `.txt`, or `.json` |
| 🎨 Dark/Light Mode | Glassmorphism SaaS design |
| 📖 Custom Dictionary | Add your own word translations |
| 🔍 History Search | Filter by date, word, or language |
| 📈 Session Analytics | Word frequency, average confidence, session duration |

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:5173](http://localhost:5173) in **Chrome** or **Edge** (Web Speech API is not available in Firefox or Safari).

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Space` | Toggle Start/Stop Listening |

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── speech/
│   │   └── LiveStreamTranscriptionPanel.tsx   # Left panel: transcript history + interim
│   ├── translation/
│   │   └── TranslatedMirrorViewPanel.tsx      # Right panel: translated output
│   ├── telemetry/
│   │   ├── TelemetryHUD.tsx                    # Bottom metrics dashboard
│   │   ├── ConfidenceGraph.tsx                 # SVG sparkline chart
│   │   └── WaveformAnimation.tsx               # Canvas waveform
│   └── common/
│       ├── ActionStrip.tsx                     # Start/Stop/Download/Clear buttons
│       ├── LanguageConsole.tsx                 # Language & settings config
│       ├── ThemeSwitcher.tsx                   # Dark/Light toggle
│       ├── ToastNotification.tsx               # Animated toast system
│       ├── UserDictionary.tsx                  # Custom word dictionary
│       ├── SessionAnalytics.tsx                # Session stats
│       ├── HistorySearch.tsx                   # Translation history search
│       └── ErrorBoundary.tsx                   # Global error boundary
├── pages/
│   └── Dashboard.tsx                           # Main layout
├── store/
│   └── speechStore.ts                          # Zustand store
├── hooks/
│   ├── useSpeechRecognition.ts                 # Web Speech API hook
│   └── useTranslationEngine.ts                 # Translation engine hook
├── services/
│   ├── dictionaryService.ts                    # 200+ word dictionary
│   ├── localStorageService.ts                  # Persistence layer
│   └── exportService.ts                        # Export utilities
├── utils/
│   ├── tokenizer.ts                            # Text tokenization
│   └── confidenceAnalyzer.ts                  # Confidence classification
└── types/
    └── index.ts                                # All TypeScript interfaces
```

---

## 🌍 Supported Languages

### Speech Recognition (Source)
- 🇺🇸 English (en-US)
- 🇮🇳 Hindi (hi-IN)
- 🇫🇷 French (fr-FR)
- 🇪🇸 Spanish (es-ES)
- 🇩🇪 German (de-DE)

### Translation (Target)
- 🇬🇧 English
- 🇮🇳 Hindi
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇩🇪 German

---

## 🏗 Adding New Languages

1. Add a new `TargetLanguage` type in `src/types/index.ts`
2. Add entries in `src/services/dictionaryService.ts` using the new language key
3. Add the language option to `TARGET_LANGUAGES` array in `src/types/index.ts`

---

## 🔒 Browser Requirements

- **Chrome** 33+ or **Edge** 79+ (Web Speech API required)
- Microphone permission must be granted
- HTTPS required in production (HTTP works on localhost)

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#0f172a` |
| Card | `#1e293b` |
| Accent | `#3b82f6` |
| Success | `#22c55e` |
| Warning | `#f59e0b` |
| Error | `#ef4444` |
| Font | Times New Roman (transcript), Inter (UI) |

---

## 📦 Tech Stack

- **React 18** + **TypeScript 5**
- **Vite 5** (build tool)
- **Zustand 4** (state management with selectors)
- **Tailwind CSS 3** (utility-first styling)
- **Framer Motion 11** (animations)
- **Lucide React** (icons)
- **FileSaver.js** (export downloads)
- **Web Speech API** (native browser speech recognition)

---

## 🧠 Architecture Notes

- All state is managed via Zustand with `subscribeWithSelector` middleware
- Translation engine is a React hook that reactively translates new finalized transcript items
- LocalStorage service rehydrates Date objects automatically on load
- Confidence history is capped at 50 points for performance
- Transcript/translation history is capped at 100 items in localStorage
