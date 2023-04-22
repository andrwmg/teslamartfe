import React, { useContext } from 'react';
import { Grid, Typography } from '@mui/material';
import { ListingContext } from '../contexts/ListingContext';
import CommentDataService from '../services/comment.service'
import ListingDataService from '../services/listing.service'
import { Comment, CommentForm } from './index';
import { useIsAuthenticated } from 'react-auth-kit'
import { Link } from 'react-router-dom';

export default function CommentList({ id }) {

    const { comments, setComments } = useContext(ListingContext)
    const isAuthenticated = useIsAuthenticated()

    const deleteComment = async (commentId) => {
        const { data } = await CommentDataService.delete({ id, commentId })
        setComments([...data.comments])
    }

    const createComment = async (obj) => {
        await CommentDataService.create(obj)
        await ListingDataService.get(id)
            .then(({ data }) => {
                comments ? setComments([...data.comments]) : setComments([])
            })
    }

    return (
        <Grid container item direction='row' width='100%' rowGap={4} columnGap={2} pb={4} maxHeight='calc(665.5px - 97px)'>
            <Grid container item position='sticky' height='92.5px' display='flex' justifyContent='center' alignItems='center' zIndex={10}>
                {isAuthenticated() ?
                    <CommentForm createComment={createComment} /> :
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                        <Typography variant='body1' color='text.primary'>
                            Log in to leave a comment!
                        </Typography>
                    </Link>
                }
            </Grid>
                <Grid item container direction='column' rowGap={4} width='100%' maxHeight={{xs: '100%', md: 'calc(665.5px - 97px - 92.5px - 32px)'}} overflow={{xs: 'visible', md: 'scroll'}} wrap='nowrap' my={1} justifyContent='flex-start'  paddingBottom={2} >
                    {comments && comments.map(comment => (
                        <Comment key={comment._id} setComments={setComments} {...comment} deleteComment={deleteComment} />
                    ))}
                </Grid>
        </Grid>
    );
}

