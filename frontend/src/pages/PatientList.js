import { useEffect } from 'react';
import { usePatientContext } from '../hooks/usePatientContext';
import { SET_PATIENTS } from '../context/patientContextDeclarations';

// components
import PatientDetails from '../components/PatientComponents/PatientDetails';

const PatientList = () => {
  const { patients, dispatch } = usePatientContext();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/patients/');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: SET_PATIENTS, payload: json });
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="patientList">
      <div className="patients">
        {patients &&
          patients.map((patient) => (
            <PatientDetails key={patient._id} patient={patient} />
          ))}
      </div>
    </div>
  );
};

export default PatientList;
