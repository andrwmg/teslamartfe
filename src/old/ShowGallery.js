import { Button, Grid, Paper } from '@mui/material'
import React, { useState } from 'react'

export default function ShowGallery({ images, defaultMain }) {

    const [main, setMain] = useState(defaultMain)

    const handleClick = (event) => {
        setMain(event.target.getAttribute('src'))
    }

    return (
        <Paper elevation={3} style={{ borderRadius: '10px', overflow: 'hidden', marginTop: '0px', background: '#333333', maxHeight: '500px', width: '100%' }}>
            <Grid container item direction='column' justifyContent='center' sx={{ background: 'black', height: '390px', overflow: 'hidden', display: 'flex', marginBottom: '.5rem' }}>
                <img src={main || defaultMain} alt='' style={{ width: '100%', maxheight: '400px' }} />
            </Grid>
            <Grid container item overflow='scroll' wrap='nowrap' justifyContent='start' columnGap={1}>
                {images && images.map((image, index) => (
                    <Grid key={image._id} item height='100px' marginLeft={index === 0 && '0'}>
                        <Button onClick={handleClick} style={{ padding: 0 }}>
                            <img alt='' src={image.url} style={{ height: '100px', width: '100px', objectFit: 'cover' }} />
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    )
}