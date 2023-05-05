import { useEffect, useState } from 'react';
import CustomerLeaderBoard from '../components/PatientComponents/CustomerLeaderBoard';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString();
      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <h1>Dashboard</h1>

        <h1 style={{ marginLeft: '700px' }}>{currentTime}</h1>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4 ">
        <div className="col">
          <div className="card bg-warning h-100">
            <img src="" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-success h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card bg-secondary h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
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
