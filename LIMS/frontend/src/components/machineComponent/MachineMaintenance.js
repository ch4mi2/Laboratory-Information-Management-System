import { useState } from 'react'

const MachineMaintenanceForm = () => {
  const [LastServiceDate, setLastServiceDate] = useState('')
  const [NextServiceDate, setNextServiceDate] = useState('')
  const [serviceCost, setserviceCost] = useState('')
  const [error, setError] = useState(null)

  /*const handleSubmit = async (e) => {
    e.preventDefault()

    const service = {LastServiceDate , NextServiceDate , serviceCost}
    
    const response = await fetch('/api/machines', {
      method: 'PATCH',
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
      setLastServiceDate('')
      setNextServiceDate('')
      setserviceCost('')
      console.log('Machine history updated:', json)
    }

  }
  onSubmit={handleSubmit}
  */   

  return (
    <div class = "container1">
      <div class="title">Service Details</div>
      <hr/>
      <form className="create" > 
      <div class = "machinelabels">
        <div class="input-box">
          <label>Last Service Date :</label>
          <input 
            type="date" 
            onChange={(e) => setLastServiceDate(e.target.value)} 
            value={LastServiceDate} required
          />
        </div>
        <div class="input-box">
          <label>Next Service Date:</label>
          <input 
            type="date" 
            onChange={(e) => setNextServiceDate(e.target.value)} 
            value={NextServiceDate} required
          />
        </div>
        <div class="input-box">
          <label>Service Cost:</label>
          <input 
            type="text" 
            onChange={(e) => setserviceCost(e.target.value)} 
            value={serviceCost} required
          />
        </div>
        <div class="Add-button">
          <button>Add Service Details</button>
        </div>  
        {error && <div className="error">{error}</div>}
    </div>    
    </form>
    </div>

  )
}

export default MachineMaintenanceForm