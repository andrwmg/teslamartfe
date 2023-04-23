import React, { useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Grid, Typography } from '@mui/material';
import { ListingContext } from '../contexts/ListingContext';
import { v4 as uuid } from 'uuid'
import { arrayMove } from 'react-sortable-hoc';
import { ImageUploadGallery } from './index';


export default function ImageUpload({ setImages }) {

  const { allImages, setAllImages, existingImages } = useContext(ListingContext)

  const [disabled, setDisabled] = useState(false)

  const maxImages = 14

  useEffect(() => {
    setImages([])
  }, [])

  useEffect(() => {
    setAllImages([...existingImages])
  }, [existingImages])

  const selectFiles = (event) => {
    let result = allImages
    for (let file of event.target.files) {
      if (allImages.length > maxImages) {
        setDisabled(true)
        break
      } else {
        result.push({ data: file, id: uuid(), tempURL: URL.createObjectURL(file) })
      }
    }
    setAllImages([...result])
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setAllImages((allImages) => arrayMove(allImages, oldIndex, newIndex))
  };

  const removeFile = (id) => {
    const result = allImages.filter(image => image.id !== id && image._id !== id)
    setDisabled(false)
    setAllImages([...result])
  }

  return (
    <Grid container gap={2}>
      <label htmlFor="images">
        <div className="form-group">
          <input
            id="images"
            name="images"
            style={{ display: 'none' }}
            type="file"
            accept=".jpg,.jpeg,.png,.bmp"
            onChange={selectFiles}
            multiple
            disabled={disabled}
          />
        </div>
        <div className="form-group">
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
            Choose Images
          </Button>
        </div>
      </label>
      <Grid container item xs={12} direction='row'
        rowGap={1}
        columnGap='1%'
      >
                    {allImages.length > 1 ?
          <Typography variant='body1' color="text.secondary" ><i>Drag images to reorder</i></Typography>
          : null}
      </Grid>
      
      <ImageUploadGallery onSortEnd={onSortEnd} axis='xy' removeFile={removeFile} allImages={allImages} />
    </Grid >
  );
}