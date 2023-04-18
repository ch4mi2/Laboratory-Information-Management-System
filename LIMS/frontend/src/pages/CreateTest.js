import TestDataForm from "../components/TestDataComponents/TestDataFrom";
import '../css/TestDataStyles/testData.css';


const CreateTest = () => {
    return ( 
        <div>
            <h4>Add New Test</h4>
            <div >
                <TestDataForm />
            </div>
        </div>
    );
}
 
export default CreateTest;