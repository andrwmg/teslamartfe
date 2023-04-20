import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ListingCardInfo({ year, model, trim, mileage, price, location, interior, exterior, autopilot, author }) {
    return (
        <Grid container rowSpacing={4} columnSpacing={4} direction='row' alignItems='center' px={0} width='100%'>
            <Grid container item xs={12} wrap='nowrap' direction='row' justifyContent='space-between' width='100%'>
                <Grid container item xs wrap='wrap' direction='row'>
                    <Grid item container direction='column'>
                        <Typography noWrap component="span" variant="h5" color='primary.main' marginRight={1} width='auto'>
                            {year} {model}
                        </Typography>
                        <Typography noWrap component="span" variant="h6" color='primary.main' width='auto'>
                            {trim}
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} direction='column'>
                        <Typography variant="subtitle2" color="text.secondary" component="div" width='auto'>
                            Located in <b>{location}</b>
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div" width='auto'>
                            Posted by <b>{author && author.username}</b>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs direction='column' alignItems='flex-end'>
                    <Typography fontSize={14} width='fit-content'>${price}</Typography>
                    <Typography fontSize={14} width='fit-content' >{mileage} miles</Typography>
                </Grid>
            </Grid>


            {/* <Grid container item height='auto' direction='column' xs='auto' rowGap={4}> */}
            {/* <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Price
                    </Typography>
                    <Typography variant="h6" color="text.primary" component="div">
                        ${price}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Mileage
                    </Typography>
                    <Typography variant="h6" color="text.primary" component="div">
                        {mileage} miles
                    </Typography>
                </Grid> */}
            {/* </Grid>
            <Grid container item height='auto' direction='column' xs='auto' rowGap={4}> */}
            <Grid item>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Exterior
                </Typography>
                <Typography variant="h6" color="text.primary" component="div">
                    {exterior}
                </Typography>
            </Grid>
            <Grid item>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Interior
                </Typography>
                <Typography variant="h6" color="text.primary" component="div">
                    {interior}
                </Typography>
            </Grid>
            {/* </Grid>
            <Grid container item height='auto' direction='column' xs='auto' rowGap={4}> */}
            {/* <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Location
                    </Typography>
                    <Typography variant="h6" color="text.primary" component="div" overflow='auto'>
                        {location}
                    </Typography>
                </Grid> */}
            <Grid item>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Autopilot
                </Typography>
                <Typography variant="h6" color="text.primary" component="div">
                    {autopilot}
                </Typography>
            </Grid>
        </Grid>
        // </Grid>
    );
}


