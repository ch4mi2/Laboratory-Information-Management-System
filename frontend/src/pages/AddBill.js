import Bill from '../components/BillComponent/Bill';
import { usePatientContext } from '../hooks/usePatientContext';
import { useParams } from 'react-router-dom';

const AddBill = () => {
  const { id } = useParams();
  const { patients } = usePatientContext();
  const patient =
    patients && patients.filter((patient) => patient._id === id)[0];

  return <Bill patient={patient} />;
};

export default AddBill;
