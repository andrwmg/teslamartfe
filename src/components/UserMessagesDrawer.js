import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { ArrowBack } from '@mui/icons-material';
import { Grid } from '@mui/material';
import { UserMessage } from './index'


export default function MessagesDrawer({ conversationList, changeRecipient }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

  const list = () => (
    <Box
      containerStyle={{ height: 'calc(100% - 64px)', top: 64 }}
      sx={{ width: '100vw', height: 'calc(100vh - 64px)', marginTop: '64px' }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
      display={{ xs: 'inline-block', sm: 'none' }}
    >
      <Grid item container rowGap={2}>
        {conversationList.map(convo => (
          <UserMessage key={convo._id} setMessages={conversationList} changeRecipient={changeRecipient} message={convo} conversationListItem={true} />
        ))}
      </Grid>
    </Box>
  );

  return (
    <div style={{ display: { xs: 'inline-block', sm: 'none' } }}>
      <React.Fragment key='leftDrawer'>
        <Button onClick={toggleDrawer()}>
          <ArrowBack />
        </Button>
        <Drawer
          containerstyle={{ height: 'calc(100% - 64px)', top: 64 }}
          anchor='left'
          open={open}
          onClose={toggleDrawer()}
          height='calc(100vh - 64px)'
          hideBackdrop={true}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}