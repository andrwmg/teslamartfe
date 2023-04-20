import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid } from "@mui/material";
import { UserMessageForm } from './index'


export default function MessagePopup({ open, handleClose, recipient }) {

    return (
            <Dialog open={open} onClose={handleClose} aria-labelledby='message-dialog-title'>
                                <Grid container item direction='column' p={2} rowGap={2}>
                <DialogTitle id='message-dialog-title' sx={{p: 0}}>Message Author</DialogTitle>
                    <UserMessageForm recipient={recipient} handleClose={handleClose} popUp={true} />
                </Grid>
            </Dialog>
    );
}
