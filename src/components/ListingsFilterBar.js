import { Button, Grid, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";
import { useAuthUser } from 'react-auth-kit'
import { FilterList } from "@mui/icons-material";
import { ListingsFilterChip } from './index';


export default function FilterBar({ chips, handleDelete, handleOpen }) {

    const auth = useAuthUser()
    const { createSeedListing } = useContext(ListingContext)

    return (
        <Grid container item direction='row' wrap="nowrap" maxWidth='100%' columnGap={1} justifyContent='end'>
            <Grid container item direction='row' wrap="nowrap" overflow='scroll' alignItems='center' columnGap={2} width='fit-content' px={1}>
                {chips && chips.map(chip => (
                    <ListingsFilterChip key={chip.key} filterKey={chip.key} filterValue={chip.value} handleDelete={handleDelete} />
                ))}
            </Grid>
            {(auth() && auth().username === 'nellie') && <Button onClick={createSeedListing}>Seed Listing</Button>}
            <IconButton onClick={handleOpen}>
                <FilterList />
            </IconButton>
        </Grid>
    )
} 