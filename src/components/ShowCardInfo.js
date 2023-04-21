import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function ShowCardInfo({ year, model, trim, mileage, price, location, description, interior, exterior, autopilot, condition, title, username }) {

    return (
        <Grid item container direction='column'
            overflow={{ xs: 'visible', md: 'scroll' }}
            maxHeight='calc(665.5px - 97px)' wrap='nowrap'>
            <Grid container item direction='row' xs={12} pb={3} alignItems='flex-start'>
                <Typography noWrap variant="h4" color='primary.main' marginRight={1} maxHeight='32.5px' my={0}>
                    {year} {model}
                </Typography>
                <Typography noWrap variant="h4" color='primary.main' maxHeight='32.5px'>
                    {trim}
                </Typography>
                <Grid container item xs={12}>
                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Posted by <b>{username}</b>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item direction='row' rowGap={3} columnGap={2} pb={3} justifyContent='space-between'>

                <Grid item container direction='column' xs={5} sm md={5} lg rowGap={3}>
                    <Grid item>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Price
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            ${price && price.toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Mileage
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {mileage && mileage.toLocaleString()} miles
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction='column' xs={5} sm md={5} lg rowGap={3}>
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

                <Grid item container direction='column' xs={5} sm md={5} lg rowGap={3}>
                    <Grid item xs>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Autopilot
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div" noWrap={true}>
                            {autopilot}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Location
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div" noWrap={true}>
                            {location}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction='column' xs={5} sm md={5} lg rowGap={3}>
                    <Grid item xs>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Condition
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {condition}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            Title
                        </Typography>
                        <Typography variant="body1" color="text.primary" component="div">
                            {title}
                        </Typography>
                    </Grid>
                </Grid>

            </Grid>


{description  &&
            <Grid item container direction='column' xs={12} rowGap={3} paddingBottom={2}>
                <Grid item xs='auto'>

                    <Typography variant="subtitle2" color="text.secondary" component="div">
                        Description
                    </Typography>
                    <Typography variant="body1" color="text.primary" component="div" whiteSpace='break-spaces'>
                        {description}
                    </Typography>
                </Grid>
            </Grid>
}
        </Grid>
    );
}