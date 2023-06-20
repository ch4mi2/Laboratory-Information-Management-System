import { useState } from 'react';
import '../../css/MachineStyles/machineDetails.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateMachine = ({machine}) => {
  //const { dispatch } = useMachineContext();
    const navigate = useNavigate();

    console.log(machine);

    const [MaintenanceDate, setMaintenanceDate] = useState(machine.MaintenanceDate)
    const [Issue, setIssue] = useState(machine.Issue)
    const [MachinePart, setMachinePart] = useState(machine.MachinePart)
    const [brandOfMachinePart, setbrandOfMachinePart] = useState(machine.brandOfMachinePart)
    const [PriceOfMachinePart, setPriceOfMachinePart] = useState(machine.PriceOfMachinePart)
    const [TechnicianName, setTechnicianName] = useState(machine.TechnicianName)
    const [TechTelno, setTechTelno] = useState(machine.TechTelno)
    const [TechnicianPayment, setTechnicianPayment] = useState(machine.TechnicianPayment)
    const [error, setError] = useState(null);
    const[emptyFields, setEmptyFields] = useState([]);

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
            const updatedMachinePart = {MaintenanceDate, Issue, MachinePart,brandOfMachinePart,PriceOfMachinePart,TechnicianName,TechTelno,TechnicianPayment} 
            
            const response = await fetch(`/api/machineParts/` + machine._id, {
                method: 'PATCH',
                body: JSON.stringify(updatedMachinePart),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const json = await response.json()
    
            if(!response.ok) {
                setError(json.error)
                setEmptyFields(json.emptyFields)
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
      <hr />
      <form className="create" onSubmit={handleMachineUpdate}>
        <div className="machinelabels">
          <div className="input-box">
            <label>Maintenance Date :</label>
            <input
              type="date"
              onChange={(e) => setMaintenanceDate(e.target.value)}
              value={MaintenanceDate}
              // required
              className={emptyFields.includes('MaintenanceDate') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Issue:</label>
            <input
              type="text"
              onChange={(e) => setIssue(e.target.value)}
              value={Issue}
              // required
              className={emptyFields.includes('Issue') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Machine Part:</label>
            <input
              type="text"
              onChange={(e) => setMachinePart(e.target.value)}
              value={MachinePart}
              // required
              className={emptyFields.includes('MachinePart') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Brand :</label>
            <input
              type="text"
              onChange={(e) => setbrandOfMachinePart(e.target.value)}
              value={brandOfMachinePart}
              // required
              className={emptyFields.includes('brandOfMachinePart') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Price:</label>
            <input
              type="number"
              onChange={(e) => setPriceOfMachinePart(e.target.value)}
              value={PriceOfMachinePart}
              // required
              className={emptyFields.includes('PriceOfMachinePart') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Technician's Name:</label>
            <input
              type="text"
              onChange={(e) => setTechnicianName(e.target.value)}
              value={TechnicianName}
              // required
              className={emptyFields.includes('TechnicianName') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Technician's tel no</label>
            <input
              type="tel"
              onChange={(e) => setTechTelno(e.target.value)}
              value={TechTelno}
              pattern="[0-9]{10}"
              // required
              className={emptyFields.includes('TechTelno') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Technician's Payment:</label>
            <input
              type="number"
              onChange={(e) => setTechnicianPayment(e.target.value)}
              value={TechnicianPayment}
              // required
              className={emptyFields.includes('TechnicianPayment') ? 'error' : ''}
            />
          </div>
          <div className="Add-button">
            <button className='subBtn'>Update</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default UpdateMachine;

