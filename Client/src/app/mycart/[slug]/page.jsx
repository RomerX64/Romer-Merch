"use client"

import styls from './mycart.module.css'
import Product from './components/product'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '@/app/Context/UserContext'
import { use } from 'react'
import { redirect } from 'next/navigation'

const MyCart = ({params})=>{

    const { slug } = use(params) ;

    const { order, newOrder, token, makeOrder  } = useContext(UserContext)
    const [estaOrden, setestaOrden] = useState({})
    const [tokenAuxiliar, setTokenAuxiliar] = useState();

    const [amount, setAmount] = useState(0)
    const [products, setProducts] = useState([])
    const [thisorder, setThisorder] = useState(null)





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

        if(slug !== 'newOrder'){
            const a = order.find(orden => orden.id === Number(slug))
            setThisorder(a.products)
        }else{
            setThisorder(newOrder)
        }

        if(!thisorder) return
        setestaOrden(thisorder)

        setProducts(thisorder)
    }, [slug, order, newOrder, thisorder]);
   



    useEffect(() => {

        const totalAmount = () => {

            if (!products.length) return;

            const total = products.reduce((acc, product) => acc + product.price, 0);

            setAmount(total);
        };

        totalAmount();
    }, [products]);

    console.log(estaOrden)

    const onclickhandler = ()=>{
        return makeOrder()
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
                estaOrden.length === 0 ?
                (
                    <button type='button' className='button-P TXT-G' onClick={() => redirect('/allproducts/none')}>
                        LETS GO BUY!!!
                    </button>
                )
                :
                (
                    <button type='button' className='button-P TXT-V' onClick={onclickhandler}>
                        Completar orden
                    </button>
                )
            }
                
            </div>

            </section>
        </main>
    </>)
}

export default MyCart