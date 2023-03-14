import { useState } from 'react';
import ReactDOM from 'react-dom';

const Bill = ({ patient }) => {
  const [inputList, setInputList] = useState([]);

  const Input = () => {
    return (
      <div>
        <input className="p-2" type="text" placeholder="Add service name" />
      </div>
    );
  };

  const handleClick = (e) => {
    setInputList(inputList.concat(<Input key={inputList.length} />));
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
          <button onClick={handleClick}>Add service</button>
        </div>
      </div>
    </div>
  );
};

export default Bill;
