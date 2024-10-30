"use client"

import { createContext, useState, useEffect,  } from "react";
import { redirect, useRouter } from 'next/navigation';

const UserContext = createContext()

const UserProvider = ({children}) =>{
    const router = useRouter()
    const [token, setToken] = useState(null)
    const [User, setUser] = useState(null)
    const [path , setPath] = useState(null) 
    const [order, setOrder] = useState([])
    const [newOrder, setNewOrder] = useState([])
    const [newOrderArray, setNewOrderArray] = useState([])
    const [item, setItem] = useState(null)
    const [itemObj, setItemObj] = useState(null)


    
    

    
    useEffect(() => {

        const localOrder = JSON.parse(localStorage.getItem('Order')) || [];

        if (!item || typeof item !== 'number') return;
    
        const itemExists = localOrder.includes(item);
    
        let updatedOrder;
    
        if (itemExists) {
            updatedOrder = localOrder.filter(i => i !== item);
        } else {
            updatedOrder = [...localOrder, item];
        }
    
        setNewOrderArray(updatedOrder);
        localStorage.setItem('Order', JSON.stringify(updatedOrder)); 
        setItem(null);
    }, [item, token]);



    useEffect(() => {
        const localOrder = JSON.parse(localStorage.getItem('OrderObj')) || []; 
    
        if (!itemObj || typeof itemObj !== 'object' || !itemObj.id) return; 
    
        const itemExists = localOrder.some(existingItem => existingItem.id === itemObj.id);
        const updatedOrder = itemExists 
            ? localOrder.filter(existingItem => existingItem.id !== itemObj.id) 
            : [...localOrder, itemObj];
    
        setNewOrder(updatedOrder);
        localStorage.setItem('OrderObj', JSON.stringify(updatedOrder)); 
        setItemObj(null); 
    }, [itemObj]);

    console.log(newOrder)    

     
    useEffect(()=>{
        if(!User) setToken(null)

    },[User])

    useEffect(()=>{
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) setToken(storedToken)

        const user = localStorage.getItem('user');
        if (user) setUser(user)

        const w = localStorage.getItem('thisOrder');
        if (w) setNewOrder(w)

    },[])




    const getMyuser = async ({email,password})=> {
        try {
            const response = await fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const json = await response.json();
    
            setToken(json.token);
            localStorage.setItem("userToken", json.token);
    
            setUser(json.user);
            localStorage.setItem('User', JSON.stringify(json.user)); 
    
            router.push('/allproducts/none');
        } catch (err) {
            console.error(err);
        }
    }

    const newUser = async ({email, password, name, address, phone}) =>{
            await fetch('http://localhost:3000/users/register',{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({email, password, name, address, phone})
            })
            .then((res)=> res.json())
            .then((json)=>{
                setToken(json.token)
                localStorage.setItem("userToken", json.token)
                setUser(json.user)
                localStorage.setItem('User', JSON.stringify(json.user))
            })
            .catch((err) => console.error(err))

            return router.push('/allproducts/none');
        }   


    useEffect(()=>{
        const MyOrders = async () =>{
            if(!User?.orders || !token) return

            try {
                const res = await fetch('http://localhost:3000/users/orders',{
                    method: 'GET',  
                    headers: {
                      'authorization': `${token}`  
                    }
                  })
                if(!res.ok)throw res.error;
                const orders = await res.json()
                
                
                return setOrder(orders)

            }catch (error) {    
               return console.error(error)
            }
        }
         MyOrders()
    },[User, token])

    

   
    const makeOrder = async ()=> {

        if(!User.id) return;
        const userId = User.id
        try {
                const res = await fetch('http://localhost:3000/orders',{
                    method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newOrder, userId }),
                })
            if(!res.ok)throw res.error;
            const a = await res.json();
            redirect(`/mycart/${a.id}`)  
            } catch (error) {
                console.error(error)
            }
    }




    



    const value = {
        User,
        setUser,
        getMyuser,
        newUser,
        order,
        makeOrder,
        setPath,
        setToken,
        token,
        path,
        setNewOrder,
        newOrder,
        setItem,
        setItemObj,
        newOrderArray
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}


export {UserProvider, UserContext}