import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListingContext } from "../contexts/ListingContext";
import { DescriptionField, ImageUpload, LocationField, ListingFormSelector, ListingFormField } from './index';


export default function ListingForm() {

    const { model, models, setModel, year, years, setYear, trim, trims, setTrim, interior, interiors, setInterior, exterior, exteriors, setExterior, autopilot, autopilots, setAutopilot, mileage, setMileage, condition, conditions, setCondition, title, titles, setTitle, price, setPrice, createNewListing, updateListing, allImages, setAllImages } = useContext(ListingContext)
    
    const [images, setImages] = useState([])

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
            <form onSubmit={id ? handleEdit : handleCreate}>
                <Grid container rowGap={3}>
                    <Grid container item xs={12} sm={6} direction='row' justifyContent='center'>
                        <Grid item container xs={12} sm={10} rowGap={3}>
                            <Typography variant='h5' color='primary'>Model Spec</Typography>
                            <ListingFormSelector label='Model' data={models} value={model} setValue={setModel} isForm={true} />
                            <ListingFormSelector label='Year' data={years} value={year} setValue={setYear} isForm={true} />
                            <ListingFormSelector label='Trim' data={trims} value={trim} setValue={setTrim} isForm={true} />
                            <Typography variant='h5' color='primary'>
                                Features and Appearance
                            </Typography>
                            <ListingFormSelector label='Exterior' data={exteriors} value={exterior} setValue={setExterior} isForm={true} />           
                            <ListingFormSelector label='Interior' data={interiors} value={interior} setValue={setInterior} isForm={true} />
                            <ListingFormSelector label='Autopilot' data={autopilots} value={autopilot} setValue={setAutopilot} isForm={true} />
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} sm={6} direction='row' alignItems='flex-start' justifyContent='center'>
                        <Grid item container xs={12} sm={10} rowGap={3}>
                            <Typography variant='h5' color='primary'>Condition and Details</Typography>
                            <ListingFormField label='Mileage' value={mileage} setValue={setMileage} isForm={true} />
                            <ListingFormSelector label='Condition' data={conditions} value={condition} setValue={setCondition} isForm={true} /> 
                            <ListingFormSelector label='Title' data={titles} value={title} setValue={setTitle} isForm={true} />                             <Typography variant='h5' color='primary'>
                                Location
                            </Typography>
                            <LocationField />
                            <Typography variant='h5' color='primary'>
                                Price
                            </Typography>
                            <ListingFormField label='Price' value={price} setValue={setPrice} isForm={true} />

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
    )
}