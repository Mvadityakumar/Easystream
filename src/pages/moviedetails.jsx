import React, { useState, useEffect, useCallback } from "react";
import { useCookies } from "react-cookie";

import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import { motion } from "framer-motion"; // ✅ import motion


import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Footer from "../components/footer";



const Moviedetails = () => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMsg, setSnackbarMsg] = useState('');
const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success | error | warning | info







  const { id } = useParams();
  const[cookies, setCookie,removeCookie] = useCookies(['user','email']);

  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    description: " ",
    image: " ",
    backgroundImage: "",
    rating: 0,
    releaseDate: "",
    genre: [],
    duration: "",
    cast: [],
    trailer: "",
    fullMovie: "",
    language: "",
    director: "",
  });

  const gettingMovieDetails = useCallback(async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/getmovie/${id}`);
      setMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [id]);

  useEffect(() => {
    gettingMovieDetails();
  }, [gettingMovieDetails]);

  const watchtrailerbtn = () => {
    window.open(movie.trailer);
    
  };
  const watchmovierbtn = () => {
    window.open(movie.fullMovie);
  };

  const addToWatchListBtn = (e,movie)=>{
    // const user = { email: cookies.email };
    // console.log(cookies.email);
    // console.log(cookies.user);
    
    
   
    const watchlist = {...movie,email: cookies.email};
    // console.log(watchlist);
    
    axios.post("http://127.0.0.1:3000/addwatchlist",watchlist).then(()=>{

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
    <div className="bg-dark">
      <div id="navv" style={{ padding: "10px" }}>
        <Navbar />
      </div>
      
      <div
        style={{
          backgroundImage: `url(${movie.backgroundImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.8)", height: "100vh" }}
          className="d-flex flex-column justify-content-center align-items-start p-5"
        >
          <motion.div
            id="details"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1], // custom cubic-bezier for smooth ease-in-out
              type: "tween",
            }}
          >
            <h2 className="fw-bold text-white h1">{movie.title}</h2>
            <div>
              <span>
                |{" "}
                {movie.genre.map((res, index) => (
                  <span key={index} className="mx-1 ">
                    {res}
                  </span>
                ))}
              </span>
              <span className="mx-1">| {movie.language}</span>
              <span className="mx-1">| {movie.releaseDate}</span>
            </div>
            <p className="pt-1">Duration: {movie.duration}</p>
            <p className="text-white mb-2  h6 w-50">{movie.description}</p>
            <div>
              <span>Rating: {movie.rating}</span>
            </div>

            
           

            <div className="d-flex justify-content-start align-items-center mt-4 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={watchtrailerbtn}
                className="btn"
                id="signbtn"
              >
                <span className="bi bi-caret-right-square-fill me-2"></span>{" "}
                Watch Trailer
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={(e)=>addToWatchListBtn(e,movie)}
                className="btn "
                id="signbtn"
              
              >
                <span className="  bi bi-file-plus-fill me-2"></span>{" "}
                Add To Watchlist
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={watchmovierbtn}
                className="btn"
                id="signbtn"
              >
                <span className="bi bi-caret-right-square me-2"></span> Watch
                Now
              </motion.button>
            </div>
          </motion.div>
          
        </div>
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
      
    </div>
  );
};

export default Moviedetails;
