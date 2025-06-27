import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { motion } from 'framer-motion' // ✅ import motion
import { useCookies } from 'react-cookie'



import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from '../components/Footer'

const Movies = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error | warning | info

  const [cookies, setCookie, removeCookie] = useCookies(['user', 'email']);

    const [movies, setMovies] = useState([
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
        "director": ""
    }])
    useEffect(()=>{
        axios.get("https://easystreamserver.onrender.com/getmovies").then((res)=>{
          const sortedMovies = res.data.sort((a, b) => {
            return new Date(b.releaseDate) - new Date(a.releaseDate);
          });
          setMovies(sortedMovies);
        })
    },[])


    const addToWatchListBtn = (e,movie)=>{
      // const user = { email: cookies.email };
      // console.log(cookies.email);
      // console.log(cookies.user);
      
      
     
      const watchlist = {...movie,email: cookies.email};
      // console.log(watchlist);
      
      // alert(cookies.email )
    
      
      axios.post("https://easystreamserver.onrender.com/addwatchlist",watchlist).then(()=>{

        setSnackbarMsg(`${movie.title} added to watchlist`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        // alert(`${movie.title} added to watchlist`)
        console.log("added to watchlist")
      }).catch((err) => {
        if (err.response && err.response.status === 409) {
          setSnackbarMsg(`${movie.title} already in watchlist.`);
          setSnackbarSeverity("warning");
          // alert(`${movie.title} already in watchlist.`);
        } else {
          // alert("Something went wrong");
          setSnackbarMsg("Something went wrong");
          setSnackbarSeverity("error");
        }
        setSnackbarOpen(true);
      });
  
      
      
  
    
     
    
      
      
    }



  return (
    <div className='bg-black' >
      <div id='navv' style={{padding:"10px"}} ><Navbar/></div>
        <div className='mt-4'>
        <h1 className='fw-bold ms-5 m-5 h2 text-white' >All Movies </h1>
        {movies.map((movie) => (
  <div key={movie.id} className='d-flex justify-content-evenly gap-5 p-3 '>
    <img className='rounded rounded-5 col-3 ' style={{ cursor: "pointer" }} src={movie.image} height="350px"  />

    {/* Hover container */}
    <motion.div
      className=' position-relative'
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <img
        className=' rounded rounded-5'
        style={{ cursor: "pointer",width: "900px" }}
        src={movie.backgroundImage}
        height="350px"
      
      />

      {/* Animated content that appears on hover */}
      <motion.div
        className='ps-5 position-absolute top-0 start-0 h-100 d-flex flex-column justify-content-center text-white'
        variants={{
          rest: { opacity: 0, y: 50, pointerEvents: 'none' },
          hover: { opacity: 1, y: 0, pointerEvents: 'auto', transition: { duration: 0.6, ease: "easeOut" } },
        }}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '1rem',
          padding: '1.5rem',
          width: '900px',
        }}
      >
        <h2 className='fw-bold text-white h2'>{movie.title}</h2>
        <div>
          <span>| {movie.genre.map((res, index) => <span key={index} className='mx-1'>{res}</span>)}</span>
          <span className='mx-1'>| {movie.language}</span>
          <span className='mx-1'>| {movie.releaseDate}</span>
        </div>
        <p className='pt-1'>Duration: {movie.duration}</p>
        <p className='text-white h6 w-50'>{movie.description}</p>
        <div><span>Rating: {movie.rating}</span></div>

        {/* Animated buttons */}
        <motion.div
          className='d-flex justify-content-start align-items-center mt-3 gap-3'
          variants={{
            rest: { opacity: 0, y: 10 },
            hover: {
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.5,
              },
            },
          }}
        >
          <motion.button
            className='btn'
            
            id='signbtn'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(movie.trailer)}
          >
             <span className="bi bi-caret-right-square-fill me-2"></span>
            Watch Trailer
          </motion.button>

          <motion.button
            className='btn'
            id='signbtn'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e)=>addToWatchListBtn(e,movie)}
            
          >
           <span className="  bi bi-file-plus-fill me-2"></span>{" "}
           Add To Watchlist
          </motion.button>

          


          <motion.button
            className='btn'
            id='signbtn'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(movie.fullMovie)}
           
          > <span className="bi bi-caret-right-square me-2"></span>
            Watch Now
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
))}
 <Snackbar
  open={snackbarOpen}
  autoHideDuration={4000}
  onClose={() => setSnackbarOpen(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}   sx={{
    width: '100%',
    backgroundColor:
      snackbarSeverity === 'success'
        ? '#4caf50'
        : snackbarSeverity === 'error'
        ? '#f44336'
        : snackbarSeverity === 'warning'
        ? '#ff9800'
        : '#2196f3',
    color: 'white',
  }}>
    {snackbarMsg}
  </Alert>
</Snackbar>
        </div>
        <div>
          <Footer/>
        </div>


    </div>
  )
}

export default Movies