import MachineForm from "../components/machineComponent/MachineForm"
import "../css/MachineStyles/machineDetails.css"

const AddMachines = () => {
     return ( 
        <div className="history">
            <h4>Add New Machines</h4>
            <div className="machines">
                <MachineForm/>
            </div>
        </div>
     );
}
 
export default AddMachines