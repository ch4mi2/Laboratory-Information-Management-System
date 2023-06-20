import { useState,useEffect } from "react";
import TestCountChart from "../components/TestDataComponents/TestCountChart";
import '../css/TestDataStyles/testData.css';
import 'devextreme/dist/css/dx.light.css';
import React from 'react';
import Swal from 'sweetalert2';


const ViewStats = () => {
    const [data,setData] = useState(null)
    const [tests, setTests] = useState(null)
    const [maxTest, setMaxTest] = useState(null)
    const [minTest, setMinTest] = useState(null)
    const [month, setMonth] = useState("0")
    const [isLoaded,setIsLoaded] = useState(false)

    useEffect(() => {
        if(!isLoaded) {
            Swal.fire({
                title: 'Fetching Stats',
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timer: 3000 ,
            })
            Swal.showLoading();
        }
            
        const fetchTest = async() => {
            const response = await fetch('/api/tests/');
            const json = await response.json();

            if( response.ok ) {
                const tests = await json;
                setTests(tests)
                setTestCount(tests)
                
            } else {
                console.log("Error");
            }
            
        }

        
        fetchTest()
        // eslint-disable-next-line
    }, [])

    const setTestCount = async(tests) => {
        
        var testCount = []
        var countArr = []
        
        if( tests !== null && testCount.length <= 0) {
            tests.map(async(test) => {
                var count = await(await fetch('/api/tests/count/' + test._id + " " + month)).json()
                countArr.push(count)
                testCount.push({ arg: test.testName, val: count })
            })
            
            setTimeout(() => {
                if( Math.max(...countArr) !== Math.min(...countArr) ) {
                    setMaxTest(testCount[countArr.indexOf(Math.max(...countArr))].arg)
                    setMinTest(testCount[countArr.indexOf(Math.min(...countArr))].arg) 
                } else {
                    setMaxTest(null)
                    setMinTest(null)
                }
                testCount = testCount.sort((t1, t2) => (t1.val < t2.val) ? 1 : (t1.val > t2.val) ? -1 : 0)
                setData(testCount) 
                setIsLoaded(true)
            },3000)
        } 
    }

    const getMonthData = async(month) => {
        Swal.fire({
            title: 'Fetching Stats',
            showConfirmButton: false,
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 3000 ,
        })
        Swal.showLoading();

        var testCount = []
        var countArr = []

        tests.map(async(test) => {
            // console.log(test._id);
            var count = await(await fetch('/api/tests/count/' + test._id + " "+ month)).json()
            countArr.push(count)
            testCount.push({ arg: test.testName, val: count })
        })

        

        setTimeout(() => {
            if( Math.max(...countArr) !== Math.min(...countArr) ) {
                setMaxTest(testCount[countArr.indexOf(Math.max(...countArr))].arg)
                setMinTest(testCount[countArr.indexOf(Math.min(...countArr))].arg) 
            } else {
                setMaxTest(null)
                setMinTest(null)
            }
            testCount = testCount.sort((t1, t2) => (t1.val < t2.val) ? 1 : (t1.val > t2.val) ? -1 : 0)
            setData(testCount)
        },3000)

        
    }


        return(
            <div>
                {isLoaded ?
                <div id="stat" className="dx-swatch-dark">
                    {data && <TestCountChart data = {data} />}
                </div>:
                <div>Loading</div>
            }
            <div>
            <select 
                type = "text"
                onChange={(e) => {
                    setMonth(e.target.value)
                    getMonthData(e.target.value)}}
                value={month}
            >
                <option value="0">All time</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
            </div>
            <center>
            <div className="maxMin">
                {maxTest && <div><strong>The most used test:</strong> {maxTest}</div>}
                {minTest && <div><strong>The least used test:</strong> {minTest}</div>}
                { !maxTest && !minTest && <div><strong>No tests used in this month</strong></div>}
            </div>
            </center>
            </div>
        )
    } 


export default ViewStats;