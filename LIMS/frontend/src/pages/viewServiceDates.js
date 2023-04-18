import { useParams } from "react-router-dom";
import { useEffect , useState} from "react";
//import ServiceDetails from "../components/machineComponent/serviceDetails";
//import { useMachineServiceContext } from '../hooks/useMachineServiceContext'
import $ from 'jquery';
import { useNavigate } from "react-router-dom";

const ViewServiceHistory = () => {
    const { id } = useParams()
    const [serviceMachines, setServiceMachines] = useState(null);
    const navigate = useNavigate();

    //Service Machine Details
  useEffect(() => {
    const fetchServiceHistory = async() => {
        const response = await fetch('/api/serviceMachines');
        const json = await response.json();

        if( response.ok ) {
          //console.log(json);
          var current = await json.filter((m) => m.machineId === id);
          setServiceMachines(current)
          //console.log(current)

          $(function () {
            $('#service-list').DataTable({
            //order: [[4, 'desc']],
            bDestroy: true,
          });
        })
        }
    }
         
    fetchServiceHistory();
    // eslint-disable-next-line 
}, [])

const handleClickService = (id) => {
  navigate(`../updateMachineService/${id}` );
};

return (
        <div>
            <div>
                {/* { serviceMachine ? <ServiceDetails key={serviceMachine._id} service = {serviceMachine} /> : <div className="loading">Loading...</div>} */}
                <div>
    {/* {console.log(serviceMachines)} */}
    <div>
      <table id="service-list" className="table" style={{ width: '100%' }}>  
                  <thead>
                  <tr>
                    <th >Last Service Date</th>
                    <th >Next Service Date</th>
                    <th >Technician Name</th>
                    <th >Technician tel No</th>
                    <th >Technician Payment</th>
                    <th >Print receipt</th>
                    <th>Update Service</th>
                  </tr>
                </thead>
                <tbody>
      {serviceMachines &&
                serviceMachines.map((service) => (
                  <tr
                    key={service._id}
                  >
                    <td >{service.LastserviceDate}</td>
                    <td >{service.NextServiceDate}</td>
                    <td >{service.TechnicianName}</td>
                    <td >{service.TechTelno}</td>
                    <td >{service.TechnicianPayment}</td>
                    <td><button className="btnTable" >
                        {/* key={machinePart._id} onClick={() => handleClick(machinePart._id)}> */}
                        Receipt</button></td>
                    <td><button className="btnTable" 
                         onClick={() => handleClickService(service._id)}>
                         Update</button></td>
                  </tr>
              
                ))}
                </tbody>    
                  </table>
      </div>
            </div>
        </div>
        </div>
    );
    
}
 
export default ViewServiceHistory;