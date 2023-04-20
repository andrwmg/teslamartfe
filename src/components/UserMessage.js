import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Avatar, Grid } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import { useAuthUser } from 'react-auth-kit';
import { DefaultAvatar } from './index'

export default function Message({ message, conversationListItem, changeRecipient, index }) {

    const [body, setBody] = useState('')
    const [contact, setContact] = useState('')
    const [avatar, setAvatar] = useState('')

    const auth = useAuthUser()

    conversationListItem && (
        useEffect(() => {
            if (message.to._id === auth().id) {
                setBody(message.body)
                setContact(message.from)
            } else if (message.from._id === auth().id) {
                setBody(`You: ${message.body}`)
                setContact(message.to)
            }
            else {
                setBody(message.body)
                setContact(message.from)
            }
        }, [message]))

        useEffect(()=>{
            setAvatar(getAvatar())
        }, [contact])

    const handleClick = () => {
        changeRecipient(contact)
    }

    const getAvatar = () => {
        if (contact) {
            if (contact.image.url !== '' && contact.image.url !== "/broken-image.jpg") {
                return <Avatar alt={contact.username} src={contact.image.url} />
            } else {
                return <DefaultAvatar username={contact.username} />
            }
        } else {
            if (message.from.image && message.from.image.url !== '' && message.from.image.url !== "/broken-image.jpg") {
                return <Avatar alt={message.from.username} src={message.from.image.url} />
            } else {
                return <DefaultAvatar username={message.from.username} />
            }
        }
    }

        return (
            <>
                {message &&
                    <Grid maxWidth={{xs: '80%', md: '50%'}} marginLeft={(auth().id === message.from._id) && 'auto'} marginRight={(auth().id !== message.from._id) && 'auto'}marginTop={index === 0 && 'auto'}>
                        <Card elevation={2} sx={{ width: '100%' }} onClick={conversationListItem ? handleClick : null}>
                            <Grid container item direction='row' columnGap={2} display='flex' xs={12} padding={2} bgcolor={(auth().id === message.from._id) && lightBlue[50]} wrap='nowrap' >
                                <Grid container item xs='auto' direction='column' justifyContent='flex-end'>
                                    {avatar && avatar}
                                </Grid>
                                <Grid container item xs direction='row' rowGap={2} alignItems='center'>
                                    <Grid item container direction='column' width='100%'>
                                        <Grid container item xs>

                                            <Typography variant="subtitle2" component='div' color="primary">
                                                <b>{contact.username}</b>
                                            </Typography>
                                        </Grid>

                                        <Grid container item direction='column' xs={12}>

                                            <Typography variant='body2' component='div' color="text.primary">
                                                {body !== '' ? body : message.body}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                }
            </>
        );
    }

