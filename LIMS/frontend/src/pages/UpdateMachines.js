import UpdateMachine from "../components/machineComponent/UpdateMachineForm";
import { useParams } from "react-router-dom";
import { useEffect , useState } from "react";

const EditMachineDetails = () => {
    const { id } = useParams();

    // const  {state} = useLocation()
    const [machine,setMachine] = useState(null);
    
    useEffect(() => {
        const fetchMachineHistory = async() => {
            const response = await fetch('/api/machines/' + id);
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
                {machine && <UpdateMachine machine = {machine}/>}
            </div>
        </div>
     );
}
 
export default EditMachineDetails