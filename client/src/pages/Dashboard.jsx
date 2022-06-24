import React from 'react'
import {Navigate} from 'react-router-dom'
import { LOCAL_STORAGE_TOKEN_NAME } from '../context/constants'

const Dashboard = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
  return (
    <div>
      {token ? 'Dashboard' : <Navigate to='/signin'/>}
    </div>
  )
}

export default Dashboard