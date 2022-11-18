import { Alert, Grid } from '@mui/material'
import React from 'react'
import LoginForm from './LoginForm'

export default function Login (props) {
    const {message} = props
    return (
        <Grid container direction='row' justifyContent='center' alignItems='center' sx={{width: '100vw', height: '90vh'}}>
      <Grid item container xs={10} sm={6} lg={4} sx={{height: 'auto'}}>
            <LoginForm />
            </Grid>
        </Grid>
    )
}