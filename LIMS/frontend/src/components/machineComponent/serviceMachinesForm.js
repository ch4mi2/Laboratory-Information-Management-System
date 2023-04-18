import { useState} from 'react';
//import { useParams } from 'react-router-dom';

const ServiceMachineForm = ({machine}) => {
  //const navigate = useNavigate();
  //const { machines, setMachines } = useState(null);
  //const { id } = useParams();

  console.log(machine._id);

  const [machineId , setMachineId] = useState(machine._id);
  const [machineName , setmachineName] = useState(machine.MachineType);
  const [LastserviceDate, setLastServiceDate] = useState('');
  const [NextServiceDate, setNextServiceDate] = useState('');
  const [TechnicianName, setTechnicianName] = useState('');
  const [TechTelno, setTechTelno] = useState('');
  const [TechnicianPayment, setTechnicianPayment] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceMachines = {
      machineId,
      machineName,
      LastserviceDate,
      NextServiceDate,
      TechnicianName,
      TechTelno,
      TechnicianPayment
    };

    const response = await fetch('/api/serviceMachines', {
      method: 'POST',
      body: JSON.stringify(serviceMachines),
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
      setLastServiceDate('');
      setNextServiceDate('');
      setMachineId('');
      setmachineName('');
      setTechnicianName('');
      setTechTelno('');
      setTechnicianPayment('');
      console.log('new machine service added:', json);
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
    <div class="">
      <div class="title">Add Machine Service Dates</div>
      <hr />
      <form className="create" onSubmit={handleSubmit}>
        <div class="machinelabels">
        <div class="input-box">
            <label>Machine ID :</label>
            <input
              type="text"
              onChange={(e) => setMachineId(e.target.value)}
              value={machineId}
              required
            />
          </div>
          <div class="input-box">
            <label>Machine Name :</label>
            <input
              type="text"
              onChange={(e) => setmachineName(e.target.value)}
              value={machineName}
              required
            />
          </div>
          <div class="input-box">
            <label>Last service Date:</label>
            <input
              type="date"
              onChange={(e) => setLastServiceDate(e.target.value)}
              value={LastserviceDate}
              required
            />
          </div>
          <div class="input-box">
            <label>Next Service Date:</label>
            <input
              type="date"
              onChange={(e) => setNextServiceDate(e.target.value)}
              value={NextServiceDate}
              required
            />
          </div>
          <div class="input-box">
            <label>Technician's Name:</label>
            <input
              type="text"
              onChange={(e) => setTechnicianName(e.target.value)}
              value={TechnicianName}
              required
            />
          </div>
          <div class="input-box">
            <label>Technician's Tel No</label>
            <input
              type="text"
              onChange={(e) => setTechTelno(e.target.value)}
              value={TechTelno}
              required
            />
          </div>
          <div class="input-box">
            <label>Technician's Payment:</label>
            <input
              type="text"
              onChange={(e) => setTechnicianPayment(e.target.value)}
              value={TechnicianPayment}
              required
            />
          </div>
          <div class="Add-button">
            <button>Add Service Dates</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default ServiceMachineForm;
