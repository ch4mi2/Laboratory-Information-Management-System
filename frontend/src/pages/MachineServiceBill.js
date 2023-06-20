import ServiceBill from "../components/machineComponent/machineServiceBill"
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";

const MachineServiceBill = () => {
    const { id } = useParams();

    // const  {state} = useLocation()
    const [serviceDet,setserviceDet] = useState(null);
    
    useEffect(() => {
        const fetchMachineService = async() => {
            const response = await fetch('/api/serviceMachines/' + id);
            const json = await response.json();
    
            if( response.ok ) {
                await setserviceDet(json);
            }
        }
             
        fetchMachineService();
        // eslint-disable-next-line
    }, [])
    // console.log(state.id);

    return ( 
        <div className="history">
            <div className="machines">
                <h4>Machine Maintenance Report - Service Machines</h4>
                {serviceDet && <ServiceBill serviceDet = {serviceDet}/>}
            </div>
        </div>
    );
}; 
export default MachineServiceBill