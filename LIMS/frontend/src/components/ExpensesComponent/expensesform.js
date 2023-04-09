import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useExpensesContext } from "../../hooks/useExpensesContext"

import '../../css/expensesStyles/expenses.css'

const Expensesform = () => {
    const { dispatch } = useExpensesContext()
    const [description, setdescription] = useState('')
    const [amount, setamount] = useState('')
    const [error, seterror] = useState(null)
    const navigate = useNavigate()
    const [emptyFields, setEmptyFields] = useState([])

  const handlesubmit = async (e) => {
    e.preventDefault();

    const expenses = { description, amount };
    const response = await fetch('/api/expenses', {
      method: 'POST',
      body: JSON.stringify(expenses),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();

        if(!response.ok){
            seterror(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setdescription('')
            setamount('')
            seterror(null)
            setEmptyFields([])
            console.log('new workout added', json)
            navigate ('/expenseslist')
            dispatch({type: 'expenses_created', payload: json})
        }
    }
  

  return (
    <form  onSubmit={handlesubmit}>
      <h1>Insert Expense</h1>

      <label style={{marginTop:20}}>Description:</label>
      <input
        type="text"
        onChange={(e) => setdescription(e.target.value)}
        value={description}
        className={emptyFields.includes('description') ? 'error' : ""}
      />

      <label style={{marginTop:20}}>Amount:</label>
      <input
        type="number"
        onChange={(e) => setamount(e.target.value)}
        value={amount}
        className={emptyFields.includes('amount') ? 'error' : ""}
      />

      <button className="expenseSubmit">Submit</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Expensesform;
