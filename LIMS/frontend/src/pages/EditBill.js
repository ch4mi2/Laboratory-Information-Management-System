import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditBill = () => {
  const navigate = useNavigate();
  const [updated, setUpdated] = useState('');
  const { billId } = useParams();
  const [Bills, setBills] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsOut, setOptionsOut] = useState([]);
  const [preServices, setPreServices] = useState([]);
  const [preOutsourced, setPreOutsourced] = useState([]);
  const serviceRef = useRef();
  const outsourceRef = useRef();
  const [thisBill, setThisBill] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedValuesOut, setSelectedValuesOut] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSelect = (selectedList, selectedItem) => {
    setSelectedValues(selectedList);
    const fee = parseFloat(selectedItem.price);
    setTotal(total + fee);
  };

  const handleSelectOut = (selectedList, selectedItem) => {
    setSelectedValuesOut(selectedList);
    const fee = parseFloat(selectedItem.price);

    setTotal(total + fee);
  };

  const loadPreValues = (json) => {
    const bill = json.filter((bill) => bill._id === billId)[0];
    setThisBill(bill);

    const preService = bill.services.map((test) => {
      return {
        nameAndId: test,
        id: '',
        price: parseFloat(test.price),
      };
    });
    setPreServices(preService);

    const preOut = bill.outsourceServices.map((test) => {
      return {
        nameAndId: test,
        id: '',
        price: parseFloat(test.price),
      };
    });
    setPreOutsourced(preOut);

    setTotal(parseFloat(bill.total));
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
            nameAndId: test.testID + ' - ' + test.testName,
            id: test.testID,
            price: p,
          };
        });
        setOptions(options);

        const outArr = json.filter((test) => test.outsourced === 'Yes');
        const optionsOuts = outArr.map((test) => {
          const p = parseFloat(test.price);
          console.log(typeof test.price);
          const price = parseFloat(test.price);
          console.log('price after:', price);
          return {
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
        loadPreValues(json);
      }
    };

    fetchBills();
  }, []);

  useEffect(() => {
    const preServiceTotal = preServices.reduce((acc, item) => {
      console.log(typeof item.price);
      return acc + parseFloat(item.price);
    }, 0);
    const preOutsourcedTotal = preOutsourced.reduce((acc, item) => {
      console.log('preOutsourced:', item);

      return acc + parseFloat(item.price);
    }, 0);
    const newTotal = preServiceTotal + preOutsourcedTotal;
    setTotal(newTotal);
  }, [preServices, preOutsourced]);

  const handleCancelClick = () => {
    navigate('/view-bills');
  };

  const handleUpdateClick = async () => {
    if (updated === 'Account Updated') {
      setUpdated('');
    }

    const patientId = thisBill.patientId;
    const patientName = thisBill.patientName;
    const normalServices = serviceRef.current.getSelectedItems;
    const outsourceServices = outsourceRef.current.getSelectedItems;
    console.log(total);
    //const total = '';
    //const Total = 0;

    /* const bill = {
      patientId,
      patientName,
      normalServices,
      outsourceServices,
      Total,
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
    }
    if (response.ok) {
      setUpdated('Bill Updated');
    }*/
  };

  return (
    <>
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
                selectedValues={preServices} // Preselected value to persist in dropdown
                displayValue="nameAndId" // Property name to display in the dropdown options
              />
            </div>
            <div className="col-6">
              <h3>Outsourced Services</h3>
              <Multiselect
                onSelect={handleSelectOut}
                ref={outsourceRef}
                options={optionsOut} // Options to display in the dropdown
                selectedValues={preOutsourced} // Preselected value to persist in dropdown
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
