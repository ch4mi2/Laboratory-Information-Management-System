import { useEffect, useState, useRef } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';
import $ from 'jquery';
import JsBarcode from 'jsbarcode';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import moment from 'moment';


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
        order: [[0,'desc']],
        "bDestroy": true
      });
    });
  }, [samples]);

  const handlePrintClick = (sample) => {
    // Generate the barcode image data URL
    const barcode = generateBarcode(sample);
  
    // Create a new PDF document
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: [1, 2], // Size of the page is reduced to fit a specimen tube
    });
  
    // Add the barcode image to the PDF document
    pdf.addImage(barcode,  'PNG', 0, 0, 2, 1);
  
    // Save the PDF document
    window.open(pdf.output('bloburl'), '_blank')
    //pdf.output('dataurlnewwindow');
    //pdf.save(`barcode-${id}.pdf`);
  };
  

  const generateBarcode = (sample) => {
    // Create a canvas element to render the barcode
    const canvas = document.createElement('canvas');
  
    // Set the barcode options
    const options = {
      format: 'CODE39',
      width: 2,
      height: 40,
      displayValue: true,
      fontSize: 24
    };
  
    // Generate the barcode and render it on the canvas
    JsBarcode(canvas, sample.sampleID, options);
  
    // Return the canvas as an image data URL
    return canvas.toDataURL();
  };

  const handleDeleteClick = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure you want to delete?',
      text: "Test record corresponding to this sample will be deleted",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: 'alerts'
    });
  
    if (confirmed.isConfirmed) {
      try {
        const [sampleResponse, testResultResponse] = await Promise.all([
          fetch(`/api/samples/${id}`, { method: 'DELETE' }),
          fetch(`/api/testResult/all/${id}`, { method: 'DELETE' })
        ]);
  
        const sampleJson = await sampleResponse.json();
        const testResultJson = await testResultResponse.json();
  
        if (sampleResponse.ok && testResultResponse.ok) {
          const table = $('#example').DataTable();
          const row = table.rows(`[data-id ="${id}"]`);
          row.remove().draw();
  
          Swal.fire({
            title: 'Success',
            text: 'Records has been deleted',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Something went wrong',
          icon: 'error',
          showConfirmButton: true
        });
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
                <th>Collected At</th>
                <th>Created At</th>
                <th>Sample Id</th>
                <th>Patient</th>
                <th>Test</th>
                <th>Specimen</th>
                <th>Barcode</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {samples && samples.map((sample) => (
                <tr key={sample._id} data-id={sample._id}>
                  <td>{moment(sample.collectionTime).format('DD-MM-YYYY h:mm a')}</td>
                  <td>{moment(sample.createdAt).format('DD-MM-YYYY h:mm a')}</td>
                  <td>{sample.sampleID}</td>
                  <td>{sample.patient?.firstName ?? "Record not found"}</td>
                  <td>{sample.test?.testName ?? "Record not found"}</td>
                  <td>{sample.test?.specimen ?? "Record not found"}</td>
                  <td>
                    <button 
                      className="btnSubmit" 
                      onClick={() => handlePrintClick(sample)}
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
          </table>
        </div>
    </div>
  );
}; 


export default Accessed;
