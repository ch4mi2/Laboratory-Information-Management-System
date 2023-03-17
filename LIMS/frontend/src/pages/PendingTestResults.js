import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const PendingTestResults = () => {
  const [testResults, setTestResults] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTestResults = async () => {
      const response = await fetch('/api/testResult/pendingTests');
      const json = await response.json();

      if (response.ok) {
        setTestResults(json);

        $(function() {
          $('#example').DataTable();
        });
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
      <table id="example" className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Sample Id</th>
            <th>Patient</th>
            <th>Test</th>
            <th>Referred Doctor</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {testResults &&
            testResults.map((testResult) => (
              <tr key={testResult._id}>
                <td>{testResult.sample?.sampleID}</td>
                <td>{testResult.patient?.firstName}{testResult.patient?.lastName}</td>
                <td>{testResult.test?.testName}</td>
                <td></td>
                <td>
                  <button className='btnSubmit' onClick={() => handleClick(testResult._id)}>
                    Add Results
                  </button>
                </td> 
              </tr>
            ))}
        </tbody>
        <tfoot>     
          <tr>
            <th>Sample Id</th>
            <th>Patient</th>
            <th>Test</th>
            <th>Referred Doctor</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>               
  );
  
  
};

export default PendingTestResults;
