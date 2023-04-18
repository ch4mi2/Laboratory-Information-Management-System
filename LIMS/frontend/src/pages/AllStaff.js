import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { useAuthContext } from "../hooks/useAuthContext";
import $ from "jquery";

const AllStaff = () =>  {
    const [Staff, setStaff] = useState(null)
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchStaff = async () => {
            const response = await fetch('/api/Staff',{
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()


            if(response.ok)
            {  
                setStaff(json)
                $(function() {
                    $('#example').DataTable({
                      
                      "bDestroy": true
                    });
                  });
                
            }
            

        }
        if(user){
            fetchStaff()

        }
        
    }, [user])

    

    

    
    const handleClickDelete = async (id) => {
        if(!user){
            return
        }
        const confirmed = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          customClass:'alerts'
        });
      
        if (confirmed.isConfirmed) {
            const response = await fetch('api/Staff/' + id,{
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
          const json = await response.json();
    
      
          if (response.ok) {
            const table = $('#example').DataTable();
            const row = table.rows(`[data-id ="${id}"]`);
            row.remove().draw();
    
            Swal.fire(
              {
                title: 'Success',
                text: 'Record has been deleted',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true
                
            }
            )
            //dispatch({ type: "DELETE_EXPENSES", payload: json });
          }
        }
    
      };

    return (
        <div className="container">
            <div className="staff">
                <table id="example" className="table" style={{ width: '100%'}} >
                <thead>
                <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Position</th>
                <th/>
                </tr>
                </thead>
                
                <tbody>
                {Staff && Staff.map((staff) => (
                    <tr key={staff._id} data-id={staff._id}>
                         <td>{staff.name}</td>
                        <td>{staff.Eid}</td>
                        <td>{staff.post}</td>
                        <td><button className="btnDelete" onClick={ () => handleClickDelete(staff._id) }>delete</button></td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllStaff