import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import TestDataDetails from "../components/TestDataComponents/TestDataDetails";
import '../css/TestDataStyles/testData.css';


const TestData = () => {

    const [Tests,setTests] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchTests = async() => {
            const response = await fetch('/api/tests');
            const json = await response.json();

            if( response.ok ) {
                setTests(json);
                setIsLoaded(true);
            }
        }
             
        fetchTests();
    }, []);

    return (
        <div className="testPage">
            <div className="tests">
                { isLoaded ? Tests.map((Test) => (
                    <Link to={`/viewTest/${Test._id}`} key={Test._id}>
                        <TestDataDetails key={Test._id} Test = {Test} />
                    </Link>
                    
                )) : 
                <div className="loading">Loading...</div>}
            </div>
        </div>
    );
}
 
export default TestData;