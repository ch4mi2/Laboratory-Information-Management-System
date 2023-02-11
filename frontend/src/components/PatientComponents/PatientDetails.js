//import { usePatientContext } from '../../hooks/usePatientContext';

const PatientDetails = ({ patient }) => {
  //const { dispatch } = usePatientContext();

  return (
    <div className="container patientDetailBlock">
      <div className="row">
        <div className="col-12">
          <p>
            <strong>Name : </strong> {patient.firstName} {patient.lastName}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>NIC : </strong> {patient.NIC}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>Gender : </strong> {patient.gender}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>Telephone Number : </strong> {patient.tpNo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
