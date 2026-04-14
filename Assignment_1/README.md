
# Campus Companion App

## Overview

This is a simple React Native (Expo) app that acts as a small "Campus Companion" for students. It includes:

- A Home screen with quick navigation cards.
- A Contacts section listing key college offices with a detail screen.
- A Schedule tab showing your timetable (static for now).
- A Profile tab displaying basic student information.

The UI uses a bottom tab navigator with a glass-style tab bar and vector icons from `@expo/vector-icons`.

## Installation & Running the App

Prerequisites:
- Node.js and npm installed.
- Expo CLI (optional but recommended): `npm install -g expo-cli`.

Steps:
1. Install dependencies:
	```bash
	npm install
	```
2. Start the development server (Expo):
	```bash
	npm start
	```
	This will open Expo Dev Tools in the browser. From there you can:
	- Run the app on an iOS/Android simulator, or
	- Scan the QR code with the Expo Go app on your device.

## Known Issues / Limitations

- All data (contacts, schedule, profile) is static and stored locally; there is no backend or authentication.
- Some layouts and styles have been optimized primarily for mobile phone screen sizes.
- The app assumes an Expo-managed workflow; running it in a bare React Native project may require extra configuration (e.g., for vector icons).

