import Multiselect from 'multiselect-react-dropdown';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import moment from 'moment';
const EditBill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [updated, setUpdated] = useState('');
  const { billId } = useParams();
  const [Bills, setBills] = useState([]);
  const [options, setOptions] = useState([]);
  const [optionsOut, setOptionsOut] = useState([]);
  const serviceRef = useRef();
  const outsourceRef = useRef();

  const [selectedValues, setSelectedValues] = useState(
    location.state.bill.services
  );
  const [selectedValuesOut, setSelectedValuesOut] = useState(
    location.state.bill.outsourceServices
  );
  const [total, setTotal] = useState(0);
  const [referredDoctor, setReferredDoctor] = useState(
    location.state.bill.referredDoctor
  );
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

    const patientId = location.state.bill.patientId;
    const patientName = location.state.bill.patientName;
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
      referredDoctor,
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

      <div className="report p-5">
        <div className="row">
          <div className="col-4">
            <p>
              <b>Patient's Name : </b>
              {location.state.bill.patientName}
            </p>
          </div>
          <div className="col-4">
            <p>
              <b>Date : </b>
              {moment(location.state.bill.createdAt).format('YYYY-MM-DD')}
            </p>
          </div>
          <div className="col-4">
            <p>
              <b>Time : </b>
              {moment(location.state.bill.createdAt).format('LT')}
            </p>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12">
            <input
              placeholder="Referred Doctor"
              required
              type="text"
              onChange={(e) => setReferredDoctor(e.target.value)}
              value={referredDoctor}
            />
          </div>
        </div>
        <div className="row my-5">
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
        <div className="row my-3">
          <div className="mb-3">
            <h2>Total = Rs. {total}</h2>
          </div>

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
      </div>
    </>
  );
};

export default EditBill;
