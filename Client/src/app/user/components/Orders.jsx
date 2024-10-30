import styls from './styles/orders.module.css'


const Order = ({order}) =>{
    const {status, id , date} = order

    const dateObj = new Date(date);

    // Formatear la fecha como 'dd/mm/aaaa'
    const formattedDate = dateObj.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    // Formatear la hora como 'hh:mm'
    const formattedTime = dateObj.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Usar formato de 24 horas
    });
    
    return (
        <button className={`BGC-P ${styls.order}`}>
            <span>#{id}</span>
            <span>{formattedDate} at {formattedTime}</span>
            <span className={styls[status]}>{status}</span>
        </button>
    )
}
export default Order