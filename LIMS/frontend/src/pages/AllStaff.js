import { useEffect, useState } from "react";

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

    

    

    const handleClick = async (id) => {
        if(!user){
            return
        }
        const response = await fetch('api/Staff/' + id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        

        if(response.ok)
        {
            const table = $('#example').DataTable();
            const row = table.rows(`[data-id ="${id}"]`);
            row.remove().draw();
        }
        
    }

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
                        <td><button className="btnDelete" onClick={ () => handleClick(staff._id) }>delete</button></td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllStaff