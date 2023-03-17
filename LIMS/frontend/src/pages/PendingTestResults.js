import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PendingTestResults = () => {
  const [testResults, setTestResults] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTestResults = async () => {
      const response = await fetch('/api/testResult/pendingTests');
      const json = await response.json();

      if (response.ok) {
        setTestResults(json);
      }
    };
    fetchTestResults();
  }, []);

  const handleClick = (id) => {
      navigate(`/testResultView/${id}`)
  }

  return (
    <div className="container">
      <div>
        <h4>Pending Tests</h4>
      </div>
      <div className="row">
        <div className="card mb-3">
          <div className="card-body">
            <div className="row">
              <div className="col-md-2">
                <p className="card-text">Sample Id</p>
              </div>
              <div className="col-md-3">
                <p className="card-text">Patient Details</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Test</p>
              </div>
              <div className="col-md-2">
                <p className="card-text">Reffered Doctor</p>
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {testResults &&
          testResults.map((testResult) => (
            <div className="card mb-1" key={testResult._id}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-2">
                    <p className="card-text">{testResult.sample?.sampleID}</p>
                  </div>
                  <div className="col-md-3">
                    <p className="card-text">{testResult.patient?.firstName}{testResult.patient?.lastName}</p>
                  </div>
                  <div className="col-md-2">
                    <p className="card-text">{testResult.test?.testName}</p>
                  </div>
                  <div className="col-md-2">
                    <p className="card-text">dr.doctor</p>
                  </div>
                  <div className="col-md-2">
                    <button className='btnSubmit' onClick={() => handleClick(testResult._id)}>
                      Add Results
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

export default PendingTestResults;
