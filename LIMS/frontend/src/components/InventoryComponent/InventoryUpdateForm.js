import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const UpdateInventory = () => {
  const { id } = useParams();
  const [inveType, setType] = useState()
  const [proName, setName] = useState()
  const [exDate, setDate] = useState()
  const [quantity, setQty] = useState()
  

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch(`/api/inventoryRoutes/${id}`);
      const json = await response.json();
      if (response.ok) {
        setType(json.inveType)
        setName(json.proName)
        setDate(moment(json.exDate).format('YYYY-MM-DD'))
        setQty(json.quantity)
        
      }
    };
    fetchInventory();
  }, []);
  
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/inventoryRoutes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inveType,
          proName,
          exDate,
          quantity

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
          
      }else{
        
        
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
    <div className="container">
      <h4>Update Inventory Item</h4>
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="inveType">Inventory Type:</label>
          <input
            type="text"
            className="form-control"
            id="inveType"
            name="inveType"
            value={inveType}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="proName">Product Name:</label>
          <input
            type="text"
            className="form-control"
            id="proName"
            name="proName"
            value={proName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="exDate">Expire Date:</label>
          <input
            type="date"
            className="form-control"
            id="exDate"
            name="exDate"
            value={exDate}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQty(e.target.value)}
            required
          />
        </div>
        <br />
        <button className="btnConfirm" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateInventory;
