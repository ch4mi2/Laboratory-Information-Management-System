import { useEffect } from "react"
import { useExpensesContext } from "../hooks/useExpensesContext"

//components
import ExpensesDetails from "../components/ExpensesComponent/expensesDetails"


import '../css/expensesStyles/expenses.css'

const Expenseslist = () => {
   const  {expenses, dispatch} =  useExpensesContext()

    useEffect(() =>{
        const fetchExpenses = async () => {
            const response = await fetch('/api/expenses/')
            const json = await response.json()

            if(response.ok){
               dispatch({type: 'SET_EXPENSES', payload: json})
            }
        }
        fetchExpenses()
    }, [dispatch])

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