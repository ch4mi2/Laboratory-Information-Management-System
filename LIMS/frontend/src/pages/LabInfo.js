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
        <form onSubmit={handleUpdate}>
            <h3>Lab Information</h3>
            <label>Name</label>
            <input
            class="form-control"
             type="text"
             onChange={(e) => setName(e.target.value)}
             value={name}
             required
            />
            <label>Address</label>
            <input
            class="form-control"
             type="textarea"
             onChange={(e) => setAddress(e.target.value)}
             value={address}
             required
            />  
            <label>Tel 1</label>
            <input
            class="form-control"
             type="tel"
             onChange={(e) => setTel1(e.target.value)}
             value={tel1}
             pattern="[0-9]*"
            />  
            <label>Tel 2</label>
            <input
            class="form-control"
             type="tel"
             onChange={(e) => setTel2(e.target.value)}
             value={tel2}
            />  
            <label>Tel 3</label>
            <input
            class="form-control"
             type="tel"
             onChange={(e) => setTel3(e.target.value)}
             value={tel3}
            /> 
            <label>Email</label>
            <input
            class="form-control"
             type="email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
            /> 
            <br />
            <button className="btnSubmit" type="submit"> Update </button>  
        </form>
    )
}

export default LabInfo