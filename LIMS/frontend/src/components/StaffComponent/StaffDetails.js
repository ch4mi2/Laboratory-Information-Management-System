import { useAuthContext } from "../../hooks/useAuthContext"

const StaffDetails = ({ staff }) => {
    const {user} = useAuthContext()

    const handleClick = async () => {
        if(!user){
            return
        }
        const response = await fetch('api/Staff/' + staff._id,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
    }
    return(
        
            
            
            <tr>
            <td>{staff.name}</td>
            <td>{staff.Eid}</td>
            <td>{staff.post}</td>
            <td><button className="btnDelete" onClick={handleClick}>delete</button></td>
            </tr>
            
        
    )
}

export default StaffDetails