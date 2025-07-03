# David P. Donohue Portfolio

A minimalist, stormy oceanic-themed personal portfolio website showcasing professional accomplishments, projects, and personal interests.

## 🌊 Design Philosophy

This portfolio implements a modern, single-page application (SPA) architecture with a focus on:
- Minimalist oceanic design theme
- Smooth animations and transitions
- Dynamic content loading
- Responsive layout
- Accessibility and performance

### Key Design Features
- Stormy ocean backdrop with semi-transparent overlays
- Smooth scrolling between sections
- Multi-language welcome animations
- Modal-based content presentation
- Gradient wave effects for highlighted elements

## 🏗 Architecture

### Frontend Structure
root/
├── index.html # Landing/splash page
├── main.html # Main portfolio content
├── style.css # Styling and animations
├── script.js # Interactive functionality
├── content.json # Content management
└── assets/
└── hero-ocean-storm.png


### Technical Implementation

#### 1. Content Management
- Utilizes a decoupled `content.json` for easy content updates
- Structured data organization for maintainability
- Dynamic content loading via fetch API

#### 2. Styling Architecture
- Modular CSS organization:
  - Global styles & resets
  - Animations
  - Page-specific styles
  - Shared components
  - Modal styles
  - Media queries
- CSS custom properties for theme consistency
- Mobile-first responsive design

#### 3. JavaScript Architecture
- Modular function organization
- Asynchronous content loading
- Event delegation for performance
- Intersection Observer for scroll effects
- Error handling and fallbacks

## ✨ Features

### Multi-language Welcome
- Rotating welcome message in multiple languages
- Custom animations for text transitions
- Configurable animation pool

### Modal System
- Dynamic content loading
- Scroll position tracking
- Fade effects and animations
- Mobile-optimized layout
- Keyboard navigation support (Escape key)

### Navigation
- Smooth scroll implementation
- Active section highlighting
- Fixed header with blur effect
- Mobile-responsive menu

### Projects Grid
- Dynamic project card generation
- Gradient wave effects
- External link handling
- Responsive grid layout

### Favorites System
- Categorized display
- Dynamic content generation
- Responsive layout
- Clean data structure

## 🛠 Technical Details

### Performance Optimizations
- Lazy loading of modal content
- Optimized animation performance
- Efficient event handling
- Debounced scroll handlers
- Cached DOM queries

### Browser Compatibility
- Modern CSS features with fallbacks
- Cross-browser animation support
- Mobile-first responsive design
- Touch event handling

### Accessibility
- Semantic HTML structure
- ARIA attributes for dynamic content
- Keyboard navigation support
- Screen reader considerations

📄 License
© 2025 David P. Donohue. All rights reserved.
