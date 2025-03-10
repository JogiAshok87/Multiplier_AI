import React,{useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {storeContext} from '../ContextAPI'

const ProtectedRoute = ({element}) => {
    const {isAuthenticated, loading} = useContext(storeContext)
    
    if (loading) return <h1 className='text-center, text-2xl'>Loading..........</h1>
    return isAuthenticated ? element : <Navigate to="/login" replace/>
}

export default ProtectedRoute