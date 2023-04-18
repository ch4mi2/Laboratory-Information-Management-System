import { useState } from "react";
import { useStaffLogin } from '../../hooks/useStaffLogin'
import { useAuthContext } from '../../hooks/useAuthContext'


const StaffLogin = () =>{
    const { user } = useAuthContext
    const [username,setUser] = useState('')
    const [pw,setPW] =useState('')
    const {login, error, isLoading} = useStaffLogin()

    const handleSubmit = async(e) =>{
        e.preventDefault()

        await login(username,pw)

    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={username}  
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPW(e.target.value)}
                value={pw}  
            />
            <br/>

            <button className="btnSubmit" disabled = {isLoading}>Login</button>
        {error && <div className="error">{error}</div>}


        </form>
    )



}

export default StaffLogin