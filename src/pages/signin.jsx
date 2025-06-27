import React from 'react'
import '../styles/signin.css'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'








const Signin = () => {
  

    const [cookies, setCookie,removeCookie] = useCookies(['user','email']);
    const [mailerror, setMailerror] = useState("");
    const [passworderror, setPassworderror] = useState("");
    const navigate = useNavigate()


    const submittinguserdetails = async (values) => {
        const response =   await axios.get('https://easystreamserver.onrender.com/getusers')
        // console.log(response.data);
        // console.log(values.email);
        // console.log(values.password);
        const user = response.data.find((user) => user.email === values.email )
        // console.log(user.username);
        
        if(user){
            setMailerror("")
            if(user.password === values.password){
                setPassworderror("")
                const expiryDate = new Date(new Date().getTime() + 15 * 60 * 1000); // 30 minutes
                setCookie('user', user.username,    { path: '/', expires: expiryDate } );
                setCookie('email', user.email,    { path: '/', expires: expiryDate } );
                navigate(`/home/${user.username}`)
            }else{
               
                setPassworderror("Incorrect Password")
            


            }

        }else{
            setMailerror("User not found")
            setPassworderror("")
        }
        
        
    }



  return (
    <div className="" id='mainbackgroundsignin'>
       
        <div id='shadesignin'>
        <div><Link to='/'><img src="./assets/logo.png" id='logoinsigninpage' alt="logo" width='120' height='120' /></Link></div>
            
            
            <div id='signinform'>
                <h1 className='fw-bold text-center'>Sign In</h1>
                <Formik initialValues={{
                    email: '',
                    password: ''
                }} validationSchema={Yup.object({
                    email: Yup.string()
                        .email('Invalid email address')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'Must be 8 characters or more')
                        .required('Required')
                })} onSubmit={(values) => {
                    submittinguserdetails(values)
                }}>
                    <Form>
                        <dl>
                            <dt className='fw-bold pb-3 h4'>Email</dt>
                            <dd><Field type="email" name="email" className='form-control' /></dd>
                            <dd className='text-danger'><ErrorMessage name="email" className="error" /><div className='text-danger'>{mailerror}</div></dd>
                            <dt className='fw-bold pb-3 h4'>Password</dt>
                            <dd><Field type="password" name="password" id='password' className='form-control' /></dd>
                            <dd className='text-danger pb-4'><ErrorMessage name="password" className="error" /><div className='text-danger'>{passworderror}</div></dd>
                            <dd><button type='submit' className='btn w-100 mt-1 mb-2' id='signbtn'>Sign In</button></dd>
                            <dd className='text-center'>New to Easy Stream ? <Link to='/Signup ' className='text-decoration-none'>Sign up now.</Link> </dd>

                            
                        </dl>


                    </Form>

             
                </Formik>


            </div>

        </div>


    </div>
  )
}

export default Signin