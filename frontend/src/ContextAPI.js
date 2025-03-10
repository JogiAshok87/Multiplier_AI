import React, {createContext, useEffect, useState } from 'react'

export const storeContext = createContext();

const ContextProvider = ({children}) =>{
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const [loading, setLoading] = useState(true)
    const [promptResponse, setPromtResponse] = useState('')
     
    useEffect(()=>{
        const token = localStorage.getItem('authToken');
        if (token){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
        }
        setLoading(false)
    },[])

    
    const login = (token) =>{
        localStorage.setItem('authToken',token);
        setIsAuthenticated(true);
    }

    const logout = () =>{
        localStorage.removeItem('authToken');
        setIsAuthenticated(false)
    }

    const ContextValue = {isAuthenticated, login, logout, loading,promptResponse, setPromtResponse}

    return (
        <storeContext.Provider value={ContextValue}>
            {children}
        </storeContext.Provider>
    )
}

export default ContextProvider


