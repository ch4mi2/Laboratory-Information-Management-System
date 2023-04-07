import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/BillStyles/bill.css';

const Bill = ({ patient }) => {
  const [Tests, setTests] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedVal, setSelectedVal] = useState([]);
  const [noOfDropdowns, setNoOfDropdowns] = useState([]);
  const [services, setServices] = useState([]);
  const [outsourced, setOutsourced] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch('/api/tests');
      const json = await response.json();

      if (response.ok) {
        setTests(json);
      }
    };

    fetchTests();
  }, []);

  const calTotal = (e, index) => {
    const price = e.target.value;
    const selectedIndex = e.target.selectedIndex;

    console.log('index : ' + selectedIndex);
    setSelectedVal((prevState) => {
      let list = [...prevState];
      list[index] = price;
      console.log(list);
      calSum(list);
      return list;
    });

    if (Tests[selectedIndex - 1]?.outsourced == 'true') {
      setOutsourced((prevState) => {
        let list = [...prevState];
        list[index] = Tests[selectedIndex - 1]?.testName;
        console.log('outsourced tests : ' + list);
        return list;
      });
    } else {
      setServices((prevState) => {
        let list = [...prevState];
        list[index] = Tests[selectedIndex - 1]?.testName;
        console.log('normal tests : ' + list);
        return list;
      });
    }
  };

  const calSum = (list) => {
    // calculate the sum of all selected values
    let sum = 0;
    for (let i = 0; i < list.length; i++) {
      if (list[i] !== null) {
        sum += Number(list[i]);
      }
    }
    //console.log(selectedVal);
    setTotal(sum);
  };

  const Input = ({ index }) => {
    return (
      <>
        <select
          onChange={(e) => {
            calTotal(e, index);
          }}
          id="bill-selectServices"
          value={selectedVal[index] || ''}
        >
          <option value="" disabled hidden>
            Select an Item
          </option>
          {Tests &&
            Tests.map((t) => (
              <option key={t._id} value={t.price}>
                {t.testName}
              </option>
            ))}
        </select>
      </>
    );
  };
  const removeInputFields = (index) => {
    const newVal = [...selectedVal];
    newVal.splice(index, 1);
    calSum(newVal);
    setSelectedVal(newVal);

    if (Tests[index]?.outsourced === 'true') {
      const newOutsourcedArr = [...outsourced];
      newOutsourcedArr.splice(index, 1);
      setServices(newOutsourcedArr);
    } else {
      const newServicesArr = [...services];
      newServicesArr.splice(index, 1);
      setServices(newServicesArr);
    }

    const newDrop = noOfDropdowns.filter((_, i) => i !== index);
    setNoOfDropdowns(newDrop);
  };

  const handleClick = (e) => {
    setNoOfDropdowns((prevState) => [...prevState, '1']);
  };

  const cancelBill = () => {
    navigate(-1);
  };

  const confirmBill = async () => {
    const patientName = patient.firstName + ' ' + patient.lastName;
    console.log(patientName);
    console.log(selectedVal);
    /* const bill = { NIC, patientName, services, outsourceServices, total };

    const response = await fetch('/api/patients/', {
      method: 'POST',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      setStatus('Failed to create the account');
    }
    navigate('./print-bill');*/
  };

  return (
    <div className=" receipt mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">MEDILINE Receipt</h1>
        </div>
      </div>
      <br />
      <hr />
      <div className="row mt-3">
        <div className="col-md-6">
          <b>Name :</b> {patient.firstName} {patient.lastName}
        </div>
        <div className="col-md-6">
          <b>NIC :</b> {patient.NIC}
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-md-6">
          <b>Services</b>
        </div>
        <div className="col-md-6">
          {noOfDropdowns.map((data, index) => (
            <div className="mt-3" key={index}>
              <Input index={index} />
              <button
                className="btnDelete"
                onClick={(e) => removeInputFields(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            id="bill-add-service-btn"
            className="btn"
            onClick={handleClick}
          >
            Add service
          </button>
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="">Total : Rs. {total}</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 col-lg-12 mx-auto d-flex justify-content-end">
          <button className="btnSubmit mx-2" onClick={confirmBill}>
            Confirm
          </button>
          <button className="btnDelete" onClick={cancelBill}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
