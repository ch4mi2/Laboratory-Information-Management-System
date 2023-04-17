import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMachinePartsContext } from '../../hooks/useMachinePartsContext'

const MachineHistory = ({ machine}) => {
  const navigate = useNavigate();
  //const [machineParts,setMachineParts] = useState(null);
  const {machineParts, dispatch} = useMachinePartsContext();
  // const currentMachine = machineParts.filter((m) => m.machineId === machine._id)[0];
  // console.log(currentMachine);

  //Machine Parts Details
  useEffect(() => {
    const fetchMachineParts = async () => {
      const response = await fetch('/api/machineParts')
      const json = await response.json();

      if (response.ok) {
        console.log(json);
        // setMachineParts(await json.filter((m) => m.machineId === machine._id));
        var current = await json.filter((m) => m.machineId === machine._id);
        dispatch({type:'SET_MACHINEPART' , payload:current})
        // console.log(current);
      }
    };

    fetchMachineParts();
    // eslint-disable-next-line
  }, []);

  const handleClickMachineParts = (id) => {
    navigate(`../AddMachineParts`, {state:{id}});
  };

  const handleClickService = (id) => {
    navigate(`../AddServiceDates`, {state:{id}});
  };

  const handleClickViewService = (id) => {
    navigate(`../viewServiceDetails/${id}`);
  };

  const handleClick = (id) => {
    navigate(`../machinePartsReceipt/${id}`);
  };

  const handleDelete = async(id) => {
    const response = await fetch('/api/machineParts/' + id , {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      console.log(json)
      dispatch({type: 'DELETE_MACHINEPART' , payload:json})
    }
  }

   return (
    <div className="">
      <div className="machine-details">
        <h4>{machine.MachineType}</h4>
        <p>
          <strong>Brand : </strong>
          {machine.Brand}
        </p>
        <p>
          <strong>Model : </strong>
          {machine.Model}
        </p>
        <p>
          <strong>Serial No : </strong>
          {machine.SerialNo}
        </p>
        <p>
          <strong>Manufacturer : </strong>
          {machine.Manufacturer}
        </p>
        <p>
          <strong>Purchased Date : </strong>
          {machine.PurchaseDate}
        </p>
        <p>
          <strong>Warranty Expiration : </strong>
          {machine.WarrantyExp}
        </p>
        <p>
          <strong>Tel. No : </strong>
          {machine.TelNo}
        </p>
        <button onClick={() => handleClickMachineParts (machine._id)}>Add Machine Parts</button>
        <button onClick={() => handleClickService(machine._id)}>Add Service Dates</button>
        <button onClick={() => handleClickViewService(machine._id)}>Service machine</button>
        <p>{machine.createdAt}</p>
      </div>
      <div>
      <table>  
                  <thead>
                  <tr>
                    <th >Machine ID</th>
                    <th >Machine Type</th>
                    <th >Maintenance Date</th>
                    <th >Machine Part</th>
                    <th >Brand</th>
                    <th >Technician Name</th>
                    <th >Technician tel No</th>
                    <th >Technician Payment</th>
                    <th >Print receipt</th>
                    <th >Delete Machine</th>
                  </tr>
                </thead>
                <tbody>
      {machineParts &&
                machineParts.map((machinePart) => (
                  <tr
                    key={machinePart._id}
                  >
                    <td >{machinePart.machineId}</td>
                    <td >{machinePart.machineName}</td>
                    <td >{machinePart.MaintenanceDate}</td>
                    <td >{machinePart.MachinePart}</td>
                    <td >{machinePart.brandOfMachinePart}</td>
                    <td >{machinePart.PriceOfMachinePart}</td>
                    <td >{machinePart.TechnicianName}</td>
                    <td >{machinePart.TechTelno}</td>
                    <td >{machinePart.TechnicianPayment}</td>
                    <td><button key={machinePart._id} onClick={() => handleClick(machinePart._id)}>Receipt</button></td>
                    <td><button onClick={() => handleDelete(machinePart._id)}>Delete</button></td>
                  </tr>
              
                ))}
                </tbody>    
                  </table>
      </div>
    </div>
  );
};

export default MachineHistory;
