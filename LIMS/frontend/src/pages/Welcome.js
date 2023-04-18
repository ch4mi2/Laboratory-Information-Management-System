import { Link } from "react-router-dom";


const Welcome = () => {
    
    return (

        
            <div className="container">
                <h3>WELCOME</h3>
                <nav>
                    <div>
                        <Link to ="/StaffLogin">Staff Login</Link><br/>
                        <Link to ="/AdminLogin">Admin Login</Link>
                    </div>
                </nav>
            </div>
        
    )
}

export default Welcome;