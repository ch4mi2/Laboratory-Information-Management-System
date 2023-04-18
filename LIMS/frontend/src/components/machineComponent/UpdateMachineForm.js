// import { useState } from "react"
// import { useNavigate } from "react-router-dom";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const UpdateMachineForm = ({machine}) => {
//     const [MachineType, setMachineType] = useState(machine.MachineType)
//     const [Brand, setBrand] = useState(machine.Brand)
//     const [PurchaseDate, setPurchaseDate] = useState(machine.PurchaseDate)
//     const [Model, setModel] = useState(machine.Model)
//     const [SerialNo, setSerialNo] = useState(machine.SerialNo)
//     const [WarrantyExp, setWarrantyExp] = useState(machine.WarrantyExp)
//     const [Manufacturer, setManufacturer] = useState(machine.Manufacturer)
//     const [TelNo, setTelNo] = useState(machine.TelNo)

//     const [error, setError] = useState(null)
//     //const[emptyFields, setEmptyFields] = useState([])
//     const navigate = useNavigate();
//     const MySwal = withReactContent(Swal); 

//     const handleMachineUpdate = async (e) => {
//         e.preventDefault()

//         const machine = {MachineType ,Brand , PurchaseDate ,Model , SerialNo , WarrantyExp , Manufacturer , TelNo} 
        
//         const response = await fetch('/api/machines/' + machine._id, {
//             method: 'PATCH',
//             body: JSON.stringify(machine),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//         const json = await response.json()

//         if(!response.ok) {
//             setError(json.error)
//             //setEmptyFields(json.emptyFields)
//             MySwal.fire({
//                 title: 'Error',
//                 text: error,
//                 icon: 'error',
//                 showConfirmButton: false,
//                 timer: 1000,
//             })
//         }
//         if(response.ok) {
//             if( response.status === 200 ) {
//                 MySwal.fire({
//                     title: 'Success',
//                     text: 'Successfully Machine',
//                     icon: 'success',
//                     showConfirmButton: false,
//                     timer: 2000,
//                     timerProgressBar: true
//                 }).then(() => {
//                     navigate('/machineHistory/' + machine._id);
//                 })
//             }
//         }
//     }

//     // const handleDelete = async (e) => {
//     //     e.preventDefault()
        
//     //     Swal.fire({
//     //         title: 'Are you sure?',
//     //         text: "You won't be able to revert this!",
//     //         icon: 'warning',
//     //         showCancelButton: true,
//     //         confirmButtonText: 'Yes, delete it!'
//     //       }).then(async(result) => {
//     //         if (result.isConfirmed) {
//     //             const response = await fetch('/api/tests/' + Test._id, {
//     //                 method: 'DELETE',
//     //                 headers: {
//     //                     'Content-Type': 'application/json'
//     //                 }
//     //             })
//     //             const json = await response.json()
        
//     //             if(!response.ok) {
//     //                 setError(json.error)
//     //             }
//     //             if(response.ok) {
//     //                 MySwal.fire({
//     //                     title: 'Success',
//     //                     text: 'Successfully Deleted Test',
//     //                     icon: 'success',
//     //                     showConfirmButton: false,
//     //                     timer: 2000,
//     //                     timerProgressBar: true
//     //                 }).then(() => {
//     //                     //var path = '/viewTest/' + Test._id;
//     //                     navigate('/testData');
//     //                 })
//     //             }
//     //         }
//     //     })
//     // }


//     return ( 
//       <form className="create" onSubmit={handleMachineUpdate}>
//         <div className="machinelabels">
//           <div className="input-box">
//             <label>Machine :</label>
//             <input
//               type="text"
//               onChange={(e) => setMachineType(e.target.value)}
//               value={MachineType}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Brand:</label>
//             <input
//               type="text"
//               onChange={(e) => setBrand(e.target.value)}
//               value={Brand}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Model:</label>
//             <input
//               type="text"
//               onChange={(e) => setModel(e.target.value)}
//               value={Model}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Serial No :</label>
//             <input
//               type="text"
//               onChange={(e) => setSerialNo(e.target.value)}
//               value={SerialNo}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Purchased Date:</label>
//             <input
//               type="date"
//               onChange={(e) => setPurchaseDate(e.target.value)}
//               value={PurchaseDate}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Warranty Expiration:</label>
//             <input
//               type="date"
//               onChange={(e) => setWarrantyExp(e.target.value)}
//               value={WarrantyExp}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Manufacturer</label>
//             <input
//               type="text"
//               onChange={(e) => setManufacturer(e.target.value)}
//               value={Manufacturer}
//               required
//             />
//           </div>
//           <div className="input-box">
//             <label>Tel No:</label>
//             <input
//               type="text"
//               onChange={(e) => setTelNo(e.target.value)}
//               value={TelNo}
//               required
//             />
//           </div>
//         <div className="row">
//         </div>
//         <div className="Add-button">
//             <button>Update Machine</button>
//           </div>
//           {error && <div className="error">{error}</div>}
//         </div>
//         </form>
//     );
// }

// export default UpdateMachineForm;

// // const UpdateMachineForm = ({}) => {
// //     return ( 
// //         <p>update Machine</p>
// //     );
// // }
        
// // export default UpdateMachineForm;    

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
    
            const updatedMachine = {MachineType ,Brand , PurchaseDate ,Model , SerialNo , WarrantyExp , Manufacturer , TelNo} 
            
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
              onChange={(e) => setPurchaseDate(e.target.value)}
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
            <button className='subBtn'>Update Machine</button>
          </div>
          {/* {error && <div className="error">{error}</div>} */}
        </div>
      </form>
    </div>
  );
};

export default UpdateMachine;
