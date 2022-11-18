import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import userService from './services/user.service';
import { useSignOut } from 'react-auth-kit'
import { useAuthUser } from 'react-auth-kit'
import LoadingOverlay from './LoadingOverlay';
import { Grid } from '@mui/material';
import { ListingContext } from './contexts/ListingContext';



const drawerWidth = 240;

const navItems = [{ path: '/listings', text: 'Listings' }, { path: '/listings/new', text: 'New Listing' }];


function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const {message, setMessage} = useContext(ListingContext)

    const container = window !== undefined ? () => window().document.body : undefined;

    const location = useLocation()
    const navigate = useNavigate()
    const signOut = useSignOut()
    const auth = useAuthUser()

    const isLoggedIn = (auth() || false)

    const handleCreateNew = () => {
        if (!auth()) {
            setMessage('Please log in to do that!')
        }
        navigate('/listings/new')
    }

    const handleLogout = () => {
        console.log(auth())
        signOut();
        console.log(auth())
        navigate(0);
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', overflow: 'scroll' }}>
            <Link to='/' style={{textDecoration: 'none'}}>
                <Typography color='primary' variant="h6" sx={{ my: 2}}>
                    Tesla Mart
                </Typography>
            </Link>
            <Divider />
            <Grid container flexDirection='column'>
                {navItems.map((item) => (
                    <NavLink style={{ textDecoration: 'none' }} key={item.text} to={item.path}>
                        <Button sx={{ textAlign: 'center' }}>
                            {item.text}
                        </Button>
                    </NavLink>
                ))}
                {!isLoggedIn ?
                    <NavLink style={{ textDecoration: 'none' }} key='login' to='/login'>
                        <Button sx={{ textAlign: 'center' }}>
                            Log In
                        </Button>
                    </NavLink>
                    :
                    <NavLink style={{ textDecoration: 'none' }} key='logout'>
                        <Button onClick={handleLogout} sx={{ textAlign: 'center' }}>
                            Log Out
                        </Button>
                    </NavLink>
                }
            </Grid>
        </Box>
    );



    return (
        <Box sx={{ display: 'flex', height: '100%', minHeight:'100vh' }}>
            {location.pathname !== '/' &&
                <AppBar component="nav" sx={{ backgroundColor: grey[900], color: 'white' }}>
                    <Toolbar style={{height:'64px'}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>

                                Tesla Mart
                            </Link>

                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {navItems.map((item) => (
                                <NavLink key={item.text} style={{ textDecoration: 'none' }} to={item.path}>
                                    <Button sx={{ color: '#fff' }}>
                                        {item.text}
                                    </Button>
                                </NavLink>
                            ))}
                            {!isLoggedIn ?
                                <NavLink key={'loginbutton'} style={{ textDecoration: 'none' }} to='/login'>
                                    <Button sx={{ color: '#fff' }}>
                                        Log In
                                    </Button>
                                </NavLink>
                                :
                                <NavLink key={'logoutButton'} style={{ textDecoration: 'none' }}>
                                    <Button onClick={handleLogout} sx={{ color: '#fff' }}>
                                        Log Out
                                    </Button>
                                </NavLink>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            }
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{
                // p: 3, 
                width: '100%', p: 0, height: '100%', minHeight:'100vh'
            }}>
                <Toolbar style={{height: '64px'}}/>
                {/* <LoadingOverlay /> */}
                {props.children}
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;
