import { useExpensesContext } from "../../hooks/useExpensesContext";

const ExpensesDetails = ({ expenses }) => {
  const { dispatch } = useExpensesContext()

const handleClick = async () => {
  const response = await fetch('/api/expenses/' +expenses._id, {
    method: 'DELETE'
  })
  const json = await response.json()

  if(response.ok){
    dispatch({type: 'DELETE_EXPENSES', payload: json})
  }
}

  return (
    <div className=" card expenses-details">
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="card-text">{expenses.date}</p>
        <p className="card-text">{expenses.description}</p>
        <p className="card-text">{expenses.amount}</p>
        <button className="expensesbutton">Edit</button>
        <button className="expensesbutton" onClick={handleClick}>Delete</button>
      </div>
    </div>
  );
};
export default ExpensesDetails;
