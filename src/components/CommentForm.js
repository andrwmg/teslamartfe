import React, { useState } from 'react';
import { Divider, IconButton, InputBase, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Send } from '@mui/icons-material';

export default function CommentForm({ createComment }) {
    const { id } = useParams()

    const [comment, setComment] = useState('')
    const [focus, setFocus] = useState(false)

    const handleCommentChange = (event) => {
        setComment(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const obj = { body: comment, id }
        setComment('')
        createComment(obj)
    }

    return (
        <Paper component='form' onSubmit={handleSubmit} sx={{ display: 'flex', width: '100%', zIndex: 10}}>
            <InputBase
                sx={{ m: 1, flex: 1 }}
                placeholder='Comment*'
                id="outlined-username-input"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                label="Comment"
                type="text"
                value={comment}
                onChange={handleCommentChange}
                autoComplete="new-comment"
                size="small"
                fullWidth
                required
                multiline
                minRows={focus || comment !== '' ? 3 : 1}
                maxRows={10}
            />
            <Divider sx={{ height: 'auto', m: 1 }} orientation="vertical" />
            <IconButton type='submit' color="primary" sx={{ p: '10px' }} aria-label="Leave Comment">
                <Send />
            </IconButton>
        </Paper>
    );
}

