import { useEffect } from "react"





const EditExpenses = () => {
    return(
        <form className="create" onSubmit={handlesubmit}>
        <h3>Insert Expense</h3>

      <label>description:</label>
      <input
        type = "text"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        />

      <label>amount:</label>
      <input
        type = "number"
        onChange={(e) => setamount(e.target.value)}
        value={amount}
        /> 

        <button>Edit</button>
        {error && <div className="error">{error}</div>}

    </form>
    )
}