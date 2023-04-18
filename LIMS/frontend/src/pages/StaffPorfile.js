
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";





const  StaffProfile = () => {
    const [Staff,setStaff] = useState(null)
    
    
    const {user} = useAuthContext()


    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`/api/Staff/${user.userid}`)
            const json = await response.json()

            if(response.ok)
            {
                setStaff(json)
                
            }
        }
        fetchProfile()
    },[user])

    


    return(
        
        <div className="container">
            
        
            <h1>HELLO {Staff?.name ?? 'null'}!</h1><br/>
            <h2>Here is your profile details</h2>
            <br/><br/>

            <div className="formbox1">
                <p>Name           : {Staff?.name ?? 'null'}</p>
                <p>Employee ID    : {Staff?.Eid ?? 'null'}</p>
                <p>Position       : {Staff?.post ?? 'null'}</p>
                <p>Contact Number : {Staff?.contact ?? 'null'}</p>
                <p>NIC Number     : {Staff?.NIC ?? 'null'}</p>
                <p>Email     : {Staff?.email ?? 'null'}</p>


            </div><br></br>
            <br/>
            <a href="/UpdateProfile"><button className="btnupdate">Edit Profile</button></a>

            
            
        
    </div>
    )

}

export default StaffProfile;