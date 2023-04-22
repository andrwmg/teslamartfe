import { Button, Grid, Paper } from '@mui/material'
import React, {  useState } from 'react'

export default function ShowGallery({ images, defaultMain }) {
    
    const [main, setMain] = useState(defaultMain)

    const handleClick = (event) => {
        setMain(event.target.getAttribute('src'))
    }

    return (
        <Paper elevation={0} style={{borderRadius:'10px',overflow:'hidden',marginTop: '0px', background: '#242424', height: '100%', maxHeight:{xs: '30%', md: '100%'}, width:'100%'}}>
            <Grid container item direction='column' justifyContent='center' sx={{ background: '#000', height: 'calc(100% - 108px)', overflow: 'hidden', display: 'flex', marginBottom: '.5rem' }}>
                <img id='mainImage' src={main || defaultMain} alt=''
                style={{ width: '100%', objectFit:'contain' }} 
                />
            </Grid>
            <Grid container item overflow='scroll' wrap='nowrap' justifyContent='start' columnGap={1} height='100px'>
                {images && images.map((image, index) => (
                    <Grid key={image._id} item height='100%' marginLeft={index === 0 && '0'}>
                        <Button onClick={handleClick} style={{ padding: 0 }}>
                            <img alt='' src={image.url} style={{ height: '100px',width:'100px', objectFit:'cover' }} />
                        </Button>
                    </Grid>
                ))}
        </Grid>
        </Paper>
    )
}