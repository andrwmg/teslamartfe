import React from 'react';
import { Divider, Grid } from '@mui/material';
import UserDataService from '../services/user.service'
import { useAuthUser } from 'react-auth-kit';
import { UserMessageForm, UserListOfMessages } from './index'


export default React.memo(function MessageList({ messages, recipient, setAllMessages, populateMessages, changeRecipient }) {

    const auth = useAuthUser()

    const sendMessage = async (obj) => {
        await UserDataService.sendMessage(obj)
            .then(({ data }) => {
                setAllMessages([...data.inbox, ...data.outbox].sort((a, b) => a.createdAt.localeCompare(b.createdAt)))
            })
        populateMessages(auth().id, recipient)
    }

    return (
        <Grid container item direction='column' width='100%' height='calc(100% - 40px)' wrap='nowrap' columnGap={2} justifyContent='space-between'>
            <UserListOfMessages setMessages={setAllMessages} messages={messages} changeRecipient={changeRecipient} conversationListItem={false} recipient={recipient} />

            <Grid item>
                <Divider sx={{ mb: 2 }} />
                <UserMessageForm style={{ marginTop: 'auto' }} sendMessage={sendMessage} recipient={recipient} populateMessages={populateMessages} conversation={true} />
            </Grid>
        </Grid>
    );
})

