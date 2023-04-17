import { useState} from 'react';
//import { useParams } from 'react-router-dom';

const MachinePartsForm = ({machine}) => {
  //const navigate = useNavigate();
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
      <div class="title">Add a New Machine Part</div>
      <hr />
      <form className="create" onSubmit={handleSubmit}>
        <div className="machinelabels">
        <div className="input-box">
            <label>Machine ID :</label>
            <input
              type="text"
              onChange={(e) => setMachineId(e.target.value)}
              value={machineId}
              required
            />
          </div>
          <div className="input-box">
            <label>Machine Name :</label>
            <input
              type="text"
              onChange={(e) => setmachineName(e.target.value)}
              value={machineName}
              required
            />
          </div>
          <div className="input-box">
            <label>Maintenance Date :</label>
            <input
              type="date"
              onChange={(e) => setMaintenanceDate(e.target.value)}
              value={MaintenanceDate}
              required
            />
          </div>
          <div className="input-box">
            <label>Issue:</label>
            <input
              type="text"
              onChange={(e) => setIssue(e.target.value)}
              value={Issue}
              required
            />
          </div>
          <div className="input-box">
            <label>Machine Part:</label>
            <input
              type="text"
              onChange={(e) => setMachinePart(e.target.value)}
              value={MachinePart}
              required
            />
          </div>
          <div className="input-box">
            <label>Brand :</label>
            <input
              type="text"
              onChange={(e) => setbrandOfMachinePart(e.target.value)}
              value={brandOfMachinePart}
              required
            />
          </div>
          <div className="input-box">
            <label>Price of machine Part:</label>
            <input
              type="text"
              onChange={(e) => setPriceOfMachinePart(e.target.value)}
              value={PriceOfMachinePart}
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
            <label>Technician's Tel No</label>
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
            <button>Add Machine Part</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default MachinePartsForm;
