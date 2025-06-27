import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

const SignUp = () => {

    const navigate = useNavigate()

    const [err,setErr] = useState("")


    const gettingusers=(e)=>{
        axios.get("https://easystreamserver.onrender.com/getusers").then((res)=>{
            // console.log(res.data)
            const users = res.data.find((user)=>user.email === e.target.value)
            if(users){
                setErr("Email Already Exists")
                document.getElementById('signbtn').disabled = true
                
            }else{
                setErr("")
                document.getElementById('signbtn').disabled = false
            }
            

        })
    }


   const adduser= (userdetails)=>{
    console.log(userdetails)
    axios.post("https://easystreamserver.onrender.com/adduser",userdetails).then(()=>{
        console.log("User Added")
        alert("Registration Successful")
        document.getElementsByName('username')[0].value = ""
        document.getElementsByName('email')[0].value = ""
        document.getElementsByName('password')[0].value = ""
        navigate('/signin')

    })
   }
    


    



  return (
    <div className="" id='mainbackgroundsignin'>
           <div id='shadesignin'>
           <div><Link to='/'><img src="./assets/logo.png" id='logoinsigninpage' alt="logo" width='120' height='120' /></Link></div>
               <div  id='signinform'>
                   <h1 className='fw-bold text-center '>Sign Up</h1>
                   <Formik initialValues={{
                    username:"",

                       email: '',
                       password: '',

                   }} validationSchema={Yup.object({
                       username:Yup.string().required('Required'),
                       email: Yup.string()
                           .email('Invalid email address')
                           .required('Required'),
                       password: Yup.string()
                           .min(8, 'Must be 8 characters or more')
                           .required('Required')
                   })} onSubmit={(values) => {
                       adduser(values)
                   }}>
                       <Form>
                           <dl>
                               <dt className='fw-bold pb-2 h4' >UserName</dt>
                               <dd><Field type="text" name="username"   className='form-control'  /></dd>
                               <dd className='text-danger'><ErrorMessage name="username" className="error" /></dd>
                               <dt className='fw-bold pb-2 h4'>Email</dt>
                               <dd><Field type="email" onKeyUp={(e)=>gettingusers(e)} name="email" className='form-control' /></dd>
                               <dd className='text-danger'><ErrorMessage name="email" className="error" />{err}</dd>
                               <dt className='fw-bold pb-2 h4'>Password</dt>
                               <dd><Field type="password" name="password" className='form-control' /></dd>
                               <dd className='text-danger pb-2'><ErrorMessage name="password" className="error" /></dd>
                               <dd><button type='submit' className='btn w-100 mt-1 mb-1' id='signbtn'>Sign Up</button></dd>
                                 <dd className='text-center'>Already have an account ? <Link to='/signin' className='text-decoration-none'>Sign In</Link></dd>
   
                               
                           </dl>
                           
   
   
                       </Form>
   
                
                   </Formik>
   
   
               </div>
   
           </div>
   
   
       </div>
  )
}

export default SignUp 