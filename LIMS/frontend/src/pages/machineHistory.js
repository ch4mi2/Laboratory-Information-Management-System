import { useEffect} from "react"
import { useMachineContext } from "../hooks/useMachineContext"

//components
import MachineDetails from "../components/machineComponent/machineDetails"

const MachineHistory = () => {
    const {machines , dispatch} = useMachineContext()

    useEffect(() => {
        const fetchMachines = async () => {
            const response = await fetch('/api/machines')
            const json = await response.json() 

            if(response.ok){
                dispatch({type: 'SET_MACHINES' ,payload: json})
            }
        }

        fetchMachines()
    } , [])

    return ( 
        <div className="history">
            <div className="machines">
                {machines && machines.map((machine) => (
                    <MachineDetails key={machine._id} machine = {machine}/>
                ))}
            </div>
        </div>
     );
}
 
export default MachineHistory