import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';
// import TestDataDetails from "../components/TestDataComponents/TestDataDetails";
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
// import '../css/TestDataStyles/testData.css';


const TestData = () => {

    const [Tests,setTests] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTests = async() => {
            const response = await fetch('/api/tests');
            const json = await response.json();

            if( response.ok ) {
                setTests(json);
                $(function () {
                    $('#test-list').DataTable();
                });
                setIsLoaded(true);
            }
        }
             
        fetchTests();
    }, []);

    useEffect(() => {
        $(function () {
          $('#example').DataTable({
            order: [[4, 'desc']],
            bDestroy: true,
          });
        });
      }, []);

    const handleClick = (id) => {
        navigate(`/viewTest/${id}`, {state:{id}})
    }

    return (
        <div>
            { isLoaded ? (
                <div className="container">
                <div>
                    <h4>Tests</h4>
                </div>
        
                <table id="test-list" className="table" style={{ width: '100%' }}>
                    <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Test Name</th>
                        <th>Short Name</th>
                        <th>OutSourced</th>
                        <th>Price Rs</th>
                        <th>Delete Test</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Tests &&
                        Tests.map((test) => (
                        <tr key={test._id} onClick={() => handleClick(test._id)}>
                            <td>{test.testID}</td>
                            <td>{test.testName}</td>
                            <td>{test.shortName}</td>
                            <td>{test.outsourced}</td>
                            <td>{test.price}</td>
                            <td>
                            <button
                                className="btnDelete"
                            //   onClick={() => clickDelete(bill._id, bill.patientId)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                </div>
            ) : 
            <div className="loading">Loading...</div>}  
        </div>
    );
}

{/* <Link to={`/viewTest/${Test._id}`} key={Test._id}>
                        <TestDataDetails key={Test._id} Test = {Test} />
                    </Link> */}
 
export default TestData;