import { useParams } from 'react-router-dom';
import PrintBill from '../../pages/PrintBill';

const ShowBill = () => {
  const { id } = useParams();

  return <PrintBill billID={id} />;
};

export default ShowBill;
