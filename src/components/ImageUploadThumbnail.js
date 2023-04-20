import React from 'react';
import { Clear } from '@mui/icons-material';
import styled from '@emotion/styled';
import { SortableElement } from 'react-sortable-hoc';
import { Box } from '@mui/system';

const X = styled(Clear)(() => ({
    position: 'absolute',
    right: '0px',
    top: '0px',
    color: 'white',
    backgroundColor: 'darkgray',
    display: 'inline-block',
    zIndex: 2,
    transform: 'scale(1)',
    transition: 'all .25s ease-in-out',
    borderRadius: '50%',
    marginRight: '5%',
    marginTop: '5%',
    '&:hover': {
        transform: 'scale(1.5)'
    }
}))

const Preview = styled(Box)(() => ({
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    borderRadius: '10px',
}))

const ImageUploadThumbnail = SortableElement(({ url, id, removeFile }) => {

        const handleRemove = (e) => {
            e.stopPropagation();
            removeFile(id)
        }

        return (
            <Preview sx={{
                width: { xs: '32.66%', md: '19.2%' }, height: { xs: '30vw', md: '18vw', lg: '14vw' }
            }} onContextMenu={(e)=>{e.preventDefault()}}>
                <X id='deletebutton' 
                sx={{
                    width: { xs: '25px', md: '20px' },
                    height: { xs: '25px', md: '20px' }
                }} 
                onClick={handleRemove} />
                <img alt='' id={id} src={url} style={{
                    flexShrink: 0,
                    height: '100%', width: '100%', objectFit: 'cover'
                }} />
            </Preview>
        )
    }
)

export default ImageUploadThumbnail