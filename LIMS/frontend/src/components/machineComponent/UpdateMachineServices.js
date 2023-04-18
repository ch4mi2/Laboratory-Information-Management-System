import { useState } from 'react';
import '../../css/MachineStyles/machineDetails.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateMachineService = ({machine}) => {
  //const { dispatch } = useMachineContext();
    const navigate = useNavigate();

    const [LastserviceDate, setLastserviceDate] = useState(machine.LastserviceDate)
    const [NextServiceDate, setNextServiceDate] = useState(machine.NextServiceDate)
    const [TechnicianName, setTechnicianName] = useState(machine.TechnicianName)
    const [TechTelno, setTechTelno] = useState(machine.TechTelno)
    const [TechnicianPayment, setTechnicianPayment] = useState(machine.TechnicianPayment)
    const [error, setError] = useState(null);

  // useEffect(()=>{
  //   getMachineDetails();
  //   // eslint-disable-next-line
  // }, [])

  // const getMachineDetails = async () => {
  //   let result = await fetch(`/api/machines/`+ machine._id);
  //   // eslint-disable-next-line
  //   result = result.json();
  // }

  const handleMachineUpdate = async (e) => {
            e.preventDefault()
    
            const updatedMachineService = {LastserviceDate,NextServiceDate, TechnicianName,TechTelno,TechnicianPayment} 
            
            const response = await fetch(`/api/serviceMachines/` + machine._id, {
                method: 'PATCH',
                body: JSON.stringify(updatedMachineService),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(!response.ok) {
                setError(json.error)
                //setEmptyFields(json.emptyFields)
                Swal.fire({
                    title: 'Error',
                    text: error,
                    icon: 'error',
                    showConfirmButton: false,
                    timer: 1000,
                })
            }
            if(response.ok) {
                if( response.status === 200 ) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Machine',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    }).then(() => {
                        navigate('/machineHistory/' + machine.machineId);
                    })
                }
            }
        }
  
  // const handleUpdate = async (e) => {
  //   console.log(MachineType, Brand, Model, SerialNo,PurchaseDate,WarrantyExp, Manufacturer, TelNo);
  // };

  return (
    <div className="">
      <div className="title">Update Machine Services</div>
      <hr />
      <form className="create" onSubmit={handleMachineUpdate}>
        <div className="machinelabels">
          <div className="input-box">
            <label> Last Service Date:</label>
            <input
              type="date"
              onChange={(e) => setLastserviceDate(e.target.value)}
              value={LastserviceDate}
              required
            />
          </div>
          <div className="input-box">
            <label>Next Service Date:</label>
            <input
              type="text"
              onChange={(e) => setNextServiceDate(e.target.value)}
              value={NextServiceDate}
              required
            />
          </div>
          <div className="input-box">
            <label>Technician's Name:</label>
            <input
              type="text"
              onChange={(e) => setTechnicianName(e.target.value)}
              value={TechnicianName}
              required
            />
          </div>
          <div className="input-box">
            <label>Technician's tel no</label>
            <input
              type="text"
              onChange={(e) => setTechTelno(e.target.value)}
              value={TechTelno}
              required
            />
          </div>
          <div className="input-box">
            <label>Technician's Payment:</label>
            <input
              type="text"
              onChange={(e) => setTechnicianPayment(e.target.value)}
              value={TechnicianPayment}
              required
            />
          </div>
          <div className="Add-button">
            <button>Update</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default UpdateMachineService;
