"use client"

import styls from './mycart.module.css'
import Product from './components/product'
import { useContext, useState } from 'react'
import { UserContext } from '@/app/Context/UserContext'
import { useRouter } from 'next/router'


const MyCart = ()=>{

    const router = useRouter()
    const { id } = router.query 
    const { User , order, newOrder, thisOrder } = useContext(UserContext)
    const [isDisabled, setIsDisabled] = useState(true)
    if(!User.orders.includes(id)) return alert('You want to access an order when this order is not your propertys')

        const totalAmount = () =>{
            let price = 0;
            order.map((product) => price = product.price + price)
            return price
        }
    const estaOrden = order.filter(a => a.id === id)
    
    if(estaOrden !== thisOrder) {
        setIsDisabled(false)
        alert('You cannot change this order, if you think there is an error contact Support@mail.com') 
    }
        const onclickhandler = ()=> {
        return newOrder()
    }


    return(<>
        <main className={`BGC-S ${styls.main}`}>
            <section className={styls.sectionOrder}>

                {estaOrden.map((product)=>(

                    <Product key={product.id}  product={product}/>
                    
                 ))
                }
                <span className={styls.amount}><p>Total amount</p>:  ${totalAmount()}</span>

            </section>

            <section className={styls.sectionData}>

            <div className={styls.Data}></div>
            <div className={styls.Data}> 
                <button type='button'  onClick={onclickhandler} disabled>

                {isDisabled ? 'Botón Deshabilitado' : 'Botón Habilitado'}
                Completar orden
                </button>
            </div>

            </section>
        </main>
    </>)
}

export default MyCart