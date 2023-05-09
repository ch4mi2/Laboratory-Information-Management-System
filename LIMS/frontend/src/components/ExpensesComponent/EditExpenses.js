import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2';

import '../../css/expensesStyles/expenses.css'

const EditExpenses = () => {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const { id } = useParams();
  const [error,setError] = useState('')
  const [emptyFields, setEmptyFields] = useState([])
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

      const json = await response.json()

 if (response.ok) {
            Swal.fire(
                {
                  title: 'Success',
                  text: 'Record has been updated',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true  
              }
              )
              setError(null)
              setEmptyFields([])
              navigate('/expenseslist')
          }else{
            setError(json.error)
            setEmptyFields(json.emptyFields)
            
            Swal.fire({
              title: 'Error',
              text: 'Record could not be updated',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: 'alerts'
            });
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
        className={`form-control ${emptyFields.includes('description') ? 'error' : ''}`}
      />

      <label style={{marginTop:20}}>Amount:</label>
      <input
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
        className={`form-control ${emptyFields.includes('amount') ? 'error' : ''}`}
      />

      <button className="expenseSubmit" type="submit">Update</button>
      {error && <div className="error">{error}</div>} 
    </form>
  )
}

export default EditExpenses