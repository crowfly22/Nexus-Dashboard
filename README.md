# Nexus Dashboard

**Premium SaaS Analytics Dashboard** — futuristic UI with glassmorphism, real-time widgets, and AI assistant

## Live Demo
**[https://nexus-analytics-alpha.vercel.app](https://nexus-analytics-alpha.vercel.app)**

## Screenshots

![Dashboard Overview](https://raw.githubusercontent.com/crowfly22/Nexus-Dashboard/main/public/screenshot-dashboard.png)

![Analytics & Charts](https://raw.githubusercontent.com/crowfly22/Nexus-Dashboard/main/public/screenshot-analytics.png)

![Data Table](https://raw.githubusercontent.com/crowfly22/Nexus-Dashboard/main/public/screenshot-table.png)

## Features

- **Dashboard** — KPI stat cards (orders, visits, searches, revenue), trend indicators
- **Analytics** — interactive SVG charts (line + bar), real-time data visualization
- **Data Table** — sortable columns, search/filter, pagination, bulk actions
- **AI Assistant** — chat panel with typing indicator, smart suggestions
- **Activity Feed** — staggered animations, action timeline
- **Project Cards** — progress bars, team avatars, status badges
- **Notifications** — toast system with auto-dismiss, slide-in animations
- **Theme Switcher** — dark/light mode with localStorage persistence
- **Modal System** — animated backdrop blur, keyboard dismiss
- **Loading States** — skeleton screens, spinner animations
- **Responsive Sidebar** — collapsible navigation, mobile hamburger menu
- **Search** — global search with keyboard shortcut (Ctrl+K)

## Multi-Agent Architecture

- **Layout Agent**: responsive grid system, sidebar collapse logic, breakpoint management
- **Data Agent**: chart rendering, table sorting/filtering, stat aggregation
- **UI Agent**: theme switching, animation orchestration, glassmorphism effects
- **Interaction Agent**: search, notifications, modal state, keyboard shortcuts

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |
| Deployment | Vercel (Static Export) |

## Design System

- **Typography**: Inter (body), system fallbacks
- **Colors**: Slate palette with indigo/violet accents
- **Effects**: Glassmorphism (backdrop-blur), soft shadows, gradient borders
- **Spacing**: 4px grid system
- **Radius**: Rounded-xl (12px) for cards, rounded-full for avatars
- **Inspiration**: Apple + Linear + Vercel + Stripe

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Tailwind + custom styles
├── components/
│   ├── sidebar.tsx       # Navigation sidebar
│   ├── topbar.tsx        # Header with search & actions
│   ├── stat-card.tsx     # KPI metric cards
│   ├── chart-widget.tsx  # SVG line/bar charts
│   ├── data-table.tsx    # Sortable data table
│   ├── activity-feed.tsx # Activity timeline
│   ├── project-card.tsx  # Project status cards
│   ├── ai-assistant.tsx  # AI chat panel
│   ├── notification-toast.tsx # Toast notifications
│   ├── modal.tsx         # Modal dialog
│   ├── loading.tsx       # Skeleton & spinner
│   └── theme-provider.tsx # Dark/light theme
└── lib/
    └── utils.ts          # cn() utility
```

## Getting Started

```bash
# Clone
git clone https://github.com/crowfly22/Nexus-Dashboard.git
cd Nexus-Dashboard

# Install
npm install

# Dev server
npm run dev
# → http://localhost:3000

# Build
npm run build

# Deploy to Vercel
npx vercel --prod
```

## Performance

- **Static Export** — zero server cold starts, CDN-cached globally
- **Code Splitting** — automatic per-route chunks
- **Font Optimization** — next/font with preload
- **Image Optimization** — unoptimized flag for static hosting
- **Bundle Size** — ~1.2MB total (JS + CSS + fonts)

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT
