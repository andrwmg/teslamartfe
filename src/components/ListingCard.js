import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, Grid } from "@mui/material";
import { ListingCardInfo } from './index';


export default function ListingCard({ listing }) {
  const [focus, setFocus] = useState(false);

  return (
    <Card
      elevation={focus ? 10 : 2}
      onMouseEnter={() => setFocus(true)}
      onMouseLeave={() => setFocus(false)}
      sx={{
        display: "flex",
        width: "100%",
        transform: focus ? "scale(1.025)" : "scale(1.0)",
        transition: ".4s ease-in-out",
        maxHeight: {lg: '330px'},
      }}
    >
      <CardActionArea>
        <Grid container>
          <Grid
            item
            xs={12}
            lg={7}
            zIndex={1}
            // sx={{
            //   opacity: focus ? ".9" : "1.0",
            //   transition: ".2s ease-in-out",
            // }}
          >
            <CardMedia
              component="img"
              sx={{
                maxWidth: "100%",
                height: "330px",
                // scale: focus ? '1.1' : '1.0', transition: '.3s ease-in-out'
              }}
              image={
                listing.images.length !== 0
                  ? listing.images[0].url
                  : "https://res.cloudinary.com/deuft4auk/image/upload/v1662708360/tesla/lhvqche82wz6rvl4qbvw.jpg"
              }
              alt="Listing Image"
            />
          </Grid>
          <Grid item xs={12} lg={5} p={4} px={{xs: 2, md: 4}} zIndex={2}>
            <ListingCardInfo {...listing} />
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
