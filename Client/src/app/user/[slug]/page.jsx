"use client"

import Order from './components/Orders'
import styls from './user.module.css'
import Link from 'next/link'
import { UserContext } from '@/app/Context/UserContext'
import { useContext } from 'react'


const UserInterface = () => {
    const {User, setPath, setToken} = useContext(UserContext)
    // if(!token) return setPath('/login');

    
    const HandleOnClick = () => {
        setToken(null)
        localStorage.clear()
        return setPath('/allproducts/none')
    }

    return (
        <>
        <main className={styls.body}>
            <section className={`BGC-S ${styls.section1}`}>
                <div className={`${styls.ordersConainer}`}>
                    {User.orders?
                    User.orders.map((order)=>(
                        <Link key={order.id} href={`/mycart/${order.id}`}>
                        <Order key={order.id} order={order}/>
                        </Link>
                    )):
                    null}
                </div>

            </section>
            <section className={`${styls.section2}`}>
                    <div className={`BGC-S ${styls.userData}`}>
                        <h1>Your Data:</h1>
                        <span>{User.email}</span>
                        <span>{User.name}</span>
                        <span>{User.address}</span>
                        <span>{User.phone}</span>
                        <button className={`button-P ${styls.buton}`} onClick={HandleOnClick}>Cerrar sesion</button>
                    </div>

            </section>
        </main>
        </>
    )
}
export default UserInterface