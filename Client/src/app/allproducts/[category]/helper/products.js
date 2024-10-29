
const products = async ()=>{
    try {
        const res = await fetch('http://localhost:3000/products')
        if(!res.ok)throw res.error
        const products = await res.json()
        return products
    } catch (error) {
        alert(error.message)
        return
    }
}
export default products