import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import Listings from './Listings';
import Navbar from './Navbar';
import { Route, Routes, useParams } from 'react-router-dom';
import Show from './Show';
import Login from './LogIn';
import Register from './Register'
import Home from './Home';
import NewListing from './NewListing';
import { ListingContext, ListingProvider } from './contexts/ListingContext';
import EditListing from './EditListing';
import NewListingForm from './NewListingForm';
import { RequireAuth } from 'react-auth-kit'
import { Navigate } from "react-router-dom";

// import {Cloudinary} from "@cloudinary/url-gen";
// import {AdvancedImage} from '@cloudinary/react';
// import {fill} from "@cloudinary/url-gen/actions/resize";

function App() {

  const {isAuthor} = useContext(ListingContext)

  useEffect(()=>{
    console.log(isAuthor)
  },[isAuthor])


//   useEffect(() => {
//     // const tmr = setTimeout(()=>{
//         getAllListings()
//     // },0)
//     // return () => clearTimeout(tmr);
// }, [])

const EditRedirect = () => {
  const { id } = useParams();
  return <Navigate to={`/listings/${id}`} />
}

  return (
    <div className="App">
      <Navbar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/listings/new'
              element={
                <RequireAuth loginPath={'/login'}>
                  <NewListing />
                </RequireAuth>
              } />
            <Route path='/listings' element={<Listings />} />
            <Route path='/listings/:id/edit'
              element={isAuthor ? 
                <RequireAuth loginPath={'/login'}>
                  <EditListing />
                </RequireAuth>
                :
                <EditRedirect />
              }/>
            <Route path='/listings2/:id/edit' element={<NewListingForm />} />
            <Route path='/listings/:id' element={<Show />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
      </Navbar>
    </div>
  );
}

export default App;
