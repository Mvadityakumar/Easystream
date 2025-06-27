import React, { useCallback, useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import '../styles/home.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Curoselslider from '../components/curoselslider'
import Footer from '../components/Footer'



const Homepage = () => {

  const navigate = useNavigate();
  const {username} = useParams();
  

  const [movies, setMovies] =useState([
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

  const gettingmovies = useCallback(async()=>{
    const response = await axios.get("https://easystreamserver.onrender.com/getmovies")
    setMovies(response.data)
    console.log(response.data[0].title)
    
  })

  useEffect(()=>{
    gettingmovies()
  },[])




  const btnClickHomeSlider = (e,id,title) =>{
    // e.preventDefault()
    navigate(`/${username}/${id}/${title}`)
// console.log(username,id,title);

  }

  return (
    <div id='home'>
      <div id='navv' style={{padding:"10px"}}>
      <Navbar/>
      </div>
      <div >

      <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
  {movies.length > 10 && movies[1]?.backgroundImage && (
    <div className="carousel-item active" data-bs-interval="4000">
      <img  src={movies[1].backgroundImage} className="d-block w-100 " alt="..." height="500px" />
      <div className="carousel-caption " style={{textAlign:"left"}}>
        
        <button style={{}} onClick={(e)=>btnClickHomeSlider(e,movies[1].id,movies[1].title)}  className='btn w-25 mt-1 mb-2 ' id='signbtn'><span className='bi bi-play-fill'></span> Watch</button>
        
      </div>
    </div>
  )}
  {movies.length > 10 && movies[9]?.backgroundImage && (
    <div className="carousel-item" data-bs-interval="4000">
      <img  src={movies[9].backgroundImage} className="d-block w-100" alt="..." height="500px" />
       <div className="carousel-caption"  style={{textAlign:"left"}}>
       <button style={{}}  onClick={(e)=>btnClickHomeSlider(e,movies[9].id,movies[9].title)}  className='btn w-25 mt-1 mb-2 ' id='signbtn'><span className='bi bi-play-fill'></span> Watch</button>
      </div>
    </div>
  )}
  {movies.length > 10 && movies[5]?.backgroundImage && (
    <div className="carousel-item" data-bs-interval="4000">
      <img  src={movies[5].backgroundImage} className="d-block w-100" alt="..." height="500px" />
       <div className="carousel-caption"  style={{textAlign:"left"}}>
       <button style={{}}  onClick={(e)=>btnClickHomeSlider(e,movies[5].id,movies[5].title)} className='btn w-25 mt-1 mb-2 ' id='signbtn'><span className='bi bi-play-fill'></span> Watch</button>
      </div>
    </div>
  )}
  {movies.length > 10 && movies[8]?.backgroundImage && (
    <div className="carousel-item" data-bs-interval="4000">
      <img  src={movies[8].backgroundImage} className="d-block w-100" alt="..." height="500px" />
       <div className="carousel-caption "  style={{textAlign:"left"}}>
       <button style={{}}  onClick={(e)=>btnClickHomeSlider(e,movies[8].id,movies[8].title)} className='btn w-25 mt-1 mb-2 ' id='signbtn'><span className='bi bi-play-fill'></span> Watch</button>
      </div>
    </div>
  )}
  {movies.length > 10 && movies[14]?.backgroundImage && (
    <div className="carousel-item" data-bs-interval="4000">
      <img  src={movies[14].backgroundImage} className="d-block w-100" alt="..." height="500px" />
       <div className="carousel-caption "  style={{textAlign:"left"}}>
       <button style={{}}  onClick={(e)=>btnClickHomeSlider(e,movies[14].id,movies[14].title)} className='btn w-25 mt-1 mb-2 ' id='signbtn'><span className='bi bi-play-fill'></span> Watch</button>
      </div>
    </div>
  )}
  {movies.length > 10 && movies[6]?.backgroundImage && (
    <div className="carousel-item" data-bs-interval="4000">
      <img  src={movies[6].backgroundImage} className="d-block w-100" alt="..." height="500px" />
       <div className="carousel-caption "  style={{textAlign:"left"}}>
       <button style={{}}  onClick={(e)=>btnClickHomeSlider(e,movies[6].id,movies[6].title)} className='btn w-25 mt-1 mb-2 ' id='signbtn'><span className='bi bi-play-fill'></span> Watch</button>
      </div>
    </div>
  )}
</div>






  
</div>

      </div>


      <div>
        <h2 className='fw-bold ms-3 text-white' style={{textAlign:"left",  marginTop:"20px"}}>Trending Movies</h2>
        <Curoselslider/>
      </div>

      <div>
        <h2 className='fw-bold ms-3 text-white' style={{textAlign:"left", marginTop:"20px"}}> Top Rated Movies
        </h2>
        <Curoselslider/>
      </div>

      <div>
        <h2 className='fw-bold ms-3 text-white' style={{textAlign:"left", marginTop:"20px"}}> 
        Historical movies
        </h2>
        <Curoselslider/>
      </div>

      <div>
        <h2 className='fw-bold ms-3 text-white' style={{textAlign:"left", marginTop:"20px"}}> 
        Top-rated movies on IMDb
        </h2>
        <Curoselslider/>
      </div>


      <div>
        <Footer/>
       
      </div>






    </div>
  )
}

export default Homepage