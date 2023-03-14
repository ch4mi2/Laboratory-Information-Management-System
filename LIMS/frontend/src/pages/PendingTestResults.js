import { useState, useEffect } from 'react';

const PendingTestResults = () => {
  const [testResults, setTestResults] = useState(null);

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

  return (
    <div className="">
      <div className="testResults">
        <h1>hello</h1>
        {testResults &&
          testResults.map((testResult) => (
            <p key={testResult._id}>{testResult.patient?.firstName}</p>
          ))}
      </div>
    </div>
  );
};

export default PendingTestResults;
