import React, { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom"
import ReactToPrint from 'react-to-print';
import logo from '../assets/common/mediLineLogo.webp';
import '../css/TestResultStyles/testResultPreview.css'

const TestResultPreview = () => {
  const componentRef = useRef();
  const { id } = useParams();
  const [testResult, setTestResult] = useState()
  const [labInfo, setLabInfo] = useState()

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(`/api/testResult/${id}`);
        const json = await response.json();

        if (response.ok) {
          setTestResult(json)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestResult();
  }, []);

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
            <p className="info">Address : {labInfo?.address ?? 'null'}</p>
            <p className="info">Tel: {labInfo?.tel1 ?? 'null'} | {labInfo?.tel2 ?? 'null'} | {labInfo?.tel3 ?? 'null'}</p>
            <p className="info">Email: {labInfo?.email ?? 'null'}</p>
          </div>
        </div>
        <div className="reporthr">
          <hr />
        </div>
        <div className="reportHeading">
          <h2>CONFIDENTIAL LABORATORY REPORT</h2>
        </div>
        <div className="reportBody">
          <div>
            {testResult && (
            <div>
              
              <div style={{display:"flex" , gap: '10px'}}>
                
                  <p className="info">Patient Name : {testResult.patient?.firstName ?? "deleted"}</p>
                  <p className="info">{testResult.patient?.lastName ?? "deleted"}</p>   
                
              </div>
              <div >
                  <p className="info">Sex : {testResult.patient?.gender ?? "deleted"}</p>
                  <p className="info">Age : {testResult.patient?.age?? "deleted"}</p>
                  <p className="info">Referred By : {testResult.patient?.age?? "deleted"}</p>
                  <p className="info">Date : </p>
                  </div>
                  <hr />
                  <div style={{display:"flex" , gap: '10px'}}>
                  <h6 className="info">{testResult.test?.testName ?? "deleted"}</h6>
                  <h6 className="info">Sample Id : {testResult.sample?.sampleID ?? "deleted"}</h6>
                  </div>
            </div>
            )}
          </div>
          <hr />
          <div>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Value</th>
                <th scope="col">Unit</th>
                <th scope="col">Reference Range</th>
              </tr> 
            </thead>
            <tbody>
          {testResult && testResult.result.map((resultObj, index) => (
            <tr key={index}>
              <td>{resultObj.category?.category ?? "deleted"}</td>
              <td>{resultObj.value ?? "deleted"}</td>
              <td>{resultObj.category?.UOM ?? "deleted"}</td>
              {testResult.patient?.gender  === 'Male' && <td>{resultObj.category?.startMRef ?? "deleted"}{resultObj.category?.operatorM ?? "deleted"}{resultObj.category?.endMRef ?? "deleted"}</td>}
              {testResult.patient?.gender === 'Female' && <td>{resultObj.category?.startFRef ?? "deleted"}{resultObj.category?.operatorF ?? "deleted"}{resultObj.category?.endFRef ?? "deleted"}</td>}
            </tr>
          ))}
            </tbody>
          </table>
          </div>
          <div>
            <p>.................</p>
            <p>Signature</p>
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

export default TestResultPreview;
