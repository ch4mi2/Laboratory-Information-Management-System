import { useEffect, useState } from 'react';
import CustomerLeaderBoard from '../components/PatientComponents/CustomerLeaderBoard';
import { FaClock, FaCheck } from 'react-icons/fa';
import moment from 'moment';

const Dashboard = () => {
  const [dateTime, setformattedDateTime] = useState('');
  const [pendingCount, setPendingCount] = useState(null);
  const [completedCount, setCompletedCount] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedDateTime = moment().format('h:mm:ss A ddd, D MMM');
      setformattedDateTime(formattedDateTime);
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchPendingTestResults = async () => {
      try {
        
        const response = await fetch('/api/testResult/pendingTests');
        const json = await response.json();

      if (response.ok) {
        const pendingCount = json.length;
        setPendingCount(pendingCount)
       
      }
      } catch (error) {
        console.log(error);
      } 
      
    };
    fetchPendingTestResults()
    
  }, []);

  useEffect(() => {
    const fetchTestCompletedResults = async () => {
      try {
        
        const response = await fetch('/api/testResult/completedTests');
        const json = await response.json();

      if (response.ok) {
        const completedCount = json.length;
        setCompletedCount(completedCount)
       
      }
      } catch (error) {
        console.log(error);
      } 
      
    };
    fetchTestCompletedResults()
    
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' , justifyContent:"space-between" } }>
        <h1>Dashboard</h1>

        <h2>{dateTime}</h2>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 ">
        <div className="col">
          <div className="card  h-100" style={{backgroundColor:"#FFD700"}}>
            {/* <img src="" className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <h5 className="card-title">
                <FaClock /> Pending Tests
              </h5>
              <h1 className="card-title">{pendingCount}</h1>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100" style={{backgroundColor:"#3CB371"}}>
            {/* <img src="..." className="card-img-top" alt="..." /> */}
            <div className="card-body">
              <h5 className="card-title">
                <FaCheck /> Completed Tests
              </h5>
              <h1 className="card-title">{completedCount}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 border bg-white">
        <CustomerLeaderBoard top={3} />
      </div>
    </div>
  );
};

export default Dashboard;
