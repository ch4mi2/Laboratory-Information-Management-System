import { useState } from 'react';
import { useMachineContext } from '../../hooks/useMachineContext';
import '../../css/MachineStyles/machineDetails.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const MachineForm = () => {
  const { dispatch } = useMachineContext();
  const navigate = useNavigate();

  const [MachineType, setMachineType] = useState('');
  const [Brand, setBrand] = useState('');
  const [Model, setModel] = useState('');
  const [SerialNo, setSerialNo] = useState('');
  const [PurchaseDate, setpurchasedDate] = useState('');
  const [WarrantyExp, setWarrantyExp] = useState('');
  const [Manufacturer, setManufacturer] = useState('');
  const [Price , setPrice] = useState('');
  const [TelNo, setTelNo] = useState('');
  const [error, setError] = useState(null);
  const[emptyFields, setEmptyFields] = useState([]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const machine = {
      MachineType,
      Brand,
      Model,
      Price,
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
      setEmptyFields(json.emptyFields)
      console.log('error');
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
      setMachineType('');
      setBrand('');
      setModel('');
      setSerialNo('');
      setpurchasedDate('');
      setWarrantyExp('');
      setPrice('');
      setManufacturer('');
      setTelNo('');
      console.log('new machine added:', json);
      dispatch({ type: 'CREATE_MACHINE', payload: json });
      // if( response.status === 200 ) {
        Swal.fire({
            title: 'Success',
            text: 'Machine Added Successfully',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
        }).then(() => {
          navigate('/machineList')
        })
    }
  };

  return (
    <div>
      <hr/>
      <form className="create" onSubmit={handleSubmit}>
        <div className="machinelabels">
          <div className="input-box">
            <label>Machine :</label>
            <input
              type="text"
              onChange={(e) => setMachineType(e.target.value)}
              value={MachineType}
              // required
              className={emptyFields.includes('MachineType') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Brand:</label>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              value={Brand}
              // required
              className={emptyFields.includes('Brand') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Model:</label>
            <input
              type="text"
              onChange={(e) => setModel(e.target.value)}
              value={Model}
              // required
              className={emptyFields.includes('Model') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Serial No :</label>
            <input
              type="text"
              onChange={(e) => setSerialNo(e.target.value)}
              value={SerialNo}
              // required
              className={emptyFields.includes('SerialNo') ? 'error' : ''} 
            />
          </div>
          <div className="input-box">
            <label>Purchased Date:</label>
            <input
              type="date"
              onChange={(e) => setpurchasedDate(e.target.value)}
              value={PurchaseDate}
              // required
              className={emptyFields.includes('PurchasedDate') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Price:</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={Price}
              // required
              className={emptyFields.includes('Price') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Warranty Expiration:</label>
            <input
              type="date"
              onChange={(e) => setWarrantyExp(e.target.value)}
              value={WarrantyExp}
              // required
              className={emptyFields.includes('WarrantyExp') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Manufacturer</label>
            <input
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
              value={Manufacturer}
              // required
              className={emptyFields.includes('Manufacturer') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Tel No:</label>
            <input
              type="tel"
              onChange={(e) => setTelNo(e.target.value)}
              value={TelNo}
              // required
              pattern="[0-9]{10}"
              className={emptyFields.includes('TelNo') ? 'error' : ''}
            />
          </div>
          <br/>
          <div>
            <button className='subBtn'>Add New Machine</button>
          </div>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default MachineForm
