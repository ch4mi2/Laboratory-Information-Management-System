import { useState, useEffect } from 'react';
import { useSampleContext } from '../hooks/useSampleContext';
import $ from 'jquery';

const PendingAccession = () => {
  const { samples, dispatch } = useSampleContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSamples = async () => {
      try {
        setIsLoading(true); // Set loading state to true before the fetch
        const response = await fetch('/api/samples/pendingSamples');
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_SAMPLES', payload: json });

          $(function() {
            $('#example').DataTable({
              order: [[0,'desc']],
              "bDestroy": true
            });
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Set loading state to false after the fetch
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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {samples && samples.map((sample ) => (
            <tr key={sample._id}>
              <td>{sample.sampleID}</td>
              <td>{sample.patient?.firstName}</td>
              <td>{sample.test?.testName}</td>
              <td>{sample.test?.specimen}</td>
              <td>
                <button
                  className="card-text btnSubmit"
                  onClick={() => handleCollectClick(sample._id)}
                >
                  Collect
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
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PendingAccession;



