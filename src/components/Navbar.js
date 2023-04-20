import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { grey } from '@mui/material/colors';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { ListingContext } from '../contexts/ListingContext';
import { DefaultAvatar } from './index';


const pages = ['Listings'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {userImage, setUserImage, logout} = React.useContext(ListingContext)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate()
  const auth = useAuthUser()
  const location = useLocation()
  const isAuthenticated = useIsAuthenticated()

  React.useEffect(()=>{
    const profile = window.localStorage.getItem('userImage')
    if (profile) {
      setUserImage(profile)
    }
  }, [])


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getBackground = () => {
    if (location.pathname === '/') {
      return 'transparent'
    } else {
      return grey[900]
    }
  }

  const handleMessages = () => {
    navigate('/messages')
  }

  const handleProfile = () => {
    navigate(`/profile/${auth().id}`)
  }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: getBackground(), color: 'white', height: '64px', boxShadow: location.pathname === '/' && 0 }}>
      <Container maxWidth="xl" style={{ height: '100%' }} >
        <Toolbar disableGutters style={{ height: '100%' }} >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex' },
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >

            Tesla Mart

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none' },
              flexGrow: 1,
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Tesla Mart
          </Typography>
          <Box sx={{ flexGrow: 0, marginLeft: 'auto' }}>
            <Button
              key='listingsButton'
              onClick={() => navigate('/listings')}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              Listings
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, marginLeft: 1 }}>
            {!isAuthenticated() ?
              <Button
                key='loginButton'
                onClick={() => navigate('/login')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Log In
              </Button>
              :
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    {userImage ?
                      <Avatar
                        alt={auth().username}
                        src={userImage}
                      />
                      :
                      <DefaultAvatar
                        username={auth().username}
                      />
                    }
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {/* {settings.map((setting) => ( */}
                  <MenuItem key='Messages' onClick={handleMessages}>
                    <Typography textAlign="center">Messages</Typography>
                  </MenuItem>
                  <MenuItem key='Profile' onClick={handleProfile}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem key='Log Out' onClick={logout}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                  {/* ))} */}
                </Menu>
              </>
            }
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;