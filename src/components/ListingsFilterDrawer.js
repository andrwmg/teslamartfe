import { Button, Grid, IconButton, SwipeableDrawer, Toolbar, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { ListingContext } from "../contexts/ListingContext";
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { Close } from "@mui/icons-material";
import { ListingFormSelector, SortFilter, ResetFiltersButton } from './index';


const drawerWidth = 300;

export default React.memo(function FilterDrawer({ open, handleFilter, setOpen }) {

    const { model, models, setModel, year, years, setYear, trim, trims, setTrim, interior, interiors, setInterior, exterior, exteriors, setExterior, autopilot, autopilots, setAutopilot, createSeedListing, findData } = useContext(ListingContext)

    useEffect(() => {
        findData()
      }, [model, year, trim, interior]);


    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    const drawer = (
        <Grid container item direction='column' rowGap={4} px={4}>
            <Toolbar />
            <Grid container item justifyContent='space-between' alignItems='center'>
                <Typography variant='h5'>Filters</Typography>
                <IconButton onClick={() => setOpen(false)}>
                    <Close />
                </IconButton>
            </Grid>
            <ListingFormSelector label='Model' data={models} value={model} setValue={setModel} isForm={false} />
            <ListingFormSelector label='Year' data={years} value={year} setValue={setYear} isForm={false} />
            <ListingFormSelector label='Trim' data={trims} value={trim} setValue={setTrim} isForm={false} />
            <ListingFormSelector label='Exterior' data={exteriors} value={exterior} setValue={setExterior} isForm={false} />
            <ListingFormSelector label='Interior' data={interiors} value={interior} setValue={setInterior} isForm={false} />
            <ListingFormSelector label='Autopilot' data={autopilots} value={autopilot} setValue={setAutopilot} isForm={false} />
            {(isAuthenticated() && auth().username === 'andrwmg') && <Button onClick={createSeedListing}>Seed</Button>}
            <SortFilter />
            <Button variant='contained' onClick={handleFilter} fullWidth sx={{ whiteSpace: 'nowrap' }}>Filter Listings</Button>
            {(model || year || trim || interior || exterior || autopilot) &&
                <ResetFiltersButton />
            }
        </Grid>
    );

    return (
        <SwipeableDrawer
            variant="temporary"
            swipeAreaWidth='40px'
            open={open}
            onClose={() => setOpen(!open)}
            onOpen={() => setOpen(!open)}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                zIndex: 2,
                display: 'block',
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </SwipeableDrawer>
    );
})