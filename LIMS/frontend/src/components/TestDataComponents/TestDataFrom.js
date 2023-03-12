import { useState } from "react"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const TestDataForm = () => {

    const [testID, setTestID] = useState('')
    const [testName, setTestName] = useState('')
    const [outsourced, setOutsourced] = useState('')
    const [shortName, setShortName] = useState('')
    const [specimen, setSpecimen] = useState('')
    const [price, setPrice] = useState('')
    const [heading, setHeading] = useState('')
    const [remarks, setRemarks] = useState('')
    const [categoryHeading, setCategoryHeading] = useState('')
    const [category, setCategory] = useState('')
    const [UOM, setUOM] = useState('')
    const [startMRef, setStartMRef] = useState('')
    const [operatorM, setOperatorM] = useState('')
    const [endMRef, setEndMRef] = useState('')
    const [startFRef, setStartFRef] = useState('')
    const [operatorF, setOperatorF] = useState('')
    const [endFRef, setEndFRef] = useState('')
    const [startBRef, setStartBRef] = useState('')
    const [operatorB, setOperatorB] = useState('')
    const [endBRef, setEndBRef] = useState('')

    const [error, setError] = useState(null)
    const[emptyFields, setEmptyFields] = useState([])
    const MySwal = withReactContent(Swal); 

    const handleSubmit = async (e) => {
        e.preventDefault()

        const test = {testID, testName, outsourced, shortName, specimen, price, heading, remarks, 
            categoryHeading, category, UOM, startMRef, operatorM, endMRef, startFRef, operatorF, endFRef, startBRef, operatorB, endBRef}

        const response = await fetch('/api/tests', {
            method: 'POST',
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
            setCategoryHeading('')
            setCategory('')
            setUOM('')
            setStartMRef('')
            setOperatorM('')
            setEndMRef('')
            setStartFRef('')
            setOperatorF('')
            setEndFRef('')
            setStartBRef('')
            setOperatorB('')
            setEndBRef('')
            setError(null)
            setEmptyFields([])
            if( response.status === 200 ) {
                MySwal.fire({
                    title: 'Success',
                    text: 'Successfully Added Test',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
            if( response.status === 201 ) {
                MySwal.fire({
                    title: 'Success',
                    text: 'Successfully Added Test Subcategory',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2000,
                })
            }
            
            // dispatch({type: 'CREATE_TEST', payload: json})
        }
    }


    return (
        <form className = "form" onSubmit={handleSubmit}>
            <h3>Add a New Test</h3>

            <fieldset className="firstSection">
                {/* <legend>Test Data</legend> */}
                <div className="row">
                    <div className="col-6">
                        <label>Test ID: </label>
                        <input 
                            type = "number"
                            onChange={(e) => setTestID(e.target.value)}
                            value={testID}
                            className={emptyFields.includes('testID') ? 'error' : ''}
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
            </fieldset>

            <div className="secondSection">
                <div className="row">
                    <div className="col-12">
                        <label>Category: </label>
                        <input 
                            type = "text"
                            onChange={(e) => setCategory(e.target.value)}
                            value={category}
                            className={emptyFields.includes('category') ? 'error' : ''}
                        />
                    </div>
                </div>
            
                <div className="row">
                    <div className="col-12">
                        <label>Category Heading:</label>
                        <input 
                            type = "text"
                            onChange={(e) => setCategoryHeading(e.target.value)}
                            value={categoryHeading}
                            // className={emptyFields.includes('categoryHeading') ? 'error' : ''}

                        />
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-4">
                        <label>UOM: </label>
                        <input 
                            type = "text"
                            onChange={(e) => setUOM(e.target.value)}
                            value={UOM}
                            className={emptyFields.includes('UOM') ? 'error' : ''}

                        />
                    </div>
                </div>

                <div className="row">
                <label>Male Ref Range: </label>
                    <div className="col-4">
                        {/* <label>Starting Range: </label> */}
                        <input 
                                type = "number"
                                onChange={(e) => setStartMRef(e.target.value)}
                                value={startMRef}
                                className={emptyFields.includes('startMRef') ? 'error' : ''}
                        />
                    </div>
                    <div className="col-2">
                        {/* <label>Operator: </label> */}
                        <input 
                            type = "text"
                            onChange={(e) => setOperatorM(e.target.value)}
                            value={operatorM}
                            className={emptyFields.includes('operatorM') ? 'error' : ''}
                            
                        />
                    </div>
                    <div className="col-4">
                        {/* <label>Ending Range:</label> */}
                        <input 
                            type = "number"
                            onChange={(e) => setEndMRef(e.target.value)}
                            value={endMRef}
                            className={emptyFields.includes('endMRef') ? 'error' : ''}
                            
                        />
                    </div>
                </div>

                <div className="row">
                <label>Female Ref Range: </label>
                    <div className="col-4">
                        {/* <label>Starting Range: </label> */}
                        <input 
                            type = "number"
                            onChange={(e) => setStartFRef(e.target.value)}
                            value={startFRef}
                            className={emptyFields.includes('startFRef') ? 'error' : ''}
                        />
                    </div>
                    <div className="col-2">
                        {/* <label>Operator: </label> */}
                        <input 
                            type = "text"
                            onChange={(e) => setOperatorF(e.target.value)}
                            value={operatorF}
                            className={emptyFields.includes('operatorF') ? 'error' : ''}
                        />
                    </div>
                    <div className="col-4">
                        {/* <label>Ending Range:</label> */}
                        <input 
                            type = "number"
                            onChange={(e) => setEndFRef(e.target.value)}
                            value={endFRef}
                            className={emptyFields.includes('endFRef') ? 'error' : ''}
                        />
                    </div>
                </div>
                
                <div className="row">
                    <label>Baby Ref Range: </label>                    
                    <div className="col-4">
                        <input 
                            type = "number"
                            onChange={(e) => setStartBRef(e.target.value)}
                            value={startBRef}
                            className={emptyFields.includes('startBRef') ? 'error' : ''}
                            
                        />
                    </div>
                    <div className="col-2">
                        {/* <label>Operator: </label> */}
                        <input 
                            type = "text"
                            onChange={(e) => setOperatorB(e.target.value)}
                            value={operatorB}
                            className={emptyFields.includes('operatorB') ? 'error' : ''}
                            
                        />
                    </div>
                    <div className="col-4">
                        {/* <label>Ending Range:</label> */}
                        <input 
                            type = "number"
                            onChange={(e) => setEndBRef(e.target.value)}
                            value={endBRef}
                            className={emptyFields.includes('endBRef') ? 'error' : ''}
                    
                        />
                    </div>
                </div>
            </div>

            <button>Add Test</button>
        </form>
    )
}
 
export default TestDataForm;