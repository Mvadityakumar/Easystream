
import { Link } from 'react-router-dom';
import logoo from '../../public/assets/logoo.png'; 


const Footer = () => {
  return (
    <div >
         <footer className='text-center  pt-5 pb-5'>
            <img src={logoo} alt="logo" width='100'  />
            <div className='d-flex justify-content-center gap-3 mt-2'>
                <Link className='text-decoration-none'>Terms and Privacy Notice</Link>
                <Link className='text-decoration-none'>Send us feedback</Link>
                <Link className='text-decoration-none'>Help</Link>
            </div>
            <div className='text-muted mt-2'>© 2025 EasyStream, Inc.</div>
            <div className='text-muted'>All rights reserved.</div>

        </footer>
    </div>
  )
}

export default Footer