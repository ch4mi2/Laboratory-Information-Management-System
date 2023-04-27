import React, { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom"
import ReactToPrint from 'react-to-print';
import logo from '../assets/common/mediLineLogo.webp';
import '../css/TestResultStyles/testResultPreview.css'

const FinancialReport = () => {
  const componentRef = useRef();
  const [labInfo, setLabInfo] = useState()

  

  useEffect(() => {
    const fetchLabInfo = async () => {
        try {
            const response = await fetch('/api/labInfo')
            const json = await response.json()
            if(response.ok){
                setLabInfo(json);
                console.log(labInfo)
            } 
        } catch (error) {
            console.log(error)
        }
    }
    fetchLabInfo();  
},[])

  return (
    <div>
      <div className="report" ref={componentRef}>
        <div className="reportHeader">
          <div className="reportLogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="reportContact">
            <p class="info">Address : {labInfo?.address ?? 'null'}</p>
            <p class="info">Tel: {labInfo?.tel1 ?? 'null'} | {labInfo?.tel2 ?? 'null'} | {labInfo?.tel3 ?? 'null'}</p>
            <p class="info">Email: {labInfo?.email ?? 'null'}</p>
          </div>
        </div>
        <div className="reporthr">
          <hr />
        </div>
        <div className="reportHeading">
          <h2>Financial Report</h2>
        </div>
        <div className="reportBody">
         
        <div>
        <table class="table ">
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Income</th>
                <th scope="col">Expenses</th>
                
              </tr>
             
            </thead>
           
           <tbody>
            <tr>
                <td>sales</td>
                <td>2000</td>
                <td>-</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
            </tr>

           </tbody>

          

           <tbody>
               <tr>
                <td>inventry</td>
                <td>-</td>
                <td>500</td>
                </tr> 

                <tr>
                <td>machine</td>
                <td>-</td>
                <td>500</td>
                </tr>

                <tr>
                <td></td>
                <td></td>
                <td></td>
                </tr>

           </tbody>

           <thead>
              <tr>
                <th>Total</th>
                <th>2000</th>
                <th>1000</th>
              </tr>
           </thead>




            </table>



        </div>
        </div>    
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-center">
          <ReactToPrint
            trigger={() => <button className="btnSubmit">Print</button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialReport;
