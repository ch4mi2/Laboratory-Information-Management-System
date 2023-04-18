import ServiceMachineForm from "../components/machineComponent/serviceMachinesForm"
import { useLocation } from "react-router-dom";
import { useEffect , useState } from "react";

const AddServiceDates = () => {

    const  {state} = useLocation()
    const [machine,setMachine] = useState(null);
    
    useEffect(() => {
        const fetchMachineHistory = async() => {
            const response = await fetch('/api/machines/' + state.id);
            const json = await response.json();
            console.log(json);
            if( response.ok ) {
                await setMachine(json);
            }
        }
             
        fetchMachineHistory();
        // eslint-disable-next-line
    }, [])

     return ( 
        <div className="history">
            <div className="machines">
                <h4>Add Service Details</h4>
                {machine && <ServiceMachineForm machine = {machine}/>}
            </div>
        </div>
     );
}
 
export default AddServiceDates