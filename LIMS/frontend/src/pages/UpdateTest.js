import { useLocation } from "react-router-dom";
import UpdateTestForm from "../components/TestDataComponents/UpdateTestForm";

const UpdateTest = () => {
    const location = useLocation();
    const state = location.state;

    return ( 
        <div className="updateTest">
            < UpdateTestForm Test = {state} />
        </div>
    );
}
 
export default UpdateTest;