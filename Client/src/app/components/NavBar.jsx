"use client"

import Link from 'next/link'
import styls from './styles/navbar.module.css'
import { useContext } from 'react'
import { UserContext } from '../Context/UserContext'




const Navbar = ()=>{
    const {User} = useContext(UserContext)

    
    


    return(
        <header className={`BGC-S ${styls.header}`}>
            <Link href='/allproducts/none' className={`TXT-G ${styls.title}`}>
            <span className={`TXT-G ${styls.title}`}>Romer-Merch</span>
            </Link>
            <Link href='/allproducts/none' className={`TXT-V ${styls.allProduct}`}>
            <span className={`TXT-V ${styls.allProduct}`}>All Products</span>
            </Link>
            <Link href={User.id ? `/mycart/${User.id}` : '/login'} className={`${styls.svg} ${styls.Link}`}>
            <svg className={styls.svg}  version="1.1" x="0px" y="0px" viewBox="0 0 468 585" style={{ enableBackground: 'new 0 0 468 468' }}><g><path d="M196.405,377.248c-25.105,0-45.529,20.355-45.529,45.376S171.3,468,196.405,468s45.529-20.355,45.529-45.376 S221.51,377.248,196.405,377.248z"/><path d="M348.812,377.248c-25.104,0-45.529,20.355-45.529,45.376S323.707,468,348.812,468s45.529-20.355,45.529-45.376 S373.916,377.248,348.812,377.248z"/><path d="M426.132,92.251c-6.519-1.186-12.764,3.153-13.941,9.676l-30.731,170.137H145.932L108.713,10.311 C107.873,4.396,102.808,0,96.833,0H43.999c-6.627,0-12,5.373-12,12c0,6.628,5.373,12,12,12h42.419l40.317,283.538 c3.661,25.747,26.067,45.163,52.119,45.163h186.984c6.627,0,12-5.373,12-12c0-6.628-5.373-12-12-12H178.854 c-14.178,0-26.369-10.551-28.358-24.542l-1.151-8.096h242.14c5.805,0,10.777-4.154,11.809-9.867l32.514-180.004 C436.986,99.671,432.654,93.429,426.132,92.251z"/><path d="M189.577,247.014h149.807c14.337,0,26-11.663,26-26V89.354c0-6.627-5.373-12-12-12h-36.401V52.408 C316.982,23.51,293.43,0,264.48,0s-52.502,23.51-52.502,52.408v24.946h-36.402c-6.627,0-12,5.373-12,12v131.659 C163.577,235.351,175.24,247.014,189.577,247.014z M235.979,52.408C235.979,36.744,248.765,24,264.48,24 s28.502,12.744,28.502,28.408v24.946h-57.004V52.408z"/><circle cx="413.338" cy="340.702" r="14"/></g></svg>            
            </Link>

            {User?
            (<Link className={`${styls.Link} ${styls.svg}`} href={`/user`}><svg className={styls.svg} data-name="Layer 1" viewBox="0 0 50 62.5" x="0px" y="0px"><path d="M31,26a9,9,0,1,0-12,0,12.86,12.86,0,0,0-8.61,12.12,1.54,1.54,0,0,0,3.08,0,9.79,9.79,0,0,1,9.78-9.78h3.54a9.79,9.79,0,0,1,9.78,9.78,1.54,1.54,0,1,0,3.08,0A12.86,12.86,0,0,0,31,26ZM25,13.45a5.89,5.89,0,1,1-5.89,5.89A5.89,5.89,0,0,1,25,13.45Z"/></svg> </Link>):
            (<Link className={`${styls.Link} ${styls.svgDisable}`} href='/login'> <svg className={styls.svgDisable} version="1.1" x="0px" y="0px" viewBox="0 0 100 125"><g transform="translate(0,-952.36218)"><path  d="M 17 4 C 13.710595 4 11 6.71059 11 10 L 11 90 C 11 93.2894 13.710595 96 17 96 L 50 96 A 2.0001996 2.0001996 0 1 0 50 92 L 17 92 C 15.857405 92 15 91.1426 15 90 L 15 10 C 15 8.85741 15.857405 8 17 8 L 50 8 A 2.0001996 2.0001996 0 1 0 50 4 L 17 4 z M 68.875 27.96875 A 2.0001996 2.0001996 0 0 0 67.5 31.3125 L 82.5 48 L 33 48 A 2.0001996 2.0001996 0 0 0 32.8125 48 A 2.0021961 2.0021961 0 1 0 33 52 L 82.5 52 L 67.5 68.65625 A 2.0034926 2.0034926 0 0 0 70.5 71.3125 L 88.5 51.3125 A 2.0001996 2.0001996 0 0 0 88.5 48.65625 L 70.5 28.65625 A 2.0001996 2.0001996 0 0 0 68.875 27.96875 z " transform="translate(0,952.36218)"/></g></svg> </Link> )}
            

        </header>
    )
}
export default Navbar