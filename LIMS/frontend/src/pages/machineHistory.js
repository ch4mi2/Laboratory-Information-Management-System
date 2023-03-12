import { useEffect , useState} from "react"

//components
import MachineDetails from "../components/machineComponent/machineDetails"
import MachineForm from "../components/machineComponent/MachineForm"

const MachineHistory = () => {
    const [machines, setMachines] = useState(null)

    useEffect(() => {
        const fetchMachines = async () => {
            const response = await fetch('/api/machines')
            const json = await response.json() 

            if(response.ok){
                setMachines(json)
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
            <MachineForm />
        </div>
     );
}
 
export default MachineHistory