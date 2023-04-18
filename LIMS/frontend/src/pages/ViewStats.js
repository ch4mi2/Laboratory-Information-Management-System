import { useState,useEffect } from "react";
import TestCountChart from "../components/TestDataComponents/TestCountChart";
import '../css/TestDataStyles/testData.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import Swal from 'sweetalert2';


const ViewStats = () => {
    const [data,setData] = useState(null)    
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(() => {
        if(!isLoaded) {
            Swal.fire({
                title: 'Fetching Test',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 2500 ,
            })
            Swal.showLoading();
        }
            
        const fetchTest = async() => {
            const response = await fetch('/api/tests/');
            const json = await response.json();

            if( response.ok ) {
                const tests = await json;
                setTestCount(tests);
                // tests = await json
                // console.log(tests);
            } else {
                console.log("Error");
            }
            
        }

        
        fetchTest()
        // setTestCount()
        // console.log(localStorage.getItem('data'));
    }, [])
    // const data = localStorage.getItem("data")
    const setTestCount = async(tests) => {
        
        var testCount = []
        
        if( tests !== null && testCount.length <= 0) {
            tests.map(async(test) => {
                // console.log(test._id);
                var count = await(await fetch('/api/tests/count/' + test._id)).json()
                testCount.push({ arg: test.testName, val: count })
            })
            

            // localStorage.setItem('data', JSON.stringify(testCount))
            setTimeout(() => {
                testCount = testCount.sort((t1, t2) => (t1.val < t2.val) ? 1 : (t1.val > t2.val) ? -1 : 0)
                // console.log(testCount)
                setData(testCount) 
            },2000)
            // setData(testCount)
            setIsLoaded(true)
        } 
    }

    // const handleClick = () => {
    //     setTimeout(() => {
    //         setData([data[0]]) 

    //     },1000)
    // }


    // console.log(data)
        // console.log(data);
        return(
            <div>
                {/* <button onClick={() => handleClick()}>Test</button> */}
                {/* <h4>Heading</h4> */}

                {isLoaded ?
                
                <div id="stat" className="dx-swatch-dark">
                    {/* {console.log(data)} */}
                    {data && <TestCountChart data = {data} />}
                </div>:<div></div>}

            </div>
        )
    } 


export default ViewStats;