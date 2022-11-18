import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import ResetFiltersButton from "./ResetFiltersButton";
import AutopilotSelector from "./AutopilotSelector";
import { ListingContext } from "./contexts/ListingContext";
import InteriorSelector from "./InteriorSelector";
import ExteriorSelector from "./ExteriorSelector";
import TrimSelector from "./TrimSelector";
import YearSelector from "./YearSelector";
import ModelSelector from "./ModelSelector";
import SortFilter from "./SortFilter";


export default function FilterBar() {
    const { model, year, trim, interior, exterior, autopilot, seed, deleteAllListings } = useContext(ListingContext)
    return (
        <Grid container wrap='wrap' alignItems='center' >
            <Grid item container height='64px' wrap='nowrap' direction='row' overflow='scroll' display='flex' alignItems='center' rowGap={2} columnGap={2} my={2}>
                {(model || year || trim || interior || exterior || autopilot) &&
                    <ResetFiltersButton />
                }
                <ModelSelector isForm={false} />
                <YearSelector isForm={false} />
                <TrimSelector isForm={false} />
                <ExteriorSelector isForm={false} />
                <InteriorSelector isForm={false} />
                <AutopilotSelector isForm={false} />
                {/* <Button onClick={seed}>Seed</Button>
                <Button onClick={deleteAllListings}>Delete Listings</Button> */}
            {/* </Grid>
            <Grid item container marginLeft='auto'> */}
                <Grid item marginLeft='auto'>
                    <SortFilter style={{marginLeft: 'auto'}}/>
                </Grid>
            </Grid>

        </Grid>

    )
} 