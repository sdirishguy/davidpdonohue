# David P. Donohue - Personal Portfolio

A modern, interactive personal portfolio website showcasing professional expertise in full-stack web development, healthcare IT, implementation management, and cybersecurity. Built with Next.js 15 and TypeScript, featuring a sophisticated terminal-inspired interface with smooth animations and responsive design.

## 🚀 Features

### Interactive Terminal Interface
- **Animated Terminal Typing**: Dynamic text animations with customizable typing speed and content
- **Terminal Header**: Authentic terminal window styling with path display and control buttons
- **Multilingual Greetings**: Personalized welcome messages across different sections
- **Skip/Replay Controls**: User-friendly animation controls for better UX

### Responsive Design & Navigation
- **Translucent Navigation**: Fixed header with backdrop blur and smooth scroll highlighting
- **Mobile-First Design**: Fully responsive layout optimized for all devices
- **Smooth Scrolling**: Intuitive navigation with section highlighting
- **Modern UI Components**: Reusable Card, Button, Badge, and Typography components

### Content Sections
- **Hero Section**: Terminal-style introduction with animated greetings
- **About Section**: Interactive personal stories with expandable content and favorites
- **Professional Section**: Comprehensive work experience, skills, and certifications
- **Projects Section**: Featured projects with GitHub links and technology badges
- **Content Library**: Curated articles, videos, and learning resources
- **Contact Section**: Multiple contact methods with copy-to-clipboard functionality

### Advanced Features
- **TypeScript Integration**: Full type safety and enhanced developer experience
- **Framer Motion Animations**: Smooth page transitions and micro-interactions
- **Error Boundaries**: Graceful error handling with fallback UI
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance Optimized**: Static export with optimized images and code splitting

## 🛠️ Technologies

### Frontend Framework
- **Next.js 15.4.4**: React framework with App Router and static export
- **React 19.1.0**: Latest React with concurrent features
- **TypeScript 5**: Full type safety and enhanced DX

### Styling & UI
- **Tailwind CSS 4**: Utility-first CSS framework with custom design system
- **Framer Motion 12.23.9**: Advanced animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **React Icons**: Comprehensive icon library

### Development Tools
- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting and consistency
- **Jest**: Unit testing with React Testing Library
- **Playwright**: End-to-end testing
- **Audit CI**: Security vulnerability scanning

### Deployment & Infrastructure
- **Static Export**: Optimized for static hosting
- **Nginx Configuration**: Production-ready server setup
- **GitHub Actions**: CI/CD pipeline with automated testing

## 🎨 Design System

### Color Palette
- **Primary Navy**: `#0B1426` - Deep background color
- **Primary Blue**: `#22D3EE` - Accent and interactive elements
- **Primary Magenta**: `#EC4899` - Highlights and CTAs
- **Primary Sunset Orange**: `#FD5E53` - Warm accents
- **Primary Yellow**: `#FFEB3B` - Attention and warnings

### Typography
- **Monospace Font**: Terminal-style text for code and terminal elements
- **System Fonts**: Arial/Helvetica for body text
- **Responsive Typography**: Scalable text sizes across devices

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── projects/          # Projects page
│   ├── professional/      # Professional experience page
│   ├── content/           # Content library page
│   ├── contact/           # Contact page
│   └── globals.css        # Global styles and design tokens
├── components/            # Reusable React components
│   ├── ui/               # Base UI components (Button, Card, etc.)
│   ├── sections/         # Page-specific section components
│   └── layout/           # Layout components (Header, Navigation, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
├── types/                # TypeScript type definitions
└── __tests__/            # Test files
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/personal-portfolio.git
cd personal-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format code with Prettier
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
npm run test:coverage # Run tests with coverage
npm run audit        # Check for security vulnerabilities
```

## 🧪 Testing

The project includes comprehensive testing with:
- **Unit Tests**: Jest + React Testing Library for component testing
- **E2E Tests**: Playwright for full user journey testing
- **Coverage Reporting**: Detailed test coverage analysis
- **CI Integration**: Automated testing in GitHub Actions

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Bundle Size**: Optimized with code splitting and tree shaking
- **Image Optimization**: Next.js Image component with WebP support

## 🔒 Security

- **Security Headers**: Comprehensive security headers configuration
- **Content Security Policy**: Strict CSP implementation
- **Dependency Scanning**: Regular security audits with audit-ci
- **HTTPS Only**: Secure connections enforced

## 📈 Analytics & Monitoring

- **Google Analytics**: Visitor insights and engagement tracking
- **Error Tracking**: Comprehensive error boundary implementation
- **Performance Monitoring**: Real user monitoring capabilities

## 🚀 Deployment

The site is optimized for static hosting and can be deployed to:
- **Vercel**: Zero-config deployment
- **Netlify**: Static site hosting
- **GitHub Pages**: Free hosting for open source projects
- **AWS S3 + CloudFront**: Enterprise-grade hosting

## 📝 License

This project is licensed under the Creative Commons Attribution 4.0 International License - see the [LICENSE](LICENSE) file for details.

**What this means:**
- ✅ **Share** — Copy and redistribute the material in any medium or format
- ✅ **Adapt** — Remix, transform, and build upon the material for any purpose, even commercially
- 📝 **Attribution** — You must give appropriate credit to David Donohue and provide a link to the license

This license ensures that while others can learn from and use your portfolio code, you'll always receive proper attribution for your work.

## 🤝 Contributing

While this is a personal portfolio, contributions and feedback are welcome! Please feel free to:
- Report bugs or issues
- Suggest improvements
- Submit pull requests for fixes

## 📞 Contact

- **Email**: david@davidpdonohue.com
- **LinkedIn**: [David Patrick Donohue](https://www.linkedin.com/in/davidpatrickdonohue)
- **GitHub**: [sdirishguy](https://www.github.com/sdirishguy)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS
