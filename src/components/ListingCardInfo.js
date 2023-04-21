import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ListingCardInfo({ year, model, trim, mileage, price, location, interior, exterior, autopilot, author }) {
    return (
        <Grid container direction='row' gap={2} alignItems='start' justifyContent='start'>
            <Grid container item direction='column' xs={12}>
                <Grid container item>
                <Typography noWrap variant='h4' color='primary.main' marginRight={1} width='auto'>
                    {year} {model}
                </Typography>
                <Typography noWrap variant='h4' color='primary.main' width='auto'>
                    {trim}
                </Typography>
                </Grid>
                <Grid container item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Located in <b>{location}</b>
                    </Typography>
                </Grid>
                <Grid container item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Posted by <b>{author && author.username}</b>
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item direction='column' xs={12} md='auto' gap={3} justifyContent='start' minHeight='100%'>
                <Grid container item justifyContent='start' gap={3}>
                    <Grid container item direction='column' xs='auto'>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Price
                        </Typography>

                        <Typography variant="body1" color="text.primary" component="div">
                            ${price.toLocaleString()}
                        </Typography>
                    </Grid>

                    <Grid container item direction='column' xs>

                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Mileage
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {mileage.toLocaleString()} miles
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>
            <Grid container item direction='column' xs={12} md='auto' lg={12} gap={3}>
                <Grid container item height='auto' direction='column' xs={12} md gap={3}>
                    <Grid container item justifyContent='start' gap={3}>
                        <Grid container item direction='column' xs='auto'>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                Exterior
                            </Typography>
                            <Typography variant="body1" color="text.primary" component="div">
                                {exterior}
                            </Typography>
                        </Grid>
                        <Grid container item direction='column' xs='auto'>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                Interior
                            </Typography>
                            <Typography variant="body1" color="text.primary" component="div">
                                {interior}
                            </Typography>
                        </Grid>
                        <Grid container item direction='column' xs='auto'>
                            <Typography variant="subtitle2" color="text.secondary" component="div">
                                Autopilot
                            </Typography>
                            <Typography variant="body1" color="text.primary" component="div">
                                {autopilot}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}


