import { Link } from "react-router-dom";


const Welcome = () => {
    
    return (

        
            <div className="formbox">
                <h2>WELCOME</h2>
                <br/>
                <nav>
                    <div >
                    <a href='/StaffLogin'><button className="btn11">Staff Login</button></a><br/><br/>
                    <a href='/AdminLogin'><button className="btn11">Admin Login</button></a>
                    </div>
                </nav>
            </div>
        
    )
}

export default Welcome;