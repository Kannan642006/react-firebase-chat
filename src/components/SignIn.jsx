import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../firebase';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(error => {
            console.error("Error signing in", error);
        });
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="80vh"
            gap={2}
        >
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome to React Chat
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                Sign in to join the group conversation.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                startIcon={<GoogleIcon />}
                onClick={signInWithGoogle}
                size="large"
            >
                Sign in with Google
            </Button>
        </Box>
    );
}

export default SignIn;
