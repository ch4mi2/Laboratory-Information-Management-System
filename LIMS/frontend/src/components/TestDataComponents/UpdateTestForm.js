import { useState } from "react"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UpdateTestForm = ({Test}) => {
    const [testID, setTestID] = useState(Test.testID)
    const [testName, setTestName] = useState(Test.testName)
    const [outsourced, setOutsourced] = useState(Test.outsourced)
    const [shortName, setShortName] = useState(Test.shortName)
    const [specimen, setSpecimen] = useState(Test.specimen)
    const [price, setPrice] = useState(Test.price)
    const [heading, setHeading] = useState(Test.heading)
    const [remarks, setRemarks] = useState(Test.remarks)

    const [error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal); 

    const handleUpdate = async (e) => {
        e.preventDefault()

        const test = {testID, testName, outsourced, shortName, specimen, price, heading, remarks} 

        const response = await fetch('/api/tests/' + Test._id, {
            method: 'PATCH',
            body: JSON.stringify(test),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            MySwal.fire({
                title: 'Error',
                text: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000,
            })
        }
        if(response.ok) {
            if( response.status === 200 ) {
                MySwal.fire({
                    title: 'Success',
                    text: 'Successfully Updated Test',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                }).then(() => {
                    //var path = '/viewTest/' + Test._id;
                    navigate('/viewTest/' + Test._id);
                })
            }

            
            // dispatch({type: 'CREATE_TEST', payload: json})
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault()
        
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff5252',
            cancelButtonColor: '#eeeeee',
            color:'#000000',
            confirmButtonText: 'Yes, delete it!'
          }).then(async(result) => {
            if (result.isConfirmed) {
                const response = await fetch('/api/tests/' + Test._id, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const json = await response.json()
        
                if(!response.ok) {
                    setError(json.error)
                }
                if(response.ok) {
                    MySwal.fire({
                        title: 'Success',
                        text: 'Successfully Deleted Test',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true
                    }).then(() => {
                        //var path = '/viewTest/' + Test._id;
                        navigate('/testData');
                    })
                }
            }
          })

    }


    return ( 
        <form className = "form" >
            <div className="firstSection">
            <div className="row">
                    <div className="col-6">
                        <label>Test ID: </label>
                        <input 
                            type = "number"
                            onChange={(e) => setTestID(e.target.value)}
                            value={testID}
                            className={emptyFields.includes('testID') ? 'error' : ''}
                            // placeholder={Test.testID}
                        />
                    </div>
                    
                    <div className="col-6">
                    <label>Short Name: </label>
                    <input 
                        type = "text"
                        onChange={(e) => setShortName(e.target.value)}
                        value={shortName}
                        className={emptyFields.includes('shortName') ? 'error' : ''}
                    />
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col-12">
                        <label>Test Name: </label>
                        <input 
                            type = "text"
                            onChange={(e) => setTestName(e.target.value)}
                            value={testName}
                            className={emptyFields.includes('testName') ? 'error' : ''}

                        />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <label>Price: </label>
                        <input 
                        type = "number"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        className={emptyFields.includes('price') ? 'error' : ''}

                        />
                    </div>
                    <div className="col-6">
                        <label>Specimen: </label>
                        <input 
                        type = "text"
                        onChange={(e) => setSpecimen(e.target.value)}
                        value={specimen}
                        className={emptyFields.includes('specimen') ? 'error' : ''}

                        />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        <label>Heading: </label>
                        <input 
                            type = "text"
                            onChange={(e) => setHeading(e.target.value)}
                            value={heading}
                            className={emptyFields.includes('heading') ? 'error' : ''}

                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <label>Remarks: </label>
                        <input 
                            type = "text"
                            onChange={(e) => setRemarks(e.target.value)}
                            value={remarks}
                            // className={emptyFields.includes('remarks') ? 'error' : ''}

                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label>Outsourced: </label>
                        <input 
                            type = "text"
                            onChange={(e) => setOutsourced(e.target.value)}
                            value={outsourced}
                            className={emptyFields.includes('outsourced') ? 'error' : ''}

                        />
                    </div>
                </div>
        </div>
        <div className="row">
        <button className="btnSubmit col-5" onClick={handleUpdate}>Update Test</button>
        <button className="col-4 btnDelete" onClick={handleDelete}>Delete Test</button>
        </div>
        
        </form>
    );
}

export default UpdateTestForm;