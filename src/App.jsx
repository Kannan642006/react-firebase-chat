import React from 'react';
import './App.css';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

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

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React Firebase Chat
            </Typography>
            {user && <Button color="inherit" onClick={() => auth.signOut()}>Sign Out</Button>}
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
