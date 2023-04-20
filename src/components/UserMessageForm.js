import React, { useContext, useState } from 'react';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import UserDataService from '../services/user.service'
import { ListingContext } from '../contexts/ListingContext';
import { Send } from '@mui/icons-material';
import { useAuthUser } from 'react-auth-kit';

export default function MessageForm({ recipient, handleClose, populateMessages }) {

    const [body, setBody] = useState('')
    const { setMessage, setMessageStatus } = useContext(ListingContext)
    const auth = useAuthUser()

    const handleBodyChange = (event) => {
        setBody(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const obj = { body: body, from: auth().id, to: recipient._id }
        setBody('')
        UserDataService.sendMessage(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                !handleClose && populateMessages(auth().id, recipient._id)
            })
        handleClose && handleClose()
    }

    return (
        <Paper component='form' onSubmit={handleSubmit} sx={{ display: 'flex', width: '100%' }}>
            <InputBase
                placeholder='Message*'
                sx={{ m: 1, flex: 1 }}
                id="outlined-body-input"
                label="Message"
                type="text"
                value={body}
                onChange={handleBodyChange}
                autoComplete="new-body"
                size="small"
                 
                fullWidth
                required
                multiline
                minRows={1}
                maxRows={10}
            />
            <Divider sx={{ height: 'auto', m: 1 }} orientation="vertical" />
            <IconButton type='submit' color="primary" sx={{ p: '10px' }} aria-label="Send Message">
                <Send />
            </IconButton>
        </Paper>
    );
}

