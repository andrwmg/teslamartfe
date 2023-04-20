import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardMedia, Grid, IconButton, InputAdornment, Paper, TextField } from '@mui/material';
import { ListingContext } from '../contexts/ListingContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default React.memo(function VerifyCard() {
    const { setLoading, resend } = useContext(ListingContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(()=>{
        setLoading(false)
    }, [])

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let obj = { username, password }
        resend(obj)
    }

    return (
        <Card sx={{ width: '100%', height: '100%', m: 'auto' }}>
                        <CardMedia
                component="img"
                height="280"
                image="https://res.cloudinary.com/deuft4auk/image/upload/v1661794348/Tesla/0x0-0x0-Service_21_fatbwh.jpg"
                alt="Tesla Mart Registration"
            />
            <CardContent>
                <Paper elevation={0} component='form' onSubmit={handleSubmit}>
                    <Grid container item direction='column' rowGap={4} justifyContent='center'>
                    
                        <Typography variant="h6" color="text.secondary" textAlign='center'>
                            Your verification code has already been sent.
                        </Typography>
                        <TextField
                             
                            id="outlined-username-input"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="current-username"
                            size="small"
                            fullWidth
                            required
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            value={password}
                            onChange={handlePasswordChange}
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            size="small"
                            fullWidth
                            required
                            InputProps={{
                                endAdornment:
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                            }}
                        />
                        <Button onClick={handleSubmit}>Resend</Button>
                    </Grid>
                </Paper>
            </CardContent>
        </Card>
    );
})