import { useState, useEffect } from 'react';

import '../../css/BillStyles/bill.css';
const Bill = ({ patient }) => {
  const [Tests, setTests] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedVal, setSelectedVal] = useState([]);
  const [noOfDropdowns, setNoOfDropdowns] = useState([]);

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
    const { value } = e.target;

    setSelectedVal((prevState) => {
      let list = [...prevState];
      list[index] = value;
      console.log(list);

      calSum(list);
      return list;
    });
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
          onChange={(e) => calTotal(e, index)}
          name="services"
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

    const newDrop = noOfDropdowns.filter((_, i) => i !== index);
    setNoOfDropdowns(newDrop);
  };

  const handleClick = (e) => {
    setNoOfDropdowns((prevState) => [...prevState, '1']);
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
          {noOfDropdowns.map((data, index) => (
            <div className="mt-3" key={index}>
              <Input index={index} />
              <button
                className="btn btn-outline-danger"
                onClick={(e) => removeInputFields(index)}
              >
                Delet
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
    </div>
  );
};

export default Bill;
