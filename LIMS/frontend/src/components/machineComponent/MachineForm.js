import { useState } from 'react';
import { useMachineContext } from '../../hooks/useMachineContext';
import '../../css/MachineStyles/machineDetails.css'

const MachineForm = () => {
  const { dispatch } = useMachineContext();

  const [MachineType, setMachineType] = useState('');
  const [Brand, setBrand] = useState('');
  const [Model, setModel] = useState('');
  const [SerialNo, setSerialNo] = useState('');
  const [PurchaseDate, setpurchasedDate] = useState('');
  const [WarrantyExp, setWarrantyExp] = useState('');
  const [Manufacturer, setManufacturer] = useState('');
  const [TelNo, setTelNo] = useState('');
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const machine = {
      MachineType,
      Brand,
      Model,
      SerialNo,
      PurchaseDate,
      WarrantyExp,
      Manufacturer,
      TelNo,
    };

    const response = await fetch('/api/machines', {
      method: 'POST',
      body: JSON.stringify(machine),
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
      setMachineType('');
      setBrand('');
      setModel('');
      setSerialNo('');
      setpurchasedDate('');
      setWarrantyExp('');
      setManufacturer('');
      setTelNo('');
      console.log('new machine added:', json);
      dispatch({ type: 'CREATE_MACHINE', payload: json });
    }
  };

  return (
    <div className="">
      <div className="title">Add a New Machine</div>
      <hr />
      <form className="create" onSubmit={handleSubmit}>
        <div className="machinelabels">
          <div className="input-box">
            <label>Machine :</label>
            <input
              type="text"
              onChange={(e) => setMachineType(e.target.value)}
              value={MachineType}
              required
            />
          </div>
          <div className="input-box">
            <label>Brand:</label>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              value={Brand}
              required
            />
          </div>
          <div className="input-box">
            <label>Model:</label>
            <input
              type="text"
              onChange={(e) => setModel(e.target.value)}
              value={Model}
              required
            />
          </div>
          <div className="input-box">
            <label>Serial No :</label>
            <input
              type="text"
              onChange={(e) => setSerialNo(e.target.value)}
              value={SerialNo}
              required
            />
          </div>
          <div className="input-box">
            <label>Purchased Date:</label>
            <input
              type="date"
              onChange={(e) => setpurchasedDate(e.target.value)}
              value={PurchaseDate}
              required
            />
          </div>
          <div className="input-box">
            <label>Warranty Expiration:</label>
            <input
              type="date"
              onChange={(e) => setWarrantyExp(e.target.value)}
              value={WarrantyExp}
              required
            />
          </div>
          <div className="input-box">
            <label>Manufacturer</label>
            <input
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
              value={Manufacturer}
              required
            />
          </div>
          <div className="input-box">
            <label>Tel No:</label>
            <input
              type="text"
              onChange={(e) => setTelNo(e.target.value)}
              value={TelNo}
              required
            />
          </div>
          <div className="Add-button">
            <button>Add Machine</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default MachineForm;
