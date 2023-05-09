import React, { Component } from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';  
import {Chart,ArgumentAxis,Label,Legend,Series} from 'devextreme-react/chart';

class TestCountChart extends Component {
    
  
    render() {
        
        // console.log(this.props.data)
        return(
                 <Chart 
                    title="Usage of Tests"
                    dataSource={this.props.data}
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
        
                    </Chart>
        )
    }
} 

export default TestCountChart 