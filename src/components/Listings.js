import { Add } from "@mui/icons-material";
import { Fab, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ListingContext } from "../contexts/ListingContext";
import { useIsAuthenticated } from "react-auth-kit";
import { ListingsFilterDrawer, ListingCard } from './index';
import ListingsFilterBar from "./ListingsFilterBar copy";

function Listings() {
  const {
    setFilters,
    currentListings,
    model,
    year,
    trim,
    interior,
    exterior,
    autopilot,
    sort,
    order,
    setMessage,
    setMessageStatus,
    getListings,
    loading,
  } = useContext(ListingContext);

  const [open, setOpen] = useState(false)
  const [chips, setChips] = useState(false)


  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    setFilters();
    getListings();
    const url = new URLSearchParams(window.location.search)
    const array = [];
    url.forEach((value, key) => {
      if (key !== 'order' && key !== 'sort') {
        array.push({ key, value })
      }
    })
    setChips(array)
  }, []);

  const handleClick = () => {
    if (isAuthenticated()) {
      navigate("/listings/new");
    } else {
      navigate("/login");
      setMessageStatus("error");
      setMessage("You must be logged in to create a new listing");
    }
  };

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleDelete = (key) => {
    const params = new URLSearchParams(window.location.search)
    params.delete(key)
    const filter = `${window.location.pathname}?${params.toString()}`
    window.location.replace(filter)
  }

  const handleFilter = () => {
    const params = new URLSearchParams()
    model && params.append('model', model)
    year && params.append('year', year)
    trim && params.append('trim', trim)
    interior && params.append('interior', interior)
    exterior && params.append('exterior', exterior)
    autopilot && params.append('autopilot', autopilot)
    sort && params.append('sort', sort)
    order && params.append('order', order)
    const filter = `${window.location.pathname}?${params.toString()}`
    window.location.replace(filter)
    // navigate(filter)
    setOpen(false)
  }

  return (
    <Container fixed sx={{ position: 'relative', opacity: loading ? 1 : 1 }}>
      <ListingsFilterDrawer open={open} setOpen={setOpen} handleFilter={handleFilter} />
      <Grid container item direction='column' rowGap={4} xs={12} mt='80px'>
        <ListingsFilterBar chips={chips} handleDelete={handleDelete} handleOpen={handleOpen} />

        {currentListings.map((listing, index) => (
          <Link
            key={listing._id}
            to={`/listings/${listing._id}`}
            style={{ textDecoration: "none", width: "100%", }}
          >
            <ListingCard listing={listing} />
          </Link>
        ))}

        {currentListings.length < 1 ?
          <Grid container item justifyContent='center' sx={{ opacity: loading ? 0 : 1 }}>
            <Typography fontWeight={700} color='text.primary'>
              Filters did not return any results.
            </Typography>
          </Grid>
          :
          null
        }
      </Grid>

      <Fab
        onClick={handleClick}
        color="primary"
        aria-label="add"
        style={{ zIndex: 2, position: "fixed", bottom: 40, right: 40 }}
      >
        <Add />
      </Fab>
    </Container>
  );
}

export default React.memo(Listings);
