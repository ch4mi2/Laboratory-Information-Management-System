import { useEffect, useState } from "react"

//components
import ExpensesDetails from "../components/ExpensesComponent/expensesDetails"

const Expenseslist = () => {
    const [expenses, setexpenses] = useState(null)

    useEffect(() =>{
        const fetchExpenses = async () => {
            const response = await fetch('/api/expenses/')
            const json = await response.json()

            if(response.ok){
                setexpenses(json)
            }
        }
        fetchExpenses()
    }, [])

    return(
        <div className="container">
           <div className="expenses">
            
            {expenses && expenses.map((expenses) => (
                <div key={expenses._id}>
                    
               <ExpensesDetails key={expenses._id} expenses={expenses}/>
               
                </div>
                
            ))}
           </div>
        </div>
    )
}

export default Expenseslist