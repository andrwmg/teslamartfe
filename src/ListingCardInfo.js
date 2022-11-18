import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function ListingCardInfo({ _id, year, model, trim, mileage, price, location, interior, exterior, autopilot }) {
    return (
        <Grid container rowSpacing={1} alignItems='flex-start' px={0}>
            <Link 
                to={`/listings/${_id}`}
                style={{textDecoration: 'none'}}
                >
            <Grid container item direction='row'>

                <Typography noWrap component="span" variant="h5" color='primary.main' marginRight={1}>
                    {year} {model}
                </Typography>
                <Typography noWrap component="span" variant="h5" color='primary.main'>
                    {trim}
                </Typography>

            </Grid>

            </Link>

            <Grid item container direction='row' columnSpacing={4}>
                <Grid item height='auto'>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Price
                    </Typography>
                    <Typography variant="body1" color="text.primary" component="div">
                        ${price}
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Mileage
                    </Typography>
                    <Typography variant="body1" color="text.primary" component="div">
                        {mileage} miles
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container direction='row' columnSpacing={4} >
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
                <Grid item>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Autopilot
                    </Typography>
                    <Typography variant="body1" color="text.primary" component="div">
                        {autopilot}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary" component="div">
                    Location
                </Typography>
                <Typography variant="body1" color="text.primary" component="div">
                    {location}
                </Typography>
            </Grid>
        </Grid>
    );
}


