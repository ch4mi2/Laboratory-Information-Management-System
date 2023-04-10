import { useLocation } from "react-router-dom";
import UpdateCategoryForm from "../components/TestDataComponents/UpdateCategoryForm";

const UpdateCategory = () => {
    const location = useLocation();
    const state = location.state;

    return ( 
        <div>
            <h4>Manage Test Subcategory</h4>
            <div className="updateTest">
                < UpdateCategoryForm subCategory = {state} />
            </div>
        </div>
    );
}
 
export default UpdateCategory;