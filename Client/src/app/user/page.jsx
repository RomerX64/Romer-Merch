"use client"

import Order from './components/Orders'
import styls from './user.module.css'
import Link from 'next/link'
import { UserContext } from '@/app/Context/UserContext'
import { useContext, useState, useEffect } from 'react'
import { redirect } from 'next/navigation';



const UserInterface = () => {
    const {User, token, setToken, setUser} = useContext(UserContext)
    const [tokenAuxiliar, setTokenAuxiliar] = useState();
    const [UserAuxiliar, setUserAuxiliar] = useState();

    console.log(User)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        if (!token) {
            setTokenAuxiliar(localStorage.getItem('userToken'))

            if(!tokenAuxiliar) {
                redirect('/login')
            } 
        }
        if (!User) {
            

            setUserAuxiliar(JSON.parse(localStorage.getItem('User')))

            if(!UserAuxiliar) {
                redirect('/login')
            } 
        }
          return
        }, 2000); 
    
        return () => clearTimeout(timeoutId); 
      }, [User, UserAuxiliar, token, tokenAuxiliar]);
    
    const HandleOnClick = () => {
        setToken(null)
        setUser({
            id:'',
            name:'',
            email:'',
            password:'',
            address:'',
            phone:'',
            credential:{
                id:'',
                password:''
            },
            orders:[],
        })
        localStorage.clear()
        return redirect('/allproducts/none')
    }

    return (
        <>
        <main className={styls.body}>
            <section className={`BGC-S ${styls.section1}`}>
                <div className={`${styls.ordersConainer}`}>
                    {User?
                    User.orders?.map((order)=>(
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
                        <span>{User?.email}</span>
                        <span>{User?.name}</span>
                        <span>{User?.address}</span>
                        <span>{User?.phone}</span>
                        <button className={`button-P ${styls.buton}`} onClick={HandleOnClick}>Cerrar sesion</button>
                    </div>

            </section>
        </main>
        </>
    )
}
export default UserInterface