import { useEffect } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"
import $ from 'jquery';
import { useNavigate } from "react-router-dom";
import formatDate from "../UtillFuntions/formatDate";





const Expenseslist = () => {
   const  {expenses, dispatch} =  useExpensesContext()
   const navigate = useNavigate()


  useEffect(() => {
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses/');
      const json = await response.json();

            if(response.ok){
               dispatch({type: 'SET_EXPENSES', payload: json});
              $(function(){
                $('#example').DataTable();
              });

            }
        }
        fetchExpenses()
    }, [dispatch])

    const handleClick = async () => {
      const response = await fetch('/api/expenses/' +expenses._id, {
        method: 'DELETE'
      })
      const json = await response.json()
    
      if(response.ok){
        dispatch({type: 'DELETE_EXPENSES', payload: json})
      }
    }
    
    const handleClickEdit =  (id) => {
      navigate (`/editExpenses/${id}`)
    }

  return (
    <div className="container">

    
    <table id="example" className="table" style={{ width: '100%' }}>
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
            <tr key={expenses._id}>
              <td>{formatDate(expenses.date)}</td>
              <td>{expenses.description}</td>
              <td>{expenses.amount}</td>
              <td><button className="btnSubmit"  onClick={() => handleClickEdit(expenses._id)}>Edit </button></td>
              <td><button className="btnDelete" onClick={() => handleClick}>Delete</button></td>
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
