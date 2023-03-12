
import { useEffect } from "react"
import '../css/samples.css'
import { useSampleContext } from "../hooks/useSampleContext"




const PendingAccession = () => {
    const {samples, dispatch} = useSampleContext()
  
    useEffect(() => {
      const fetchSamples = async () => {
        try {
            const response = await fetch('/api/samples/pendingSamples')
            const json = await response.json()
      
            if(response.ok) {
              dispatch({type: 'SET_SAMPLES', payload: json}) 
            } 
        } catch (error) {
            console.log(error)
        }
      }
      fetchSamples()
    },[dispatch])
  
    const handleCollectClick = async (id) => {
      try {
        const response = await fetch(`/api/samples/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'collected',
            collectionTime: new Date()
          })
        })
  
        const updatedSample = await response.json();
  
        // Remove the updated sample from the samples state
        const updatedSamples = samples.filter(sample => sample._id !== updatedSample._id);
        dispatch({ type: 'SET_SAMPLES', payload: updatedSamples });
      } catch (error) {
        console.error(error);
      }
    }
  
    return(
      <div className="container">
        <div className="samples">
          {samples && samples.map((sample) => (
            <div className="card sample-details" key={sample._id}>
              <div className="card-body sample-details-body d-flex justify-content-between align-items-center">
                <p className="card-text">{sample.sampleID}</p>
                <p className="card-text">{sample.patient?.firstName}</p>
                <p className="card-text">{sample.test?.testName}</p>
                <p className="card-text">{sample.test?.specimen}</p>
                <button className="sampleBtn" onClick={() => handleCollectClick(sample._id)}>Collect</button>
              </div>
            </div>  
          ))}
        </div>
      </div>
    )
  }
  
  export default PendingAccession;
  