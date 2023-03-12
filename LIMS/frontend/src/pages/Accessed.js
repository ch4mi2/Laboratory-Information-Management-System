import { useEffect } from "react"
import '../css/samples.css'
import { useSampleContext } from "../hooks/useSampleContext"
import jsPDF from 'jspdf';
import { printJS } from 'print-js';






const Accessed = () => {
    const {samples, dispatch} = useSampleContext()

    useEffect(() => {
        const fetchSamples = async () => {
            const response = await fetch('/api/samples/collectedSamples')
            const json = await response.json()

            if(response.ok) {
               dispatch({type: 'SET_SAMPLES', payload: json}) 
            }
        }
        fetchSamples()
    },[dispatch])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const amPm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        const formattedTime = `${hour12}:${minutes.toString().padStart(2, '0')} ${amPm}`;
        return `${day}${ordinalSuffix(day)} ${month}, ${formattedTime}`;
      }
      
      function ordinalSuffix(day) {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
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
                    <p className="card-text">{formatDate(sample.collectionTime)}</p>
                    <button className="sampleBtn">Print</button>
                    </div>
                </div>  
            ))}
            </div>
        </div>
    )
}

export default Accessed