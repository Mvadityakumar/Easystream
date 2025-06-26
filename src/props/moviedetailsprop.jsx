import React from 'react'

const Moviedetailsprop = (props) => {
  return (
    <div style={{backgroundImage:`url(${props.bg})`,backgroundPosition:"center" , backgroundSize:"cover", height:"100vh"}} >
      <div >
        <h2 className='fw-bold text-white'>{props.title}</h2>
        <div><span>|{props.genre}</span><span>|{props.language}</span><span>|{props.releaseDate}.</span></div>
        <p>Duration: {props.duration}</p>
        <p className='text-white fw-bold h6'>{props.description}</p>
        <div>
          <span>Rating: {props.rating}</span>
        </div>
        <button > <span className='bi bi-play-fill me-4'></span>  Watch Now</button>
        <button  > <span className='bi bi-camera-reels-fill me-4'  ></span> Watch Trailer</button>
        
        
      
       
      </div>
    </div>
  )
}

export default Moviedetailsprop