import axios from 'axios'
import React, { useState ,useEffect} from 'react'
import { useCookies } from 'react-cookie'
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion' // ✅ import motion
import Footer from '../components/Footer'


const WatchList = () => {

  const navigate = useNavigate()

    const [cookies, setCookie, removeCookie] = useCookies(['user', 'email']);

    const[movies, setMovies] = useState([
        {"id": 0,
          "title":"",
          "description":" ",
        "image":" ",
        "backgroundImage": "",
        "rating": 0,
        "releaseDate": "",
        "genre": [],
        "duration": "",
        "cast": [ ],
        "trailer": "",
        "fullMovie": "",
        "language": "",
        "director": "",
        "email":""
    }])

    const moviesfetching=()=>{
 
      axios.get(`https://easystreamserver.onrender.com/getwatchlistmovies/${cookies.email}`).then((moviedetails)=>{
        setMovies(moviedetails.data)
    })
   

    
    }

    useEffect(()=>{
        moviesfetching()
    },[])

    const moreInfoBtn =(e,movies)=>{
      navigate(`/${cookies.user}/${movies.id}/${movies.title}`)
    } 

    const removeMovieFromWatchList=(e,movies)=>{
      axios.delete(`https://easystreamserver.onrender.com/deletewatchlist/${movies.id}/${cookies.email}`).then(()=>{
  console.log("deleted");
  moviesfetching()
  
      })

    

     
    
    }

    





  return (
    <div className='bg-black vh-100' style={{ overflow: "auto" }}>
  <div id='navv' style={{ padding: "10px" }}><Navbar /></div>
  <div className='d-flex flex-wrap align-items-center justify-content-evenly gap-5'>

    { movies.length === 0 ?( <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <h1 className="text-white">No movies in watchlist</h1>
    </div>): (
       movies.filter(movie => movie.email === cookies.email).map((filterdmovie, index) =>
        <motion.div key={index} whileHover="hover" className="position-relative mt-3">
          <motion.div
            style={{  overflow: "hidden", borderRadius: "10px" }}
            initial="rest"
            animate="rest"
            whileHover="hover"
             
            className="position-relative"
          >
            <motion.img
              src={filterdmovie.image}
              width="250px"
            height="300px"

             
              
            
              alt="movie"
           
              variants={{
                rest: { filter: "brightness(1)" },
                hover: { filter: "brightness(0.5)" }
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              variants={{
                rest: { opacity: 0, y: 50 },
                hover: { opacity: 1, y: 0 }
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: "absolute",
                bottom: "10px",
               
               
              
                display: "flex",
              
            
                gap: "10px"
              }}
            >
              <button id='signbtn' onClick={(e)=>moreInfoBtn(e,filterdmovie)} className='btn ms-3 '>More info</button>
              <button id='signbtn' onClick={(e)=>removeMovieFromWatchList(e,filterdmovie)} className='btn '>Remove</button>
            </motion.div>
          </motion.div>
        </motion.div>
      )
    )
     
    }
  </div>
  <div>
    <Footer/>
  </div>
</div>
  )
}

export default WatchList