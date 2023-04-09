import { useLocation } from "react-router-dom";
import UpdateCategoryForm from "../components/TestDataComponents/UpdateCategoryForm";

const UpdateCategory = () => {
    const location = useLocation();
    const state = location.state;

    return ( 
        <div className="updateTest">
            < UpdateCategoryForm subCategory = {state} />
        </div>
    );
}
 
export default UpdateCategory;