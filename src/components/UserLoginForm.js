import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid, IconButton, Paper, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../contexts/ListingContext';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
    const { login, setLoading, verify } = useContext(ListingContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const params = useParams()

    useEffect(() => {
        if (params.token) {
            verify(params.token)
        }
        setLoading(false)
    }, [])

    const navigate = useNavigate()

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
        login(obj)
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
                    <Grid container item direction='column' rowGap={4}>
                        <Typography variant="h4" color="text.secondary">
                            Log In
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
                        <Grid container item gap={2}>
                            <Grid container item direction='column' xs={12} md>
                                <Button
                                    type="submit"
                                    variant='contained'
                                    sx={{ width: '100%', mx: 'auto' }}>
                                    Log In
                                </Button>
                            </Grid>

                            <Grid container item direction='column' xs={12} md>
                                <Button onClick={() => navigate('/register')} variant='outlined' sx={{ width: '100%', mx: 'auto' }}>Sign Up</Button>
                            </Grid>
                        </Grid>
                        <Button onClick={() => navigate('/forgot')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Forgot password?</Button>
                    </Grid>
                </Paper>
            </CardContent>
        </Card>
    );
}

