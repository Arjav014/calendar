# Interactive Web Calendar

Welcome to the Interactive Calendar! This project is a minimalist, modern, and highly responsive web calendar built to replicate the tactile feel of an editorial stationary planner.

## 🎨 The Aesthetic Choices

When I set out to build this, I wanted to stay away from the neon, glowing, and "cyber-tech" aesthetics that overly saturated modern web applications. 

Instead, I focused intensely on a **Warm Editorial Stationery** vibe:
- **Typography:** I leaned heavily into using **Playfair Display** for our elegant hero headings and **DM Sans** for rigorous, legible grid structures. 
- **The Color Palette:** The interface is unified by earthy, matte tones—think terracotta, sage green, cool stone grey, and an off-white ivory surface. 
- **Seasonal Visuals:** The left-hand panel dynamically adapts to the current month. Using generated raster illustrations blending directly into the parent container via `mix-blend-multiply`, the calendar gives you a tactile, shifting environment without losing typographic legibility.

## ✨ Core Features

1. **Fluid Date Range Selection:** Selecting a start and end date is completely seamless, natively tracking your hover previews, handling single-day choices, and gracefully rolling over weekends.
2. **Animated Mechanics:** Everything—from the background image transitions to the date cell clicking mechanics—are animated cleanly through `framer-motion`, giving physical "weight" to interacting with the component.
3. **Monthly Notes & Memos:** Rather than setting up a massive local database framework, I built a bespoke contextual Note ecosystem. A note is specifically written, saved, tracked, and natively restored directly out of your browser's Local Storage on a *per month* basis. You can click any previously saved note block on the side panel to instantly warp back and highlight the matching calendar dates.
4. **Complete Responsiveness:** The two-panel split grid flawlessly transforms into a deeply scrollable stacked stack for mobile users.

## 🛠 Tech Stack

- **Next.js (App Router)** - The infrastructural backbone and optimal SSR engine.
- **TypeScript** - Enforcing robust state and type-safety mechanisms across our bespoke hooks.
- **Tailwind CSS v4** - Fast and composable utility class systems.
- **Date-fns** - Lightweight, immutability-safe date calculation logic.
- **Framer Motion** - Handling all the liquid smooth animation structures.

## 🚀 How to Run Locally

If you want to view the calendar environment firsthand, you can easily launch it natively:

1. **Install Dependencies**
   First, make sure Node.js is installed. In the root of the file directory, run:
   ```bash
   npm install
   ```

2. **Launch the Development Server**
   ```bash
   npm run dev
   ```

3. **Explore**
   Navigate to `http://localhost:3000` via your browser. You can click on any dates to experiment with range highlighting and memo writing! You can also use your keyboard's left and right arrow keys to easily jump around months.
