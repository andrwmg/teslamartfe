import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import { ListingContext } from '../contexts/ListingContext';
import { LoadingOverlay, MessageSnackbar, Navbar } from './index';


function Page(props) {

    const { message, user, isLoading } = useContext(ListingContext)

    const location = useLocation()

    return (
        <Box sx={{ display: 'flex'}}>
                <Navbar user={user} />
            <Box component="main" sx={{
                width: '100%', p: 0, height: '100%'
            }}>
                {location.pathname !== '/' &&
                    <Toolbar style={{ height: '64px' }} />
                }
                {isLoading && <LoadingOverlay />}
                {message && <MessageSnackbar />}
                <Grid container item 
                marginTop={location.pathname !== '/' && 2} marginBottom={location.pathname !== '/' && 6} minHeight='calc(100vh - 128px)'>
                    {props.children}
                </Grid>
            </Box>

        </Box>
    );
}

Page.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Page;
