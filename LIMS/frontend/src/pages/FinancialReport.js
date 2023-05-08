import React, { useEffect, useRef, useState} from 'react';
import { useParams } from "react-router-dom"
import ReactToPrint from 'react-to-print';
import logo from '../assets/common/mediLineLogo.webp';
import '../css/TestResultStyles/testResultPreview.css'

const FinancialReport = () => {
  const componentRef = useRef();
  const [labInfo, setLabInfo] = useState()
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [billTotal, setBillTotal] = useState(0)
  const [machineTotal, setMachineTotal] = useState(0)
  const [machineMTotal, setMachineM] = useState(0)
  const [machineServiceTotal, setMachineService] = useState(0)
  const [expenses, setExpenses] = useState([])
  const [totalotherExpense, setTotalotherExpense] = useState(0)
  const [isFetched, setIsFetched] = useState()

  

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




const handleGenerateReport = async (e) => {
  e.preventDefault();
  
  try {
    setIsFetched(false)
    // Use Promise.all to wait for all fetches to complete
    const responses = await Promise.all([
      fetchBills(),
      fetchMachines(),
      fetchMachineMaintenance(),
      fetchMachineService(),
      fetchExpenses()
    ])
    
    setIsFetched(true)

  } catch (error) {
    console.log(error);
  }
};



const fetchExpenses = async () => {
   //expenses
   const response = await fetch('/api/expenses/');
   const json= await response.json();
   if (response.ok) {
     const filteredExpenses = json.filter(
       (expenses) =>
         new Date(expenses.createdAt) >= new Date(startDate) &&
         new Date(expenses.createdAt) <= new Date(endDate)
     );
     const total = filteredExpenses.reduce(
       (acc, curr) => acc + parseFloat(curr.amount),
       0
     );
     
     setTotalotherExpense(total)
     console.log(total);
     setExpenses(filteredExpenses)
     }
}

const fetchBills = async () => {
   //total bills
   const response = await fetch('/api/bills/');
   const json= await response.json();
   if (response.ok) {
     const filteredBills = json.filter(
       (bill) =>
         new Date(bill.createdAt) >= new Date(startDate) &&
         new Date(bill.createdAt) <= new Date(endDate)
     );
     const total = filteredBills.reduce(
       (acc, curr) => acc + parseFloat(curr.total),
       0
     );
     console.log(total);
     setBillTotal(total)
     }  
}

const fetchMachines = async () => {
   //total machines
   const response = await fetch('/api/machines/');
   const json = await response.json();
   if (response.ok) {
     const filteredMachines = json.filter(
       (machines) =>
         new Date(machines.createdAt) >= new Date(startDate) &&
         new Date(machines.createdAt) <= new Date(endDate)
     );
     const total = filteredMachines.reduce(
       (acc, curr) => acc + parseFloat(curr.Price),
       0
     );
     console.log(total);
     setMachineTotal(total)
   }
}

const fetchMachineMaintenance = async () => {
    //total machine maintainence
    const response = await fetch('/api/machineParts/');
    const json = await response.json();
    if (response.ok) {
      const filteredMaintenances = json.filter(
        (maintenances) =>
          new Date(maintenances.createdAt) >= new Date(startDate) &&
          new Date(maintenances.createdAt) <= new Date(endDate)
        );
      const total = filteredMaintenances.reduce(
       (acc, curr) => acc + parseFloat(curr.PriceOfMachinePart + curr.TechnicianPayment),
       0
        );
      console.log(total);
      setMachineM(total)
      }
}

const fetchMachineService = async () => {
    //total machine service
    const response = await fetch('/api/serviceMachines/');
    const json = await response.json();
    if (response.ok) {
      const filteredService = json.filter(
        (servicemachines) =>
          new Date(servicemachines.createdAt) >= new Date(startDate) &&
          new Date(servicemachines.createdAt) <= new Date(endDate)
      );
      const total = filteredService.reduce(
        (acc, curr) => acc + parseFloat(curr.TechnicianPayment),
        0
      );
      console.log(total);
      setMachineService(total)
    }
}


  




  return (
    <div>
      <div><center>
        <form  onSubmit={handleGenerateReport}>
          <h2>Select the time period</h2>
          <br/>
          <label>Start Date:</label>
          <input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
            style={{width:"50%"}}
          />
          <br/>

          <label>End Date:</label>
          <input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
            style={{width:"50%"}}
          />
          <br/>
          <button type='submit' className='btnConfirm'>Generate Report</button>    
        </form>
        </center>
      </div>

      <br/>

      {isFetched &&  
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
            <h2>Financial Report</h2>
          </div>
          <div className="reportBody">
          
          <div>
          <table className="table ">
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Income(Rs:)</th>
                  <th scope="col">Expenses(Rs:)</th>
                </tr>
              </thead>
            <tbody>
              <tr>
                  <td>Sales</td>
                  <td>{billTotal}</td>
                  <td>-</td>
              </tr>
              <tr>
                  <td><br/></td>
                  <td></td>
                  <td></td>
              </tr>
            </tbody>
            <tbody>
                <tr>
                  <td>Staff</td>
                  <td>-</td>
                  <td></td>
                </tr> 
                <tr>
                  <td>Machine</td>
                  <td>-</td>
                  <td>{machineTotal}</td>
                </tr>
                <tr>
                  <td>Machine Maintenence</td>
                  <td>-</td>
                  <td>{machineMTotal}</td>
                </tr>
                <tr>
                  <td>Machine Services</td>
                  <td>-</td>
                  <td>{machineServiceTotal}</td>
                </tr>
                {expenses && expenses.map((expense) => (
                  <tr key={expense._id} >
                    <td>{expense.description}</td>
                    <td>-</td>
                    <td>{expense.amount}</td>
                  </tr>
                ))}
            </tbody>
            <thead>
                <tr>
                  <th>Total</th>
                  <th>{billTotal}</th>
                  <th>{totalotherExpense + billTotal + machineTotal + machineMTotal + machineServiceTotal}</th>
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
    } 
  </div>
  );
};

export default FinancialReport;
