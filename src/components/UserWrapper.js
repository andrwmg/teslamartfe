import { Grid } from '@mui/material'
import React from 'react'

export default function UserWrapper({ form }) {
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ width: '100vw', maxHeight: '90vh' }}>
            <Grid item container xs={10} sm={6} lg={4} pb={4} sx={{ height: 'auto' }}>
                {form}
            </Grid>
        </Grid>
    )
}