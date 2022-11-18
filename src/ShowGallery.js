import { Button, Grid, Paper } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Add } from '@mui/icons-material'
// import { v4 as uuid } from 'uuid'
import { ListingContext } from './contexts/ListingContext'
import { useParams } from 'react-router-dom'

export default function ShowGallery({ images, defaultMain }) {
    
    const [main, setMain] = useState(defaultMain)

    const { allListings, getListing, currentListing, getAllListings, currentImages } = useContext(ListingContext)

    const imgUrls = images.map(img => img.urls)
    // console.log(imgUrls[0])
    // const imgFilenames = images.map(img => img.filename)
    // const imgIds = images.map(img => img._id)

    // const [renderImages, setRenderImages] = useState(initialImages)

    // useEffect(() => {
    //     getAllListings().then(() => {

    //     })
    // }, [])
    // useEffect(() => {
    //     const tmr = setTimeout(()=>{
    //         getListing(id)
    //         setImages(currentListing.images)
    //     },3000)
    //     return () => clearTimeout(tmr);
    // }, [])

    // const initialImages = []
    // for (let i = 0; i < 3; i++) {
    //     (images[i] && initialImages.push(images[i]))
    // }
    // const [images,setImages] = useState([])
    // const [main, setMain] = useState(images[0])
    // const [renderImages, setRenderImages] = useState(initialImages)

    // const listing = allListings.filter(list => list._id === id)
    // setImages(listing.images)

    const handleClick = (event) => {
        setMain(event.target.getAttribute('src'))
    }

    // const toggleExpand = () => {
    //     setRenderImages(images)
    // }


    // const newList = images.map(image => imageimage.aspect)

    // for (let img of document.querySelectorAll('img')) {
    //     if ((img.height / img.width) > 1) {
    //         img.classList.add('img-tall')
    //     } else {
    //         img.classList.add('img-wide')
    //     }
    // }

    return (
        <Paper elevation={3} style={{borderRadius:'10px',overflow:'hidden',marginTop: '0px', background: '#333333', maxHeight: '500px'}}>
        {/* <Grid container item direction='row' overflow='hidden' borderRadius='10px' sx={{ marginTop: '0px', background: '#333333' }}> */}
            <Grid container item direction='column' justifyContent='center' sx={{ background: 'black', height: '390px', overflow: 'hidden', display: 'flex', marginBottom: '.5rem' }}>
                <img src={main || defaultMain} alt='' style={{ width: '100%', maxheight: '400px' }} />
            </Grid>
            <Grid container item overflow='scroll' wrap='nowrap' justifyContent='start' columnGap={1}>
                {images && images.map((image, index) => (
                    <Grid key={image._id} item height='100px' marginLeft={index === 0 && '0'}>
                        <Button onClick={handleClick} style={{ padding: 0 }}>
                            <img alt='' src={image.url} style={{ height: '100px',width:'100px', objectFit:'cover' }} />
                        </Button>
                    </Grid>
                ))}
                {/* {(renderImages.length < 4 && images.length > 3) &&
                        <Add onClick={toggleExpand} fontSize="large" style={{ height: '100px', padding: '0 50px', backgroundColor: 'black', marginLeft: '.5rem', color: 'white' }} />
                    } */}
            {/* </Grid> */}
        </Grid>
        </Paper>
    )
}