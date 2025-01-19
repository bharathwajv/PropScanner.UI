# Project Configuration Guide

## Configuration Files Overview

### 1. next.config.mjs
- Main configuration file for Next.js
- Controls build-time and runtime configuration
- Key settings:
  - `eslint`: Controls ESLint behavior during builds
  - `typescript`: Controls TypeScript error checking
  - `images`: Controls image optimization
  - `experimental`: Enables experimental Next.js features

### 2. tailwind.config.ts
- Configuration file for Tailwind CSS
- Defines:
  - Theme customization (colors, fonts, spacing, etc.)
  - Content paths for scanning classes
  - Plugins and extensions
  - Dark mode strategy
  - Custom utilities

### 3. postcss.config.mjs
- PostCSS configuration file
- Manages CSS processing plugins
- Tailwind CSS runs as a PostCSS plugin
- Processes and optimizes CSS during build

### 4. tsconfig.json
- TypeScript configuration file
- Controls TypeScript compiler options
- Defines:
  - Module resolution strategy
  - Target JavaScript version
  - Path aliases (e.g., @/components)
  - Type checking rules

### 5. components.json
- shadcn/ui configuration file
- Defines:
  - Component styling preferences
  - Path aliases for components
  - CSS configuration
  - Icon library settings

### 6. package.json
- Node.js project configuration
- Lists:
  - Project dependencies
  - Development dependencies
  - Scripts for development, building, etc.
  - Project metadata 