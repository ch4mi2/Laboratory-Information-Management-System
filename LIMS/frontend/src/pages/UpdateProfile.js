
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
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
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

          const json1 = await response.json()

          if (response.ok) {
            setError(null)
            setEmptyFields([])
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
          else{
            setError(json1.error)
            setEmptyFields(json1.emptyFields)
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
             className={emptyFields.includes('name') ? 'error' : ""}
            />
            <label>Employee ID</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setEid(e.target.value)}
             value={Eid}
             className={emptyFields.includes('Eid') ? 'error' : ""}
            />
            <label>Position</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setPost(e.target.value)}
             value={post}
             className={emptyFields.includes('post') ? 'error' : ""}
            />
            <label>Contact</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setContact(e.target.value)}
             value={contact}
             pattern="[0-9]{10}"
             className={emptyFields.includes('contact') ? 'error' : ""}
            />
            <label>NIC</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setNIC(e.target.value)}
             value={NIC}
             className={emptyFields.includes('NIC') ? 'error' : ""}
            />
            <label>Email</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             className={emptyFields.includes('email') ? 'error' : ""}
            /><br/>
            <button className="btnSubmit" type="submit">Update</button>
            {error && <div className="error">{error}</div>}
            </form>
            
        
    </div>
    )

}

export default UpdateProfile;