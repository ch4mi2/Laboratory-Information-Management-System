import { Link } from "react-router-dom";


const Welcome = () => {
    
    return (

        
            <div className="formbox">
                <h2>WELCOME</h2>
                <br/>
                <nav>
                    <div >
                    <a href='/StaffLogin'><button className="btnConfirm" style={{width: '250px',height: '50px'}}>Staff Login</button></a><br/><br/>
                    <a href='/AdminLogin'><button className="btnConfirm" style={{width: '250px',height: '50px'}}>Admin Login</button></a>
                    </div>
                </nav>
            </div>
        
    )
}

export default Welcome;