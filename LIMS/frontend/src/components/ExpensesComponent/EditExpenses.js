import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import '../../css/expensesStyles/expenses.css'

const EditExpenses = () => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const { id } = useParams();
 // const [expenses, setExpenses] = useState('')
  const navigate = useNavigate()


  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await fetch(`/api/expenses/${id}`)
        const json = await response.json()
        if (response.ok) {
          //setExpenses(json)
          setDescription(json.description)
          setAmount(json.amount)
        }
      } catch (error) {
        console.log(error)
      }
    };
    fetchExpense();
  }, [id])

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/expenses/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          description,
          amount
        })
      })
      if (response.ok) {
        navigate('/expenseslist')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="create" onSubmit={handleUpdate}>
      <h3>Update Expense</h3>

      <label style={{marginTop:20}}>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <label style={{marginTop:20}}>Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />

      <button className="expenseSubmit" type="submit">Update</button>
    </form>
  )
}

export default EditExpenses