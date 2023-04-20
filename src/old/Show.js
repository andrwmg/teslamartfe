import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import ShowGallery from './ShowGallery';
import ShowCardInfo from '../ShowCardInfo';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import ListingDataService from '../services/listing.service'
import DeleteConfirmation from '../DeleteConfirmation';
import CommentList from '../CommentList';

export default function Show() {

    const { setIsAuthor, isAuthor, setLoading, setComments } = useContext(ListingContext)
    const { id } = useParams()
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentListing, setCurrentListing] = useState({ images: [] })
    const [currentListingAuthor, setCurrentListingAuthor] = useState('')
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    const handleOpen = () => {
        setDeleteDialogOpen(true)
    }

    const handleClose = () => {
        setDeleteDialogOpen(false);
    };

    useEffect(() => {
        setLoading(true)
        ListingDataService.get(id)
            .then(({ data }) => {
                setComments(data.comments)
                setCurrentListing(data)
                setCurrentListingAuthor(data.author._id)
                if (isAuthenticated()) {
                    setCurrentUserId(auth().id)
                }
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        if (isAuthenticated() && auth().id === currentListingAuthor) {
            setIsAuthor(true)
        } else {
            setIsAuthor(false)
        }
    }, [currentUserId])

    const navigate = useNavigate()
    const { images } = currentListing


    let imgs = currentListing.images.map(img => img.url)

    const handleBack = () => {
        navigate('/listings')
    }

    const handleEdit = () => {
        if (isAuthor) {
            navigate(`/listings/${id}/edit`)
        }
    }


    return (
        <>
            <DeleteConfirmation open={deleteDialogOpen} handleClose={handleClose} />
            <Grid container item
                justifyContent='space-around' rowGap={2} paddingX={3}>
                <Grid item container direction='row' width='100%' marginY='calc(13.5px/2)' columnGap={1} xs={12}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={handleBack}
                        variant='outlined'
                    >
                        Back
                    </Button>
                    {isAuthor &&
                        <>
                            <Button
                                startIcon={<Edit />}
                                onClick={handleEdit}
                                variant='outlined'
                                color='primary'
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                onClick={handleOpen}
                                variant='outlined'
                                color='error'
                            >
                                Delete
                            </Button>
                        </>
                    }
                </Grid>
                <Grid item container xs={12} md={8} paddingRight={{ xs: 0, md: 2 }} rowGap={2}>
                    <Grid item container xs={12}>
                        <ShowGallery
                            images={images} defaultMain={imgs[0]}
                        />
                    </Grid>

                    <Grid item container direction='row' alignItems='flex-start' xs={12}>
                        <ShowCardInfo showCard={true} {...currentListing} {...currentListing.author} />
                    </Grid>
                </Grid>
                <Grid item container direction='column' xs={12} md={4} rowGap={4} paddingLeft={{ xs: 0, md: 2 }}>
                    <CommentList id={id} />
                </Grid>
            </Grid>
        </>
    );
}