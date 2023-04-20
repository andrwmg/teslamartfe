import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ListingCardInfo({ year, model, trim, mileage, price, location, interior, exterior, autopilot, author }) {
    return (
        <Grid container rowGap={4} columnGap={6} direction='row' alignItems='center' px={0}>
            <Grid container item xs={12} wrap='wrap'>
                    <Grid container item xs={12} wrap='wrap'>
                        <Typography noWrap component="span" variant="h5" color='primary.main' marginRight={1}>
                            {year} {model}
                        </Typography>
                        <Typography noWrap component="span" variant="h5" color='primary.main'>
                            {trim}
                        </Typography>
                        <Grid container item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Posted by <b>{author && author.username}</b>
                    </Typography>
                </Grid>
                    </Grid>
            </Grid>


            <Grid container item height='auto' direction='column' xs='auto' rowGap={4}>
                <Grid item>
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
                </Grid>
            </Grid>
            <Grid container item height='auto' direction='column' xs='auto' rowGap={4}>
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
            </Grid>
            <Grid container item height='auto' direction='column' xs='auto' rowGap={4}>
                <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Location
                    </Typography>
                    <Typography variant="h6" color="text.primary" component="div" overflow='auto'>
                        {location}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Autopilot
                    </Typography>
                    <Typography variant="h6" color="text.primary" component="div">
                        {autopilot}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}


