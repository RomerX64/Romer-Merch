"use client"

import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const UserContext = createContext()

const UserProvider = ({children}) =>{
    const router = useRouter()

    const [token, setToken] = useState(null)

    

    const [User, setUser] = useState({
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
    const [path , setPath] = useState(null) 

    
    const [order, setOrder] = useState({
        id: '',
		status: '',
		date: '',
		products:[]
    })

    const [thisOrder, setThisOrder] = useState([])

    useEffect(()=>{
        const storedToken = localStorage.getItem('userToken');
        if (storedToken) setToken(storedToken)

        const user = localStorage.getItem('user');
        if (user) setUser(user)

        const w = localStorage.getItem('thisOrder');
        if (w) setThisOrder(w)

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
            console.log(response)

            const json = await response.json();
    
            console.log(json.token);
            console.log(json.user);
    
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
                localStorage.setItem('User', json.user)
            })
            .catch((err) => console.error(err))

            return router.push('/allproducts/none');
        }   


    useEffect(()=>{
        const MyOrders = async () =>{
            if (!User?.id) return;
            if (!User.orders)return;
            try {
                const res = await fetch('http://localhost:3000/users/orders')
                if(!res.ok)throw res.error;
                const orders = await res.json()
                const Orders = User.orders
                if(!Orders) throw "You don't have any order"
                Orders.forEach(Order => {
                    const ordersUser = orders.find(order => order.id === Order.id);
                    
                    if (ordersUser) {
                       return setOrder(ordersUser)
                    }
                    throw "We couldn't find your orders"
                });
            } catch (error) {                
               return console.error(error)
            }
        }
         MyOrders()
    },[User])


    

   
    const newOrder = async ({productsId})=> {
        if(!User.id) return;
        const userId = User.id
        try {
                const res = await fetch('http://localhost:3000/orders',{
                    method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productsId, userId }),
                })
            if(!res.ok)throw res.error;
            const a = res.json;
            localStorage.setItem('thisOrder', a)
            setThisOrder(a)
            return
            
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
        newOrder,
        setPath,
        setToken,
        token,
        path,
        setThisOrder,
        thisOrder
    }

    return(
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )

}


export {UserProvider, UserContext}