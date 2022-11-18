import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material'
import { v4 as uuid } from 'uuid'

export default function ImageCarousel({images})
{
    console.log(images)
    return (
        <Carousel maxHeight='300px' NextIcon={<img src="http://random.com/next"/>}
        PrevIcon={<img src="http://random.com/prev"/>}>
            {
                images.map( (item) => <Item key={uuid()} item={item} maxHeight='300px' /> )
            }
        </Carousel>
    )
}

function Item({item})
{
    return (
        <Paper>
            <img src={item.url} style={{maxHeight:'100%', maxWidth: '100%'}} />
        </Paper>
    )
}