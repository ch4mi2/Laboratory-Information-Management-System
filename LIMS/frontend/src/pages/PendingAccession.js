import { useState, useEffect } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';
import $ from 'jquery';
import formatDate from '../UtillFuntions/formatDate';

const initilizeDataTable = () => {
  $(function() {
    // Check if table is already a DataTable
    if ($.fn.dataTable.isDataTable('#example')) {
      // Destroy the existing DataTable
      $('#example').DataTable().destroy();
    }
    // Initialize a new DataTable with options
    $('#example').DataTable({
      order: [[4,'desc']],
    });
  });
}

const PendingAccession = () => {
  const { samples, dispatch } = useSampleContext();
  const [isLoading, setIsLoading] = useState(true);
  const [collectingSampleId, setCollectingSampleId] = useState(null);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setIsLoading(true); // Set loading state to true before the fetch
        const response = await fetch('/api/samples/pendingSamples');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_SAMPLES', payload: json });
          
          initilizeDataTable();
         
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false after the fetch
      }
    };
    fetchSamples();
  }, []);
  
  const handleCollectClick = async (id) => {
    try {
      setCollectingSampleId(id);
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
      
      // Use DataTables API to remove the row with the updated sample
    const table = $('#example').DataTable();
    const row = table.rows(`[data-id ="${id}"]`);
    row.remove().draw();

    /*
    // Remove the updated sample from the samples state
    const updatedSamples = samples.filter(
      (sample) => sample._id !== updatedSample._id
    );
    dispatch({ type: 'SET_SAMPLES', payload: updatedSamples });
    //initilizeDataTable();
    */
    
    

    } catch (error) {
      console.error(error);
    }finally{
      
      setCollectingSampleId(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading text if loading state is true
  }

  return (
    <div className="container">
      <div>
        <h4>Pending Accession</h4>
      </div>

      <table id="example" className="table" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Sample Id</th>
            <th>Patient</th>
            <th>Test</th>
            <th>Specimen</th>
            <th>Billing Date</th>
            <th>Barcode</th>
            <th>Mark Collected</th>
          </tr>
        </thead>
        <tbody>
          {samples && samples.map((sample ) => (
            <tr key={sample._id} data-id={sample._id}>
              <td>{sample.sampleID}</td>
              <td>{sample.patient?.firstName ?? "Record not found"}</td>
              <td>{sample.test?.testName ?? "Record not found"}</td>
              <td>{sample.test?.specimen ?? "Record not found"}</td>
              <td>{formatDate(sample.createdAt) ?? "Record not found"}</td>
              <td>
                <button 
                  className="btnSubmit" 
                  >
                  Print
                </button>
              </td>
              <td>
                <button
                  className="btnSubmit"
                  onClick={() => handleCollectClick(sample._id)}
                  disabled={collectingSampleId === sample._id}
                >
                  {collectingSampleId === sample._id ? 'Collecting...' : 'Collect'}
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
            <th>Specimen</th>
            <th>Billing Date</th>
            <th>Barcode</th>
            <th>Mark Collected</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PendingAccession;



