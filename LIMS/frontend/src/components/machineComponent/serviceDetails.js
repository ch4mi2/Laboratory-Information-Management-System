import { useNavigate } from 'react-router-dom';

const ServiceDetails = ({ service }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`../updateServiceDates/${id}`);
  };

//   const handleClick2 = (id) => {
//     navigate(`../AddMachineParts`);
//   };

//   const handleClick3 = (id) => {
//     navigate(`../AddServiceDates`);
//   };

   return (
    <div className="">
      <div className="machine-details">
        <h4>Service Dates</h4>
        <p>
          <strong> Last Service Date: </strong>
          {service.LastserviceDate}
        </p>
        <p>
          <strong>Next Service Date: </strong>
          {service.NextServiceDate}
        </p>
        <p>
          <strong>Technician's Name : </strong>
          {service.TechnicianName}
        </p>
        <p>
          <strong>Technician's Tel No : </strong>
          {service.TechTelno}
        </p>
        <p>
          <strong>Technician's Payment : </strong>
          {service.TechnicianPayment}
        </p>
        <button onClick={() => handleClick(service._id)}>Update Service Details</button>
        <p>{service.createdAt}</p>
      </div>
    </div>
  );
};

export default ServiceDetails;
