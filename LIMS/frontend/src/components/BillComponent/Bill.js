import { useState, useEffect } from 'react';

import '../../css/BillStyles/bill.css';
const Bill = ({ patient }) => {
  const [inputList, setInputList] = useState([]);
  const [Tests, setTests] = useState([]);
  const [total, setTotal] = useState(0);

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

  const calTotal = (e) => {
    let current = parseFloat(e.target.value);
    console.log(current);
    setTotal(total + current);
  };

  const Input = () => {
    return (
      <>
        <select
          onChange={(e) => calTotal(e)}
          name="services"
          id="bill-selectServices"
        >
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
    const rows = [...inputList];
    rows.splice(index, 1);
    setInputList(rows);
  };

  const handleClick = (e) => {
    console.log(inputList);
    setInputList(
      inputList.concat(
        <div key={inputList.length}>
          <Input />

          <button
            value={inputList.length}
            className="btn btn-outline-danger"
            onClick={(e) => removeInputFields(e.target.value)}
          >
            x
          </button>
        </div>
      )
    );
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
          Name : {patient.firstName} {patient.lastName}
        </div>
        <div className="col-md-6">NIC : {patient.NIC}</div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-md-6">Services</div>
        <div className="col-md-6">
          {inputList}
          <button
            id="bill-add-service-btn"
            className="btn"
            onClick={handleClick}
          >
            Add service
          </button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12">
          <h1>Total : {total}</h1>
        </div>
      </div>
    </div>
  );
};

export default Bill;
