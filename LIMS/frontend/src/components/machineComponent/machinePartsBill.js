import { useNavigate } from 'react-router-dom';
import React ,  { useRef } from 'react';
import logo from '../../assets/common/mediLineLogo.webp';
import moment from "moment";
import ReactToPrint from "react-to-print";

const MachinePartsReport =({machinePartsDet}) =>{
    const componentRef = useRef();
    const navigate = useNavigate();

    const clickCancel = () => {
        navigate('/machineHistory/' + machinePartsDet.machineId)
      };

    console.log(machinePartsDet)
    return (
        <div>
            <div className="report" ref ={componentRef}> 
                <div className="reportHeader">
                    <div className="reportLogo">
                        <img src={logo} alt="logo" />
                    </div> 
                    <div className="reportContact">
                        <p className="info">Address : No. H/96 Borella Road, Athurugiriya</p>
                        <p className="info">Tel: 0113631063 Hotline: 0711188514 | 0714744901</p>
                        <p className="info">Email: medilinelaboratoryservice@gmail.com</p>
                    </div>
                </div>
                <div className="reporthr">
                    <hr />
                </div>
                <div className="reportHeading">
                    <h2>MACHINE MAINTENANCE REPORT - MACHINE PARTS REPLACEMENT </h2>
                </div>
                <div className="reportBody">
                    <div style={{fontSize:"20px"}}>
                    <div style={{display:"left" , gap: '10px'}}>
                        <p className="info"><b>Date               :</b> {moment().format('DD-MM-YYYY') ?? "Record not found"}</p>
                        <p className="info"><b>Technician's Name  : </b>{machinePartsDet.TechnicianName}</p>   
                        <p className="info"><b>Technician's Telno :</b> {machinePartsDet.TechTelno}</p> 
                    </div>
                    <hr />
                    <div style={{display:"left" , gap: '10px'}}>
                        <p className="info"><b>Maintenance Date :</b> {machinePartsDet.MaintenanceDate}</p>   
                        <p className="info"><b>Issue:</b> {machinePartsDet.Issue}</p> 
                        <p className="info"><b>Machine Part :</b> {machinePartsDet.MachinePart}</p>
                    </div>  
                    <hr/>
                    <p style={{fontSize:"22px" , textAlign:"right"}} className="info">Technician's Payment           :<u> Rs.{machinePartsDet.TechnicianPayment}</u></p> 
                    </div>
                    <hr></hr>
                </div>
            </div>
            <div className="row my-3">
            <div className="col-12 d-flex justify-content-center">
                <ReactToPrint
                    trigger={() => <button className="btnSubmit">Print</button>}
                    content={() => componentRef.current}
                />
                <button style={{margin:'0px 50px'}} className="btnDelete" onClick={clickCancel}>Cancel</button>
            </div>
            </div>
        </div>
    );

};

export default MachinePartsReport