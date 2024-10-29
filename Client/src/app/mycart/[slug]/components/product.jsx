
import styls from './styles/product.module.css';
import Image from 'next/image';

const Product = ({product}) => {
    const {id, name, price, image} = product

    return (
        <div className={`BGC-P ${styls.contenedor}`}>
                <Image
                    className={styls.image}
                    src={`${image}`} 
                    alt={`${name}`}
                    width={50}  
                    height={50} 
                />
                <span className={styls.id}>#{id}</span>
                <span className={styls.name}>{name}</span>
                <span>${price}</span>
        </div>
    )

}

export default Product