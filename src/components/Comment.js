import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, IconButton, Paper } from '@mui/material';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { Delete } from '@mui/icons-material';
import { DefaultAvatar } from './index';

export default function Comment({ body, author, _id, deleteComment }) {

    const auth = useAuthUser()

    const isAuthenticated = useIsAuthenticated()
    const [isCommentAuthor, setIsCommentAuthor] = useState(false)
    const [image, setImage] = useState(null)
    // const [replies, setReplies] = useState([])
    // const [confirmDelete, setConfirmDelete] = useState(false)
    // const [showReply, setShowReply] = useState(false)

    useEffect(() => {
        isAuthenticated() && setIsCommentAuthor(auth().id === author._id)
        author.image && setImage(author.image.url)
        // CommentDataService.get({commentId: _id, id: id})
        // .then(({data}) => {
        //     console.log(data)
        //     setReplies([...data.replies])
        // })
    }, [])

    const handleDelete = () => {
        deleteComment(_id)
    }

    //     const createReply = (obj) => {
    //         CommentDataService.reply({...obj,  commentId: _id})
    //         .then(({ data }) => {
    //             console.log(data)
    //             setReplies([...data.replies])
    //         setShowReply(false)
    //     })
    // }

    return (
            <Paper sx={{ width: '100%', mb: 'auto', display: 'flex' }}>
                <Grid container item direction='row' columnGap={2} display='flex' xs={12} padding={2} minHeight='74px'>
                    <Grid container item xs='auto' direction='column' justifyContent='flex-start'>
                        {image ?
                            <Avatar alt={author.username} src={image} />
                            :
                            <DefaultAvatar username={author.username} />
                        }
                    </Grid>
                    <Grid container item xs direction='row' rowGap={2} alignItems='center'>
                        <Grid item container direction='column' width='100%'>
                            <Grid container item xs>

                                <Typography variant="subtitle2" component='div' color="primary">
                                    <b>{author.username}</b>
                                </Typography>
                            </Grid>

                            <Grid container item direction='column' xs={12}>

                                <Typography variant='body2' component='div' color="text.primary"
                                    whiteSpace='break-spaces' sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 5,
                                    }}>
                                    {body}
                                </Typography>
                            </Grid>
                        </Grid>



                    </Grid>
                    {isCommentAuthor ?
                        <Grid container item xs={1} direction='column' justifyContent='center' alignItems='flex-end' borderLeft='1px solid lightgray' width='100%' >
                            <IconButton onClick={handleDelete}>
                                <Delete fontSize='small' />
                            </IconButton>
                        </Grid>
                        : null
                    }
                </Grid>
            </Paper>


    );
}

