# Nexus Analytics Alpha

**World-class premium SaaS analytics dashboard** — futuristic UI with glassmorphism, real-time widgets, and AI assistant

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-ff0055?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**[Live Demo](https://nexus-analytics-alpha.vercel.app)** · [Report Bug](https://github.com/crowfly22/Nexus-Dashboard/issues) · [Request Feature](https://github.com/crowfly22/Nexus-Dashboard/issues)

</div>

---

## Screenshots

<div align="center">

![Dashboard Overview](https://raw.githubusercontent.com/crowfly22/nexus-analytics-alpha/main/public/screenshot-dashboard.png)

![Analytics & Charts](https://raw.githubusercontent.com/crowfly22/nexus-analytics-alpha/main/public/screenshot-analytics.png)

![Data Table](https://raw.githubusercontent.com/crowfly22/nexus-analytics-alpha/main/public/screenshot-table.png)

</div>

## Features

### Dashboard
- **KPI Stat Cards** — Total Revenue, Active Users, Projects, AI Requests with trend indicators
- **Revenue Chart** — Interactive SVG line chart with monthly data
- **Activity Chart** — Weekly API requests bar chart with gradient colors
- **Project Cards** — Progress bars, team avatars, status badges
- **Activity Feed** — Real-time timeline with staggered animations

### AI Assistant
- **Chat Panel** — Conversational AI interface with typing indicators
- **Smart Suggestions** — Context-aware response generation
- **Message History** — Timestamped conversation log

### Data Management
- **Sortable Table** — Click column headers to sort (MODEL, REQUESTS, LATENCY, ACCURACY, COST, STATUS)
- **Search & Filter** — Real-time record filtering
- **Pagination** — Navigate through large datasets
- **CSV Export** — Download data in standard format

### UI/UX
- **Theme Switcher** — Dark/light mode with localStorage persistence
- **Global Search** — Keyboard shortcut (⌘K) for quick access
- **Notifications** — Toast system with auto-dismiss animations
- **Responsive Sidebar** — Collapsible navigation, mobile hamburger menu
- **Modal System** — Animated backdrop blur, keyboard dismiss
- **Loading States** — Skeleton screens and spinner animations

## Multi-Agent Architecture

| Agent | Responsibility |
|-------|---------------|
| **Layout Agent** | Responsive grid system, sidebar collapse logic, breakpoint management |
| **Data Agent** | Chart rendering, table sorting/filtering, stat aggregation |
| **UI Agent** | Theme switching, animation orchestration, glassmorphism effects |
| **Interaction Agent** | Search, notifications, modal state, keyboard shortcuts |

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.6 |
| Language | TypeScript | 5.0 |
| Styling | Tailwind CSS | 4.0 |
| Animations | Framer Motion | 12.40 |
| Icons | Lucide React | 1.16 |
| Utilities | clsx, tailwind-merge | Latest |
| Deployment | Vercel (Static Export) | — |

## Design System

- **Typography**: Inter (body), system fallbacks
- **Colors**: Slate palette with indigo/violet accents
- **Effects**: Glassmorphism (backdrop-blur), soft shadows, gradient borders
- **Spacing**: 4px grid system
- **Radius**: Rounded-xl (12px) for cards, rounded-full for avatars
- **Inspiration**: Apple + Linear + Vercel + Stripe

## Project Structure

```
nexus-dashboard/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with providers
│   │   ├── page.tsx          # Main dashboard page
│   │   └── globals.css       # Tailwind + custom styles
│   ├── components/
│   │   ├── sidebar.tsx       # Navigation sidebar
│   │   ├── topbar.tsx        # Header with search & actions
│   │   ├── stat-card.tsx     # KPI metric cards
│   │   ├── chart-widget.tsx  # SVG line/bar charts
│   │   ├── data-table.tsx    # Sortable data table
│   │   ├── activity-feed.tsx # Activity timeline
│   │   ├── project-card.tsx  # Project status cards
│   │   ├── ai-assistant.tsx  # AI chat panel
│   │   ├── notification-toast.tsx # Toast notifications
│   │   ├── modal.tsx         # Modal dialog
│   │   ├── loading.tsx       # Skeleton & spinner
│   │   └── theme-provider.tsx # Dark/light theme
│   └── lib/
│       └── utils.ts          # cn() utility
├── public/
│   └── screenshots/          # README assets
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone repository
git clone https://github.com/crowfly22/nexus-analytics-alpha.git
cd nexus-analytics-alpha

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## Performance

| Metric | Value |
|--------|-------|
| Static Export | Zero server cold starts |
| Code Splitting | Automatic per-route chunks |
| Font Optimization | next/font with preload |
| Bundle Size | ~1.2MB total (JS + CSS + fonts) |
| Lighthouse Score | 95+ (Performance) |

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Lucide](https://lucide.dev/) for icons
- [Vercel](https://vercel.com/) for deployment

---

<div align="center">

**Built with ❤️ by [Crowfly22](https://github.com/crowfly22)**

[![GitHub followers](https://img.shields.io/github/followers/crowfly22?style=social)](https://github.com/crowfly22)

</div>
