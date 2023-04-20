import { Grid, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { ListingContext } from '../contexts/ListingContext'
import MessageList from '../UserMessageList'
import UserDataService from '../services/user.service'
import Message from '../UserMessage'
import MessagesDrawer from '../UserMessagesDrawer'

export default function Messages() {

    const [allMessages, setAllMessages] = useState([])
    const [messages, setMessages] = useState([])
    const { user, getUser, setUser } = useContext(ListingContext)
    const [conversationList, setConversationList] = useState([
        {
            body: '',
            from: { _id: '', image: { url: '' } },
            to: { _id: '', image: { url: '' } },
            _id: ''
        }])
    const [recipient, setRecipient] = useState('')

    const updateAllMessages = () => {
        UserDataService.getUser()
            .then(({ data }) => {
                setUser(data)
                setAllMessages([...data.inbox, ...data.outbox])
            })
    }

    useEffect(() => {
        updateAllMessages()
    }, [])

    useEffect(() => {
        // Get all contacts out of inbox and outbox
        const fromContacts = allMessages.map(message => message.from._id)
        const toContacts = allMessages.map(message => message.to._id)
        const contacts = [...fromContacts, ...toContacts]
        // Set new arrays for all conversations, messages to/from each contact, and list of newest message in each conversation
        const conversations = []
        const contactMessages = []
        const conversationList = []

        // Create array inside of conversations for each contact and fill it with the messages for each one. Then, once a contact is done, add the last message in that contact's array to the conversationList. Do this everytime inbox or outbox changes.

        for (let c of contacts) {
            if ((c !== user._id) && (conversations[c] === undefined)) {
                conversations[c] = []
                for (let m of allMessages) {
                    if (m.from._id === c || m.to._id === c) {
                        conversations[c].push(m)
                        contactMessages.push(m)
                    }
                }
                conversationList.push(conversations[c][conversations[c].length - 1])
            }
        }
        setConversationList(conversationList)

    }, [allMessages])

    const changeRecipient = (contact) => {
        setRecipient(contact)
    }

    useEffect(() => {
        updateAllMessages()
        populateMessages()
    }, [recipient])

    const populateMessages = () => {

        UserDataService.getUser()
            .then(({ data }) => {
                const conversation = []
                const allMessages = [...data.inbox, ...data.outbox]
                setAllMessages(allMessages)
                for (let message of allMessages) {
                    if ((message.from._id === recipient._id) || (message.to._id === recipient._id)) {
                        conversation.push(message)
                    }
                }
                setMessages(conversation)
            })
    }

    return (
        <>
            <Grid container px={1} direction='row' justifyContent='center' alignItems='center' width='100vw' maxHeight='calc(100vh - 170px)' columnGap={4}>
                {allMessages.length === 0 ?
                    <Grid container item justifyContent='center' alignItems='center'>
                        <Typography>
                            No messages
                        </Typography>
                    </Grid>
                    :
                    <>
                        <Grid item container xs={12} direction='row' alignItems='center' justifyContent='flex-end' pb={2} display={{ xs: 'none', sm: 'flex' }}>
                            <Grid item container xs={7}>
                                <Typography variant='span'>Messages with: {recipient.username}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction='column' justifyContent='flex-start' height='100%' rowGap={3} xs={4} display={{ xs: 'none', sm: 'flex' }}>
                            {conversationList && conversationList.map(message => (
                                <Message key={message._id} setMessages={conversationList} changeRecipient={changeRecipient} message={message} conversationListItem={true} />
                            ))}
                        </Grid>
                        <Grid item container xs={12} sm={5} direction='row' alignItems='center' justifyContent='flex-start' pb={2} display={{ xs: 'flex', sm: 'none' }}>
                            <Grid item container xs={2} display={{ xs: 'flex', sm: 'none' }}>
                                <MessagesDrawer style={{ display: { xs: 'flex', sm: 'none' } }} conversationList={conversationList} changeRecipient={changeRecipient} />
                            </Grid>
                            <Grid item container xs>
                                <Typography variant='span'>{recipient.username}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={10} sm={7} sx={{ height: '100%', overflow: 'hidden' }}>

                            <MessageList messages={messages} getUser={getUser} user={user} setAllMessages={setAllMessages} recipient={recipient} populateMessages={populateMessages} changeRecipient={changeRecipient} />
                        </Grid>
                    </>
                }
            </Grid>
        </>
    )
}