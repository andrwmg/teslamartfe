import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AutopilotSelector from "./AutopilotSelector";
import ConditionSelector from "./ConditionSelector";
import { ListingContext } from "../contexts/ListingContext";
import DescriptionField from "../DescriptionField";
import ExteriorSelector from "./ExteriorSelector";
import ImageUpload from "../ImageUpload";
import InteriorSelector from "./InteriorSelector";
import LocationField from "../LocationField";
import MileageField from "./MileageField";
import ModelSelector from "./ModelSelector";
import PriceField from "./PriceField";
import TitleSelector from "./TitleSelector";
import TrimSelector from "./TrimSelector";
import YearSelector from "./YearSelector";

export default function ListingForm() {

    const { createNewListing, updateListing, allImages, setAllImages } = useContext(ListingContext)
    const [images, setImages] = useState([])

    // window.oncontextmenu = function() {
    //     if (event.pointerType === "mouse") {
    //     return true; }
    //     else return false
    // }

    const navigate = useNavigate()

    const { id } = useParams()

    const handleCreate = async (event) => {
        event.preventDefault()
        createNewListing(allImages)
    }

    const handleEdit = (event) => {
        event.preventDefault()
        updateListing(id, allImages)
    }

    return (
        <>
            <form onSubmit={id ? handleEdit : handleCreate}>
                <Grid container rowGap={3}>
                    <Grid container item xs={12} sm={6} direction='row' justifyContent='center'>
                        <Grid item container xs={12} sm={10} rowGap={3}>
                            <Typography variant='h5' color='primary'>Model Spec</Typography>
                            <ModelSelector isForm={true} />
                            <YearSelector isForm={true} />
                            <TrimSelector isForm={true} />
                            <Typography variant='h5' color='primary'>
                                Features and Appearance
                            </Typography>
                            <ExteriorSelector isForm={true} />
                            <InteriorSelector isForm={true} />
                            <AutopilotSelector isForm={true} />
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={6} direction='row' alignItems='flex-start' justifyContent='center'>
                        <Grid item container xs={12} sm={10} rowGap={3}>
                            <Typography variant='h5' color='primary'>Condition and Details</Typography>
                            <MileageField isForm={true} />
                            <ConditionSelector isForm={true} />
                            <TitleSelector isForm={true} />
                            <Typography variant='h5' color='primary'>
                                Location
                            </Typography>
                            <LocationField />
                            <Typography variant='h5' color='primary'>
                                Price
                            </Typography>
                            <PriceField />

                        </Grid>
                    </Grid>

                    <Grid container item xs={12} direction='row' justifyContent='center'>
                        <Grid item container xs={12} sm={11} rowGap={3}>
                            <Typography variant='h5' color='primary'>
                                Description
                            </Typography>
                            <DescriptionField />
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} direction='row' justifyContent='center'>
                        <Grid item container xs={12} sm={11} rowGap={3}>
                            <Typography variant='h5' color='primary'>
                                Upload Images
                            </Typography>
                            <ImageUpload images={images} setImages={setImages} allImages={allImages} setAllImages={setAllImages} />
                        </Grid>
                    </Grid>

                    <Grid container item justifyContent={{ xs: 'space-between', sm: 'space-around' }}
                        direction='row' wrap='wrap-reverse' columnSpacing={{ xs: 3, sm: 0 }} rowSpacing={{ xs: 3, md: 0 }}
                    >
                        <Grid item xs={12} sm={5}>
                            <Button key='backButton' onClick={() => navigate(-1)} fullWidth variant="outlined" color='primary'>Back</Button>
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Button key='submitButton'
                                type='submit'
                                fullWidth variant="contained" color="primary">{id ? 'Save Changes' : 'Submit'}</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </>
    )
}