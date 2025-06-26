import React from 'react'
import '../styles/initialscreen.css'
import { Navigate, useNavigate } from 'react-router-dom' 

const Initialscreen = () => {

  const navigate = useNavigate()


  const signInBtnClick=()=>{
    navigate('/signin')

  }

  return (
    <div  className="" id='mainbackground' >
      <div id='shade'>
       <div >
       <nav id='nav' className='d-flex justify-content-between align-items-center'>
          <div>  <img src='./assets/logo.png' id='logo' alt="logo" width='150' height='150' />   </div>
          <div><button onClick={signInBtnClick} className='btn' id='btn'>Sign In</button></div>
        </nav>
        <main id='main'>
          <div>
          <h1 className='fw-bold '>Welcome to  Easy Stream</h1>
          <p className=''>Free Unlimited movies, TV shows and more, Join 
            Easy Stream to watch the latest movies, TV shows.</p>
          <div className=''><button onClick={signInBtnClick} className='btn w-50 '  id='btn'>Sign In to Join Easy Stream</button></div>
          </div>

        </main>
       </div>
        
       
      </div>
       
    </div>
  )
}

export default Initialscreen