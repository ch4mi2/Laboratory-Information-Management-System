import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditBill = () => {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState('');
  const { billId } = useParams();
  const [Bills, setBills] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsOut, setOptionsOut] = useState([]);
  const serviceRef = useRef();
  const outsourceRef = useRef();
  const thisBill = Bills && Bills.filter((bill) => bill._id === billId)[0];
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValuesOut, setSelectedValuesOut] = useState([]);
  const [total, setTotal] = useState(0);
  const MySwal = withReactContent(Swal);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
    if (selectedItem.price) {
      const fee = parseFloat(selectedItem.price);
      setTotal(total + fee);
    }
  };

  const handleSelectOut = (selectedList, selectedItem) => {
    setSelectedValuesOut(selectedList);
    if (selectedItem.price) {
      const fee = parseFloat(selectedItem.price);
      setTotal(total + fee);
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch('/api/tests');
      const json = await response.json();

      if (response.ok) {
        const normalArr = json.filter((test) => test.outsourced === 'No');
        const options = normalArr.map((test) => {
          const p = parseFloat(test.price);
          return {
            name: test.testName,
            nameAndId: test.testID + ' - ' + test.testName,
            id: test.testID,
            price: p,
          };
        });
        setOptions(options);

        const outArr = json.filter((test) => test.outsourced === 'Yes');
        const optionsOuts = outArr.map((test) => {
          const p = parseFloat(test.price);
          return {
            name: test.testName,
            nameAndId: test.testName + ' - ' + test.testID,
            id: test.testID,
            price: p,
          };
        });
        setOptionsOut(optionsOuts);
      }
    };

    fetchTests();

    const fetchBills = async () => {
      const response = await fetch('/api/bills');
      const json = await response.json();

      if (response.ok) {
        setBills(json);
      }
    };

    fetchBills();
  }, []);

  const handleCancelClick = () => {
    navigate('/view-bills');
  };

  const handleUpdateClick = async () => {
    if (updated === 'Account Updated') {
      setUpdated('');
    }

    const patientId = thisBill.patientId;
    const patientName = thisBill.patientName;
    const normal = selectedValues;
    const outsource = selectedValuesOut;
    const services = normal.map((s) => s.name);
    const outsourceServices = outsource.map((s) => s.name);

    const bill = {
      patientId,
      patientName,
      services,
      outsourceServices,
      total,
    };

    const response = await fetch('/api/bills/' + billId, {
      method: 'PATCH',
      body: JSON.stringify(bill),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      setUpdated('Could not update the Bill');
      MySwal.fire({
        title: 'Error',
        text: updated,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    if (response.ok) {
      setUpdated('Bill Updated');
      MySwal.fire({
        title: 'Success',
        text: updated,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      //navigate('/view-bills');
    }
  };

  return (
    <>
      {updated}
      {thisBill && (
        <>
          <div className="row">
            <div className="col-6">
              <p>Name : {thisBill.patientName}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <h3>Normal Services</h3>
              <Multiselect
                onSelect={handleSelect}
                ref={serviceRef}
                options={options} // Options to display in the dropdown
                displayValue="nameAndId" // Property name to display in the dropdown options
              />
            </div>
            <div className="col-6">
              <h3>Outsourced Services</h3>
              <Multiselect
                onSelect={handleSelectOut}
                ref={outsourceRef}
                options={optionsOut} // Options to display in the dropdown
                displayValue="nameAndId" // Property name to display in the dropdown options
              />
            </div>
          </div>
          <div className="row mt-3">
            {total}
            <button
              style={{ width: 'auto' }}
              className="btnSubmit mx-3"
              onClick={handleUpdateClick}
            >
              Update Bill
            </button>
            <button
              style={{ width: 'auto' }}
              className="btnDelete"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default EditBill;
