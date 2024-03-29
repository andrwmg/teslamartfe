import { Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuthUser } from 'react-auth-kit'
import { UserMessageList, UserConversationItem } from './index'
import userService from '../services/user.service';
import MessagesDrawer from './UserMessagesDrawer';

const drawerWidth = 400;

export default React.memo(function Messages({ window }) {

    const [mobileOpen, setMobileOpen] = React.useState(true);
    const [loaded, setLoaded] = useState(false)
    const [allMessages, setAllMessages] = useState([])
    const [messages, setMessages] = useState([])
    const [conversationList, setConversationList] = useState([
        {
            body: '',
            from: { _id: '', image: { url: '' } },
            to: { _id: '', image: { url: '' } },
            _id: ''
        }])
    const [recipient, setRecipient] = useState('')

    const auth = useAuthUser()

    const updateAllMessages = () => {
        const id = auth().id
        userService.getUser({id})
        .then(({data})=> {
            console.log(data)
            setAllMessages([...data.inbox, ...data.outbox].sort((a, b) => a.createdAt.localeCompare(b.createdAt)))
        })
    }

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    useEffect(() => {
        updateAllMessages()
    }, [])

    useEffect(() => {
        setLoaded(true)
        // Get all contacts out of inbox and outbox
        const fromContacts = allMessages.map(message => message.from._id)
        const toContacts = allMessages.map(message => message.to._id)
        const contacts = [...fromContacts, ...toContacts]
        // Set new arrays for all conversations, messages to/from each contact, and list of newest message in each conversation
        const conversations = []
        const conversationList = []

        // Create array inside of conversations for each contact and fill it with the messages for each one. Then, once a contact is done, add the last message in that contact's array to the conversationList. Do this everytime inbox or outbox changes.
        for (let c of contacts) {
            if ((c !== auth().id) && (!conversations[c])) {
                conversations[c] = []
                for (let m of allMessages) {
                    if (m.from._id === c || m.to._id === c) {
                        conversations[c].push(m)
                    }
                }
                conversationList.push(conversations[c][conversations[c].length - 1])
            }
        }
        setConversationList(conversationList.sort((a, b) => b.createdAt.localeCompare(a.createdAt)))

    }, [allMessages])

    const changeRecipient = (contact) => {
        contact._id !== recipient._id && setRecipient(contact);
        setMobileOpen(false)
    }

    useEffect(() => {
        populateMessages()
    }, [recipient])

    const populateMessages = () => {
        const {id} = auth()
        userService.getUser({id})
            .then(({ data }) => {
                const conversation = []
                const allMessages = [...data.inbox, ...data.outbox].sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                setAllMessages(allMessages)
                for (let message of allMessages) {
                    if ((message.from._id === recipient._id) || (message.to._id === recipient._id)) {
                        conversation.push(message)
                    }
                }
                setMessages(conversation)
            })
    }

    const list = (
        <div style={{ height: 'calc(100vh - 64px)', backgroundColor: 'none', zIndex: 1 }}>
            <List>
                {conversationList && conversationList.map((message, index) => (
                    <UserConversationItem key={message._id} message={message} changeRecipient={changeRecipient} />
                ))}
            </List>
        </div>
    );

    return (
        <Box sx={{ display: 'flex', width: '100%', position: 'fixed', height: 'calc(100% - 128px)' }}>
            {allMessages.length === 0 ?
                null
                :
                <MessagesDrawer list={list} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
            }
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, pt: 0, width: { md: `calc(100vw - ${drawerWidth}px)`, height: 'calc(100vh - 128px)' } }}
            >
                <Grid container direction='row' justifyContent='center' alignItems='center' width='100%' height='calc(100vh - 128px)' columnGap={4}>
                    {loaded && allMessages.length === 0 ?
                        <Grid container item justifyContent='center' alignItems='center'>
                            <Typography variant='h4' color='text.primary'>
                                No messages
                            </Typography>
                        </Grid>

                        :
                        <>
                            {recipient !== '' ?
                                <>
                                    <Grid item container xs={12} direction='row' alignItems='center' width='100%' pb={2} display='flex'>
                                        <IconButton onClick={() => setMobileOpen(true)} sx={{ justifySelf: 'flex-start', display: { xs: 'inline-block', md: 'none' } }}>
                                            <MenuIcon />
                                        </IconButton>
                                        <Typography variant='body1' color='primary' mx='auto'>
                                            {recipient.username}</Typography>
                                    </Grid>

                                    <UserMessageList messages={messages} setAllMessages={setAllMessages} recipient={recipient} populateMessages={populateMessages} changeRecipient={changeRecipient} />
                                </> : null
                            }
                        </>
                    }
                </Grid>
            </Box>
        </Box>
    )
})