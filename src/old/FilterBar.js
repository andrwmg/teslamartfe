import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import ResetFiltersButton from "../ResetFiltersButton";
import AutopilotSelector from "./AutopilotSelector";
import { ListingContext } from "../contexts/ListingContext";
import InteriorSelector from "./InteriorSelector";
import ExteriorSelector from "./ExteriorSelector";
import TrimSelector from "./TrimSelector";
import YearSelector from "./YearSelector";
import ModelSelector from "./ModelSelector";
import SortFilter from "../SortFilter";
import {useAuthUser, useIsAuthenticated} from 'react-auth-kit'

export default function FilterBar() {
    const { model, year, trim, interior, exterior, autopilot, createSeedListing } = useContext(ListingContext)

    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()

    return (
        <Grid container wrap='wrap' alignItems='center' height='auto' >
            <Grid item container height='55px' wrap='nowrap' direction='row' overflow='scroll' display='flex' alignItems='center'columnGap={2}>
                {(model || year || trim || interior || exterior || autopilot) &&
                    <ResetFiltersButton />
                }
                <ModelSelector isForm={false} />
                <YearSelector isForm={false} />
                <TrimSelector isForm={false} />
                <ExteriorSelector isForm={false} />
                <InteriorSelector isForm={false} />
                <AutopilotSelector isForm={false} />
                {(isAuthenticated() && auth().username === 'andrwmg') && <Button onClick={createSeedListing}>Seed</Button> }
                {/* <Button onClick={deleteAllListings}>Delete Listings</Button> */}
            {/* </Grid>
            <Grid item container marginLeft='auto'> */}
                <Grid item marginLeft='auto'>
                    <SortFilter style={{marginLeft: 'auto'}}/>
                </Grid>
            </Grid>

        </Grid>

    )
} 