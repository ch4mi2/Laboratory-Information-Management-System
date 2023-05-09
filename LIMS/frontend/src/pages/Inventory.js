import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
// import { useTestDataContext } from "../hooks/useTestDataContext";
import Swal from "sweetalert2";
// import withReactContent from 'sweetalert2-react-content';
import $ from "jquery";
// import '../css/TestDataStyles/testData.css';

import withReactContent from "sweetalert2-react-content";

const Inventory = () => {
  // const [Tests,setTests] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [inventory, setInventory] = useState(null);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch("/api/inventoryRoutes");
      const json = await response.json();
      console.log(json);

      if (response.ok) {
        setInventory(json);
        // dispatch({type:'SET_TESTS', payload: json})
        $(function () {
          $("#inventory-list").DataTable();
        });
        setIsLoaded(true);
        console.log(inventory);
      }
    };

    fetchTests();
  }, []);



  const handleUpdate = () => {
    //go to update form here
  };

  const clickDelete = (id) => {
    Swal.fire({
      title: "Delete this test and related subcategories?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: "alerts",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/inventoryRoutes/" + id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();

        if (!response.ok) {
          Swal.fire({
            title: "Error",
            text: json.error,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
        if (response.ok) {
          //dispatch({type: 'DELETE_TEST', payload: json})
          const table = $("#inventory-list").DataTable();
          const row = table.rows(`[data-id ="${id}"]`);
          row.remove().draw();

          Swal.fire({
            title: "Success",
            text: "Successfully Deleted Test",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          });
        }
      }
    });
  };

  return (
    <div>
      {isLoaded ? (
        <div className="container">
          <div>
            <h4>Inventory</h4>
          </div>

          <table
            id="inventory-list"
            className="table"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Inventory Type</th>
                <th>Name</th>
                <th>Expire Date</th>
                <th>Quantity</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {inventory &&
                inventory.map((item) => (
                  <tr key={item._id} data-id={item._id}>
                    <td>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                    <td>{item.inveType}</td>
                    <td>{item.proName}</td>
                    <td>{moment(item.exDate).format('DD-MM-YYYY')}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button
                        className="btnSubmit"
                        onClick={() => handleUpdate(item._id)}
                      >
                        Update
                      </button>
                    </td>
                    <td>
                      <button
                        className="btnDelete"
                        onClick={() => clickDelete(item._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  );
};

export default Inventory;
