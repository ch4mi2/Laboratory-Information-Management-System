const ExpensesDetails = ({ expenses }) => {
  return (
    <div className=" card expenses-details">
      <div className="card-body d-flex justify-content-between align-items-center">
        <p className="card-text">{expenses.date}</p>
        <p className="card-text">{expenses.description}</p>
        <p className="card-text">{expenses.amount}</p>
        <button className="expensesbutton">Edit</button>
        <button className="expensesbutton">Delete</button>
      </div>
    </div>
  );
};
export default ExpensesDetails;
