import React, { useEffect, useState } from 'react'
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import { useAuthUser } from 'react-auth-kit';
import { DefaultAvatar } from './index';



export default function UserConversationItem ({message, changeRecipient}) {
    const [contact, setContact] = useState('')
    const [body, setBody] = useState('')
    const [avatar, setAvatar] = useState('')

    const auth = useAuthUser()

        useEffect(() => {
            if (message.to._id === auth().id) {
                setContact(message.from)
                setBody(message.body)
            } else if (message.from._id === auth().id) {
                setContact(message.to)
                setBody(`You: ${message.body}`)
            }
            else {
                setContact(message.from)
                setBody(message.body)
            }
        }, [message])

        useEffect(()=>{
            setAvatar(getAvatar())
        }, [contact])

        const handleClick = () => {
            changeRecipient(contact)
        }
    
        const getAvatar = () => {
            if (contact.image) {
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
        <ListItem key={message._id} disablePadding>
        <ListItemButton onClick={handleClick}>
          <ListItemAvatar>
            {avatar && avatar}
          </ListItemAvatar>
          <ListItemText primary={contact.username} secondary={body}  />
        </ListItemButton>
      </ListItem>
    )
}