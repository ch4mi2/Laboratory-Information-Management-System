import { useEffect, useState, useRef } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';
import $ from 'jquery';
import formatDate from '../UtillFuntions/formatDate';
import JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';



const Accessed = () => {
  const { samples, dispatch } = useSampleContext();
  const [isLoading, setLoading] = useState(true);

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
      } finally {
        setLoading(false); // update the loading state after the fetch
      }
    };
    fetchSamples();
  }, [dispatch]);

  useEffect(() => {
    $(function() {
      $('#example').DataTable({
        order: [[4,'desc']],
        "bDestroy": true
      });
    });
  }, [samples]);

  const handlePrintClick = (id) => {
    
  }

  const handleDeleteClick = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass:'alerts'
    });
  
    if (confirmed.isConfirmed) {
      const response = await fetch(`/api/samples/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();
  
      if (response.ok) {
        const table = $('#example').DataTable();
        const row = table.rows(`[data-id ="${id}"]`);
        row.remove().draw();

        Swal.fire(
          {
            title: 'Success',
            text: 'Record has been deleted',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
            
        }
        )
      }
    }
  };
  
  
  
  

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading text if loading state is true
  }
  return (
    <div className="container">
        <div>
          <div>
            <h4>Accessed Samples</h4>
          </div>
          <table id="example" className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Sample Id</th>
                <th>Patient</th>
                <th>Test</th>
                <th>Specimen</th>
                <th>Collection Time</th>
                <th>Barcode</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {samples && samples.map((sample) => (
                <tr key={sample._id} data-id={sample._id}>
                  <td>{sample.sampleID}</td>
                  <td>{sample.patient?.firstName ?? "Record not found"}</td>
                  <td>{sample.test?.testName ?? "Record not found"}</td>
                  <td>{sample.test?.specimen ?? "Record not found"}</td>
                  <td>{formatDate(sample.collectionTime)}</td>
                  <td>
                    <button 
                      className="btnSubmit" 
                      onClick={() => handlePrintClick(sample.sampleID)}
                      >
                      Print
                      </button>
                  </td>
                  <td>
                    <button
                      className="btnDelete"
                      onClick={() => handleDeleteClick(sample._id)}
                      >
                      Delete
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
                <th>Collection Time</th>
                <th>Barcode</th>
                <th>Delete</th>
              </tr>
            </tfoot>
          </table>
        </div>
    </div>
  );
}; 


export default Accessed;
