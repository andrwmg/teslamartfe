import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid, TextField } from '@mui/material';
import { ListingContext } from '../contexts/ListingContext';
import UploadFilesService from '../services/upload-files.service'
import { useAuthUser } from 'react-auth-kit';
import { DefaultAvatar } from './index'


export default function UserProfileForm() {
  const { updateUser, setLoading, userImage } = useContext(ListingContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [tempImage, setTempImage] = useState(null)

  const auth = useAuthUser()

  // const [userImage, setUserImage] = useState((profile !== undefined) ? [JSON.parse(profile)] : null)

  useEffect(() => {
    setUsername(auth().username)
    setEmail(auth().email)
  }, [])

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
    setLoading(true)
    if (tempImage) {
      const image = await UploadFilesService.upload([tempImage])
      let obj = {
        image: image[0]
      }
        updateUser(obj)
        setTempImage(null)
    }

  }

  const selectFile = (event) => {
    const file = event.target.files
    const image = { data: file[0], url: URL.createObjectURL(file[0]) }
    setTempImage(image)
  }

  return (
    <Card sx={{ width: '100%', mx: 'auto' }}>
      <CardContent>
      <form onSubmit={handleSubmit}>
          <Grid container item rowGap={4}>
            <Typography variant="h4" color="text.secondary">
              Profile
            </Typography>
            <Grid container item justifyContent='start'>
            <Grid container item direction='column' gap={2} alignItems='center' width='auto'>
            <Grid container item width='150px' height='150px' position='relative'>
              <label htmlFor="images">
                <div className="form-group">
                  <input
                    id="images"
                    name="images"
                    style={{ display: 'none' }}
                    type="file"
                    accept=".jpg,.jpeg,.png,.bmp"
                    onChange={selectFile}
                  />
                </div>
                <div className="form-group" style={{ height: '150px', width: '150px', borderRadius: '50%', position: 'relative' }}>
                  <Button
                    className="btn-choose"
                    variant="outlined"
                    component="div"
                    sx={{ borderRadius: '50%', p: 0, height: '150px', width: '150px', position: 'absolute', zIndex: 101251 }}>
                    {(tempImage || userImage) ?
                      <Avatar
                        alt={auth().username}
                        src={tempImage ? tempImage.url : userImage}
                        style={{ height: '100%', width: '100%', objectFit: 'cover', p: 'none', borderRadius: '50%' }} />
                      :
                      <DefaultAvatar width='100%' height='100%' font='2.5rem' username={auth().username} />
                    }
                  </Button>
                </div>
              </label>
            </Grid>
            <Typography variant='body1' fontWeight={700}>Change profile picture</Typography>
            </Grid>
            </Grid>
            <TextField
               
              id="outlined-email-input"
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="new-email"
              size="small"
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              id="outlined-username-input"
              label="Username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="new-username"
              size="small"
              fullWidth
              disabled={!isEditing}
              required
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="text"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
              size="small"
              fullWidth
              disabled={!isEditing}
              required
            />

            <Button type='submit' disabled={!tempImage} variant='contained' sx={{ width: '100%', mx: 'auto' }}>
              Save
            </Button>
          </Grid>
          </form>

      </CardContent>
    </Card>
  );
}