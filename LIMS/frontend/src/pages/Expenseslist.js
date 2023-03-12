import { useEffect, useState } from "react"

const Expenseslist = () => {
    const [expenses, setexpenses] = useState(null)

    useEffect(() =>{
        const fetchExpenses = async () => {
            const response = await fetch('/api/expenses/')
            const json = await response.json()

            if(json.ok){
                setexpenses(json)
            }
        }
        fetchExpenses()
    }, [])

    return(
        <div className="container">
           <div className="expenses">
            <h2>list</h2>
            {expenses && expenses.map((expenses) => (
                <p key={expenses._id}>{expenses.amount}</p>
            ))}
           </div>
        </div>
    )
}

export default Expenseslist