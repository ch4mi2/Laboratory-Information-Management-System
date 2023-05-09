import ReplacementBill from "../components/machineComponent/machinePartsBill"
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";

const MachineServiceBill = () => {
    const { id } = useParams();

    // const  {state} = useLocation()
    const [machinePartsDet,setmachinePartsDet] = useState(null);
    
    useEffect(() => {
        const fetchMachineParts = async() => {
            const response = await fetch('/api/machineParts/' + id);
            const json = await response.json();
    
            if( response.ok ) {
                await setmachinePartsDet(json);
            }
        }
             
        fetchMachineParts();
        // eslint-disable-next-line
    }, [])
    // console.log(state.id);

    return ( 
        <div className="history">
            <div className="machines">
                <h4>Machine Maintenance Report - Machine Parts Replacement</h4>
                <br />
                {machinePartsDet && <ReplacementBill machinePartsDet = {machinePartsDet}/>}
            </div>
        </div>
    );
}; 
export default MachineServiceBill