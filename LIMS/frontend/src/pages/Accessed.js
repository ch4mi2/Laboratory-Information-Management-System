import { useEffect, useState } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';
import $ from 'jquery';
import formatDate from '../UtillFuntions/formatDate';


const Accessed = () => {
  const { samples, dispatch } = useSampleContext();
 

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        const response = await fetch('/api/samples/collectedSamples');
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_SAMPLES', payload: json });
          
          $(function() {
            $('#example').DataTable();
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSamples();
  }, [dispatch]);

  return (
    <div className="container">
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {samples && samples.map((sample) => (
            <tr key={sample._id}>
              <td>{sample.sampleID}</td>
              <td>{sample.patient?.firstName}</td>
              <td>{sample.test?.testName}</td>
              <td>{sample.test?.specimen}</td>
              <td>{formatDate(sample.collectionTime)}</td>
              <td><button className="btnSubmit">Print</button></td>
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
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
  
};

export default Accessed;
