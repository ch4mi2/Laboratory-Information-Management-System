import { useState } from "react";

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

    const handleSubmit = async(e) =>{
        e.preventDefault()

        const staff = {name,NIC,Eid,contact,post,email,username,pw}

        const response = await fetch('/api/Staff', {
            method:'POST',
            body:JSON.stringify(staff),
            headers:{
                'Content-Type': 'appliation/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        
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
            console.log('new staff member added')
        }


    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>User Registration</h3>
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}/><br></br>

            <label>NIC:</label>
            <input
                type="text"
                onChange={(e) => setNIC(e.target.value)}
                value={NIC}/><br/>

            <label>Employee ID:</label>
            <input
                type="text"
                onChange={(e) => setEid(e.target.value)}
                value={Eid}/><br/>

            <label>Contact Num:</label>
            <input
                type="number"
                onChange={(e) => setContact(e.target.value)}
                value={contact}/><br/>

            <label>Position:</label>
            <input
                type="text"
                onChange={(e) => setPost(e.target.value)}
                value={post}/><br/>

            <label>Email:</label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}/><br/>

            <label>Username:</label>
            <input
                type="text"
                onChange={(e) => setUser(e.target.value)}
                value={username}/>  <br/>  

            <label>Password:</label>
            <input
                type="text"
                onChange={(e) => setPW(e.target.value)}
                value={pw}/><br/>

            


            <button>Register</button>
            {error && <div className="error">{error}</div>}

        </form>
    )


}

export default StaffForm