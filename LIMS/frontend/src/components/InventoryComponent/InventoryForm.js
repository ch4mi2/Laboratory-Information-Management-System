import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import $ from "jquery";

const TestDataz = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    inveType: "",
    proName: "",
    exDate: "",
    quantity: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/inventoryRoutes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const json = await response.json();
      if (response.ok) {
        setInventory([...inventory, json]);
        setFormData({
          inveType: "",
          proName: "",
          exDate: "",
          quantity: "",
        });
        Swal.fire({
          title: "Success",
          text: "Successfully added new inventory item",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      } else {
        Swal.fire({
          title: "Error",
          text: json.error,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("/api/inventoryRoutes");
      const json = await response.json();
      if (response.ok) {
        setInventory(json);
        setIsLoaded(true);
      }
    };
    fetchInventory();
  }, []);

  

  return (
    <div className="container">
      <h4>Add Inventory Item</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="inveType">Inventory Type:</label>
          <input
            type="text"
            className="form-control"
            id="inveType"
            name="inveType"
            value={formData.inveType}
            onChange={handleInputChange}
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
            value={formData.proName}
            onChange={handleInputChange}
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
            value={formData.exDate}
            onChange={handleInputChange}
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
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
        </div>
        <br />
        <button className="btnConfirm" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default TestDataz;
