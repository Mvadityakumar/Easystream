import Footer from '../components/Footer'
import Navbar from "../components/navbar"
import '../styles/profile.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';   
import { useNavigate } from 'react-router-dom';
import '../styles/signin.css'
import axios from 'axios';
import { useCookies } from 'react-cookie';


const Profile = () => {

    const [cookies,setCookie,removeCookie] = useCookies(['user', 'email']);
    const navigate = useNavigate();
    
   const [users, setusers] = useState({});


   const [allUsers, setAllUsers] = useState([]);

  

   
// const profileEmailChecking=(e)=>{

// axios.get("http://127.0.0.1:3000/getusers")
      
//  const currentUser = allUsers.find(u => u.username === cookies.user);
//         const verifyemail=allUsers.find((user)=>user.email===e.target.value)
//         // console.log(verifyemail.email);
//         if( verifyemail && verifyemail.email !== currentUser.email){
//           seterr("Email Already Exists")
//           document.getElementById('signbtn').disabled = true;
//         }
//         else{
//           seterr("")
//           document.getElementById('signbtn').disabled = false;
//         }

//         if(verifyemail.email == currentUser.email ){
//            document.getElementById('signbtn').disabled = true;

//         }
 
   
   

// }



    useEffect(()=>{
       axios.get("https://easystreamserver.onrender.com/getusers")
    .then(res => {
      const currentUser = res.data.find(u => u.username === cookies.user);
      setusers(currentUser);
      setAllUsers(res.data);
    })
    .catch(err => console.error("Error fetching users:", err));

     
        
    },[])

    const savee=(value)=>{
        axios.put(`https://easystreamserver.onrender.com/updateuser/${cookies.email}/${cookies.user}`,value).then(()=>{
          
       
          
          
        
          alert("Profile Updated Successfully\nplease login again to see the changes");
        
          

          
        })
  
      console.log("value", value);
      
     
    }


   
 



  return (
    <div>
        <div className="bg-black  ">
            <div  id='navv' style={{padding:"10px"}}>
                <Navbar/>
            </div>

            <div  className="d-flex justify-content-center align-items-center vh-100">
                 <div  id='signinform' >
                <h1 className='fw-bold text-center'>Profile</h1>
                 <Formik enableReinitialize={true} initialValues={{
                  username: users.username || '' ,

                       email: users.email|| '' ,

                       password:   users.password|| ''      }} 
                        validationSchema={Yup.object({
                    username: Yup.string().required("Username is required"),
                    email: Yup.string().email("Invalid email format").required("Email is required"),
                    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required")

                    
              })}
              onSubmit={(values)=>{
               savee(values);
                
              }}
                    
               
                  >
                   {
                    ({dirty,isValid})=>(
                       <Form>
                         <dl>
                                                       <dt className='fw-bold pb-2 h4' >UserName</dt>
                                                       <dd><Field type="text" name="username"   className='form-control'  /></dd>
                                                       <dd className='text-danger'><ErrorMessage name="username" className="error" /></dd>
                                                       <dt className='fw-bold pb-2 h4'>Email</dt>
                                                       <dd><Field type="email"  name="email" id="email"  disabled className='form-control ' /></dd>
                                                       <dd className='text-danger '><ErrorMessage name="email" className="error " /><div className="text-danger"></div></dd>
                                                       <dt className='fw-bold pb-2 h4'>Password</dt>
                                                       <dd><Field type="Text" name="password" className='form-control' /></dd>
                                                       <dd className='text-danger pb-2'><ErrorMessage name="password" className="error" /></dd>
                                                      
                                                       <dd className="d-flex justify-content-center gap-2">
                                                        <button type='submit'   disabled={!dirty || !isValid} className='btn  w-100 mt-1 mb-1' id='signbtn'>Save</button>
                                                        <button type='button' onClick={()=>{navigate(`/home/${cookies.user}`)}}  className='btn w-100 mt-1 mb-1' id='signbtn'>Cancel</button>
                                                       </dd>
                                                         
                           
                                                       
                                                   </dl>

                    </Form>
                    )
                   }



                </Formik>
               
               


            </div>
            </div>


            <div>
                <Footer/>
            </div>


        </div>

    </div>
  )
}

export default Profile