"use client"

import styls from './register.module.css'
import Link from 'next/link'
import { useState, useContext } from 'react'
import { UserContext } from '../Context/UserContext'

const Register = () =>{

    const { newUser } = useContext(UserContext)
    
    const [error, setError] = useState('')
    const [data, setData] = useState({
        email:'',
        name:'',
        password:'',
        address:'',
        phone:'',

    })

    const HandleOnSubmit = async (event)=>{
        event.preventDefault()
        setError( await newUser(data))
    }

    const HandleOnChange = (event)=>{
        const {name, value } = event.target;
        setData({
            ...data,
            [name]:value
        })
    }


    return(
        <form className={`CENTRAR BGC-S ${styls.form}`} onSubmit={HandleOnSubmit}>
            <span>Your Email:</span>
                <input  className='Input-1 BGC-B ' onChange={HandleOnChange} type="Email" placeholder='exaple@mail.com' name='email'/>
            <span>Your Name:</span>
                <input  className='Input-1 BGC-B ' onChange={HandleOnChange} type="text" placeholder='Name LastName' name='name'/>
            <span>Your Addres:</span>
                <input  className='Input-1 BGC-B ' onChange={HandleOnChange} type="text" placeholder='Name 123' name='address'/>
            <span>Your Phone:</span>
                <input  className='Input-1 BGC-B ' onChange={HandleOnChange} type="number" placeholder='3547 532645' name='phone'/>
            <span>Your Password:</span>
                <input  className='Input-1 BGC-B ' onChange={HandleOnChange} type="password" placeholder='*****' name='password' />

            {error && <span className={`TXT-G ${styls.error}`}>{error}</span>}
            
            <button type='submit' className="BGC-V button-P"  disabled={!data.email || !data.password || !data.name || !data.address || !data.phone }>Register</button>
            <Link href='/login'>
            <button className="TXT-G button-P">I have a account</button>
            </Link>
        </form>
    )

}

export default Register