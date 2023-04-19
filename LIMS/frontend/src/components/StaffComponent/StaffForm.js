import {  useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import Swal from 'sweetalert2';

const StaffForm = () => {
    const [name, setName] = useState('')
    const [NIC, setNIC] = useState('')
    const [Eid, setEid] = useState('')
    const [contact, setContact] = useState('')
    const [post, setPost] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUser] = useState('')
    const [pw, setPW] = useState('')
    const [error, setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()
    const {user} = useAuthContext()
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async(e) =>{
        e.preventDefault()

        if(!user){
            setError('You must log in')
            return
        }

        const staff = {name,NIC,Eid,contact,post,email,username,pw}

        const response = await fetch('/api/Staff', {
            method:'POST',
            body:JSON.stringify(staff),
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        
        if(!response.ok){
            setIsLoading(false)
            setError(json.error)
            if(json.emptyFields){
                setEmptyFields(json.emptyFields)
            }
            
        
        }

        if(response.ok)
        {
            setName('')
            setNIC('')
            setEid('')
            setContact('')
            setPost('')
            setEmail('')
            setUser('')
            setPW('')
            setError(null)
            setEmptyFields([])
            localStorage.setItem('user', JSON.stringify(json))
            console.log('new staff member added')


            dispatch({type:'LOGIN',payload: json})

            setIsLoading(false)
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


    }
    

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>User Registration</h3>
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={emptyFields.includes('name') ? 'error' : ""}/>
                <br></br>

            <label>NIC:</label>
            <input
                type="text"
                onChange={(e) => setNIC(e.target.value)}
                value={NIC}
                className={emptyFields.includes('NIC') ? 'error' : ""}/><br/>

            <label>Employee ID:</label>
            <input
                type="text"
                onChange={(e) => setEid(e.target.value)}
                value={Eid}
                className={emptyFields.includes('Eid') ? 'error' : ""}/><br/>

            <label>Contact Num:</label>
            <input
                type="number"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
                className={emptyFields.includes('contact') ? 'error' : ""}/><br/>

            <label>Position:</label>
            <input
                type="text"
                onChange={(e) => setPost(e.target.value)}
                value={post}
                className={emptyFields.includes('post') ? 'error' : ""}/><br/>

            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={emptyFields.includes('email') ? 'error' : ""}/><br/>

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={username}
                className={emptyFields.includes('username') ? 'error' : ""}/>  <br/>  

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPW(e.target.value)}
                value={pw}
                className={emptyFields.includes('pw') ? 'error' : ""}/><br/>

            


            <button className="btnSubmit" disabled={isLoading}>Register</button>
            {error && <div className="error">{error}</div>}

        </form>
    )


}

export default StaffForm