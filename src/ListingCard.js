import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Grid } from '@mui/material';
import ListingCardInfo from './ListingCardInfo';
import { Link } from 'react-router-dom';
import { ListingContext } from './contexts/ListingContext';
import ShowCardInfo from './ShowCardInfo';

export default function ListingCard({ images, listing }) {

    return (
        <Card sx={{ display: 'flex', marginBottom: '2rem', width: '100%' }}>
            <Grid container>
                <Grid item xs={12} md={6}>
                    <Link to={`/listings/${listing._id}`}>
                        <CardMedia
                            component="img"
                            sx={{ maxWidth: '100%', height: '300px' }}
                            image={(listing.images.length !== 0) ? listing.images[0].url : 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708360/tesla/lhvqche82wz6rvl4qbvw.jpg'}
                            alt="Live from space album cover"
                        />
                    </Link>
                </Grid>
                <Grid item xs={12} md={6} p={2}>
                    {/* <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'100%' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}> */}
                            <ListingCardInfo {...listing} />
                        {/* </CardContent>
                    </Box> */}
                </Grid>
            </Grid>
        </Card>
    );
}


