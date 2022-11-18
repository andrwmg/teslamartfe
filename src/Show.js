import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import { Grid, Button, Typography, Alert } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from './contexts/ListingContext';
import ShowGallery from './ShowGallery';
import ShowCardInfo from './ShowCardInfo';
import ListingCardInfo from './ListingCardInfo';
import { useAuthUser } from 'react-auth-kit'
import axios from 'axios';

export default function Show() {

    const { deleteListing, setIsAuthor, isAuthor } = useContext(ListingContext)
    const { id } = useParams()
    // const [isAuthor, setIsAuthor] = useState(false)
    const [currentUserId, setCurrentUserId] = useState('')
    const [currentListing, setCurrentListing] = useState({ images: [] })
    const [currentListingAuthor, setCurrentListingAuthor] = useState('')
    const [showError, setShowError] = useState(false)

    const auth = useAuthUser()

    useEffect(() => {
        axios.get(`http://localhost:8080/data/listings/${id}`)
            .then(({ data }) => {
                setCurrentListing(data)
                setCurrentListingAuthor(data.author._id)
                if (auth()) {
                    setCurrentUserId(auth()._id)
                }
            })
    }, [])

    useEffect(() => {
        if (auth() && auth()._id === currentListingAuthor) {
            setIsAuthor(true)
        }
    }, [currentUserId])

    const navigate = useNavigate()
    const { images } = currentListing


    let imgs = currentListing.images.map(img => img.url)

    const handleBack = () => {
        navigate('/listings')
    }

    const handleDelete = () => {
        if (isAuthor) {
            deleteListing(id, isAuthor)
            navigate('/listings')
        } else {
            setShowError(true)
        }
    }

    const handleEdit = () => {
        if (isAuthor) {
        navigate(`/listings/${id}/edit`)
        } else {
            setShowError(true)
        }
    }


    return (
        <Grid container justifyContent='space-around' marginTop={2} columnSpacing={2}>
                        <Grid item container direction='row' display={showError ? 'flex' : 'none'} columnGap={2} xs={11} my={2}>

                <Alert style={{ width:'100%'}} severity='error' onClose={() => { setShowError(false) }}>You need to be the author to modify this listing!</Alert>
            </Grid>
            <Grid item container direction='row' columnGap={2} xs={11} my={2}>
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
                        onClick={handleDelete}
                        variant='outlined'
                        color='error'
                    >
                        Delete
                    </Button>
                </>
}
            </Grid>
            <Grid item container xs={11} lg={5}>
                <ShowGallery
                    images={images} defaultMain={imgs[0]}
                // images={currentListing.images || []}
                // images={currentListing.images.length ? currentListing.images : ['https://res.cloudinary.com/deuft4auk/image/upload/v1662708360/tesla/lhvqche82wz6rvl4qbvw.jpg']} 
                />
                                </Grid>

                            <Grid item container xs={11} lg={5}>

                <ShowCardInfo showCard={true} {...currentListing} />
            </Grid>
            {/* <Grid item container xs={11} lg={5}>
                <Typography variant='h4'>
                    Comments
                </Typography>
            </Grid> */}
        </Grid>
    );
}