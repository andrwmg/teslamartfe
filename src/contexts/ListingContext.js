import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allData, defaultFilters, modelS, model3, modelX, modelY } from "../seeds/ModelSeeds";
import seedListings from "../seeds/seedListings";
import ListingDataService from '../services/listing.service'
import UploadFilesService from '../services/upload-files.service'
import userService from "../services/user.service";
import { useAuthUser, useIsAuthenticated, useSignOut, useSignIn } from 'react-auth-kit'
import cities from '../seeds/cities'

export const ListingContext = createContext();

export const ListingProvider = ({ children }) => {

    const { exteriors, autopilots, conditions, titles } = defaultFilters

    const [currentListings, setCurrentListings] = useState([])
    const [currentListing, setCurrentListing] = useState({ images: [] })
    const [userImage, setUserImage] = useState(null)

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
    const [existingImages, setExistingImages] = useState([])
    const [allImages, setAllImages] = useState([])
    const [comments, setComments] = useState([])

    const [loading, setLoading] = useState(true)
    const [isAuthor, setIsAuthor] = useState(false)
    const [currentListingAuthor, setCurrentListingAuthor] = useState('')
    const [message, setMessage] = useState('')
    const [messageStatus, setMessageStatus] = useState('')

    const navigate = useNavigate()
    const auth = useAuthUser()
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const signOut = useSignOut()

    const [sortLabel, setSortLabel] = useState('Date: Newest First')
    const [sort, setSort] = useState('createdAt')
    const [order, setOrder] = useState(-1)

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
        description: description,
        // images: images,
        comments: comments
    }

    const setFilters = () => {
        const params = new URLSearchParams(window.location.search)
        if (params.get('model')) {
            setModel(params.get('model'))
        } else setModel('')
        if (params.get('year')) {
            setYear(params.get('year'))
        } else setYear('')
        if (params.get('trim')) {
            setTrim(params.get('trim'))
        } else setTrim('')
        if (params.get('interior')) {
            setInterior(params.get('interior'))
        } else setInterior('')
        if (params.get('exterior')) {
            setExterior(params.get('exterior'))
        } else setExterior('')
        if (params.get('autopilot')) {
            setAutopilot(params.get('autopilot'))
        } else setAutopilot('')
        getData(params)
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
        setExistingImages([])
        setAllImages([])
        setComments('')
        findData()
    }

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

    const getData = (params) => {
        const availableModels = allData.filter(d => {
            if (params.get('year') && !d.year.includes(Number(params.get('year')))) return false
            if (params.get('model') && !d.model.includes(params.get('model'))) return false
            if (params.get('trim') && !d.trim.includes(params.get('trim'))) return false
            if (params.get('interior') && !d.interior.includes(params.get('interior'))) return false
            return true
        })
        setModels(availableModels.map(a => a.model))
        setYears(removeDuplicates(availableModels.map(a => a.year)))
        setTrims(removeDuplicates(availableModels.map(a => a.trim)))
        setInteriors(removeDuplicates(availableModels.map(a => a.interior)))
    }

    const findModels = () => {
        return allData.filter(data => {
            if (year !== '' && !data.year.includes(Number(year))) return false
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
            if (year !== '' && !data.year.includes(Number(year))) return false
            if (interior !== '' && !data.interior.includes(interior)) return false
            return true
        }
        ).map(a => a.trim))
    }

    const findInteriors = () => {
        return removeDuplicates(allData.filter(data => {
            if (model !== '' && !data.model.includes(model)) return false
            if (year !== '' && !data.year.includes(Number(year))) return false
            if (trim !== '' && !data.trim.includes(trim)) return false
            return true
        }
        ).map(a => a.interior)
        )
    }

    const findData = () => {
        setModels(findModels())
        setYears(findYears())
        setTrims(findTrims())
        setInteriors(findInteriors())
    }

    const getListings = () => {
        ListingDataService.getAll()
            .then(({ data }) => {
                setCurrentListings(data)
                setLoading(false)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const getListing = (id) => {
        setExistingImages([])
        ListingDataService.get(id)
            .then(({ data }) => {
                setComments(data.comments)
                setCurrentListing(data)
                setCurrentListingAuthor(data.author._id)
                setExistingImages([...data.images])
                setAuthor(data.author._id)
                if (isAuthenticated()) {
                    setIsAuthor(data.author._id === auth().id)
                }
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const renderEditForm = (id) => {
        ListingDataService.get(id)
            .then(({ data }) => {
                setModel(data.model)
                setYear(data.year)
                setTrim(data.trim)
                setInterior(data.interior)
                setExterior(data.exterior)
                setAutopilot(data.autopilot)
                setMileage(data.mileage)
                setCondition(data.condition)
                setTitle(data.title)
                setLocation(data.location)
                setPrice(data.price)
                setDescription(data.description)
                setExistingImages([...data.images])
                return data.location
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const createNewListing = images => {
        let result = []
        if (images.length === 0) {
            switch (model) {
                case ('Model S'):
                    result.push({
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708360/tesla/lhvqche82wz6rvl4qbvw.jpg', filename: 'tesla/vmrngf0mejwj5wefwef',
                        id: 'modelsext'
                    },
                        {
                            url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708080/tesla/xwmwhlekhgqpzdykvoq6.jpg', filename: 'tesla/swhiteinterior'
                        })
                    break;
                case ('Model 3'):
                    result.push({
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1661937003/Tesla/0x0-Model3_01_tmcgma.jpg', filename: 'tesla/vmrngf0mejwj5dhglng',
                        id: 'modelsex3'
                    },
                        {
                            url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662837143/tesla/kd0gdftnowd0xwwqpbnd.jpg', filename: 'tesla/3ywhiteinterior'
                        })
                    break;
                case ('Model X'):
                    result.push({
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1661936886/Tesla/0x0-ModelX_02_tnd6ag.jpg', filename: 'tesla/vmrngf0mejwj5132tg2i',
                        id: 'modelsexx'
                    },
                        {
                            url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708364/tesla/tgkfxzi0debj2q7drlrd.jpg', filename: 'tesla/xwhiteinterior'
                        })
                    break;
                case ('Model Y'):
                    result.push({
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662530428/tesla/vmrqx65np92asuxkdiew.jpg', filename: 'tesla/vmrngf0mejw8389505',
                        id: 'modelsexy'
                    },
                        {
                            url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662837143/tesla/kd0gdftnowd0xwwqpbnd.jpg', filename: 'tesla/3ywhiteinterior'
                        })
                    break;
                default:
            }
        }
        const data = UploadFilesService.upload(images)
        ListingDataService.create({
            ...current, author: auth().id,
            images: data.length ? data : result
        })
            .then(({ data }) => {
                if (data.id) {
                    setMessage(data.message)
                    setMessageStatus(data.messageStatus)
                    navigate(`/listings/${data.id}`)
                }
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const seed = async () => {
        for (let seed of seedListings) {
            ListingDataService.create(seed)
                .then(() => {
                    getListings()
                })
                .catch(({ response }) => {
                    setMessage(response.data.message)
                    setMessageStatus(response.data.messageStatus)
                })
        }
    }

    const updateListing = async (id, images) => {
        const data = await UploadFilesService.upload(images)
        ListingDataService.update(id, { ...current, images: data })
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                navigate(`/listings/${id}`)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const deleteListing = (id) => {
        ListingDataService.delete(id)
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                navigate('/')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const deleteAllListings = (id) => {
        ListingDataService.deleteAll()
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                getListings()
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const createSeedListing = () => {
        const randomSelection = (arr) => {
            return arr[Math.floor(Math.random() * arr.length)]
        }
        const allModels = [modelS, model3, modelX, modelY]

        const selectedModel = randomSelection(allModels)
        const { year, model, trim, interior } = selectedModel
        const { exteriors, autopilots, conditions, titles } = defaultFilters
        const randomNumber = () => {
            return Math.floor(Math.random() * 99999)
        }
        const randomCity = Math.floor(Math.random() * cities.length)

        const seed = {
            model: model,
            year: randomSelection(year),
            trim: randomSelection(trim),
            exterior: randomSelection(exteriors),
            interior: randomSelection(interior),
            autopilot: randomSelection(autopilots),
            mileage: randomNumber(),
            condition: randomSelection(conditions),
            title: randomSelection(titles),
            price: randomNumber(),
            location: `${cities[randomCity].city}, ${cities[randomCity].state}`,
            comments: []
        }
        let result = []
        switch (model) {
            case ('Model S'):
                result.push({
                    url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708360/tesla/lhvqche82wz6rvl4qbvw.jpg', filename: 'tesla/vmrngf0mejwj5wefwef',
                    id: 'modelsext'
                },
                    {
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708080/tesla/xwmwhlekhgqpzdykvoq6.jpg', filename: 'tesla/swhiteinterior'
                    })
                break;
            case ('Model 3'):
                result.push({
                    url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1661937003/Tesla/0x0-Model3_01_tmcgma.jpg', filename: 'tesla/vmrngf0mejwj5dhglng',
                    id: 'modelsex3'
                },
                    {
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662837143/tesla/kd0gdftnowd0xwwqpbnd.jpg', filename: 'tesla/3ywhiteinterior'
                    })
                break;
            case ('Model X'):
                result.push({
                    url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1661936886/Tesla/0x0-ModelX_02_tnd6ag.jpg', filename: 'tesla/vmrngf0mejwj5132tg2i',
                    id: 'modelsexx'
                },
                    {
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662708364/tesla/tgkfxzi0debj2q7drlrd.jpg', filename: 'tesla/xwhiteinterior'
                    })
                break;
            case ('Model Y'):
                result.push({
                    url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662530428/tesla/vmrqx65np92asuxkdiew.jpg', filename: 'tesla/vmrngf0mejw8389505',
                    id: 'modelsexy'
                },
                    {
                        url: 'https://res.cloudinary.com/deuft4auk/image/upload/v1662837143/tesla/kd0gdftnowd0xwwqpbnd.jpg', filename: 'tesla/3ywhiteinterior'
                    })
                break;
            default:
        }
        ListingDataService.create({
            ...seed, author: auth().id, images: result
        })
            .then(({ data }) => {
                if (data.id) {
                    setMessage(data.message)
                    setMessageStatus(data.messageStatus)
                }
            })
    }

    const getUser = async () => {
        const id = auth().id
        userService.getUser({ id })
            .then(({ data }) => {
                console.log(data)
                return data
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    // Can move to UserContext file
    const register = (obj) => {
        userService.register(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                if (data.messageStatus === 'success') {
                    navigate('/login')
                }
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const verify = token => {
        userService.verify(token)
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const resend = obj => {
        userService.resend(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                navigate('/login')
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const login = obj => {
        userService.login(obj)
            .then(({ data }) => {
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
                if (data.user) {
                    if (signIn(
                        {
                            token: data.token,
                            expiresIn: 1000 * 60 * 60 * 24 * 7,
                            tokenType: "Bearer",
                            authState: { email: data.user.email, username: data.user.username, id: data.user._id, image: data.user.image }
                        }
                    )) {
                        if (data.user.image) {
                            setUserImage(data.user.image.url)
                            window.localStorage.setItem('userImage', data.user.image.url)
                        }
                        navigate('/listings')
                    }
                }
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
                if (response.data.message === 'Account not verified') {
                    navigate('/verify')
                }
            })
    }

    const logout = () => {
        userService.logout()
            .then(({ data }) => {
                signOut();
                window.localStorage.clear()
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }

    const updateUser = async (body) => {
        const id = auth().id
        userService.updateUser(id, body)
            .then(({ data }) => {
                const obj = data.image.url
                window.localStorage.setItem('userImage', obj)
                setUserImage(obj)
                setMessage(data.message)
                setMessageStatus(data.messageStatus)
            })
            .catch(({ response }) => {
                setMessage(response.data.message)
                setMessageStatus(response.data.messageStatus)
            })
    }


    return (
        <ListingContext.Provider value={{ userImage, setUserImage, getUser, updateUser, existingImages, setExistingImages, currentListings, setCurrentListings, currentListing, model, models, setModel, year, years, setYear, trim, trims, setTrim, interior, interiors, setInterior, exterior, exteriors, setExterior, autopilot, autopilots, setAutopilot, mileage, setMileage, condition, conditions, setCondition, title, titles, setTitle, location, setLocation, price, setPrice, description, setDescription, setFilters, resetFilters, createNewListing, getListing, updateListing, deleteListing, deleteAllListings, renderEditForm, findData, seed, loading, setLoading, author, isAuthor, setIsAuthor, register, login, logout, resend, currentListingAuthor, current, sortLabel, setSortLabel, sort, setSort, order, setOrder, message, setMessage, messageStatus, setMessageStatus, getListings, comments, setComments, allImages, setAllImages, createSeedListing, verify }}>
            {children}
        </ListingContext.Provider>
    )
}