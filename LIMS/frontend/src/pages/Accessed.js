import { useEffect, useState } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';


const Accessed = () => {
  const { samples, dispatch } = useSampleContext();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await fetch('/api/samples/collectedSamples');
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_SAMPLES', payload: json });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSamples();
  }, [dispatch]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
      date
    );
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amPm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const formattedTime = `${hour12}:${minutes
      .toString()
      .padStart(2, '0')} ${amPm}`;
    return `${day}${ordinalSuffix(day)} ${month}, ${formattedTime}`;
  }

  function ordinalSuffix(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  const filteredSamples = samples ? samples.filter((sample) => {
    const query = searchQuery.toLowerCase();
    const fullName = `${sample.patient?.firstName} ${sample.patient?.lastName}`.toLowerCase();
    const testName = sample.test?.testName.toLowerCase();
    const specimen = sample.test?.specimen.toLowerCase();
  
    return (
      sample.sampleID.toLowerCase().includes(query) ||
      fullName.includes(query) ||
      testName.includes(query) ||
      specimen.includes(query)
    );
  }) : [];

  return (
    <div className="container">
      <div>
        <h4>Accessed Samples</h4>
      </div>
  
      <div className="row">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <p className="card-text">Sample Id</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Patient</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Test</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Specimen</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Collection Time</p>
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredSamples.map((sample) => (
            <div className="card mb-1" key={sample._id}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <p className="card-text">{sample.sampleID}</p>
                    </div>  
                  <div className="col-md-2">
                    <p className="card-text">{sample.patient?.firstName}</p>
                    </div>
                  <div className="col-md-2">
                    <p className="card-text">{sample.test?.testName}</p>
                    </div>
                  <div className="col-md-2">
                    <p className="card-text">{sample.test?.specimen}</p>
                    </div> 
                  <div className="col-md-2">
                    <p className="card-text">{formatDate(sample.collectionTime)}</p>
                    </div> 
                  <div className="col-md-2">
                    <button className="btnSubmit">Print</button>
                    </div>
                    </div>
              </div>
              </div>
            
          ))}
      </div>
    </div>
  );
};

export default Accessed;
