
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Swal from 'sweetalert2';



const  StaffProfile = () => {
    const [Staff,setStaff] = useState(null)
    const [name,setName] = useState(null)
    
    const {user} = useAuthContext()


    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`/api/Staff/${user.userid}`)
            const json = await response.json()

            if(response.ok)
            {
                setStaff(json)
                setName(json.name)
            }
        }
        fetchProfile()
    },[user])

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`/api/Staff/${user.userid}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              
            })
          })
          if (response.ok) {
            Swal.fire(
                {
                  title: 'Success',
                  text: 'Record has been updated',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true  
              }
              )
          }
        } catch (error) {
          console.log(error)
        }
      }


    return(
        
        <div className="container">
            
        
            <h1>{Staff?.name ?? 'null'}</h1>

            <form onSubmit = {handleUpdate} className="form">
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
            />
            <button type="submit"></button>
            </form>
            
        
    </div>
    )

}

export default StaffProfile;