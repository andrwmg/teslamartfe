import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const handleUpload = (event) => {
    console.log(event.target)
}

export default function ImageUpload() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Button variant="contained" component="label">
        Upload
        <input hidden onClick={handleUpload} accept="image/*" multiple type="file" />
      </Button>
      {/* <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton> */}
    </Stack>
  );
}