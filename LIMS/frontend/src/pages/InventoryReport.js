import React, { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom"
import ReactToPrint from 'react-to-print';
import logo from '../assets/common/mediLineLogo.webp';
import '../css/TestResultStyles/testResultPreview.css'
import moment from 'moment';

const InventoryReport = () => {
  const componentRef = useRef();
  const { id } = useParams();
  const [inventory, setInventory] = useState()
  const [labInfo, setLabInfo] = useState()

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await fetch(`/api/inventoryRoutes`);
        const json = await response.json();

        if (response.ok) {
          setInventory(json)
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
            <p className="info">Address : {labInfo?.address ?? "Record not found"}</p>
            <p className="info">Tel: {labInfo?.tel1 ?? "Record not found"} | {labInfo?.tel2 ?? "Record not found"} | {labInfo?.tel3 ?? "Record not found"}</p>
            <p className="info">Email: {labInfo?.email ?? "Record not found"}</p>
          </div>
        </div>
        <div className="reporthr">
          <hr />
        </div>
        <div className="reportHeading">
          <h2>Inventory Report</h2>
        </div>
        <div className="reportBody">
          <hr />
          <div>
          <table className="table table-borderless">
          <thead>
              <tr>
                <th>Date</th>
                <th>Inventory Type</th>
                <th>Name</th>
                <th>Expire Date</th>
                <th>Quantity</th>
                
              </tr>
            </thead>
            <tbody>
              {inventory &&
                inventory.map((item) => (
                  <tr key={item._id} data-id={item._id}>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.inveType}</td>
                    <td>{item.proName}</td>
                    <td>{moment(item.exDate).format('DD-MM-YYYY')}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
            </tbody>
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

export default InventoryReport;
