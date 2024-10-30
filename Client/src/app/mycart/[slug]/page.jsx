"use client"

import styls from './mycart.module.css'
import Product from './components/product'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/app/Context/UserContext'
import { use } from 'react'
import { redirect } from 'next/navigation'

const MyCart = ({params})=>{

    const { slug } = use(params) ;

    const { order, newOrder, token  } = useContext(UserContext)
    const [isDisabled, setIsDisabled] = useState(false)
    const [estaOrden, setestaOrden] = useState({})
    const [tokenAuxiliar, setTokenAuxiliar] = useState();
    const [products, setProducts] = useState([])
    const [amount, setAmount] = useState(0)




    useEffect(() => {
        const timeoutId = setTimeout(() => {
        if (!token) {
            setTokenAuxiliar(localStorage.getItem('userToken'))

            if(!tokenAuxiliar) {
                redirect('/login')
            } 
        }
          return
        }, 2000); 
    
        return () => clearTimeout(timeoutId); 
      }, [token, tokenAuxiliar]);
    

    useEffect(() => {
        
        console.log(order)
        console.log(Number(slug))
        const thisorder = order.find(orden => orden.id === Number(slug));
        console.log(thisorder)

        if(!thisorder) return
        setestaOrden(thisorder)
        if(thisorder.status !== "pending"){
            setIsDisabled(true)
        }
        setProducts(thisorder.products)
    }, [slug, order]);
   



    useEffect(() => {
        const totalAmount = () => {
            if (!products) return setIsDisabled(false);
            if (!products.length) return;

            const total = products.reduce((acc, product) => acc + product.price, 0);
            setAmount(total);
        };

        totalAmount();
    }, [products]);



    const onclickhandler = ()=>{
        return newOrder()
    }





    return(<>
        <main className={`BGC-S ${styls.main}`}>
            <section className={styls.sectionOrder}>

            {products?
                ( products.map((product) => (
                    <Product key={product.id} product={product} />
                ))):
                <p className='TXT-G'></p>
            }
                

            </section>

            <section className={styls.sectionData}>

            <div className={styls.Data}>
            <span className={styls.amount}><p>Total amount</p>:  ${amount}</span>
            </div>
            <div className={styls.Data}> 
                {
                    isDisabled?
                            (estaOrden.length > 0 ?
                            (<p className='TXT-G'>You cannot change this order, if you think there is an error contact Support@mail.com</p>) 
                            :
                            (<button type='button' className='button-P TXT-G' onClick={()=> redirect('/allproducts/none')} >LETS GO BUY!!!</button>)
                    ):
                    (<button type='button'  onClick={onclickhandler} >Completar orden</button>)
                }
                
            </div>

            </section>
        </main>
    </>)
}

export default MyCart