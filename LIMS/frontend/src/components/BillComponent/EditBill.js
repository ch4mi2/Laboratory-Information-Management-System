import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/BillStyles/bill.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditBill = ({ patient }) => {
  const [Tests, setTests] = useState([]);
  const [Total, setTotal] = useState(0);
  const [selectedVal, setSelectedVal] = useState([]);
  const [noOfDropdowns, setNoOfDropdowns] = useState([]);
  const [Services, setServices] = useState([]);
  const [outsourced, setOutsourced] = useState([]);
  const [referredDoctor, setReferredDoctor] = useState([]);
  const ref = useRef([]);
  const MySwal = withReactContent(Swal);
  const { billId } = useParams();
  const [currentBill, setCurrentBill] = useState();

  //save test ids
  const [billedTests, setBilledTests] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      const response = await fetch('/api/tests');
      const json = await response.json();

      if (response.ok) {
        setTests(json);
      }
    };

    const fetchBill = async () => {
      const response = await fetch('/api/bills/' + billId);
      const json = await response.json();

      if (response.ok) {
        setCurrentBill(json);
        //setServices(json.Services);
        //setOutsourced(json.outsourceServices);
        setReferredDoctor(json.referredDoctor);
      }
    };
    fetchBill();
    fetchTests();
  }, []);

  const calTotal = (e, index) => {
    const price = e.target.value;
    const selectedIndex = e.target.selectedIndex;

    setSelectedVal((prevState) => {
      let list = [...prevState];
      list[index] = price;
      calSum(list);
      return list;
    });

    if (Tests[selectedIndex - 1]?.outsourced === 'Yes') {
      setBilledTests((prevArray) => [
        ...prevArray,
        Tests[selectedIndex - 1]?._id,
      ]); //setBilledTests

      setOutsourced((prevState) => {
        let list = [...prevState];
        list[index] = Tests[selectedIndex - 1]?.testName;
        return list;
      });
      setServices((prevState) => {
        let list = [...prevState];
        list[index] = 0;
        return list;
      });
    } else {
      setBilledTests((prevArray) => [
        ...prevArray,
        Tests[selectedIndex - 1]?._id,
      ]); //setBilledTests

      setServices((prevState) => {
        let list = [...prevState];
        list[index] = Tests[selectedIndex - 1]?.testName;
        return list;
      });
      setOutsourced((prevState) => {
        let list = [...prevState];
        list[index] = 0;
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
    setTotal(sum);
  };

  const Input = ({ index }) => {
    return (
      <>
        <select
          ref={(el) => (ref.current[index] = el)}
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
                {t.testID} - {t.testName}
              </option>
            ))}
        </select>
      </>
    );
  };
  const removeInputFields = (index) => {
    //cal total
    const newVal = [...selectedVal];
    newVal.splice(index, 1);
    calSum(newVal);
    setSelectedVal(newVal);

    //billedTests
    const newBilledTestArr = [...billedTests];
    newBilledTestArr.splice(index, 1);
    setBilledTests(newBilledTestArr);

    //outsourced
    const newOutsourcedArr = [...outsourced];
    newOutsourcedArr.splice(index, 1);
    setOutsourced(newOutsourcedArr);

    //normal
    const newServicesArr = [...Services];
    newServicesArr.splice(index, 1);
    setServices(newServicesArr);

    //dropdown count
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
    const patientId = patient._id;
    let outsourceServices = [];
    let services = [];
    let total = Number(Total);

    for (let i = 0; i < outsourced.length; i++) {
      if (outsourced[i] == 0 || outsourced[i] === '0') continue;
      else outsourceServices.push(outsourced[i]);
    }

    for (let i = 0; i < Services.length; i++) {
      if (Services[i] == 0 || Services[i] === '0') continue;
      else services.push(Services[i]);
    }

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

    const json = await response.json();
    let status = '';
    if (!response.ok) {
      status = 'Failed to create the bill';
      MySwal.fire({
        title: 'Error',
        text: status,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });

      navigate(`/patient-profile/${patient.patientId}`);
    } else {
      status = 'Bill Added';
      MySwal.fire({
        title: 'Success',
        text: status,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });

      createSample(patient._id, billedTests, json._id);
    }
    // navigate('/bills/' + billId, { state: { status: status } });
    navigate(-1);
  };

  //create sample and test result
  const createSample = async (patient, billedTests, billId) => {
    try {
      const response = await fetch('/api/samples/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ patient, billedTests, billId }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
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
      <div className="row mt-3">
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
                className="btnDelete mt-1"
                onClick={(e) => removeInputFields(index)}
              >
                Delete
              </button>
            </div>
          ))}

          <button
            style={{ width: 'auto' }}
            className="btnSubmit mt-3"
            onClick={handleClick}
          >
            Add service
          </button>
        </div>
      </div>
      <hr />
      <div className="row mt-5">
        <div className="col-12">
          <h1 className="">Total : Rs. {Total}</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6 col-lg-12 mx-auto d-flex justify-content-end">
          {selectedVal.length > 0 && referredDoctor.length > 0 ? (
            <button
              className={
                selectedVal.length > 0 &&
                referredDoctor.length > 0 &&
                referredDoctor.trim().length !== 0
                  ? 'btnSubmit mx-2'
                  : 'btnSubmit-disabled mx-2'
              }
              onClick={confirmBill}
            >
              Confirm
            </button>
          ) : (
            <button
              className={
                selectedVal.length > 0 &&
                referredDoctor.length > 0 &&
                referredDoctor.trim().length !== 0
                  ? 'btnSubmit mx-2'
                  : 'btnSubmit-disabled mx-2'
              }
              onClick={confirmBill}
              disabled
            >
              Confirm
            </button>
          )}
          <button className="btnDelete" onClick={cancelBill}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBill;
