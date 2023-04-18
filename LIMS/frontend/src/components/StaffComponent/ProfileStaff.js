import {  useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";



const ProfileStaff = ({Staff}) => {
    
    
    return(
        <div className="container">
            <h4>{Staff.name}</h4>
            <p><strong>Name</strong>{Staff.NIC}</p>
            
        </div>
    )
}



export default ProfileStaff