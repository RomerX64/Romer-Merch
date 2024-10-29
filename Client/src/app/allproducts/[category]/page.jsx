"use client"
import styls from './allproducts.module.css';
import Product from './components/Product'
import { useState, useEffect } from 'react';
import products from './helper/products'


const AllProducts = () =>{
  
    const [product, setProduct] = useState([])
    const [flitredProducts, setFlitredProducts] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([]);

    const categorys = [
        { id: 1, name: "Smartphones" },
        { id: 2, name: "Laptops" },
        { id: 3, name: "Tablets" },
        { id: 4, name: "Headphones" },
        { id: 5, name: "Cameras" },
        { id: 6, name: "Printers" },
        { id: 7, name: "Monitors" },
        { id: 8, name: "Storage" },
        { id: 9, name: "Accessories" }
    ]
    const [categoryes, setCategoryes] = useState(categorys)

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await products();
            setProduct(fetchedProducts);
            setFlitredProducts(fetchedProducts)
        };

        fetchProducts();
        
    }, []);

    const HandleOnSubmit = (event) => {
        event.preventDefault();
        if(categoryes.length === 0){
            setSelectedCategories([])
            return setFlitredProducts(product)
        } 
            
        setCategoryes(categoryes)
        const filtred = product.filter(product => categoryes.includes(product.categoryId));
        setFlitredProducts(filtred)
    }

    
    
    const HandleOnClick = (id) =>{
        if (selectedCategories.includes(id)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== id));
        } else {
            setSelectedCategories([...selectedCategories, id]);
        }

        if(categoryes.includes(id)){
            const n = categoryes.filter((cat)=> cat !== id)
           return setCategoryes(n)
        }else{
            
            return setCategoryes([...categoryes,id])
        }
    }
  
 
    return(
        <>
        <main className={`BGC-S ${styls.body}`}>
            <form onSubmit={HandleOnSubmit} className={styls.filter}>
                {categorys.map((category)=>(
                    <button key={category.id} onClick={()=>(HandleOnClick(category.id))} value={category.id} type='button' className={`button-P ${selectedCategories.includes(category.id) ? 'BGC-P' : ''}` }>{category.name}</button>

                ))}
                <button type='Submit' className='button-P BGC-V'>Submit</button>
                <button type='Submit' onClick={()=> setCategoryes([])} className='button-P BGC-P'>All Products</button>
            </form>

            <section className={styls.board}>
        {
          product.length >0?(
            flitredProducts?(

                flitredProducts.map((product)=>(
                 <Product key={product.id} product={product} categorys={categorys} /> 
                ))):(
                    product.map((producto)=>(
                        <Product key={producto.id} producto={producto} categorys={categorys} />  
                    )))
          ):(
              <h1>Loading Products...</h1>
          )
                        
                        
                }
                    
                
            </section>

        </main>
        </>
    )
}

export default AllProducts