# 🚗 Carpool Social

A modern carpool social platform that connects commuters to save money, build community, and reduce environmental impact.

## 🌟 Features

### 🔐 Multi-Platform Authentication
- **Google OAuth** - Quick sign-in with Google accounts
- **Apple Sign-In** - Seamless authentication for iOS users  
- **Facebook Login** - Connect with Facebook credentials
- **Email/Password** - Traditional authentication method
- **Comprehensive Event Logging** - Track all authentication events
- **Provider Metadata Tracking** - Store provider-specific user data

### 🎨 Modern UI/UX
- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Automatic theme switching
- **Beautiful Landing Page** - Professional marketing site
- **Intuitive Navigation** - Easy-to-use interface
- **Loading States** - Smooth user experience

### 🔧 Technical Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, ShadCN/UI
- **Backend**: Node.js, Hono, TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Firebase Auth with multi-provider support
- **Package Manager**: pnpm (fast, efficient)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm
- PostgreSQL (or use embedded version)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/neo4code/carpool-social.git
   cd carpool-social
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy environment templates
   cp ui/src/lib/firebase-config.template.json ui/src/lib/firebase-config.json
   # Add your Firebase configuration
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

The app will be available at:
- Frontend: http://localhost:5601
- Backend API: http://localhost:5600  
- Database: localhost:5602
- Firebase Auth Emulator: localhost:5603

## 🏗️ Architecture

```
carpool-social/
├── ui/                     # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configs
│   │   └── hooks/         # Custom React hooks
├── server/                # Node.js backend
│   ├── src/
│   │   ├── api.ts         # API routes
│   │   ├── middleware/    # Auth middleware
│   │   ├── schema/        # Database schemas
│   │   └── lib/           # Backend utilities
├── database-server/       # Embedded PostgreSQL
└── scripts/               # Development scripts
```

## 🔐 Authentication Flow

1. **User Authentication**: Multi-provider support (Google, Apple, Facebook, Email)
2. **Token Verification**: Server-side Firebase token validation
3. **User Creation**: Automatic user profile creation/update
4. **Event Logging**: All auth events logged to database
5. **Provider Tracking**: Store provider-specific metadata

## 📊 Database Schema

### Users Table
- `id` - Unique user identifier
- `email` - User email address
- `display_name` - User's display name
- `photo_url` - Profile photo URL
- `provider` - Primary authentication provider
- `provider_data` - Provider-specific metadata (JSONB)
- `last_login_at` - Last login timestamp
- `created_at` / `updated_at` - Timestamps

### Auth Events Table  
- `id` - Event identifier
- `user_id` - Reference to user
- `event_type` - signup, login, logout
- `provider` - Authentication provider used
- `ip_address` - User's IP address
- `user_agent` - Browser/device information
- `metadata` - Additional event data (JSONB)
- `created_at` - Event timestamp

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set build command: `cd ui && pnpm build`
3. Set output directory: `ui/dist`
4. Deploy automatically on git push

### Backend (Render/Railway)
1. Connect repository to hosting platform
2. Set up PostgreSQL database
3. Configure environment variables
4. Deploy with automatic builds

### Domain Setup
Point your domain `carpoolsocial.com` to your hosting provider:
- Frontend: Vercel deployment URL
- Backend API: Backend hosting URL

## 🔧 Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.com
VITE_USE_FIREBASE_EMULATOR=false
VITE_FIREBASE_AUTH_EMULATOR_PORT=9099
```

### Backend (.env)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://username:password@host:port/database
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Firebase for authentication services
- Vercel for frontend hosting
- ShadCN for beautiful UI components
- Tailwind CSS for styling system

---

**Live Site**: [carpoolsocial.com](https://carpoolsocial.com)  
**Repository**: [github.com/neo4code/carpool-social](https://github.com/neo4code/carpool-social)