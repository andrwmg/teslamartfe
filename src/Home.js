import { Button, Grid, Typography } from '@mui/material';
import React from 'react';

import { Link } from 'react-router-dom';

export default function Home() {

    return (
        <Grid container direction='row' alignItems='flex-start' justifyContent='center' style={{ minHeight:'100vh', marginTop: '-64px', backgroundColor:'black', backgroundImage: 'linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, .5)), url("https://res.cloudinary.com/deuft4auk/image/upload/v1661790409/Tesla/0x0-ModelY_12_hq32tl.jpg")', backgroundSize: 'cover',backgroundPosition: 'center'
        }} >
            <Grid item container direction='row' rowSpacing={3} sx={{textAlign: 'center', marginTop:'88px'}}>
                <Grid item xs={12}>
                <Typography variant='h3' sx={{ color: 'white' }}>Tesla Mart</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography variant='h6' sx={{ color: 'white' }}>#1 place for private party Tesla sales</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Link style={{textDecoration: 'none'}} to='/listings'>
                <Button sx={{minWidth: '120px'}} variant='contained'>View Listings</Button>
                </Link>
                </Grid>
            </Grid>
        </Grid>
    );
}
