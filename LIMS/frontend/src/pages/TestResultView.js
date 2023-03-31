import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";

const TestResultView = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const [testResult, setTestResult] = useState(null)
  const [updatedResult, setUpdatedResult] = useState([])

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(`/api/testResult/${id}`);
        const json = await response.json();

        if (response.ok) {
          setTestResult(json)
          setUpdatedResult(json.result)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestResult();
  }, [id]);

  const handleClickSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/testResult/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          result: updatedResult
        })
      });
      if (response.ok) {
        navigate('/pendingTests')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {testResult && (
        <div>
          <h4>{testResult.test?.testName ?? "deleted"}</h4>
          <div style={{display:"flex" , gap: '10px'}}>
          <p>{testResult.patient?.firstName ?? "deleted"}</p>
          <p>{testResult.patient?.lastName ?? "deleted"}</p>
          </div>
      </div>
      
    )}
    <form onSubmit={handleClickSubmit}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Value</th>
            <th scope="col">Unit</th>
            <th scope="col">Reference Range</th>
          </tr>
        </thead>
        <tbody>
          {testResult && testResult.result.map((resultObj, index) => (
            <tr scope="row" key={index}>
                <td>{resultObj.category.category}</td>
                <td><input type="text" onChange={(e) => {
                    const updatedResults = [...testResult.result];
                    updatedResults[index].value = e.target.value;
                    setTestResult({ ...testResult, result: updatedResults });
                    }} value={resultObj.value || ''} /></td>
                <td>{resultObj.category.UOM}</td>
                <td>{resultObj.category.startMRef}{resultObj.category.operatorM}{resultObj.category.endMRef}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="submit">Save</button>
      <button type="submit">Sumbit</button>
    </form>
    </div>
  )
}

export default TestResultView;
