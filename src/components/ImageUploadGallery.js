import React from 'react'
import { Grid } from '@mui/material';
import { SortableContainer } from 'react-sortable-hoc';
import { ImageUploadThumbnail } from './index';


const ImageUploadGallery = SortableContainer(({allImages, removeFile}) => {

    return (
        <Grid container item xs={12} direction='row' 
        rowGap={1} 
        columnGap='1%'
        >
            {
                allImages.map((image, index) => (
                    <ImageUploadThumbnail 
                    index={index} 
                    key={image._id ? image._id : image.id} 
                    id={image._id ? image._id : image.id} 
                    url={image.url ? image.url : image.tempURL} 
                    removeFile={removeFile} />
                ))
            }
        </Grid>
    )
})

export default ImageUploadGallery