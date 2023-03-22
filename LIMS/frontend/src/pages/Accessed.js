import { useEffect, useState } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';
import $ from 'jquery';
import formatDate from '../UtillFuntions/formatDate';

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
          
          $(function() {
            $('#example').DataTable({
              order: [[4,'desc']],
              "bDestroy": true
            });
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // update the loading state after the fetch
      }
    };
    fetchSamples();
  }, [dispatch]);

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
    </div>
  );
}; 


export default Accessed;
