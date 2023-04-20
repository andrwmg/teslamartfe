import { Grid } from '@mui/material'
import React from 'react'
import { UserProfileForm } from './index'

export default function UserProfile() {

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ width: '100%', height: 'auto' }}>
            <Grid item container xs={10} sm={6} lg={4} sx={{ height: 'auto' }}>
                <UserProfileForm />
            </Grid>
        </Grid>
    )
}