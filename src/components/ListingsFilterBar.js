import { Button, Grid, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { ListingContext } from "../contexts/ListingContext";
import { useAuthUser } from 'react-auth-kit'
import { FilterList } from "@mui/icons-material";
import { ListingsFilterChip } from './index';
import { grey } from "@mui/material/colors";


export default function FilterBar({ chips, handleDelete, handleOpen }) {

    const auth = useAuthUser()
    const { createSeedListing } = useContext(ListingContext)

    return (
        <Grid containter item width='100%' bgcolor={grey[900]} position='fixed' right={0} left={0} top='64px' zIndex={10}>
        <Grid container item direction='row' wrap="nowrap" columnGap={1} justifyContent='end' width={{xs: '100%', sm: '600px', md: '900px', lg: '1200px'}} px={3} mx='auto'>
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
        </Grid>
    )
} 