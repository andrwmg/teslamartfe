import React, { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { allData, defaultFilters } from "../ModelSeeds";
import seedListings from "../seedListings";
// import seedListings from "../seedListings";
import ListingDataService from '../services/listing.service'
import userService from "../services/user.service";
import { useAuthUser } from 'react-auth-kit'
import { useSignIn } from 'react-auth-kit'

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {

    // const allListings = seedListings

    // const getListings = async () => {
    //     const data = await ListingDataService.getAll()
    //     console.log(data.data)
    // }

    // const createListings = async () => {
    //     await ListingDataService.create(seedListings[0])
    // }






    // addSeedListings()

    // console.log(currentUser)

    const { exteriors, autopilots, conditions, titles } = defaultFilters

    const [allListings, setAllListings] = useState([])
    const [currentListings, setCurrentListings] = useState([])
    const [currentListing, setCurrentListing] = useState('')
    const [currentImages, setCurrentImages] = useState([])

    const [models, setModels] = useState(defaultFilters.models)
    const [years, setYears] = useState(defaultFilters.years)
    const [trims, setTrims] = useState(defaultFilters.trims)
    const [interiors, setInteriors] = useState(defaultFilters.interiors)

    const [model, setModel] = useState('')
    const [year, setYear] = useState('')
    const [trim, setTrim] = useState('')
    const [interior, setInterior] = useState('')
    const [exterior, setExterior] = useState('')
    const [autopilot, setAutopilot] = useState('')
    const [mileage, setMileage] = useState('')
    const [condition, setCondition] = useState('')
    const [title, setTitle] = useState('')
    const [location, setLocation] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')

    const [isLoading, setIsLoading] = useState(true)
    const [isAuthor, setIsAuthor] = useState(false)
    const [currentListingAuthor, setCurrentListingAuthor] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const auth = useAuthUser()
    const signIn = useSignIn()

    const [sort, setSort] = useState('Price: Ascending')
    const [order, setOrder] = useState('Ascending')

    const current = {
        model: model,
        year: year,
        trim: trim,
        interior: interior,
        exterior: exterior,
        autopilot: autopilot,
        mileage: mileage,
        condition: condition,
        title: title,
        location: location,
        price: price,
        description: description
    }

    const allFilters = listing => {
        if (model !== '' && model !== listing.model) return false
        if (year !== '' && year !== listing.year) return false
        if (trim !== '' && trim !== listing.trim) return false
        if (interior !== '' && interior !== listing.interior) return false
        if (exterior !== '' && exterior !== listing.exterior) return false
        if (autopilot !== '' && autopilot !== listing.autopilot) return false
        return true
    }


    const filterListings = () => {
        setCurrentListings(allListings.filter(allFilters))
    }

    const resetFilters = () => {
        setModel('')
        setYear('')
        setTrim('')
        setInterior('')
        setExterior('')
        setAutopilot('')
        setMileage('')
        setCondition('')
        setTitle('')
        setLocation('')
        setPrice('')
        setDescription('')
    }

    const sortListings = () => {
        if (sort === 'Price: Ascending') {
            return currentListings.sort((a, b) => b.price - a.price)
        } else if (sort === 'Price: Descending') {
            return currentListings.sort((a, b) => a.price - b.price)
        } else if (sort === 'Mileage: Ascending') {
            return currentListings.sort((a, b) => b.mileage - a.mileage)
        } else if (sort === 'Mileage: Descending') {
            return currentListings.sort((a, b) => a.mileage - b.mileage)
        // } else if (sort === 'Date: New...Old') {
        //     return currentListings.sort((a, b) => b.createdAt - a.createdAt)
        // } else if (sort === 'Date: Old...New') {
        //     return currentListings.sort((a, b) => a.createdAt - b.createdAt)
        }
    }

    let currentLocation = useLocation().pathname

    // useEffect(() => {
    //     resetFilters()
    //     setCurrentListings(sortListings())
    // }, [currentLocation])

    // useEffect(() => {
    //     setCurrentListings(sortListings())
    // }, [sort, order])

    // useEffect(() => {
    //     filterListings()
    // }, [model, year, trim, interior, exterior, autopilot])

    const removeDuplicates = array => {
        let result = []
        for (let a of array) {
            for (let i of a) {
                if (!result.includes(i)) {
                    result.push(i)
                }
            }
        }
        return result
    }

    const findModels = () => {
        return allData.filter(data => {
            if (year !== '' && !data.year.includes(year)) return false
            if (trim !== '' && !data.trim.includes(trim)) return false
            if (interior !== '' && !data.interior.includes(interior)) return false
            return true
        }
        ).map(a => a.model)
    }

    const findYears = () => {
        return removeDuplicates(allData.filter(data => {
            if (model !== '' && !data.model.includes(model)) return false
            if (trim !== '' && !data.trim.includes(trim)) return false
            if (interior !== '' && !data.interior.includes(interior)) return false
            return true
        }
        ).map(a => a.year)
        )
    }

    const findTrims = () => {
        return removeDuplicates(allData.filter(data => {
            if (model !== '' && !data.model.includes(model)) return false
            if (year !== '' && !data.year.includes(year)) return false
            if (interior !== '' && !data.interior.includes(interior)) return false
            return true
        }
        ).map(a => a.trim))
    }

    const findInteriors = () => {
        return removeDuplicates(allData.filter(data => {
            if (model !== '' && !data.model.includes(model)) return false
            if (year !== '' && !data.year.includes(year)) return false
            if (trim !== '' && !data.trim.includes(trim)) return false
            return true
        }
        ).map(i => i.interior)
        )
    }

    const getAllListings = async () => {
        await ListingDataService.getAll()
            .then(response => {
                setAllListings(response.data)
                setCurrentListings(response.data)
                setCurrentListing('')
                console.log(response.data)
            })
    }

    const filterAllListings = async () => {
        await ListingDataService.getAll()
            .then(response => {
                setCurrentListings(response.data.filter(allFilters))
            })
    }

    // useEffect(() => {
    //     axios.get(`http://localhost:8080/api/listings/${id}`)
    //         .then(({ data }) => {
    //             setCurrentListing(data)
    //             setCurrentListingAuthor(data.author._id)
    //             if (auth()) {
    //                 setCurrentUserId(auth()._id)
    //             }
    //         })
    // }, [])

    const getListing = async (id) => {
        await ListingDataService.get(id)
            .then(({ data }) => {
                setCurrentListing(data)
                setCurrentListingAuthor(data.author._id)
                setAuthor(data.author._id)
            })
    }

    const getListingAgain = async (id) => {
        await ListingDataService.get(id)
    }

    const renderEditForm = async (id) => {
        await ListingDataService.get(id)
            .then(res => {
                setModel(res.data.model)
                setYear(res.data.year)
                setTrim(res.data.trim)
                setInterior(res.data.interior)
                setExterior(res.data.exterior)
                setAutopilot(res.data.autopilot)
                setMileage(res.data.mileage)
                setCondition(res.data.condition)
                setTitle(res.data.title)
                setLocation(res.data.location)
                setPrice(res.data.price)
                setDescription(res.data.description)
            })
    }

    const createNewListing = async (data) => {
        await ListingDataService.create(data)
            .then((res) => {
                if (res.data._id) {
                    navigate(`/listings/${res.data._id}`)
                } else {
                    console.log(res.data)
                }
            })
    }

    const seed = async () => {
        for (let seed of seedListings) {
            await ListingDataService.create(seed)
        }
        getAllListings()
    }

    const updateListing = async (id) => {
        ListingDataService.update(id, current)
        .then(() => {
            navigate(`/listings/${id}`)
        })
        // resetFilters()
        // getListing(id)
    }

    const deleteListing = async (id) => {
        await ListingDataService.delete(id, isAuthor)
        console.log(isAuthor)
        getAllListings()
    }

    const deleteAllListings = async (id) => {
        await ListingDataService.deleteAll()
        getAllListings()
    }

    const findData = () => {
        setModels(findModels())
        setYears(findYears())
        setTrims(findTrims())
        setInteriors(findInteriors())
    }
    const register = async (obj) => {
        try {
            const res = await userService.register(obj)
            console.log(res)
            if (signIn(
                {
                    token: res.data.token,
                    expiresIn: 1000 * 60 * 60 * 24 * 7,
                    tokenType: "Bearer",
                    authState: { email: res.data.email, username: res.data.username, _id: res.data._id },
                }
            )) {
                navigate('/listings')
            }
        } catch (e) {
            alert('Incorrect username or password')
        }
    }

    const login = async (obj) => {
        try {
            const res = await userService.login(obj)
            console.log(res)
            // signIn({
            //     token: response.data.token,
            //     expiresIn: 1000 * 60 * 60 * 24 * 7,
            //     authType: 'Bearer',
            //     authState: {username: username}
            // })

            if (signIn(
                {
                    token: res.data.token,
                    expiresIn: 1000 * 60 * 60 * 24 * 7,
                    tokenType: "Bearer",
                    authState: { email: res.data.email, username: res.data.username, _id: res.data._id },
                    // refreshToken: res.data.refreshToken,                    // Only if you are using refreshToken feature
                    // refreshTokenExpireIn: res.data.refreshTokenExpireIn     // Only if you are using refreshToken feature
                }
            )) {
                navigate('/listings')
            }
        } catch (e) {
            alert('Incorrect username or password')
        }
        // } else {
        //Throw error
    }


    return (
        <ListingContext.Provider value={{ currentImages, allListings, currentListings, setCurrentListings, currentListing, model, models, setModel, year, years, setYear, trim, trims, setTrim, interior, interiors, setInterior, exterior, exteriors, setExterior, autopilot, autopilots, setAutopilot, mileage, setMileage, condition, conditions, setCondition, title, titles, setTitle, location, setLocation, price, setPrice, description, setDescription, resetFilters, createNewListing, getAllListings, getListing, updateListing, deleteListing, deleteAllListings, renderEditForm, findData, filterListings, seed, isLoading, setIsLoading, getListingAgain, author, isAuthor, setIsAuthor, register,login,currentListingAuthor,current, sort, setSort, sortListings, message, setMessage}}>
            {children}
        </ListingContext.Provider>
    )
}