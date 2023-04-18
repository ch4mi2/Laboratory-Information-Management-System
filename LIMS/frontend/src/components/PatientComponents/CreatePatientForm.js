///(search function needs to be implemented later)
//(bug: page redirects when submitting)

import '../../css/PatientDetailStyles/PatientDetailStyles.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePatientForm = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [NIC, setNIC] = useState('');
  const [tpNo, setTpNo] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patient = { firstName, lastName, NIC, tpNo, gender, age, email };

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
      MySwal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1000,
      });
    }
    if (response.ok) {
      setStatus('New Account Created');
      setFirstName('');
      setLastName('');
      setNIC('');
      setGender('');
      setTpNo('');
      setAge('');
      setEmail('');
      setError(null);
      setEmptyFields([]);
      console.log('new patient added', json);

      MySwal.fire({
        title: 'Success',
        text: 'Successfully Created',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate('/create-patient');
    }
  };

  return (
    <div className="createPatientFormContainer">
      <div className="row my-3">
        <div
          className={
            status === 'New Account Created'
              ? 'showSuccessBox py-2'
              : status === 'Failed to create the account'
              ? 'showWarningBox py-2'
              : 'd-none'
          }
        >
          {status && <div>{status}</div>}
        </div>
      </div>

      <div id="form-container-div" className="my-3">
        <form className="createPatientForm" onSubmit={handleSubmit}>
          <center>
            <h3 className="">Register a new Patient</h3>
          </center>

          <label>NIC :</label>
          <input
            required
            type="text"
            onChange={(e) => setNIC(e.target.value)}
            value={NIC}
            className={emptyFields.includes('NIC') ? 'error' : ''}
          />

          <label>First Name :</label>
          <input
            required
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            className={emptyFields.includes('firstName') ? 'error' : ''}
          />

          <label>Last Name :</label>
          <input
            required
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            className={emptyFields.includes('lastName') ? 'error' : ''}
          />

          <label>Telephone Number :</label>
          <input
            required
            type="text"
            onChange={(e) => setTpNo(e.target.value)}
            value={tpNo}
            className={emptyFields.includes('tpNo') ? 'error' : ''}
          />

          <label>Age :</label>
          <input
            required
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className={emptyFields.includes('age') ? 'error' : ''}
          />

          <label>Email :</label>
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className={emptyFields.includes('email') ? 'error' : ''}
          />

          <label style={{ display: 'inline' }}>Gender :</label>
          <select
            required
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={emptyFields.includes('gender') ? 'error' : ''}
          >
            <option value="" disabled hidden>
              Select an Item
            </option>
            <option value="Male"> Male</option>
            <option value="Female"> Female</option>
          </select>

          <button
            style={{ width: 'auto' }}
            className="btnSubmit mt-4 px-4 d-block m-auto"
          >
            Add Patient
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default CreatePatientForm;
