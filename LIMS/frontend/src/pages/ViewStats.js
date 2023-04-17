import { useState,useEffect } from "react";
import TestCountChart from "../components/TestDataComponents/TestCountChart";
import React from 'react';
// import Chart, {
//     ArgumentAxis,
//     Label,
//     Legend,
//     Series,
//   } from 'devextreme-react/chart';


const ViewStats = () => {
    const [data,setData] = useState(null)    
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(() => {

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
                console.log(testCount)
                setData(testCount) 
            },1000)
            // setData(testCount)
            setIsLoaded(true)
        } 
    }

    const handleClick = () => {
        setTimeout(() => {
            setData([data[0]]) 

        },1000)
    }

    // console.log(data)
    if(data !== null) {
        // console.log(data);
        return(
            <div>
                <button onClick={() => handleClick()}>Test</button>
                {/* <h4>Heading</h4> */}

                {isLoaded ?
                
                <div id="stat">
                    {console.log(data)}
                    <TestCountChart data = {data} />
                </div>:<div>Loading</div>}

            </div>
        )
    } 
    
}

// }

   
// class Stat extends React.Component {
//     render() {
//         return(
//             <div>
//                 {true ?
//                 (<Chart
//                 title="Usage of Tests"
//                 dataSource={testCount}
//                 id="chart"
//                 >
                
//                 <ArgumentAxis tickInterval={10}>
//                     <Label format="decimal" />
//                 </ArgumentAxis>
    
//                 <Series
//                     type="bar"
//                 />
    
//                 <Legend
//                 visible={false}
//                 />
    
//                 </Chart>)
//                     : <div className="loading">Loading...</div>}  
//             </div>
//         )
//     }
// }



export default ViewStats;