# Recruitly - Applicant Tracking System

A modern, feature-rich recruiter platform built with Next.js 16, React 19, TypeScript, and shadcn/ui components. Track and review job applicants with interactive dashboards, data visualizations, and comprehensive applicant management.

## ✨ Features

### 🎨 Modern UI/UX
- **Clean Design**: Built with shadcn/ui components for a professional look
- **Dark/Light Mode**: Full theme support with smooth transitions
- **Semi-Rounded Corners**: Consistent design language across all elements (cards, tables, buttons, sections)
- **Responsive Layout**: Mobile-first design that works on all devices

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

## 🎨 Design System

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
