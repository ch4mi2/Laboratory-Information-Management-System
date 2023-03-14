import { useMachineContext } from '../../hooks/useMachineContext';

const MachineHistory = ({ machine }) => {
  const { dispatch } = useMachineContext();

  const handleClick = async () => {
    const response = await fetch('/api/machines/' + machine._id, {
      method: 'DELETE',
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

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
        <button onClick={handleClick}>Delete</button>
        <button>Update</button>
        <p>{machine.createdAt}</p>
      </div>
    </div>
  );
};

export default MachineHistory;
