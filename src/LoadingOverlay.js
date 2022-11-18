import styled from "@emotion/styled"
import { CircularProgress } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { ListingContext } from "./contexts/ListingContext"

const Overlay = styled('div')(() => ({
        position: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        opacity: 0.9,
        marginTop: '-24px',
        backgroundColor: 'black',
        filter: 'alpha(opacity=80)'
}))

export default function LoadingOverlay() {

    const {isLoading} = useContext(ListingContext)

    useEffect(()=>{
        
    },[isLoading])

    return (
        <Overlay style={{display: isLoading ? 'flex' : 'none'}}>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-8 col-sm-auto bg-white rounded text-center p-3'>
                        <div style={{textAlign: 'center'}} role="status">
                            <CircularProgress />
                        </div>
                        <div className="spinner-text text-primary">Sorry, this web app needs a second to wake up!</div>
                    </div>
                </div>
            </div>
        </Overlay>
    )
}

