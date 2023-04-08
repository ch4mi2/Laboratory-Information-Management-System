import { useEffect, useState } from 'react';
import $ from 'jquery';

const AllBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch('/api/bills/');
      const json = await response.json();

      if (response.ok) {
        setBills(json);
        $(function () {
          $('#bill-list').DataTable();
        });
      }
    };

    fetchBills();
  }, []);

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
                <th className="col-3">Patient Name</th>
                <th className="col-5">Services</th>
                <th className="col-1">OutSourced</th>
                <th className="col-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {bills &&
                bills.map((bill) => (
                  <tr key={bill._id}>
                    <td className="col-3">{bill.patientName}</td>
                    <td className="col-5">{bill.services}</td>
                    <td className="col-1">{bill.outsourceServices}</td>
                    <td className="col-2">{bill.total}</td>
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

export default AllBills;
