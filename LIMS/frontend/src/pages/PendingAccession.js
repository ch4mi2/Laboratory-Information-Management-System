import { useEffect, useState } from "react"
import '../css/samples.css'
//components
import SampleDetails from '../components/sampleDetails'

const PendingAccession = () => {
    const [samples, setSamples] = useState(null)

    useEffect(() => {
        const fetchSamples = async () => {
            const response = await fetch('/api/samples')
            const json = await response.json()

            if(response.ok) {
                setSamples(json)
            }
        }
        fetchSamples()
    },[])
    return(
        <div className="container">
            <div className="samples">
                {samples && samples.map((sample) => (
                    <SampleDetails key={sample._id} sample={sample} />  
                ))}
            </div>
        </div>
    )
}

export default PendingAccession