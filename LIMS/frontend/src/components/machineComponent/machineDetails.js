const MachineHistory = ({machine}) => {
    return ( 
        <div className="machine-details">
            <h4>{machine.name}</h4>
            <p><strong>Brand : </strong>{machine.Brand}</p>
            <p><strong>Model : </strong>{machine.Model}</p>
            <p><strong>Serial No : </strong>{machine.SerialNo}</p>
            <p><strong>Manufacturer : </strong>{machine.Manufacturer}</p>
            <p><strong>Purchased Date : </strong>{machine.PurchaseDate}</p>
            <p><strong>Warranty Expiration : </strong>{machine.WarrantyExp}</p>
            <p><strong>Tel. No : </strong>{machine.TelNo}</p>
            <p>{machine.createdAt}</p>
        </div>
     );
}
 
export default MachineHistory;