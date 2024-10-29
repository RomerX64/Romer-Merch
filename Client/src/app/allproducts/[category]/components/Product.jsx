"use client"

import styls from './styles/product.module.css'
import Image from 'next/image'
import { useContext, useState } from 'react'
import { UserContext } from '@/app/Context/UserContext'

const Product = ({product, categorys})=>{
    const {thisOrder, setThisOrder} = useContext(UserContext)
    const {name, image, price, categoryId, description, stock, id } = product
    const categories = categorys
    const [stockea, setStockea] = useState(false)
    if(stock === 0) setStockea(true)

    const [ inOrder, setInOrder] = useState(false)

    const HandleOnClickBuy = async () =>{

        if(thisOrder.includes(id)){
            const a = thisOrder.filter(a => a !== id )
            setInOrder(true)
            setThisOrder(a)
            return;
        }
        setInOrder(false)
        setThisOrder([...thisOrder, id])
        return;
    }
 

    return (
        <div  className={`BGC-P ${styls.card} ${stockea? styls.Nodisponible : ''}`}>
             <Image
                    className={styls.image}
                    src={`${image}`} 
                    alt={`${name}`}
                    width={1000}  
                    height={1000} 
                />

        <div className={`${styls.data}`}>
            <div className={styls.container}>
                <div className={styls.title}>
        <span className={`TXT-V ${styls.name}`}>{name}</span>
        <span className={`TXT-G ${styls.price}`}>${price}</span>
                </div> 
                <button onClick={HandleOnClickBuy} className={`Button-P ${inOrder? 'BGC-V' : 'BGC-G'} ${styls.button}`}>Buy It!!</button>
            </div>
        <span className={`TXT-S ${styls.description}`}>{description}</span>
        <span className={styls.category}>{categories[categoryId].name}</span>
        </div>
        </div>
    )
}

export default Product