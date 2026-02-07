import React from 'react';
import './App.css';

import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteUser } from 'firebase/auth';
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';

import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'light', // You can switch to 'dark'
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  const [user] = useAuthState(auth);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This will permanently delete your account and all your messages."
    );
    if (!confirmDelete) return;

    try {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const deletePromises = querySnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);

      await deleteUser(user);
    } catch (error) {
      console.error("Error deleting account:", error);
      if (error.code === 'auth/requires-recent-login') {
        alert("For security reasons, you need to sign in again to delete your account. You will be signed out now.");
        await auth.signOut();
      } else {
        alert("Failed to delete account: " + error.message);
      }
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React Firebase Chat
            </Typography>
            {user && (
              <>
                <Button color="error" onClick={handleDeleteAccount} sx={{ mr: 1 }}>
                  Delete Account
                </Button>
                <Button color="inherit" onClick={() => auth.signOut()}>
                  Sign Out
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
          {user ? <ChatRoom /> : <SignIn />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
