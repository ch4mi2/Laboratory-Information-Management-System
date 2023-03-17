import { useExpensesContext } from "../../hooks/useExpensesContext";
import { useNavigate } from "react-router-dom";
import formatDate from "../../UtillFuntions/formatDate";

const ExpensesDetails = ({ expenses }) => {
  const { dispatch } = useExpensesContext()
  const navigate = useNavigate()

const handleClick = async () => {
  const response = await fetch('/api/expenses/' +expenses._id, {
    method: 'DELETE'
  })
  const json = await response.json()

  if(response.ok){
    dispatch({type: 'DELETE_EXPENSES', payload: json})
  }
}

const handleClickEdit =  () => {
  navigate (`/editExpenses/${expenses._id}`)
}

  return (
    <div className=" card expenses-details">
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="card-text">{formatDate(expenses.date)}</p>
        <p className="card-text">{expenses.description}</p>
        <p className="card-text">{expenses.amount}</p>
        <button className="expensesbutton"  onClick={handleClickEdit}>Edit </button>
        <button className="expensesbutton" onClick={handleClick}>Delete</button>
      </div>
    </div>
  );
};
export default ExpensesDetails;
