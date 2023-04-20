import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/user.service";
import { useSignOut, useSignIn } from 'react-auth-kit'
import { ListingContext } from "./ListingContext";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const {setMessage, setMessageStatus} = useContext(ListingContext)
    const [user, setUser] = useState({username:'', email: '', image: {url: '/brokenimage.jpg', filename: ''}})

    const navigate = useNavigate()
    const signIn = useSignIn()
    const signOut = useSignOut()

    const register = async (obj) => {
        // setLoading(true)
        const { data } = await userService.register(obj)
        setUser(data.user)
        setMessage(data.message)
        setMessageStatus(data.messageStatus)
        if (data.messageStatus === 'success') {
            login(obj)
        } else {
            // setLoading(false)
            setUser({username: '', email: '', image: {url: '', filename: ''}})
        }
    }

    const login = async (obj) => {
        // setLoading(true)
        const { data } = await userService.login(obj)
        setUser(data.user)
        setMessage(data.message)
        setMessageStatus(data.messageStatus)
        if (data.messageStatus === 'success') {

            if (signIn(
                {
                    token: data.token,
                    expiresIn: 1000 * 60 * 60 * 24 * 7,
                    tokenType: "Bearer",
                    authState: { email: data.user.email, username: data.user.username, _id: data.user._id },
                }
            )) {
                    navigate('/listings')
            }
        } else {
            // setLoading(false)
            setUser({username: '', email: '', image: {url: '', filename: ''}})
        }
    }

    const logout = async () => {
        // setLoading(true)
        try {
            const { data } = await userService.logout()
            signOut();
            navigate(0);
            setMessage(data.message)
            setMessageStatus(data.messageStatus)

        } catch (e) {
            setMessageStatus('error')
            setMessage('Issue logging out. Please try again')
        }
    }

    const getUser = async () => {
        const data = await userService.getUser()
        setUser(data.data)
        return data
    }

    const updateUser = async (id, body) => {
        const data = await userService.updateUser(id, body)
        setUser(data.data)
        return data
    }


    return (
        <UserContext.Provider value={{ register, login, logout, getUser, updateUser, user }}>
            {children}
        </UserContext.Provider>
    )
}