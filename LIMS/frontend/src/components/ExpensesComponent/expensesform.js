import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { useExpensesContext } from "../../hooks/useExpensesContext"

const Expensesform = () => {
    const { dispatch } = useExpensesContext()
    const [description, setdescription] = useState('')
    const [amount, setamount] = useState('')
    const [error, seterror] = useState(null)
    const navigate = useNavigate()

    const handlesubmit = async (e) =>{
        e.preventDefault()

        const expenses = {description, amount}
        const response = await fetch('/api/expenses', {
            method: 'POST', 
            body: JSON.stringify(expenses),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if(!response.ok){
            seterror(json.error)
        }
        if(response.ok){
            setdescription('')
            setamount('')
            seterror(null)
            console.log('new workout added', json)
            navigate ('/expenseslist')
            dispatch({type: 'expenses_created', payload: json})
        }
    }

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

            <button>submit</button>
            {error && <div className="error">{error}</div>}

        </form>
    )
}

export default Expensesform