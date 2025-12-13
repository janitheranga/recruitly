# 🚀 Recruitly - Next Generation Recruitment Platform

A cutting-edge, AI-powered recruitment platform built with Next.js 16, React 19, TypeScript, and modern gradient design system. Transform your hiring process with intelligent candidate matching, real-time analytics, and stunning visual experiences.

## ✨ Features

### 🎨 Modern Gradient UI/UX

- **Gradient Design System**: Custom OKLCH color palettes with smooth gradient transitions
- **Professional Logo**: Animated SVG logo with gradient effects and hover interactions
- **Dark/Light Mode**: Full theme support with optimized gradient overlays
- **Smooth Animations**: Motion library integration for fluid user experiences
- **Glass Effects**: Modern glassmorphism with backdrop blur
- **Responsive Layout**: Mobile-first design that works beautifully on all devices

### 🌟 Landing Page Experience

- **Hero Section**: Eye-catching gradient hero with animated badges and CTAs
- **Stats Section**: Live counter animations showcasing platform success metrics
- **Features Showcase**: Interactive gradient cards with hover effects
- **Testimonials**: Real customer stories with professional avatars
- **Pricing Tiers**: Gradient-highlighted plans with smooth animations
- **Trust Badges**: ISO, GDPR, SOC 2 compliance indicators
- **CTA Section**: Full-gradient conversion section with animated orbs

### 📊 Dashboard (Home Page)

- **Interactive Doughnut Charts**:
  - Job Status Chart: View Active vs Closed jobs
  - Applicant Performance Chart: Top Performers, Potential, Under Performers
  - Click chart segments to display specific counts in center
  - Click center to return to total count
- **Weekly Applicant Trends**:
  - Line chart showing applicant trends for active jobs
  - Color-coded lines for each job
  - Interactive tooltips with daily/weekly counts
  - Automatic data point visualization

### 💼 Jobs Management

- **Job Table**: Paginated table with Job ID, Title, Description, and Status
- **Create New Job**: Modal form to add new job postings
- **Status Badges**: Visual indicators for Active/Closed jobs
- **Form Controls**: Clear, Cancel, and Submit actions

### 📈 Applicants Statistics

- **Dynamic Filters**:
  - Filter by Job Status (Active/Closed)
  - Duration options: Last 30 Days or Custom Date Range
  - Default: Active jobs from last 30 days
- **Adaptive Chart Display**:
  - Week-based view for durations > 7 days
  - Day-based view for shorter durations
  - Automatic Y-axis scaling based on data
  - Multi-line charts for comparing different jobs

### 👥 Explore Applicants

- **Applicant Table**:
  - Paginated list with ID, Name, Email, Job Match status
  - Color-coded pill-shaped badges for performance levels
  - Quick View action to see details
- **Individual Applicant Details**:
  - Comprehensive applicant information
  - Years of Experience (multi-line display)
  - Notable Qualifications (multi-line display)
  - Notable Work Experience (multi-line display)
  - Job Match status with visual indicators
  - Approve/Decline actions with status tracking

### 🧭 Navigation

- **Fixed Header**:
  - Logo in left corner
  - Search bar in middle (for future section search)
  - Theme toggle button
  - Profile dropdown menu
- **Side Navbar**:
  - Always visible with icon + text buttons
  - Home, Jobs, Applicants Statistics, Explore Applicants Data
  - Active state highlighting

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI primitives)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Theme**: next-themes
- **Date Utilities**: date-fns

## 📁 Project Structure

```
recruitly/
├── app/
│   ├── applicants/
│   │   ├── [id]/page.tsx          # Individual applicant detail page
│   │   └── page.tsx               # Applicants list page
│   ├── jobs/page.tsx              # Jobs management page
│   ├── statistics/page.tsx        # Statistics and filtering page
│   ├── globals.css                # Global styles and theme
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Home/Dashboard page
├── components/
│   ├── ui/                        # shadcn/ui components
│   ├── app-layout.tsx             # Main layout with header & sidebar
│   └── theme-provider.tsx         # Theme provider wrapper
├── lib/
│   ├── data.ts                    # Mock data and helper functions
│   ├── types.ts                   # TypeScript type definitions
│   └── utils.ts                   # Utility functions
└── public/                        # Static assets
```

## 🎯 Key Features

### Interactive Charts

- **Doughnut Charts**: Click segments to update center display
- **Line Charts**: Hover over data points for detailed tooltips
- **Responsive**: Charts adapt to container size
- **Color Coded**: Consistent color scheme across all visualizations

### Performance Badges

- 🟢 **Top Performer**: Green badge
- 🟡 **Potential**: Yellow badge
- 🔴 **Under Performer**: Red badge

### Status Management

- Jobs: Active (green) / Closed (gray)
- Applicants: Pending / Approved (green) / Declined (red)

## 🎨 Design System & Color Palette

### Custom OKLCH Color System

The platform uses 5 carefully crafted OKLCH color palettes for consistent perceptual brightness:

#### 🌿 Honeydew (Primary Actions)

- Primary CTAs, success states, active indicators
- Values: oklch(97.63% 0.022 123.62) → oklch(21.54% 0.041 127.81)

#### 🌫️ Dust Grey (Neutrals)

- Text, borders, backgrounds
- Values: oklch(96.36% 0.003 106.45) → oklch(18.55% 0.006 106.97)

#### 🌸 Lilac Ash (Light Backgrounds)

- Card backgrounds, subtle highlights
- Values: oklch(95.95% 0.003 308.43) → oklch(17.56% 0.006 300.91)

#### 💜 Dark Amethyst (Secondary Accents)

- Secondary actions, decorative elements
- Values: oklch(94.82% 0.035 317.31) → oklch(16.28% 0.075 317.51)

#### 🔮 Indigo Velvet (Dark Mode)

- Dark backgrounds, depth layers
- Values: oklch(95.31% 0.016 306.41) → oklch(16.35% 0.034 302.99)

### Gradient Utilities

```css
.gradient-primary       /* Honeydew → Dark Amethyst */
/* Honeydew → Dark Amethyst */
.gradient-secondary     /* Dark Amethyst → Indigo Velvet */
.gradient-accent        /* Honeydew → Dark Amethyst → Indigo Velvet */
.gradient-mesh          /* Multi-point radial gradient background */
.text-gradient          /* Text with gradient fill */
.shadow-glow            /* Glowing box shadow effect */
.smooth-transition      /* Smooth cubic-bezier transitions */
.hover-lift             /* Y-axis lift on hover */
.animate-gradient; /* Animated gradient background */
```

## 🎨 Component Design Patterns

### Color Palette

- **Primary**: Blue (#3b82f6)
- **Success**: Green (#22c55e)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#ef4444)

### Typography

- **Font**: Inter (Google Fonts)
- **Borders**: Semi-rounded (0.75rem - 1rem)

## 📝 Future Enhancements

- Real backend API integration
- User authentication
- Advanced search functionality
- Export data to CSV/PDF
- Resume file upload and viewing
- Email notifications
- Calendar integration for interviews

---

Built with ❤️ using modern web technologies.
