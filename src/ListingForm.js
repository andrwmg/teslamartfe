import { Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AutopilotSelector from "./AutopilotSelector";
import ConditionSelector from "./ConditionSelector";
import { ListingContext } from "./contexts/ListingContext";
import DescriptionField from "./DescriptionField";
import ExteriorSelector from "./ExteriorSelector";
import ImageUpload from "./ImageUpload";
import InteriorSelector from "./InteriorSelector";
import LocationField from "./LocationField";
import MileageField from "./MileageField";
import ModelSelector from "./ModelSelector";
import PriceField from "./PriceField";
import TitleSelector from "./TitleSelector";
import TrimSelector from "./TrimSelector";
import YearSelector from "./YearSelector";
import ListingDataService from "./services/listing.service"
import { useAuthUser } from 'react-auth-kit'

export default function ListingForm() {

    const { model, interior, createNewListing, current, updateListing } = useContext(ListingContext)
    const navigate = useNavigate()
    const auth = useAuthUser()

    const { id } = useParams()



    const handleCreate = () => {
        let images = []
        switch (model) {
            case ('Model S'):
                images.push({ url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708360/tesla/lhvqche82wz6rvl4qbvw.jpg', filename: 'tesla/vmrngf0mejwj5wefwef',
                id: 'modelsext' })
    //             images.push(      {
    //     url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708477/tesla/vmrngf0mejwj5dptqgoi.jpg',
    //     filename: 'tesla/vmrngf0mejwj5dptqgoi',
    //     id: "631aeafe11cca1a49825d982"
    //   })
                break;
            case ('Model 3'):
                images.push({ url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1661937003/Tesla/0x0-Model3_01_tmcgma.jpg', filename: 'tesla/vmrngf0mejwj5dhglng',
                id: 'modelsex3' })
                break;
            case ('Model X'):
                images.push({ url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1661936886/Tesla/0x0-ModelX_02_tnd6ag.jpg', filename: 'tesla/vmrngf0mejwj5132tg2i',
                id: 'modelsexx' })
                break;
            case ('Model Y'):
                images.push({ url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662530428/tesla/vmrqx65np92asuxkdiew.jpg', filename: 'tesla/vmrngf0mejw8389505',
                id: 'modelsexy' })
                break;
        }
        console.log(images)
            createNewListing({ ...current, author: auth()._id, images: images })
    }

    const handleEdit = async () => {
        updateListing(id)
        // await ListingDataService.update(id, current)
        // navigate(`/listings/${id}`)
    }

    useEffect(() => {
        console.log(auth()._id)
    }, [])


    return (
        <>
            <Grid container item xs={12} md={6} direction='row' justifyContent='center'>
                <Grid item container xs={12} md={10} rowGap={3}>
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
                    {/* <Grid item xs={12}>
                            <Typography variant='h5' color='primary'>
                                Upload Images
                            </Typography>
                        </Grid>
                        <ImageUpload /> */}
                </Grid>
            </Grid>

            <Grid container item xs={12} md={6} direction='row' alignItems='flex-start' justifyContent='center'>
                <Grid item container xs={12} md={10} rowGap={3}>
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
                    {/* <Typography variant='h5' color='primary'>
                            Description
                        </Typography>
                        <DescriptionField /> */}

                </Grid>
            </Grid>

            {/* <Grid container item xs={12} direction='row' justifyContent='center'>
                    <Grid item container xs={12} md={11} rowGap={3}>
                        <Grid item xs={12}>
                            <Typography variant='h5' color='primary'>
                                Upload Images
                            </Typography>
                        </Grid>
                        <ImageUpload />
                    </Grid>
                </Grid> */}

            <Grid container item xs={12} direction='row' justifyContent='center'>
                <Grid item container xs={12} md={11} rowGap={3}>
                    <Typography variant='h5' color='primary'>
                        Description
                    </Typography>
                    <DescriptionField />
                </Grid>
            </Grid>

            <Grid container item xs={12} justifyContent='space-around' direction='row' columnSpacing={0}
            // , md: 0 }} 
            >
                <Grid item xs={5} md={5}>
                    <Button key='backButton' onClick={() => navigate(-1)} fullWidth variant="outlined" color='primary'>Back</Button>
                </Grid>
                <Grid item xs={5} md={5}>
                    <Button key='submitButton' onClick={id ? handleEdit : handleCreate} fullWidth variant="contained" color="primary">Submit</Button>
                </Grid>
            </Grid>
        </>
    )
}