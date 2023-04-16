const MachineHistory = ({ machine }) => {
   return (
    <div className="">
      <div className="machine-details">
        <h4>{machine.MachineType}</h4>
        <p>
          <strong>Brand : </strong>
          {machine.Brand}
        </p>
        <p>
          <strong>Model : </strong>
          {machine.Model}
        </p>
        <p>
          <strong>Serial No : </strong>
          {machine.SerialNo}
        </p>
        <p>
          <strong>Manufacturer : </strong>
          {machine.Manufacturer}
        </p>
        <p>
          <strong>Purchased Date : </strong>
          {machine.PurchaseDate}
        </p>
        <p>
          <strong>Warranty Expiration : </strong>
          {machine.WarrantyExp}
        </p>
        <p>
          <strong>Tel. No : </strong>
          {machine.TelNo}
        </p>
        <button>Add machine Parts</button>
        <button>Service machine</button>
        <p>{machine.createdAt}</p>
      </div>
    </div>
  );
};

export default MachineHistory;
