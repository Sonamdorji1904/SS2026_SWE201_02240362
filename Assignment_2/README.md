# FitnessTracker — SWE201 Assignment 2

A beginner-friendly Fitness Tracker app built with **Expo SDK 54**, **React Native**, and **TypeScript**.

---

## 📁 Folder Structure

```
FitnessTracker/
├── App.tsx                        ← Entry point
├── app.json                       ← Expo config
├── package.json
├── tsconfig.json
├── babel.config.js
└── src/
    ├── data/
    │   └── workouts.ts            ← Static workout data & types
    ├── components/
    │   ├── WorkoutCard.tsx        ← Reusable card component
    │   └── StatBox.tsx            ← Reusable stat display
    ├── screens/
    │   ├── HomeScreen.tsx         ← Daily summary + suggested workouts
    │   ├── CategoryScreen.tsx     ← Filterable workout list
    │   ├── DetailScreen.tsx       ← Workout detail + start button
    │   ├── ProfileScreen.tsx      ← User info + settings toggles
    │   └── AnimationDemoScreen.tsx← Animation & gesture demos
    └── navigation/
        └── AppNavigator.tsx       ← Stack + Bottom Tab navigation
```

---

## Setup & Run

### Step 1 — Install dependencies

```bash
cd FitnessTracker
npm install
```

### Step 2 — Start the development server

```bash
npx expo start
```

### Step 3 — Run on a device

- **Physical device**: Install the [Expo Go](https://expo.dev/go) app, scan the QR code
- **Android emulator**: Press `a` in the terminal
- **iOS simulator**: Press `i` in the terminal (Mac only)

---

## Assignment Requirements Checklist

### Screens (5 required)
| Screen | File | Description |
|--------|------|-------------|
| Home | `HomeScreen.tsx` | Daily stats summary + suggested workouts |
| Category/Menu | `CategoryScreen.tsx` | Filter & browse all workout types |
| Detail | `DetailScreen.tsx` | Full workout details + step-by-step guide |
| Profile/Settings | `ProfileScreen.tsx` | User info + settings toggles |
| Animation Demo | `AnimationDemoScreen.tsx` | All animations & gestures demonstrated |

### Navigation
- **Stack Navigator** — wraps all screens (Detail & AnimationDemo pushed on top)
- **Bottom Tab Navigator** — Home, Workouts, Profile tabs

### Animations (2+ required, we have 3)
| # | Type | Where | How |
|---|------|--------|-----|
| 1 | **Fade In** | HomeScreen (on mount) + AnimationDemo | `Animated.timing` on opacity |
| 2 | **Scale/Bounce** | DetailScreen (hero card on mount) + AnimationDemo | `Animated.spring` on scale |
| 3 | **Repeating Pulse** | AnimationDemoScreen | `Animated.loop` with sequence |

### Gestures (1+ required)
- **Long Press** — DetailScreen "Start Workout" button (hold 600ms → Alert)
- **Long Press** — AnimationDemoScreen "Hold Me" button

### Reusable Components (1+ required)
- `WorkoutCard` — used on HomeScreen and CategoryScreen
- `StatBox` — used on HomeScreen and ProfileScreen

### State & Props
- `useState` used across all screens
- Props passed to `WorkoutCard` (workout, onPress) and `StatBox` (label, value, unit, color)
- Route params used to pass workout data from Category → Detail

### Constraints
- Expo SDK 54
- TypeScript (.tsx files throughout)
- No backend, no API, no database
- Only Expo-compatible libraries
- Simple and readable code with comments

---

## Libraries Used

| Library | Version | Purpose |
|---------|---------|---------|
| expo | ~54.0.0 | Core SDK |
| react-native | 0.76.3 | UI framework |
| @react-navigation/native | ^6.1 | Navigation container |
| @react-navigation/native-stack | ^6.11 | Stack navigator |
| @react-navigation/bottom-tabs | ^6.6 | Tab navigator |
| react-native-screens | ~4.4 | Navigation dependency |
| react-native-safe-area-context | 4.12 | Safe area handling |

---

## Key Concepts Used

- `useState` — component state (filters, toggle switches, animation states)
- `useEffect` — run animations when screen mounts
- `useRef` — hold `Animated.Value` without causing re-renders
- `Animated.timing` — smooth opacity/position transitions
- `Animated.spring` — physics-based scale bounce
- `Animated.loop` + `Animated.sequence` — repeating animations
- `onLongPress` + `delayLongPress` — gesture recognition
- `FlatList` — efficient list rendering with key extraction
- Props and TypeScript types — clear data flow between components
