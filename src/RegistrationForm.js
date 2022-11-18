import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia, Grid, TextField } from '@mui/material';
import userService from './services/user.service';
import {useNavigate} from 'react-router-dom';
import { ListingContext } from './contexts/ListingContext';

export default function LoginForm() {
    const {register} = useContext(ListingContext)


    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        let obj = {email: email, username:username, password:password}
        // console.log(obj)
        // await userService.register(obj).then
        // feLogin(obj)
        register(obj)
        navigate('/listings')
        // navigate(-1)
    }

    return (
        <Card sx={{ width: '100%', mx: 'auto' }}>
            <CardMedia
                component="img"
                height="280"
                image="https://res.cloudinary.com/deuft4auk/image/upload/v1661794349/Tesla/0x0-0x0-Service_10_lgqvd1.jpg"
                alt="Tesla Mart Registration"
            />
            <CardContent>

                <form onSubmit={handleSubmit}>
                <Grid container item rowGap={4}>
                <Typography variant="h4" color="text.secondary">
                    Register
                </Typography>
                        <TextField
                            autoFocus={true}
                            id="outlined-email-input"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="current-email"
                            size="small"
                            fullWidth
                            required
                        />
                        <TextField
                            id="outlined-username-input"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={handleUsernameChange}
                            autoComplete="new-username"
                            autoFill='off'
                            size="small"
                            fullWidth
                            required
                        />
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            autoComplete="new-password"
                            size="small"
                            fullWidth
                            required
                        />
            {/* <CardActions> */}

                <Button type='submit' variant='contained' sx={{ width: '100%', mx: 'auto' }}>Submit</Button>
                <Button onClick={() => navigate('/login')} variant='text' sx={{ width: '100%', mx: 'auto' }}>Have an account? Log in.</Button>
            {/* </CardActions> */}
            </Grid>
            </form>

            </CardContent>
        </Card>
    );
}