import { useEffect, useState } from "react";
import { useExpensesContext } from "../hooks/useExpensesContext";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import formatDate from "../UtillFuntions/formatDate";
import moment from 'moment';
import Swal from 'sweetalert2';

const Expenseslist = () => {
  const { expenses, dispatch } = useExpensesContext();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true); // Add a new loading state

  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch("/api/expenses/");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_EXPENSES", payload: json });
        $(function () {
          $("#example").DataTable({
            order: [[0, "asc"]],
            bDestroy: true,
          });
        });
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    fetchExpenses();
  }, []);

  const handleClickDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass:'alerts'
    });
  
    if (confirmed.isConfirmed) {
      const response = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });
      const json = await response.json();

  
      if (response.ok) {
        const table = $('#example').DataTable();
        const row = table.rows(`[data-id ="${id}"]`);
        row.remove().draw();

        Swal.fire(
          {
            title: 'Success',
            text: 'Record has been deleted',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true
            
        }
        )
        //dispatch({ type: "DELETE_EXPENSES", payload: json });
      }
    }

  };

  const handleClickEdit = (id) => {
    navigate(`/editExpenses/${id}`);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Render a loading text if loading state is true
  }

  return (
    <div className="container">
      <div>
        <h4>Expenses</h4>
      </div>
      <table id="example" className="table" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {expenses &&
            expenses.map((expenses) => (
              <tr key={expenses._id} data-id={expenses._id}>
                <td>{moment(expenses.date).format('DD-MM-YYYY')}</td>
                <td>{expenses.description}</td>
                <td>{expenses.amount}</td>
                <td>
                  <button
                    className="btnSubmit"
                    onClick={() => handleClickEdit(expenses._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btnDelete"
                    onClick={() => handleClickDelete(expenses._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>

        <tfoot>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th></th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Expenseslist;
