import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../styles/slider.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';



const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
      slidesToSlide: 4 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 4,
      slidesToSlide: 2 // optional, default to 1.
    }
  };


const Curoselslider = () => {

  const navigate=useNavigate()
  const {username} = useParams()

    const [data, setdata] = useState([
        {
            "id": 0,
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
        }
    ])

   useEffect(()=>{

    axios.get("http://127.0.0.1:3000/getmovies").then((res)=>{
        
        setdata(res.data)
        
    })
   },[])

   const multicuroselimgclick = (e,id,title) =>{
    navigate(`/${username}/${id}/${title}`)
    
   }




  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {data.map((imageUrl, index) => {
          return (
            <motion.div
            className="slider"
            key={index}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              onClick={(e) => multicuroselimgclick(e, imageUrl.id, imageUrl.title)}
              style={{ cursor: "pointer", borderRadius: "10px" }}
              src={imageUrl.image}
              height="200px"
              alt="movie"
            />
          </motion.div>
          );
        })}
      </Carousel>
    </div>
  )
}

export default Curoselslider






