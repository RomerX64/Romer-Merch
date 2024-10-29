"use client"
import styls from './styles/screamconfirmpassword.module.css'


const ScreamConfirmPassword = (where) => {
    
    const loged = true

    let email = ''

    if(loged){
    email = 'tomiromera@mail.com'
    }else{
        return 'login'
    }

    const handleOnSubmit = (event) =>{
        event.preventDefault()
        return where
    }
    return(
        <form onSubmit={handleOnSubmit} className={`${styls.form}`}>
            <span className={`TXT-G`}>Confirm your Password</span>
            <span className={`TXT-V`}>{email}</span>
            <input type="password" className="Input-1 BGC-B" />
            <button className='button-P BGC-V'>Submit</button>
        </form>
    )

}
export default ScreamConfirmPassword