import UpdateMachineService from "../components/machineComponent/UpdateMachineServices";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";

const EditMachineService = () => {
    const { id } = useParams();

    // const  {state} = useLocation()
    const [machine,setMachine] = useState(null);
    
    useEffect(() => {
        const fetchMachineHistory = async() => {
            const response = await fetch('/api/serviceMachines/' + id);
            const json = await response.json();
    
            if( response.ok ) {
                await setMachine(json);
            }
        }
             
        fetchMachineHistory();
         // eslint-disable-next-line
    }, [])
    // // console.log(state.id);

     return ( 
        <div className="history">
            <div className="machines">
                <h4>Update Machine Services Details</h4>
                {machine && <UpdateMachineService machine = {machine}/>}
            </div>
        </div>
     );
}
 
export default EditMachineService