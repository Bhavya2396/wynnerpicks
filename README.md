# 🚀 WynnerPicks - Modern Sports Betting Analytics Dashboard

A sophisticated, data-driven sports insights platform built around **transparency** and **accountability**. Track picks in real-time, analyze performance with advanced metrics, and maintain complete visibility into betting results.

![WynnerPicks Dashboard](https://img.shields.io/badge/Dashboard-Live-blue?style=for-the-badge)
![Built with React](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178c6?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.16-38b2ac?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🏠 **Beautiful Landing Page**
- Professional introduction with complete "About Us" content
- Gradient hero section with compelling CTAs
- Feature highlights with icon-based design
- Seamless flow to dashboard experience

### 📊 **Advanced Dashboard System**
- **Real-time Metrics**: Monthly units, win rate, ROI, and active picks
- **Interactive Navigation Cards**: Access all features through beautiful glass cards
- **Recent Activity Feed**: Live updates on pick results and system activity
- **Quick Actions Panel**: Admin controls and community features
- **Today's Insights**: Daily/weekly performance snapshots

### 📡 **Live Feed**
- Real-time pick updates as they happen
- Advanced filtering by sport and status
- Interactive pick cards with detailed information
- Modal views for complete pick analysis

### 📚 **Complete Transparent Ledger**
- **Full History**: Every pick ever made, permanently recorded
- **Advanced Search**: Debounced search across all picks and events  
- **Multi-Filter System**: Filter by sport, status, date ranges
- **Pagination**: Efficient cursor-based pagination for large datasets
- **Mobile Optimized**: Responsive cards for mobile viewing

### 📈 **Performance Analytics**
- **ROI Tracking**: Comprehensive return on investment analysis
- **Hit Rate Metrics**: Win percentage and performance trends
- **Sport Breakdown**: Performance analysis by individual sports
- **Time Period Analysis**: Current month, last month, all-time views
- **Visual Charts**: Beautiful metric cards with color-coded indicators

### 🔐 **Admin System**
- **Google Authentication**: Secure Firebase Auth integration
- **Pick Management**: Create, edit, and update pick status
- **Protected Routes**: Admin-only access to management features
- **Real-time Updates**: Instant synchronization across all users

### 🎨 **Modern UI/UX**
- **Glassmorphism Design**: Beautiful frosted glass effects throughout
- **Dark Theme**: Professional dark gradient background
- **Responsive Layout**: Perfect experience on all device sizes
- **Smooth Animations**: Subtle hover effects and transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🛠 Tech Stack

### **Frontend**
- **React 19.2.0** - Latest React with concurrent features
- **TypeScript 5.7.2** - Full type safety and modern JS features
- **TanStack Router** - Type-safe file-based routing
- **TanStack Form** - Powerful form management with validation
- **Tailwind CSS 4.1.16** - Modern utility-first styling
- **Shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Beautiful icon library

### **Backend & Database**
- **Firebase Authentication** - Google OAuth integration
- **Firestore** - Real-time NoSQL database
- **Real-time Subscriptions** - Live data updates across clients
- **Server Timestamps** - Accurate time tracking for picks

### **Development Tools**
- **Vite 7.1.7** - Lightning-fast development server
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **pnpm** - Fast, efficient package management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm package manager
- Firebase project (for authentication and database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bhavya2396/wynnerpicks.git
   cd wynnerpicks
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_PUBLIC_FIREBASE_API_KEY=your_api_key
   VITE_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   VITE_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_PUBLIC_FIREBASE_APP_ID=your_app_id
   VITE_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
pnpm build
```

## 📱 Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/ui components
│   ├── Ledger/         # Ledger-specific components
│   └── Performance/    # Analytics utilities
├── lib/                # Core utilities and configurations
├── routes/             # File-based routing pages
└── styles.css          # Global styles and CSS variables
```

## 🎯 Key Features Explained

### **Transparency Model**
- Every pick is time-stamped and permanently recorded
- No editing or deletion of historical data
- Complete visibility into decision-making process
- Public ledger accessible to all users

### **Performance Tracking**
- **Target**: 20% ROI on maximum 200 units per month
- **Metrics**: Win rate, hit rate, units staked, net profit
- **Accountability**: All results publicly verifiable
- **Analytics**: Sport-by-sport performance breakdown

### **Real-time Updates**
- Firebase Firestore real-time subscriptions
- Instant updates across all connected clients
- Live activity feed showing recent results
- No refresh needed for latest information

## 🔒 Authentication & Security

- Google OAuth through Firebase Authentication
- Protected admin routes with role-based access
- Secure API endpoints with proper validation
- Environment variable configuration for sensitive data

## 📊 Database Schema

### Picks Collection
```typescript
interface Pick {
  id: string
  sport: string           // cricket, football, tennis
  league: string          // Competition name
  event: string           // Match/game description
  market: string          // Bet type
  selection: string       // Specific pick
  odds: number           // Decimal odds
  units: number          // Stake amount
  status: PickStatus     // PENDING, WON, LOST, PUSH, VOID
  rationale: string      // Analysis/reasoning
  postedAt: Date         // When pick was posted
  settledAt?: Date       // When result was recorded
  finalScore?: string    // Game result
  notes?: string         // Additional comments
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **TanStack** - For excellent React tooling
- **Shadcn/ui** - For beautiful component library  
- **Firebase** - For reliable backend services
- **Tailwind CSS** - For efficient styling system
- **Radix UI** - For accessible component primitives

---

**Built with ❤️ for transparent sports betting analytics**

🌐 **Live Demo**: [WynnerPicks Dashboard](http://localhost:3000)

📧 **Contact**: [Your Contact Information]

⭐ **Star this repo** if you find it helpful!