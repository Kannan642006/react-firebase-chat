# React Firebase Chat Application

A real-time chat application built with React and Firebase, featuring user authentication and instant messaging capabilities.

## Features

- **User Authentication**: Sign in with Google using Firebase Authentication
- **Real-time Messaging**: Send and receive messages instantly using Firestore
- **Chat Rooms**: Organize conversations in different chat rooms
- **Modern UI**: Built with Material-UI (MUI) for a clean and responsive interface
- **User Presence**: See online status of other users
- **Message History**: View chat history with timestamps

## Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Material-UI (MUI) & Emotion CSS-in-JS
- **Backend**: Firebase (Authentication, Firestore, Real-time Database)
- **Icons**: Material-UI Icons
- **Hooks**: React Firebase Hooks for real-time data binding

## Project Structure

```
src/
├── App.jsx                 # Main application component
├── firebase.js             # Firebase configuration
├── App.css                 # Application styles
├── index.css               # Global styles
├── main.jsx                # Application entry point
├── components/
│   ├── ChatRoom.jsx        # Chat room component
│   ├── ChatMessage.jsx     # Individual message component
│   └── SignIn.jsx          # Authentication component
└── assets/                 # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-firebase-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory and add your Firebase credentials:
   ```env
   VITE_REACT_FIREBASE_API_KEY=your_api_key
   VITE_REACT_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_REACT_FIREBASE_DATABASE_URL=your_database_url
   VITE_REACT_FIREBASE_PROJECT_ID=your_project_id
   VITE_REACT_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_REACT_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_REACT_FIREBASE_APP_ID=your_app_id
   VITE_REACT_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Use `.env.example` as a reference template.

4. **Get Firebase credentials**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or select an existing one
   - Navigate to Project Settings → Your apps
   - Copy your Firebase SDK configuration
   - Paste the values into your `.env.local` file

### Running the Application

- **Development server**
  ```bash
  npm run dev
  ```
  The application will be available at `http://localhost:5173`

- **Build for production**
  ```bash
  npm run build
  ```

- **Preview production build**
  ```bash
  npm run preview
  ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production bundle
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## Firebase Setup

### Enable Authentication

1. Go to Firebase Console → Authentication
2. Click "Get started"
3. Enable Google sign-in method
4. Add authorized domains if deploying

### Create Firestore Database

1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Choose production mode
4. Set your preferred location

### Database Structure

Expected Firestore collections:
- `rooms` - Chat room documents
- `messages` - Message documents with `text`, `uid`, `displayName`, `timestamp` fields

## Environment Variables

All Firebase configuration values are stored in `.env.local` using the `VITE_REACT_FIREBASE_` prefix. These variables are:
- Only loaded in the client-side code
- Not committed to version control (`.env.local` is in `.gitignore`)
- Safe to expose as they have Firebase security rules

**Important**: Never commit `.env.local` to version control. Use `.env.example` for documentation.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in project settings
5. Deploy

### Deploy to Firebase Hosting

```bash
npm run build
firebase deploy
```

## Security

- Firebase security rules protect your data
- Google OAuth authentication ensures only authorized users
- `.env.local` is excluded from git to protect sensitive data
- All credentials are validated server-side by Firebase

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue in the repository or contact the project maintainers.

---

**Happy Chatting!** 💬
