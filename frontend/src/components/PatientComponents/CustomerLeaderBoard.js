import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerLeaderBoard = ({ top }) => {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch('/api/bills/');
      const json = await response.json();

      if (response.ok) {
        let customerArray = [];
        for (let i = 0; i < json.length; i++) {
          const id = json[i].patientId;
          let append = true;
          for (let j = 0; j < customerArray.length; j++) {
            if (customerArray[j].id === id) {
              customerArray[j].total += json[i].total;
              append = false;
            }
          }
          if (append) {
            customerArray.push({
              id: json[i].patientId,
              name: json[i].patientName,
              total: json[i].total,
            });
          }
        }

        const sortArray = (A) => {
          for (let s = 0; s < A.length; s++) {
            for (let k = s + 1; k < A.length; k++) {
              if (A[k].total > A[s].total) {
                let temp = A[s];
                A[s] = A[k];
                A[k] = temp;
              }
            }
          }
          if (top) {
            A = A.slice(0, top);
          }

          setCustomers(A);
        };

        sortArray(customerArray);
      }
    };

    fetchBills();
  }, []);

  const handleClick = (id) => {
    navigate('../patient-profile/' + id);
  };

  return (
    <div className="container-fluid mt-5">
      <center>
        <h1>Top {top ? top : ''} Customers</h1>
      </center>

      <table className="table table-hover mt-5">
        <thead>
          <tr className="bg-dark text-white">
            <th>Rank</th>
            <th>Customer Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {customers &&
            customers.map((customer, index) => (
              <tr key={customer.id} onClick={() => handleClick(customer.id)}>
                <td>
                  <b>{index + 1} </b>
                </td>
                <td>
                  <b>{customer.name}</b>
                </td>
                <td>
                  <b>Rs. {customer.total}</b>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerLeaderBoard;
