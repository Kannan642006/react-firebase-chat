import React from 'react';
import { auth } from '../firebase';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

function ChatMessage(props) {
    const { text, uid, photoURL, displayName } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <Box
            display="flex"
            justifyContent={messageClass === 'sent' ? 'flex-end' : 'flex-start'}
            mb={2}
            className={`message ${messageClass}`}
        >
            <Box
                display="flex"
                flexDirection={messageClass === 'sent' ? 'row-reverse' : 'row'}
                alignItems="flex-end"
                gap={1}
                maxWidth="80%"
            >
                <Avatar src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt={displayName} />
                <Paper
                    elevation={1}
                    sx={{
                        p: 1.5,
                        bgcolor: messageClass === 'sent' ? 'primary.main' : 'grey.200',
                        color: messageClass === 'sent' ? 'white' : 'text.primary',
                        borderRadius: 2
                    }}
                >
                    <Typography variant="body1">{text}</Typography>
                </Paper>
            </Box>
        </Box>
    );
}

export default ChatMessage;
