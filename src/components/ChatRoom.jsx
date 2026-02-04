import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

function ChatRoom() {
    const dummy = useRef();
    const scrollContainer = useRef();
    const messagesRef = collection(db, 'messages');

    // Start with 20 messages, increase as user scrolls up
    const [limitCount, setLimitCount] = useState(20);

    // Query for the latest 'limitCount' messages (descending order)
    const q = query(messagesRef, orderBy('createdAt', 'desc'), limit(limitCount));

    const [messages, loading] = useCollectionData(q, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    // Reverse messages to show them in chronological order (Oldest -> Newest)
    const sortedMessages = messages ? [...messages].reverse() : [];

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!formValue.trim()) return;

        const { uid, photoURL, displayName } = auth.currentUser;

        await addDoc(messagesRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL,
            displayName
        });

        setFormValue('');
        // Scroll to bottom after sending
        if (dummy.current) {
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Handle scroll to top to load more
    const handleScroll = (e) => {
        const { scrollTop, scrollHeight } = e.currentTarget;
        if (scrollTop === 0 && messages?.length >= limitCount) {
            setPrevScrollHeight(scrollHeight);
            setLimitCount(prev => prev + 20);
        }
    }

    // Auto-scroll to bottom on initial load only
    useEffect(() => {
        if (dummy.current && !loading && limitCount === 20) {
            dummy.current.scrollIntoView();
        }
    }, [messages, loading, limitCount]);

    // Maintain scroll position when finding older messages
    const [prevScrollHeight, setPrevScrollHeight] = useState(0);

    useLayoutEffect(() => {
        if (scrollContainer.current && prevScrollHeight > 0) {
            const newHeight = scrollContainer.current.scrollHeight;
            const diff = newHeight - prevScrollHeight;
            if (diff > 0) {
                scrollContainer.current.scrollTop = diff;
            }
        }
    }, [messages, prevScrollHeight]);

    return (
        <Container maxWidth="md" sx={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
            <Box
                ref={scrollContainer}
                onScroll={handleScroll}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {loading && <Box display="flex" justifyContent="center" p={2}><CircularProgress size={24} /></Box>}

                {sortedMessages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                <span ref={dummy}></span>
            </Box>

            <Paper
                component="form"
                onSubmit={sendMessage}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', mb: 2 }}
            >
                <TextField
                    fullWidth
                    variant="standard"
                    placeholder="Type a message..."
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    InputProps={{ disableUnderline: true, sx: { px: 2 } }}
                />
                <IconButton color="primary" type="submit" sx={{ p: '10px' }} disabled={!formValue.trim()}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </Container>
    );
}

export default ChatRoom;
