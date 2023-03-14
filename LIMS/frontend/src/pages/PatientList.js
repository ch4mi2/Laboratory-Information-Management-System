import { useEffect, useState } from 'react';
import { usePatientContext } from '../hooks/usePatientContext';
import { SET_PATIENTS } from '../context/patientContextDeclarations';
import { Link } from 'react-router-dom';

// components
import PatientDetails from '../components/PatientComponents/PatientDetails';

const PatientList = () => {
  const { patients, dispatch } = usePatientContext();
  const [noOfPatients, setNoOfPatients] = useState();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/patients/');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: SET_PATIENTS, payload: json });
      }
      setNoOfPatients(json.length);
    };

    fetchPatients();
  }, []);

  return (
    <div className=" patientList">
      {noOfPatients ? (
        <div className="row mt-5 text-danger">
          <p style={{ textAlign: 'right' }}>{noOfPatients} Patients Found</p>
        </div>
      ) : (
        <div></div>
      )}
      <div className="patients m-3">
        {patients ? (
          patients.map((patient) => (
            <Link
              style={{ color: 'black', textDecoration: 'none' }}
              key={patient._id}
              to={`../patient-profile/${patient._id}`}
            >
              <PatientDetails key={patient._id} patient={patient} />
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default PatientList;
