import { useState } from 'react';
// import { useMachineContext } from '../../hooks/useMachineContext';
import '../../css/MachineStyles/machineDetails.css'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const UpdateMachine = ({machine}) => {
  //const { dispatch } = useMachineContext();
    const navigate = useNavigate();

    const [MachineType, setMachineType] = useState(machine.MachineType)
    const [Brand, setBrand] = useState(machine.Brand)
    const [PurchaseDate, setPurchaseDate] = useState(machine.PurchaseDate)
    const [Model, setModel] = useState(machine.Model)
    const [SerialNo, setSerialNo] = useState(machine.SerialNo)
    const [WarrantyExp, setWarrantyExp] = useState(machine.WarrantyExp)
    const [Manufacturer, setManufacturer] = useState(machine.Manufacturer)
    const [TelNo, setTelNo] = useState(machine.TelNo)
    const [Price , setPrice] = useState(machine.Price)
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
    
            const updatedMachine = {MachineType ,Price , Brand , PurchaseDate ,Model , SerialNo , WarrantyExp , Manufacturer , TelNo} 
            
            const response = await fetch(`/api/machines/` + machine._id, {
                method: 'PATCH',
                body: JSON.stringify(updatedMachine),
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
                        text: 'Machine updated Successfully',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    }).then(() => {
                        navigate('/machineHistory/' + machine._id);
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
            <label>Machine :</label>
            <input
              type="text"
              onChange={(e) => setMachineType(e.target.value)}
              value={MachineType}
              required
              className={emptyFields.includes('MachineType') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Brand:</label>
            <input
              type="text"
              onChange={(e) => setBrand(e.target.value)}
              value={Brand}
              required
              className={emptyFields.includes('Brand') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Model:</label>
            <input
              type="text"
              onChange={(e) => setModel(e.target.value)}
              value={Model}
              required
              className={emptyFields.includes('Model') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Serial No :</label>
            <input
              type="text"
              onChange={(e) => setSerialNo(e.target.value)}
              value={SerialNo}
              required
              className={emptyFields.includes('SerialNo') ? 'error' : ''} 
            />
          </div>
          <div className="input-box">
            <label>Purchased Date:</label>
            <input
              type="date"
              onChange={(e) => setPurchaseDate(e.target.value)}
              value={PurchaseDate}
              required
              className={emptyFields.includes('PurchasedDate') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Price:</label>
            <input
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={Price}
              required
              className={emptyFields.includes('Price') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Warranty Expiration:</label>
            <input
              type="date"
              onChange={(e) => setWarrantyExp(e.target.value)}
              value={WarrantyExp}
              required
              className={emptyFields.includes('WarrantyExp') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Manufacturer</label>
            <input
              type="text"
              onChange={(e) => setManufacturer(e.target.value)}
              value={Manufacturer}
              required
              className={emptyFields.includes('Manufacturer') ? 'error' : ''}
            />
          </div>
          <div className="input-box">
            <label>Tel No:</label>
            <input
              type="telno"
              onChange={(e) => setTelNo(e.target.value)}
              value={TelNo}
              required
              pattern="[0-9]{10}"
              className={emptyFields.includes('TelNo') ? 'error' : ''}
            />
          </div>
          <div className="Add-button">
            <button className='subBtn'>Update Machine</button>
          </div>
          {/* {error && <div className="error">{error}</div>} */}
        </div>
      </form>
    </div>
  );
};

export default UpdateMachine;
