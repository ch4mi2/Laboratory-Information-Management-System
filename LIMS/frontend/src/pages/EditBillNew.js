import { useLocation } from 'react-router-dom';
import EditBill from '../components/BillComponent/EditBill';
import { useEffect, useState } from 'react';
const EditBillNew = () => {
  const location = useLocation();
  const [patient, setPatient] = useState();
  useEffect(() => {
    const fetchPatient = async () => {
      const response = await fetch('/api/patients/' + location.state.patientId);
      const json = await response.json();
      if (response.ok) {
        setPatient(json);
      }
    };

    fetchPatient();
  }, []);
  return <>{patient && <EditBill patient={patient} />}</>;
};

export default EditBillNew;
