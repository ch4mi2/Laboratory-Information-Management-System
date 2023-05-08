import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useMachinePartsContext } from '../../hooks/useMachinePartsContext'
import ViewServiceHistory from '../../pages/viewServiceDates'
import $ from 'jquery';
import Swal from 'sweetalert2';

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

        $(function () {
          $('#machineparts-list').DataTable({
          //order: [[4, 'desc']],
          bDestroy: true,
          });
        })
      };
    }
    fetchMachineParts();

    // eslint-disable-next-line
  }, []); 

  const handleClickMachineParts = (id) => {
    navigate(`../AddMachineParts`, {state:{id}});
  };

  const handleClickService = (id) => {
    navigate(`../AddServiceDates`, {state:{id}});
  };

  const handleClickupdateMachine = (id) => {
    navigate(`../updateMachine/${id}`);
  };

  const handleClickupdateMachinePart = (id) => {
    navigate(`../UpdateMachineParts/${id}`);
  };

  const handleClick = (id) => {
    navigate(`../machinePartsBill/${id}`);
  };

  //Delete Machine Parts
  const handleDelete = async(id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this machine part!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: 'alerts',
    });

    if (confirmed.isConfirmed){
    const response = await fetch('/api/machineParts/' + id , {
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      console.log(json)
  //    dispatch({type: 'DELETE_MACHINEPART' , payload:json})
    const table = $('#machineparts-list').DataTable();
    const row = table.rows(`[data-id = "${id}"]`);
    row.remove().draw()

      Swal.fire({
        title: 'Success',
        text: 'Record has been deleted',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
    }
  }

   return (
    <div>
      <div className="machine-details">
        <h3 className="machineName">Machine Name : <b>{machine.MachineType}</b></h3>
        <div className="row">
        <div className="col-6">
        <p>
          <strong>Brand : </strong>
          {machine.Brand}
        </p>
        </div>
        <div className="col-6">
        <p>
          <strong>Model : </strong>
          {machine.Model}
        </p>
        </div>
        <div className="col-6">
        <p>
          <strong>Serial No : </strong>
          {machine.SerialNo}
        </p>
        </div>
        <div className="col-6">
          <p>
            <strong>Manufacturer : </strong>
            {machine.Manufacturer}
          </p>
        </div>  
        <div className="col-6">
          <p>
            <strong>Purchased Date : </strong>
            {machine.PurchaseDate}
          </p>
        </div>  
        <div className="col-6">
          <p>
          <strong>Tel. No : </strong>
          {machine.TelNo}
          </p>
        </div> 
        <div className="col-6">
          <p>
          <strong>Price : </strong>
          {machine.Price}
          </p>
        </div> 
        </div>
        <p>
        <strong>Warranty Expiration : </strong>
            {machine.WarrantyExp}
          
        </p>
        <div className="row">
        <div className="col-12">
        <button className = "subBtn" onClick={() => handleClickupdateMachine (machine._id)}>Update Machine Details</button>
        <button className = "subBtn"  onClick={() => handleClickService(machine._id)}>Service Machines</button>        
        <button className = "subBtn"  onClick={() => handleClickMachineParts (machine._id)}> Replace Machine Parts</button>
        </div>
        </div>
      </div>
      <div>
        <hr/>
        <div>
          <h3>Replace Machine Parts</h3>
        </div>
      <table id="machineparts-list" className="table" style={{ width: '100%' }}>  
                  <thead>
                  <tr>
                    <th >Maintenance Date</th>
                    <th >Machine Part</th>
                    <th >Issue</th>
                    <th >Brand</th>
                    <th >Price </th>
                    <th >Technician Name</th>
                    <th >Technician tel No</th>
                    <th >Technician Payment</th>
                    <th >Print receipt</th>
                    <th>Update</th>
                    <th >Delete Machine</th>
                  </tr>
                </thead>
                <tbody>
      {machineParts &&
                machineParts.map((machinePart) => (
                  <tr
                    key={machinePart._id} data-id={machinePart._id}
                  >
                    <td >{machinePart.MaintenanceDate}</td>
                    <td >{machinePart.Issue}</td>
                    <td >{machinePart.MachinePart}</td>
                    <td >{machinePart.brandOfMachinePart}</td>
                    <td >{machinePart.PriceOfMachinePart}</td>
                    <td >{machinePart.TechnicianName}</td>
                    <td >{machinePart.TechTelno}</td>
                    <td >{machinePart.TechnicianPayment}</td>
                    <td><button className="btnSubmit" key={machinePart._id} onClick={() => handleClick(machinePart._id)}>Receipt</button></td>
                    <td><button className="btnSubmit" onClick={() => handleClickupdateMachinePart(machinePart._id)}>Update</button></td>
                    <td><button className="btnDelete" onClick={() => handleDelete(machinePart._id)}>Delete</button></td>
                  </tr>
              
                ))}
                </tbody>    
                  </table>
                  
      </div>
      <hr/>
      <div>
          <h3>Machine Service Details</h3>
        </div>
      <div>
        <ViewServiceHistory/>
      </div>
    </div>
  );
};

export default MachineHistory;
