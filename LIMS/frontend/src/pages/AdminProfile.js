import { Link } from "react-router-dom";

const AdminProfile= () =>{

    return(
        <div className="formbox">
                <h2>WELCOME ADMIN</h2>
                <br/>
                <nav>
                    <div >
                    <a href='/AddStaff'><button className="btn11">Register Staff Member</button></a><br/><br/>
                    <a href='/AllStaff'><button className="btn11">Staff Details</button></a><br/><br/>
                    <a href='/Salary'><button className="btn11">Salary Calculation</button></a>
                    </div>
                </nav>
            </div>
    )
}

export default AdminProfile