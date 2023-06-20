import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';

const PendingTestResults = () => {
  const [testResults, setTestResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/testResult/pendingTests');
        const json = await response.json();

      if (response.ok) {
        setTestResults(json);

        $(function() {
          $('#example').DataTable({
            order: [[0,'asc']],
            bDestroy: true,
          });
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

  const handleAddClick = (id) => {
      navigate(`/addTestResults/${id}`)
  }

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading text if loading state is true
  }

  const handlePreviewClick = (id) => {
    navigate(`/testResultPreview/${id}`)
  }

  return (
    <div className="container">
      <div>
        <h4>Pending Tests</h4>
      </div>
      <table id="example" className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Created At</th>
            <th>Patient</th>
            <th>Test</th>
            <th>Referred Doctor</th>
            <th>Sample Id</th>
            <th>Sample Status</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {testResults &&
            testResults.map((testResult) => (
              <tr key={testResult._id} data-status={testResult.sample?.status}>
                <td>{moment(testResult.createdAt).format('DD-MM-YYYY h:mm a') ?? "Record not found"}</td>
                <td>{testResult.patient?.firstName ?? "Record not found"}{testResult.patient?.lastName}</td>
                <td>{testResult.test?.testName ?? "Record not found"}</td>
                <td>{testResult.bill?.referredDoctor ?? "Record not found"}</td>
                <td>{testResult.sample?.sampleID ?? "Record not found"}</td>
                <td>{testResult.sample?.status ?? "Record not found"}</td>
                <td>
                  <button 
                    className='btnSubmit' 
                    onClick={() => handleAddClick(testResult._id)}
                    disabled={testResult.sample?.status === "pending"}
                    style={{backgroundColor: testResult.sample?.status === "pending" ? "#aaa" : ""}}
                  >
                    Add
                  </button>
                </td>
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

export default PendingTestResults;
