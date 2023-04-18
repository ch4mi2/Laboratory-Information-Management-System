import { useLocation } from "react-router-dom";
import { useEffect , useState } from "react";
import MachinePartsForm from "../components/machineComponent/machinePartsForm"

const AddMachineParts = () => {

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
        
    }, [])
    // console.log(state.id);

     return ( 
        <div className="history">
            <div className="machines">
                {machine && <MachinePartsForm machine = {machine}/>}
            </div>
        </div>
     );
}
 
export default AddMachineParts