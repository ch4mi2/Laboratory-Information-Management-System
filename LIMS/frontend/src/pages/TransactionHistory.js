import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';

const TransactionHistory = () => {
  const [bills, setBills] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch('/api/bills/');
      const json = await response.json();

      if (response.ok) {
        const transactionHistory = json.filter((bill) => bill.patientId === id);
        setBills(transactionHistory);
        $(function () {
          $('#bill-list').DataTable();
        });
      }
    };

    fetchBills();
  }, []);
  const handleClick = (id) => {
    navigate(`../bill/${id}`);
  };

  return (
    <div>
      {bills ? (
        <div className="container">
          <div>
            <h4>Bills</h4>
          </div>

          <table id="bill-list" className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Services</th>
                <th>OutSourced</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bills &&
                bills.map((bill) => (
                  <tr key={bill._id} onClick={() => handleClick(bill._id)}>
                    <td>{moment(bill.createdAt).format('YYYY-MM-DD')}</td>
                    <td>{moment(bill.createdAt).format('LT')}</td>
                    <td>{bill.services.map((service) => service + ', ')}</td>
                    <td>
                      {bill.outsourceServices.map((service) => service + ', ')}
                    </td>
                    <td>{bill.total}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TransactionHistory;
