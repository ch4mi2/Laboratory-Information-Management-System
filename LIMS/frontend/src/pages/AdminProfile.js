import { Link } from "react-router-dom";

const AdminProfile= () =>{

    return(
        <div className="AddStaff">
            <h3>WELCOME</h3>
            <Link to ="/AllStaff">Staff Details</Link><br/>
            <Link to ="/AddStaff">Register Staff Member</Link>
            <Link to ="/">Salary Calculation</Link><br/>
            
        </div>
    )
}

export default AdminProfile