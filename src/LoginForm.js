import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid, TextField } from '@mui/material';
import userService from './services/user.service';
import { useNavigate } from 'react-router-dom';
import { ListingContext } from './contexts/ListingContext';

// if (signIn(
//     {
//         token: res.data.token,
//         expiresIn: 1000 * 60 * 60 * 24 * 7,
//         tokenType: "Bearer",
//         authState: { email: res.data.email, username: res.data.username, _id: res.data._id },
//         // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
//         // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
//     }
// )) 
// {
//     navigate('/listings')
// }

export default function LoginForm() {
    const { login } = useContext(ListingContext)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let obj = { username: username, password: password }
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
                <form onSubmit={handleSubmit}>

                    <Grid container item rowGap={4}>
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
                            type="password"
                            autoComplete="current-password"
                            size="small"
                            fullWidth
                            required
                        />
                        {/* <CardActions> */}

                        <Button
                            // onClick={handleSubmit}
                            type="submit"
                            variant='contained'
                            sx={{ width: '100%', mx: 'auto' }}>
                            Log In
                        </Button>
                        <Button onClick={() => navigate('/register')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Sign Up</Button>

                        {/* </CardActions> */}
                    </Grid>
                </form>

            </CardContent>

        </Card>
    );
}