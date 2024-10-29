
const validate = (userData)=>{
    const errors ={
        email:'',
        password:'',
    }  
    const noCaracteresEspecialesEmail = /^[a-zA-Z0-9@.]+$/;
    const noCaracteresEspecialesPassword = /^[a-zA-Z0-9]+$/;

    if (!noCaracteresEspecialesEmail.test(userData.email)) {
        errors.email = 'No se permiten caracteres especiales';
    }else {
        errors.email = ""
        errors.password = ""
    }

    if (!noCaracteresEspecialesPassword.test(userData.password)) {
        errors.password = 'No se permiten caracteres especiales';
    }else {
        errors.password = ""
        errors.email = ""
    }
    return errors
}




const validateRegistro = (userData)=>{
    const errors ={
        name:'',
        email:'',
        address:'',
        phone:'',
        password:'',
    }
   
    if(userData.email.length >7){
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
        errors.email = 'Email Invalido.';
    }
    }

    if(userData.name.length >2){
        if (!/^[a-zA-Z0-9\s]+$/.test(userData.name)) {
            errors.name = 'No se permiten Carcteristicas especiales';
        }
    }
    if(userData.address.length >2){
        if (!/^[a-zA-Z0-9\s]+$/.test(userData.address)) {
            errors.address = 'No se permiten Carcteristicas especiales';
        }
    }
    if(userData.password.length >2){
        if (!/^[a-zA-Z0-9\s]+$/.test(userData.password)) {
            errors.password = 'No se permiten Carcteristicas especiales';
        }
    }

    if(!userData.password)errors.password = 'Password is required'
    if(!userData.email)errors.email = 'Email is required'
    if(!userData.name)errors.name = 'Name is required'
    
    return errors;
};

export {validate, validateRegistro}
