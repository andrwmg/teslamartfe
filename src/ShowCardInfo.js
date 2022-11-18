import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ShowCardInfo({ year, model, trim, mileage, price, location, description, interior, exterior, autopilot, getListing, showCard }) {

    return (
        <Grid container item flexDirection='row' rowGap={3} justifyContent='flex-start' alignItems='flex-start' py={2}>
            <Grid container item xs={12}>
                <Typography noWrap component="span" variant="h5" color='primary.main' marginRight={1}>
                    {year} {model}
                </Typography>
                <Typography noWrap component="span" variant="h5" color='primary.main'>
                    {trim}
                </Typography>
            </Grid>

            <Grid container item flexDirection='row' columnGap={5}>

                <Grid item container direction='column' xs='auto' rowGap={3}>
                    <Grid item xs='auto'>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Price
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            ${price}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Mileage
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {mileage} miles
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction='column' xs='auto' rowGap={3}>
                    <Grid item>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Exterior
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {exterior}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Interior
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {interior}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction='column' xs='auto' rowGap={3}>
                    <Grid item xs='auto'>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Location
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {location}
                        </Typography>
                    </Grid>
                    <Grid item xs='auto'>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Autopilot
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {autopilot}
                        </Typography>
                    </Grid>
                </Grid>
                </Grid>



            <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Description
                </Typography>
                <Typography variant="body1" color="text.primary" component="div" sx={{ whiteSpace: 'pre-line'}}>
                    {description}
                </Typography>
            </Grid>
        </Grid>


    );
}


