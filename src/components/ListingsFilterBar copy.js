import { AppBar, Box, Button, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";
import { useAuthUser } from 'react-auth-kit'
import { FilterList } from "@mui/icons-material";
import { ListingsFilterChip } from './index';
import { Container } from "@mui/system";


export default function FilterBar({ chips, handleDelete, handleOpen }) {

    const auth = useAuthUser()
    const { createSeedListing } = useContext(ListingContext)

    return (
        <Box sx={{ flexGrow: 1, position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 2, height: '64px' }}>
            <AppBar position="static" sx={{ bgcolor: 'rgba(255,255,255,.9)', height: '100%', boxShadow: 'none', justifyContent: 'center' }}>
                <Container fixed sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ flexGrow: 1, transition: '.4s ease-in-out' }} />

                    {chips && chips.map(chip => (
                        <ListingsFilterChip key={chip.key} filterKey={chip.key} filterValue={chip.value} handleDelete={handleDelete} />
                    ))}
                    {(auth() && auth().username === 'nellie') && <Button onClick={createSeedListing}>Seed Listing</Button>}
                    <IconButton
                        onClick={handleOpen}
                        size="large"
                        edge="start"
                        color="black"
                        aria-label="menu"
                    >
                        <FilterList />
                    </IconButton>
                </Container>
            </AppBar>
        </Box>
        // <AppBar containter item width='100%' bgcolor={grey[900]} position='fixed' right={0} left={0} top='64px' zIndex={10}>
        //     <Toolbar>
        // <Grid container item direction='row' wrap="nowrap" columnGap={1} justifyContent='end' width={{xs: '100%', sm: '600px', md: '900px', lg: '1200px'}} px={3} mx='auto'>
        //     <Grid container item direction='row' wrap="nowrap" overflow='scroll' alignItems='center' columnGap={2} width='fit-content' px={1}>
        //         {chips && chips.map(chip => (
        //             <ListingsFilterChip key={chip.key} filterKey={chip.key} filterValue={chip.value} handleDelete={handleDelete} />
        //         ))}
        //     </Grid>
        //     {(auth() && auth().username === 'nellie') && <Button onClick={createSeedListing}>Seed Listing</Button>}
        //     <IconButton onClick={handleOpen}>
        //         <FilterList />
        //     </IconButton>
        // </Grid>
        // </Toolbar>
        // </AppBar>
    )
} 