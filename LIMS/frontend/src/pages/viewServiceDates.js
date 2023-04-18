//import { useParams } from "react-router-dom";
import { useEffect} from "react";
//import ServiceDetails from "../components/machineComponent/serviceDetails";
import { useMachineServiceContext } from '../hooks/useMachineServiceContext'

const ViewServiceHistory = ({ machine}) => {
    const {serviceMachines, dispatch} = useMachineServiceContext();

    //Service Machine Details
  useEffect(() => {
    const fetchServiceHistory = async() => {
        const response = await fetch('/api/serviceMachines');
        const json = await response.json();

        if( response.ok ) {
          console.log(json);
          var current = await json.filter((m) => m.machineId === machine._id);
          dispatch({type:'SET_MACHINESERVICE' , payload:current})
          console.log(current)
        }
    }
         
    fetchServiceHistory();
    // eslint-disable-next-line 
}, [])

return (
        <div className="viewTest">
            <div className="tests">
                <h4>Machine History</h4>
                {/* { serviceMachine ? <ServiceDetails key={serviceMachine._id} service = {serviceMachine} /> : <div className="loading">Loading...</div>} */}
                <div>
      {serviceMachines &&
                serviceMachines.map((service) => (
                  <div className="machine-details">
                    <h4>Service Dates</h4>
                    <p>
                    <strong> Last Service Date: </strong>
                        {service.LastserviceDate}
                    </p>
                    <p>
                    <strong>Next Service Date: </strong>
                        {service.NextServiceDate}
                    </p>
                    <p>
                    <strong>Technician's Name : </strong>
                        {service.TechnicianName}
                    </p>
                    <p>
                    <strong>Technician's Tel No : </strong>
                        {service.TechTelno}
                    </p>
                    <p>
                    <strong>Technician's Payment : </strong>
                        {service.TechnicianPayment}
                    </p>
                    <button >
                        {/* onClick={() => handleClick(service._id)}> */}
                        Update Service Details</button>
                    <p>{service.createdAt}</p>
                </div>
                ))}
      </div> 
            </div>
            
        </div>
    );
}
 
export default ViewServiceHistory;