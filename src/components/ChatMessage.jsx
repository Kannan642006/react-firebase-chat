import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';

import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function ChatMessage(props) {
    const { text, uid, photoURL, displayName, id, createdAt } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    const [canDelete, setCanDelete] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        if (uid !== auth.currentUser?.uid) return;

        const checkTime = () => {
            // If createdAt is null (pending write), assume it's new and allow delete
            const messageTime = createdAt?.toMillis ? createdAt.toMillis() : Date.now();
            const now = Date.now();
            const timePassed = now - messageTime;

            // 1 minute = 60000 ms
            setCanDelete(timePassed < 60000);
        };

        checkTime(); // Initial check

        // Check every 5 seconds to update UI
        const interval = setInterval(checkTime, 5000);

        return () => clearInterval(interval);
    }, [createdAt, uid]);

    const handleDeleteClick = () => {
        if (!canDelete) return;
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleConfirmDelete = async () => {
        await deleteDoc(doc(db, "messages", id));
        setOpenDeleteDialog(false);
    };

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
                alignItems="center" // Align items in the center vertically
                gap={1}
                maxWidth="80%"
            >
                <Tooltip title={displayName || 'Anonymous'} placement="top">
                    <Avatar src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt={displayName} />
                </Tooltip>
                <Paper
                    elevation={1}
                    sx={{
                        p: 1.5,
                        bgcolor: messageClass === 'sent' ? 'primary.main' : 'grey.200',
                        color: messageClass === 'sent' ? 'white' : 'text.primary',
                        borderRadius: 2,
                        position: 'relative', // For potential absolute positioning if needed
                        wordBreak: "break-word" // Handle long words
                    }}
                >
                    <Typography variant="body1">{text}</Typography>
                </Paper>
                {messageClass === 'sent' && canDelete && (
                    <IconButton size="small" onClick={handleDeleteClick} color="error">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                )}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete Message?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this message? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ChatMessage;
