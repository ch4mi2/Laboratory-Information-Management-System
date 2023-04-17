import { useLocation } from 'react-router-dom';
import EditPatientForm from '../components/PatientComponents/EditPatientForm';

const EditPatient = () => {
  const location = useLocation();
  const state = location.state;
  return <EditPatientForm patient={state} />;
};

export default EditPatient;
