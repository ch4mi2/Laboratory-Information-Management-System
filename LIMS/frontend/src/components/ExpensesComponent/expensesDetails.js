const ExpensesDetails = ({expenses}) => {
    return(
        <div className="expenses-details">
            <p>{expenses.date}</p>
            <p>{expenses.description}</p>
            <p>{expenses.amount}</p>
            <button>Edit</button>
            <button>Delete</button>
        </div>
    )
}
export default ExpensesDetails