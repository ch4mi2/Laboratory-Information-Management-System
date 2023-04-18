
import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

import Swal from 'sweetalert2';



const  UpdateProfile = () => {
    
    const [name,setName] = useState(null)
    const [Eid,setEid] = useState(null)
    const [contact,setContact] = useState(null)
    const [NIC,setNIC] = useState(null)
    const [post,setPost] = useState(null)
    const [email,setEmail] = useState(null)
    const [username,setUsername] = useState(null)
    const [pw,setPW] = useState(null)
    
    const {user} = useAuthContext()


    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`/api/Staff/${user.userid}`)
            const json = await response.json()

            if(response.ok)
            {
                
                setName(json.name)
                setEid(json.Eid)
                setContact(json.contact)
                setEmail(json.email)
                setUsername(json.username)
                setPost(json.post)
                setPW(json.pw)
                setNIC(json.NIC)
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
              email,
              Eid,
              pw,
              contact,
              username,
              post,
              NIC,
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
            
        
            

            <form onSubmit = {handleUpdate} className="form">
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
            />
            <label>Employee ID</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setEid(e.target.value)}
             value={Eid}
            />
            <label>Position</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setPost(e.target.value)}
             value={post}
            />
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setContact(e.target.value)}
             value={contact}
            />
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setNIC(e.target.value)}
             value={NIC}
            />
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
            /><br/>
            <button className="btnSubmit" type="submit">Submit</button>
            </form>
            
        
    </div>
    )

}

export default UpdateProfile;