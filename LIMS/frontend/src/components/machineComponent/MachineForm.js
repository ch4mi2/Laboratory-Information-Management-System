import { useState } from 'react'

const MachineForm = () => {
  const [MachineType, setMachineType] = useState('')
  const [Brand, setBrand] = useState('')
  const [Model, setModel] = useState('')
  const [SerialNo, setSerialNo] = useState('')
  const [PurchaseDate, setpurchasedDate] = useState('')
  const [WarrantyExp, setWarrantyExp] = useState('')
  const [Manufacturer, setManufacturer] = useState('')
  const [TelNo, setTelNo] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const machine = {MachineType , Brand ,Model, SerialNo , PurchaseDate , WarrantyExp , Manufacturer , TelNo}
    
    const response = await fetch('/api/machines', {
      method: 'POST',
      body: JSON.stringify(machine),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      console.log("error");
    }
    if (response.ok) {
      setError(null)
      setMachineType('')
      setBrand('')
      setModel('')
      setSerialNo('')
      setpurchasedDate('')
      setWarrantyExp('')
      setManufacturer('')
      setTelNo('')
      console.log('new workout added:', json)
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Machine</h3>

      <label>Machine :</label>
      <input 
        type="text" 
        onChange={(e) => setMachineType(e.target.value)} 
        value={MachineType}
      />

      <label>Brand:</label>
      <input 
        type="text" 
        onChange={(e) => setBrand(e.target.value)} 
        value={Brand}
      />

      <label>Model:</label>
      <input 
        type="text" 
        onChange={(e) => setModel(e.target.value)} 
        value={Model} 
      />

      <label>Serial No :</label>
      <input 
        type="text" 
        onChange={(e) => setSerialNo(e.target.value)} 
        value={SerialNo} 
      />

      <label>Purchased Date:</label>
      <input 
        type="date" 
        onChange={(e) => setpurchasedDate(e.target.value)} 
        value={PurchaseDate} 
      />

      <label>Warranty Expiration:</label>
      <input 
        type="date" 
        onChange={(e) => setWarrantyExp(e.target.value)} 
        value={WarrantyExp} 
      />

      <label>Manufacturer</label>
      <input 
        type="text" 
        onChange={(e) => setManufacturer(e.target.value)} 
        value={Manufacturer} 
      />

      <label>Tel No:</label>
      <input 
        type="text" 
        onChange={(e) => setTelNo(e.target.value)} 
        value={TelNo} 
      />

      <button>Add Machine</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default MachineForm