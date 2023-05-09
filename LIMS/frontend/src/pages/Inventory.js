import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { useTestDataContext } from "../hooks/useTestDataContext";
import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
import $ from 'jquery';
// import '../css/TestDataStyles/testData.css';

import withReactContent from 'sweetalert2-react-content';


const Inventory = () => {

    // const [Tests,setTests] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();
    const [ inventory, setInventory ] = useState(null)
    const MySwal = withReactContent(Swal)



    useEffect(() => {
        const fetchTests = async() => {
            const response = await fetch('/api/inventoryRoutes');
            const json = await response.json();
            console.log(json);

            if( response.ok ) {
                setInventory(json);
                // dispatch({type:'SET_TESTS', payload: json})
                $(function () {
                    $('#inventory-list').DataTable();
                });
                setIsLoaded(true);
                console.log(inventory);
            }
        }
             
        fetchTests();
    }, []);

    //  const handleUpdate = async(id) => {
       
    //         e.preventDefault();
            
    //         const inventory = {inveType,proName,quantity,exDate};
        
    //         const response = await fetch('/api/inventoryRoutes/' + id, {
    //           method: 'PATCH',
    //           body: JSON.stringify(inventory),
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //         });
        
    //         const json = await response.json();
        
    //         if (!response.ok) {
             
        
    //           if (!response.ok) {
    //             MySwal.fire({
    //               title: 'Error',
    //               text: error,
    //               icon: 'error',
    //               showConfirmButton: false,
    //               timer: 1000,
    //             });
    //           }
    //         }
    //         if (response.ok) {
             
    //           MySwal.fire({
    //             title: 'Success',
    //             text: 'Successfully Created',
    //             icon: 'success',
    //             showConfirmButton: false,
    //             timer: 2000,
    //           });
    //           navigate(`/inventoryRoutes/${id}`, {state:{id}})
              
    //         }
    //       };


    const handleUpdate = () => {
        //go to update form here
    }

        

         
     

     const clickDelete = (id) => {
         Swal.fire({
             title: 'Delete this test and related subcategories?',
             text: "You won't be able to revert this!",
             icon: 'warning',
             showCancelButton: true,
             confirmButtonText: 'Yes, delete it!',
             customClass: "alerts",
           })
           .then(async(result) => {
             if (result.isConfirmed) {
                 const response = await fetch('/api/inventoryRoutes/' + id, {
                     method: 'DELETE',
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 })
                 const json = await response.json()
        
                 if(!response.ok) {
                     Swal.fire({
                         title: 'Error',
                         text: json.error,
                         icon: 'error',
                         showConfirmButton: false,
                         timer: 1500,
                         timerProgressBar: true
                     })
                 }
                 if(response.ok) {
                     //dispatch({type: 'DELETE_TEST', payload: json})
                     const table = $('#inventory-list').DataTable();
                     const row = table.rows(`[data-id ="${id}"]`);
                     row.remove().draw();            
                    
    Swal.fire({
        title: 'Success',
        text: 'Successfully Deleted Test',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })

                 }
             }
           })
     }

    return (
        <div>
            
           

            { isLoaded ? (
                <div className="container">
                <div>
                    <h4>Inventory</h4>
                </div>
        
                <table id="inventory-list" className="table" style={{ width: '100%' }}>
                    <thead>
                    <tr>

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
                        inventory.map((test) => (

                        <tr key={test._id} data-id={test._id}>
                            <td>{test.inveType}</td>
                            <td >{test.proName}</td>
                            <td>{test.exDate}</td>
                            <td >{test.quantity}</td>
                            <td>
                <button className="btnSubmit" onClick={() => handleUpdate(test._id)}>Update</button> 
            </td>
            <td>
                <button className="btnDelete" onClick={() => clickDelete(test._id)}>Delete</button> 
            </td>

                        </tr>
                        ))}
                    </tbody>
                    <tfoot></tfoot>
                </table>
                </div>
            ) : 
            <div className="loading">Loading...</div>}  
        </div>
    );
}

 
export default Inventory;



