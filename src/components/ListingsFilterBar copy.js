import { AppBar, Box, Button, IconButton, Grid } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";
import { useAuthUser } from 'react-auth-kit'
import { FilterList } from "@mui/icons-material";
import { ListingsFilterChip } from './index';
import { Container } from "@mui/system";
import { ThemeContext } from "../contexts/ThemeContext";


export default function FilterBar({ chips, handleDelete, handleOpen }) {

    const auth = useAuthUser()
    const { createSeedListing } = useContext(ListingContext)
    const { theme } = useContext(ThemeContext)

    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 2, height: '64px' }}>
            <AppBar position="static" sx={{ bgcolor: theme === 'dark' ?  'rgba(0,0,0,.85)' : 'rgba(255,255,255,.85)', height: '100%', boxShadow: 'none', justifyContent: 'center', transition: '.3s ease-in-out' }}>
                <Container fixed sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1 }} />
                        <Grid container item overflow='scroll' wrap='nowrap' gap={2} px={1}>
                    {chips && chips.map(chip => (
                        <ListingsFilterChip key={chip.key} filterKey={chip.key} filterValue={chip.value} handleDelete={handleDelete} />
                    ))}
                    </Grid>
                    {(auth() && auth().username === 'nellie') && <Button onClick={createSeedListing}>Seed Listing</Button>}
                    <IconButton
                        onClick={handleOpen}
                        size="large"
                        edge="start"
                        aria-label="menu"
                    >
                        <FilterList />
                    </IconButton>
                </Container>
            </AppBar>
        </Box>
    )
} 