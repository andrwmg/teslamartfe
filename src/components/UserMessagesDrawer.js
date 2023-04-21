import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { SwipeableDrawer } from '@mui/material';

const drawerWidth = 400;

export default function MessagesDrawer({ list, mobileOpen, handleDrawerToggle }) {

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box
                    component="nav"
                    sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }, zIndex: 1, height: 'calc(100vh - 128px)' }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

                    <SwipeableDrawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onOpen={handleDrawerToggle}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            transition: '.3s ease-in-out',
                            display: { xs: 'block', md: 'none', top: '64px' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '100vw', justifyContent: 'flex-end', height: 'calc(100vh - 64px)', top: '64px', backgroundColor: 'none', transition: '.3s ease-in-out', zIndex: 1 },
                            '& .MuiBackdrop-root': { top: '64px', height: 'calc(100vh - 64px)' },
                            '& .MuiModal-root': { marginTop: '64px' }

                        }}
                    >
                        {list}
                    </SwipeableDrawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block', top: '64px' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, justifyContent: 'flex-end', height: 'calc(100vh - 64px)', top: '64px', backgroundColor: 'none', transition: '.3s ease-in-out', zIndex: 1 },
                            '& .MuiBackdrop-root': { top: '64px', height: 'calc(100vh - 64px)' },
                            '& .MuiModal-root': { marginTop: '64px' },
                        }}
                        open
                    >
                        {list}
                    </Drawer>
                </Box>
  );
}