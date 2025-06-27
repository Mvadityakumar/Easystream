import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import '../styles/navbar.css';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

const Navbar = () => {
  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [cookies, , removeCookie] = useCookies(['user']);
  const navigate = useNavigate();
  const { username } = useParams();
  const [showCanvas, setShowCanvas] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    axios.get("https://easystreamserver.onrender.com/getmovies").then((res) => {
      setMovies(res.data);
    });
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchSelect = (event, value) => {
    if (value) {
      const selected = movies.find(movie => movie.title === value);
      if (selected) {
        navigate(`/${username}/${selected.id}/${selected.title}`);
        setSearchText('');
        setSearchVisible(false);
      }
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const match = movies.find(movie => movie.title.toLowerCase() === searchText.toLowerCase());
      if (match) {
        navigate(`/${username}/${match.id}/${match.title}`);
        setSearchText('');
        setSearchVisible(false);
      }
    }
  };

  const logoutbtn = () => {
    removeCookie('user', { path: '/' });
     
    navigate('/');
  };

  const watchlistbtn = () => {
    navigate(`/${cookies.user}/watchlist`);
  };

  const profilebtn=()=>{
    navigate(`/${cookies.user}/profile`);
  }

  return (
    <>
      <div className='d-flex justify-content-between App' id='navbar'>
        <div className='d-flex align-items-center gap-5'>
          <li><img src='/assets/logoo.png' style={{ marginLeft: "30px" }} alt="logo" width='120' height='40' /></li>
          <li><Link to={`/home/${username}`} className='text-decoration-none text-white fw-bold'>Home</Link></li>
          <li><Link to={`/${username}/movies`} className='text-decoration-none text-white fw-bold'>Movies</Link></li>
        </div>

        <div className='d-flex align-items-center gap-4 me-5'>
          {searchVisible && (
            <Autocomplete
              freeSolo
              options={filteredMovies.map(movie => movie.title)}
              onInputChange={(event, newInputValue) => setSearchText(newInputValue)}
              onChange={handleSearchSelect}
              value={searchText}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Search..."
                  size="small"
                  autoFocus
                  onKeyDown={handleSearchKeyDown}
                  sx={{ backgroundColor: 'white', borderRadius: '5px', width: 300 }}
                />
              )}
            />
          )}

          <li>
            <span onClick={() => setSearchVisible(prev => !prev)} id="navsearch"
              className='bi bi-search border-3 p-1 rounded rounded-3 border text-white'
              style={{ cursor: "pointer" }}></span>
          </li>

          <li>
            <span onClick={() => setShowCanvas(true)}
              className='bi bi-person border-3 p-1 rounded rounded-3 border text-white h6'
              style={{ cursor: "pointer" }}></span>
          </li>

          <Offcanvas className="bg-black" show={showCanvas} onHide={() => setShowCanvas(false)} placement="end">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>WELCOME {username.toUpperCase()}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className='text-center '>
              <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <button onClick={profilebtn} className='btn btn-light w-50'>Profile</button>
                <button onClick={watchlistbtn} className='btn btn-light w-50'>Watchlist</button>
                <button onClick={() => setShowLogoutConfirm(true)} className='btn btn-light w-50'>Logout</button>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>

      <Modal show={showLogoutConfirm} onHide={() => setShowLogoutConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className='text-black'>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-black'>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={logoutbtn}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navbar;
