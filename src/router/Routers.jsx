import React from 'react'
import { Routes ,Route} from 'react-router-dom'
import Initialscreen from '../pages/initialscreen'
import Notfound from '../pages/Notfound'
import Signin from '../pages/signin'
import SignUp from '../pages/SignUp'
import Homepage from '../pages/homepage'
import ProtectedRoute from '../components/ProtectedRoute'

import Movies from '../pages/movies'
import Moviedetails from '../pages/moviedetails'
import WatchList from '../pages/watchList'
import Profile from '../pages/Profile'




const Routers = () => {
  return (
    
        <Routes>
            <Route path='/' element={<Initialscreen/>} />
            <Route path='*' element={<Notfound/>} />
            <Route path='/signin' element={<Signin/>}/> 
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/home/:username' element={<ProtectedRoute><Homepage/></ProtectedRoute>} />
            <Route path='/:username/movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}  />
            <Route path='/:username/:id/:movie' element={<ProtectedRoute><Moviedetails/></ProtectedRoute>} />
            <Route path='/:username/watchlist' element={<ProtectedRoute><WatchList/></ProtectedRoute>}/>
            <Route path='/:username/profile'  element={<ProtectedRoute><Profile/></ProtectedRoute>} />

         

 
        </Routes>
    
  )
}

export default Routers