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
            customClass: "alerts",
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
                        timer: 1500,
                        timerProgressBar: true
                    }).then(() => {
                        //var path = '/viewTest/' + Test._id;
                        navigate('/testData');
                    })
                }
            }
        })
    }

    const updateForm = async(id) => {
        const response = await fetch('/api/tests/')
        const json = await response.json()

        if( response.ok ) {
            const test = await json.filter((t) => t.testID === Number(id))
            
            // console.log(test[0]);
            
            if( test.length > 0 && Number(id) !== Test.testID) {
                MySwal.fire({
                    icon: 'warning',
                    title: 'Please choose another ID',
                    text: 'Test with the given test ID is alredy available',
                    showConfirmButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    customClass: "alerts"
                })
                setTestID(Test.testID)
            }
        }
    }


    return ( 
        <form>
            <div className="firstSection">
            <div className="row">
                    <div className="col-6">
                        <label>Test ID: </label>
                        <input 
                            type = "number"
                            onChange={(e) => {
                                setTestID(e.target.value)
                                updateForm(e.target.value)
                            }}
                            value={testID}
                            className={emptyFields.includes('testID') ? 'error' : ''}
                            // placeholder={Test.testID}
                        />
                    </div>
                    
                    <div className="col-6">
                    <label>Short Name: </label>
                    <input 
                        type = "text"
                        onChange={(e) => {
                            emptyFields[emptyFields.indexOf('shortName')] = '';
                            setShortName(e.target.value)}}
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
                            onChange={(e) => {
                                emptyFields[emptyFields.indexOf('testName')] = '';
                                setTestName(e.target.value)}}
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
                        onChange={(e) => {
                            emptyFields[emptyFields.indexOf('price')] = '';
                            setPrice(e.target.value)}}
                        value={price}
                        className={emptyFields.includes('price') ? 'error' : ''}

                        />
                    </div>
                    <div className="col-6">
                        <label>Specimen: </label>
                        <input 
                        type = "text"
                        onChange={(e) => {
                            emptyFields[emptyFields.indexOf('specimen')] = '';
                            setSpecimen(e.target.value)}}
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
                            onChange={(e) => {
                                emptyFields[emptyFields.indexOf('heading')] = '';
                                setHeading(e.target.value)}}
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
                        <select
                            type = "text"
                            onChange={(e) => {
                                emptyFields[emptyFields.indexOf('outsourced')] = '';
                                setOutsourced(e.target.value)}}
                            value={outsourced}
                            className={emptyFields.includes('outsourced') ? 'error' : ''}
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </div>
        </div>
        <div className="row">
        <button className="col-5 submit btnConfirm" onClick={handleUpdate}>Update Test</button>
        <button className="col-4 delete btnCancel" onClick={handleDelete}>Delete Test</button>
        </div>
        
        </form>
    );
}

export default UpdateTestForm;