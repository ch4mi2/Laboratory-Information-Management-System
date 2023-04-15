import { useEffect, useState } from "react";
import React, { Component } from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  
import {Chart,ArgumentAxis,Label,Legend,Series} from 'devextreme-react/chart';

class TestCount extends Component {
    // const [isLoaded,setIsLoaded] = useState(false)
    // const [testData1,setData] = useState(null)
    // // const [test,setTest] = useState(null)
    // useEffect(() => {
    //     setData(data.data)

    //     setIsLoaded(true)
    //     // if(testData1.length === 0) {
            
    //     // }
    // },[])
        
    
    //   console.log(test)
    //   test.push({arg:2030,val:7795000000})
    // const testData = data.data
    constructor(props) {
        super(props)
    }

    // componentDidUpdate() {
    //     if( this.props.data.length === 0 ) {
    //         this.forceUpdate()
    //     }
    // }
  
    render() {
        // this.setState(this.props)
        this.state = this.props.data
        console.log(Array.from(this.props.data))
        return(
            <div>
                 { this.props ?
                 <Chart 
                    title="Usage of Tests"
                    dataSource={this.state}
                    id="chart"
                    >
                    
                    <ArgumentAxis tickInterval={10}>
                        <Label format="decimal" />
                    </ArgumentAxis>
        
                    <Series
                        type="bar"
                    />
        
                    <Legend
                    visible={false}
                    />
        
                    </Chart>: <div className="loading">Loading...</div>}

            </div>
        )
    }
} 

export default TestCount 