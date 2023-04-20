import { ArrowBack, Delete, Edit, Message } from '@mui/icons-material';
import { Grid, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import ListingDataService from '../services/listing.service'
import DeleteConfirmation from './DeleteConfirmation';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { CommentList, ShowCardInfo, ShowGallery, UserMessagePopup } from './index';



export default function Show() {

    const { setLoading, setComments } = useContext(ListingContext)
    const { id } = useParams()
    const [currentListing, setCurrentListing] = useState(null)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [messagePopupOpen, setMessagePopupOpen] = useState(false)
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    const handleDeleteOpen = () => {
        setDeleteDialogOpen(true)
    }

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
    };

    const handleMessagePopupOpen = () => {
        setMessagePopupOpen(true)
    }

    const handleMessagePopupClose = () => {
        setMessagePopupOpen(false)
    }

    useEffect(() => {
        setLoading(true)
        ListingDataService.get(id)
            .then(({ data }) => {

                setComments(data.comments)
                setCurrentListing(data)
                setLoading(false)
            })

    }, [])

    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/listings')
    }

    // const handleDelete = () => {
    //     if (isAuthor) {
    //         deleteListing(id)
    //         navigate('/listings')
    //     }
    // }

    const handleEdit = () => {
        if (isAuthenticated() && auth().id === currentListing.author._id) {
            navigate(`/listings/${id}/edit`)
        }
    }

    return (
        <>
            {currentListing ?
                <>
                    <DeleteConfirmation open={deleteDialogOpen} handleClose={handleDeleteClose} />
                    <UserMessagePopup open={messagePopupOpen} recipient={currentListing.author} handleClose={handleMessagePopupClose} />
                    <Grid container item direction='row' justifyContent='space-around' rowGap={2} paddingX={2} maxHeight='calc(100vh - 128px)' display='block'>
                        <Grid item container direction='row' width='100%' height='36.5px' marginY='calc(13.5px/2)' columnGap={1} xs={12}>
                            <Button
                                startIcon={<ArrowBack />}
                                onClick={handleBack}
                                variant='outlined'
                            >
                                Back
                            </Button>
                            {(
                                currentListing && isAuthenticated() && (auth().id === currentListing.author._id)) &&
                                <>
                                    <Button
                                        startIcon={<Edit />}
                                        onClick={handleEdit}
                                        variant='outlined'
                                        color='success'
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        startIcon={<Delete />}
                                        onClick={handleDeleteOpen}
                                        variant='outlined'
                                        color='error'
                                    >
                                        Delete
                                    </Button>
                                </>
                            }
                            {((currentListing && isAuthenticated() && auth().id !== currentListing.author._id)) &&
                                <Button
                                    startIcon={<Message />}
                                    onClick={handleMessagePopupOpen}
                                    variant='outlined'
                                    color='info'
                                >
                                    Send Message
                                </Button>
                            }
                        </Grid>
                        <Grid item container direction='row' height={{ xs: 'calc(100% - 250px)', sm: 'calc(100% - 48px)' }} paddingTop={2}>
                            <Grid item container direction='column' xs={12} md={7} paddingRight={{ xs: 0, md: 2 }} height='100%' rowGap={2} overflow='hidden'>
                                <ShowGallery
                                    images={currentListing.images} defaultMain={currentListing.images[0].url} />
                            </Grid>

                            <Grid item container direction='column' xs={12} md={5} rowGap={4} display='flex' paddingLeft={{ xs: 0, md: 2 }}
                                height='100%' wrap='nowrap'>
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={value}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                                            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ width: '100%' }}>
                                                <Tab label="Description" value="1" sx={{ width: '50%', maxWidth: '50%' }} />
                                                <Tab label="Comments" value="2" sx={{ width: '50%', maxWidth: '50%' }} />
                                            </TabList>
                                        </Box>

                                        <TabPanel value="1">
                                            <ShowCardInfo showCard={true} {...currentListing} {...currentListing.author} />
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <CommentList id={id} />
                                        </TabPanel>
                                    </TabContext>
                                </Box>

                            </Grid>
                        </Grid>
                    </Grid>
                </>
                : null}
        </>
    );
}