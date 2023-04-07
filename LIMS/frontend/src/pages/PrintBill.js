import { useLocation } from 'react-router-dom';

const PrintBill = () => {
  const location = useLocation();
  console.log('location', location);

  return (
    <div>
      {}
      <button> Print</button>
    </div>
  );
};

export default PrintBill;
