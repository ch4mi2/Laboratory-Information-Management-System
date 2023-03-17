import { useState, useEffect } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';

const PendingAccession = () => {
  const { samples, dispatch } = useSampleContext();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await fetch('/api/samples/pendingSamples');
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

  const handleCollectClick = async (id) => {
    try {
      const response = await fetch(`/api/samples/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'collected',
          collectionTime: new Date(),
        }),
      });

      const updatedSample = await response.json();

      // Remove the updated sample from the samples state
      const updatedSamples = samples.filter(
        (sample) => sample._id !== updatedSample._id
      );
      dispatch({ type: 'SET_SAMPLES', payload: updatedSamples });
    } catch (error) {
      console.error(error);
    }
  };

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
        <h4>Pending Accession</h4>
      </div>
  
      <div className="row">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <p className="card-text">Sample Id</p>
              </div>
              <div className="col-md-3">
                <p className="card-text">Patient</p>
              </div>
              <div className="col-md-3">
                <p className="card-text">Test</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Specimen</p>
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
                <div className="col-md-3">
                  <p className="card-text">{sample.patient?.firstName}</p>
                </div>
                <div className="col-md-3">
                  <p className="card-text">{sample.test?.testName}</p>
                </div>
                <div className="col-md-2">
                  <p className="card-text">{sample.test?.specimen}</p>
                </div>
                <div className="col-md-2">
                  <button
                    className="card-text btnSubmit"
                    onClick={() => handleCollectClick(sample._id)}
                  >
                    Collect
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingAccession;


