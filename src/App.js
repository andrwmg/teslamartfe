import './App.css';
import React, { useContext } from 'react';
import { ListingContext } from './contexts/ListingContext';
import { Route, Routes, useNavigate, useParams, Navigate } from 'react-router-dom';
import { RequireAuth, useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import listingService from './services/listing.service';
import userService from './services/user.service';
import ScrollToTop from './ScrollToTop'
import { Home, Page, Listings, UserMessages, ListingModForm, UserProfileForm, UserVerifyCard, UserWrapper, Show, UserLoginForm, UserResetForm, UserForgotForm, UserRegistrationForm } from './components/index'

function App() {
  const isAuthenticated = useIsAuthenticated()
  const auth = useAuthUser()
  const navigate = useNavigate()

  const {setMessage, setMessageStatus} = useContext(ListingContext)

  // const EditRedirect = () => {
  //   const { id } = useParams();
  //   return <Navigate to={`/listings/${id}`} />
  // }

  const ListingsRedirect = () => {
    return <Navigate to={'/listings'} />
  }

  const VerifyLink = () => {
    const { token } = useParams()
    userService.verify(token)
      .then(({ data }) => {
        if (data.messageStatus === 'success') {
          setMessage(data.message)
          setMessageStatus(data.messageStatus)
          navigate('/login')
        } else {
          navigate('/')
        }
      })
  }

  const ResetLink = () => {
    const { token } = useParams()
    userService.setToken(token)
      .then(({ data }) => {
        window.localStorage.setItem('returned stuff', data)
        if (data.messageStatus === 'success') {
          console.log('here')
          setMessage(data.message)
          setMessageStatus(data.messageStatus)
          navigate('/reset')
        } else {
          navigate('/')
        }
      })
  }

  const EditRedirect = async () => {
    const { id } = useParams();
    const listing = await listingService.get(id)
    if (auth().id !== listing.author._id) {
      return <Navigate to={`/listings/${id}`} />
    }
  }

  return (
    <div className="App">
      <Page>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile/:id'
            element={
              <RequireAuth loginPath={'/login'}>
                <UserWrapper form={<UserProfileForm />} />
              </RequireAuth>
            } />
          <Route path='/messages' element={
                        <RequireAuth loginPath={'/login'}>
                        <UserMessages />
                        </RequireAuth>
} />
          <Route path='/listings/new'
            element={
              <RequireAuth loginPath={'/login'}>
                <ListingModForm />
              </RequireAuth>
            } />
          <Route path='/listings' element={<Listings />} />
          <Route path='/listings/:id/edit'
            element={isAuthenticated() ?
              <RequireAuth loginPath={'/login'}>
                <ListingModForm />
              </RequireAuth>
              :
              <EditRedirect />
            } />
          <Route path='/listings/:id' element={<Show />} />
          <Route path='/login' element={isAuthenticated() ? <ListingsRedirect /> : <UserWrapper form={<UserLoginForm />} /> } />
          <Route path='/verify' element={ isAuthenticated() ? <ListingsRedirect /> : <UserWrapper form={<UserVerifyCard />} />
          } />
          <Route path='/verify/:token' element={ isAuthenticated() ? <ListingsRedirect /> :<VerifyLink />
          } />
          <Route path='/register' element={isAuthenticated() ? <ListingsRedirect /> : <UserWrapper form={<UserRegistrationForm />} /> } />
          <Route path='/forgot' element={isAuthenticated() ? <ListingsRedirect /> : <UserWrapper form={<UserForgotForm />} /> } />
          <Route path='/reset' element={isAuthenticated() ? <ListingsRedirect /> : <UserWrapper form={<UserResetForm />} /> } />

          <Route path='/reset/:token' element={isAuthenticated() ? <ListingsRedirect /> : <UserWrapper form={<ResetLink />} /> } />
          <Route path='/*' element={<ListingsRedirect /> } />
        </Routes>
      </Page>
    </div>
  );
}

export default App;
