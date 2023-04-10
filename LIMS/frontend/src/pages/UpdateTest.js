import { useLocation } from "react-router-dom";
import UpdateTestForm from "../components/TestDataComponents/UpdateTestForm";
import '../css/TestDataStyles/testData.css';

const UpdateTest = () => {
    const location = useLocation();
    const state = location.state;

    return (
        <div>
            <h4>Manage Test</h4>
            <div className="updateTest">
                < UpdateTestForm Test = {state} />
            </div>
        </div>
    );
}
 
export default UpdateTest;