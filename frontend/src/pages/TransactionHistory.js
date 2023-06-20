import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import Swal from 'sweetalert2';

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

  useEffect(() => {
    $(function () {
      $('#example').DataTable({
        order: [[4, 'desc']],
        bDestroy: true,
      });
    });
  }, []);

  const clickDelete = async (id, pid) => {
    const patientID = pid;
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: 'alerts',
    });

    if (confirmed.isConfirmed) {
      const response = await fetch('/api/bills/' + id, {
        method: 'DELETE',
      });

      if (response.ok) {
        const table = $('#bill-list').DataTable();
        const row = table.rows(`[data-id ="${id}"]`);
        row.remove().draw();

        Swal.fire({
          title: 'Success',
          text: 'Record has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
    navigate(`/patient-profile/${patientID}/transactionHistory`);
  };

  const handleClick = (id) => {
    navigate(`../bill/${id}`);
  };

  return (
    <div>
      {bills ? (
        <div className="container">
          <div>
            <h4>Transaction History</h4>
          </div>

          <table id="bill-list" className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Services</th>
                <th>OutSourced</th>
                <th>Total</th>
                <th>Delete Bills</th>
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
                    <td>
                      <button
                        className="btnDelete"
                        onClick={() => clickDelete(bill._id, bill.patientId)}
                      >
                        Delete
                      </button>
                    </td>
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
