"use client"

import styls from './login.module.css'
import { useState, useEffect } from 'react'
import Link from 'next/link.js'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'
import { redirect } from 'next/navigation'


 const Login = ()=>{
     const { getMyuser, token} = useContext(UserContext)
     
     useEffect(()=>{
         if(token) redirect('/allproducts/none')
     },[token])

    const [error, setError] = useState({
        email:'',
        password:''
    })

    const [data, setData] = useState({
        email:'',
        password:''
    })

    const HandleOnChange = (event)=>{
        const {name,value } = event.target;
        setData({
            ...data,
            [name]:value
        })
    }
    const HandleOnSubmit = async (event) =>{
        event.preventDefault()
        try {
            return await getMyuser(data)    
        } catch (error) {
            setError(error.message)
        }

    }


    return(
        <form className={`BGC-S CENTRAR ${styls.form}`} onSubmit={HandleOnSubmit}>
            <span>Your Email:</span>

            <input className='BGC-B Input-1' type="Email" placeholder="exaple@mail.com" name='email' onChange={HandleOnChange}/>

            {error.email && <span className={`TXT-G ${styls.error}`}>{`${error.email}`}</span>}

            <span>Your Password:</span>

            <input className='BGC-B Input-1' type="Password"  placeholder="*****" name='password' onChange={HandleOnChange}/>

            {error.password && <span className={`TXT-G ${styls.error}`}>{`${error.password}`}</span>}

            <button className={`BGC-V button-P`} type='submit'  disabled={!data.email || !data.password}>Submit</button>
            <Link href="/register">
            <button className={`TXT-G button-P`} type='button'>I dont have a account</button>
            </Link>

        </form>
    )
}
export default Login