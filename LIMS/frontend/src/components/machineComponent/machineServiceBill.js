import { useNavigate } from 'react-router-dom';
import React ,  { useRef , useEffect , useState } from 'react';
import logo from '../../assets/common/mediLineLogo.webp';
import moment from "moment";
import ReactToPrint from "react-to-print";

const ServiceReport =({serviceDet}) =>{
    const componentRef = useRef();
    const navigate = useNavigate();
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

    const clickCancel = () => {
        navigate('/machineHistory/' + serviceDet.machineId)
      };

    return (
        <div>
            <div className="report" ref ={componentRef}> 
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
                    <h2>MACHINE MAINTENANCE REPORT</h2>
                </div>
                <div className="reportHeading">
                    <h2>SERVICE MACHINE</h2>
                </div>
                <div className="reportBody">
                    <div style={{fontSize:"20px"}}>
                    <div style={{dispaly: "flex" , gap: '10px'}}>
                        <p className="info"><b>Date               :</b> {moment().format('DD-MM-YYYY') ?? "Record not found"}</p>
                        <p className="info"><b>Technician's Name  :</b> {serviceDet.TechnicianName}</p>   
                        <p className="info"><b>Technician's Telno : </b>{serviceDet.TechTelno}</p> 
                    </div>
                    <hr />
                    <div style={{display:"flex" , gap: '10px'}}>
                        <p className="info"><b>Machine           :</b> {serviceDet.machineName}</p> 
                    </div>  
                    <div style={{display:"flex", gap:'10px'}}>
                        <div style={{margin:"0px 200px 0px 0px"}}>
                            <p className="info"><b>Last Service Date : </b> {serviceDet.LastserviceDate}</p>  
                        </div>     
                        <p className="info"><b>Next Service Date : </b>{serviceDet.NextServiceDate}</p> 
                    </div>
                    <hr/>
                    <p style={{fontSize:"22px" , textAlign:"right"}} className="info">Payment           :<u> Rs.{serviceDet.TechnicianPayment}</u></p> 
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

export default ServiceReport