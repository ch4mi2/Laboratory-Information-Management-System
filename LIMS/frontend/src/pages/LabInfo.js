import {useState , useEffect} from "react"
import Swal from 'sweetalert2';

const LabInfo = () => {
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [tel1,setTel1] = useState('')
    const [tel2,setTel2] = useState('')
    const [tel3,setTel3] = useState('')
    const [email,setEmail] = useState('')
    const [id,setId] = useState('')
    const [error,setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {
        const fetchLabInfo = async () => {
            try {
                const response = await fetch('/api/labInfo')
                const json = await response.json()

                if(response.ok){
                    setName(json.name)
                    setAddress(json.address)
                    setTel1(json.tel1)
                    setTel2(json.tel2)
                    setTel3(json.tel3)
                    setEmail(json.email)
                    setId(json._id)
                } 
            } catch (error) {
                console.log(error)
            }
        }
        fetchLabInfo();  
    },[id])   

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
          const response = await fetch(`/api/labInfo/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name,
              address,
              tel1,
              tel2,
              tel3,
              email
            })
          })

          const json = await response.json()

          if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
          }
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
              setError(null)
              setEmptyFields([])
          }else{
            Swal.fire({
              title: 'Error',
              text: 'Record could not be updated',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: 'alerts'
            });
          }
        } catch (error) {
          console.log(error)
        }
      }

    return(
        <form className="form" onSubmit={handleUpdate}>
            <h3>Lab Information</h3>
            <label>Name</label>
            <input
             className={`form-control ${emptyFields.includes('name') ? 'error' : ''}`}
             type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
            />
            <label>Address</label>
            <input
             className={`form-control ${emptyFields.includes('address') ? 'error' : ''}`}
             type="textarea"
             onChange={(e) => setAddress(e.target.value)}
             value={address}
            />  
            <label>Tel 1</label>
            <input
             className={`form-control ${emptyFields.includes('tel1') ? 'error' : ''}`}
             type="tel"
             onChange={(e) => setTel1(e.target.value)}
             value={tel1}
             pattern="[0-9]*"
            />  
            <label>Tel 2</label>
            <input
            className="form-control"
             type="tel"
             onChange={(e) => setTel2(e.target.value)}
             value={tel2}
             pattern="[0-9]*"
            />  
            <label>Tel 3</label>
            <input
            className="form-control"
             type="tel"
             onChange={(e) => setTel3(e.target.value)}
             value={tel3}
             pattern="[0-9]*"
            /> 
            <label>Email</label>
            <input
            className="form-control"
             type="email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
            /> 
            <br />
            <button className="btnSubmit" type="submit"> Update </button> 
            {error && <div className="error">{error}</div>} 
        </form>
    )
}

export default LabInfo