import { Grid } from '@mui/material'
import React from 'react'
import { UserMessage } from './index'

export default React.memo(function UserListOfMessages({messages, setAllMessages, deleteMessage, changeRecipient}) {

    return(
        <Grid container item direction='column' overflow='scroll' wrap='nowrap' rowGap={4} p={2} position='sticky' id='MessageList'>
        {messages && messages.map((message, index) => (
            <UserMessage key={message._id} index={index} setMessages={setAllMessages} message={message} deleteMessage={deleteMessage} changeRecipient={changeRecipient} conversationListItem={false} />
        ))}
    </Grid>
    )
})