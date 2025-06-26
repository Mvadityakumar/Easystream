import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate, useParams } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const [cookies,removeCookie] = useCookies(['user'])
  const { username } = useParams() // Get the username from the URL

  // 1. If no user is signed in, redirect
  if (!cookies.user) {
    return <Navigate to="/signin" />
  }

  // 2. If signed-in user doesn't match the route param, redirect to Notfound
  if (cookies.user !== username) {
    return <Navigate to="/notfound" />
  }

  

  return children
}

export default ProtectedRoute
