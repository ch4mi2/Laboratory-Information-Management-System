import { useState} from 'react';
//import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MachinePartsForm = ({machine}) => {
  const navigate = useNavigate();
  //const { machines, setMachines } = useState(null);
  //const { id } = useParams();
  console.log(machine._id);

  //const currentMachine = machines.filter((m) => m._id === id)[0];

  const [machineId , setMachineId] = useState(machine._id);
  const [machineName , setmachineName] = useState(machine.MachineType);
  const [MaintenanceDate, setMaintenanceDate] = useState('');
  const [Issue, setIssue] = useState('');
  const [MachinePart, setMachinePart] = useState('');
  const [brandOfMachinePart, setbrandOfMachinePart] = useState('');
  const [PriceOfMachinePart, setPriceOfMachinePart] = useState('');
  const [TechnicianName, setTechnicianName] = useState('');
  const [TechTelno, setTechTelno] = useState('');
  const [TechnicianPayment, setTechnicianPayment] = useState('');
  const [error, setError] = useState(null);
  const[emptyFields, setEmptyFields] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const machineParts = {
      machineId,
      machineName,
      MaintenanceDate,
      Issue,
      MachinePart,
      brandOfMachinePart,
      PriceOfMachinePart,
      TechnicianName,
      TechTelno,
      TechnicianPayment
    };

    const response = await fetch('/api/machineParts', {
      method: 'POST',
      body: JSON.stringify(machineParts),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      console.log('error');
      setEmptyFields(json.emptyFields)
      Swal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000,
            })
    }
    if (response.ok) {
      setError(null);
      setMaintenanceDate('');
      setIssue('');
      setMachinePart('');
      setbrandOfMachinePart('');
      setPriceOfMachinePart('');
      setTechnicianName('');
      setTechTelno('');
      setTechnicianPayment('');
      console.log('new machine part added:', json);
      //setMachines(json)
      Swal.fire({
        title: 'Success',
        text: 'Replaced Machine parts successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    })
    navigate('/machineHistory/' + machine._id)
    }
  };

  // useEffect(() => {
  //   if (currentMachine) {
  //     setMachineId(currentMachine._id);
  //     setmachineName(currentMachine.machineName);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  return (
    <div className="">
      <hr />
      <form className="create" onSubmit={handleSubmit}>
        <div className="machinelabels">
        <div className="input-box">
            {/* <label>Machine ID :</label> */}
            <input
              type="text"
              onChange={(e) => setMachineId(e.target.value)}
              value={machineId}
              // required
              hidden
            />
          </div>
          <div className="input-box">
            <label>Machine Name :</label>
            <input
              type="text"
              onChange={(e) => setmachineName(e.target.value)}
              value={machineName}
              // required
              disabled
              className={emptyFields.includes('machineName') ? 'error' : ''}
            />
          </div>
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
            <label>Price of machine Part:</label>
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
            <label>Technician's Tel No</label>
            <input
              type="tel"
              onChange={(e) => setTechTelno(e.target.value)}
              value={TechTelno}
              // required
              pattern="[0-9]{10}"
              className={emptyFields.includes('TechTelno') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Technician's Payment:</label>
            <input
              type="text"
              onChange={(e) => setTechnicianPayment(e.target.value)}
              value={TechnicianPayment}
              // required
              className={emptyFields.includes('TechnicianPayment') ? 'error' : ''}
            />
          </div>
          <div className="Add-button">
            <button className='subBtn'>Add Machine Part</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default MachinePartsForm;
