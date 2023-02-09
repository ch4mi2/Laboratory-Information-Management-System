//import { usePatientContext } from '../../hooks/usePatientContext';

const PatientDetails = ({ patient }) => {
  //const { dispatch } = usePatientContext();

  return (
    <div className="patient-details">
      <h4>
        {patient.firstName} {patient.lastName}
      </h4>
      <p>
        <strong>NIC : </strong> {patient.NIC}
      </p>
      <p>
        <strong>Telephone Number : </strong> {patient.tpNo}
      </p>
      <p>
        <strong>Gender : </strong> {patient.gender}
      </p>
    </div>
  );
};

export default PatientDetails;
