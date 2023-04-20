import { Grid } from '@mui/material'
import React from 'react'
import { VerifyCard } from '../components/index'

export default function Verify () {

    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' sx={{width: '100vw', height: '90vh'}}>
      <Grid item container xs={10} sm={6} lg={4} sx={{height: 'auto'}}>
            <VerifyCard />
            </Grid>
        </Grid>
    )
}