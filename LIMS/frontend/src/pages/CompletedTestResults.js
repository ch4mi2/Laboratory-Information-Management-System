import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const CompletedTestResults = () => {
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/testResult/completedTests');
        const json = await response.json();

      if (response.ok) {
        setTestResults(json);

        $(function() {
          $('#example').DataTable();
        });
      }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false after the fetch
      }
      
    };
    fetchTestResults();
  }, []);

  

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading text if loading state is true
  }

  const handlePreviewClick = (id) => {
    navigate(`/testResultPreview/${id}`)
  }

  return (
    <div className="container">
      <div>
        <h4>Completed Tests</h4>
      </div>
      <table id="example" className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            
            <th>Patient</th>
            <th>Test</th>
            <th>Referred Doctor</th>
            <th>Sample Id</th>
            
            <th></th>
            
          </tr>
        </thead>
        <tbody>
          {testResults &&
            testResults.map((testResult) => (
              <tr key={testResult._id} data-status={testResult.sample?.status}>
                
                <td>{testResult.patient?.firstName ?? "Record not found"}{testResult.patient?.lastName}</td>
                <td>{testResult.test?.testName ?? "Record not found"}</td>
                <td></td>
                <td>{testResult.sample?.sampleID ?? "Record not found"}</td>
                <td>
                <button className='btnSubmit' onClick={() => handlePreviewClick((testResult._id))}>
                  Preview
                </button>
                </td> 
              </tr>
            ))}
        </tbody>
      </table>
    </div>               
  );
  
  
};

export default CompletedTestResults;
