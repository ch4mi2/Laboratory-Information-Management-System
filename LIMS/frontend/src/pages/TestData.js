import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTestDataContext } from "../hooks/useTestDataContext";
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import $ from 'jquery';
// import '../css/TestDataStyles/testData.css';


const TestData = () => {

    // const [Tests,setTests] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const { Tests, dispatch } = useTestDataContext()

    useEffect(() => {
        const fetchTests = async() => {
            const response = await fetch('/api/tests');
            const json = await response.json();

            if( response.ok ) {
                // setTests(json);
                dispatch({type:'SET_TESTS', payload: json})
                $(function () {
                    $('#test-list').DataTable();
                });
                setIsLoaded(true);
            }
        }
             
        fetchTests();
    }, []);

    // useEffect(() => {
    //     $(function () {
    //       $('#example').DataTable({
    //         order: [[4, 'desc']],
    //         bDestroy: true,
    //       });
    //     });
    // }, []);

    const handleClick = (id) => {
        navigate(`/viewTest/${id}`, {state:{id}})
    }

    const clickDelete = (id) => {
        Swal.fire({
            title: 'Delete this test and related subcategories?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            customClass: "alerts",
          }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await fetch('/api/tests/' + id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
        
                if(!response.ok) {
                    Swal.fire({
                        title: 'Error',
                        text: json.error,
                        icon: 'error',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
                if(response.ok) {
                    dispatch({type: 'DELETE_TEST', payload: json})
                    const table = $('#test-list').DataTable();
                    const row = table.rows(`[data-id ="${id}"]`);
                    row.remove().draw();
                    
                    Swal.fire({
                        title: 'Success',
                        text: 'Successfully Deleted Test',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true
                    })
                }
            }
          })
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
                        <tr key={test._id} /*onClick={() => handleClick(test._id)}*/>
                            <td onClick={() => handleClick(test._id)}>{test.testID}</td>
                            <td onClick={() => handleClick(test._id)}>{test.testName}</td>
                            <td onClick={() => handleClick(test._id)}>{test.shortName}</td>
                            <td onClick={() => handleClick(test._id)}>{test.outsourced}</td>
                            <td onClick={() => handleClick(test._id)}>{test.price}</td>
                            <td>
                            <button
                                className="btnDelete"
                              onClick={() => clickDelete(test._id)}
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

 
export default TestData;