import '../../css/PatientDetailStyles/PatientDetailStyles.css';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const EditPatientForm = ({ patient }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [age, setAge] = useState(patient.age);
  const [email, setEmail] = useState(patient.email);
  const [firstName, setFirstName] = useState(patient.firstName);
  const [lastName, setLastName] = useState(patient.lastName);
  const [NIC, setNIC] = useState(patient.NIC);
  const [tpNo, setTpNo] = useState(patient.tpNo);
  const [gender, setGender] = useState(patient.gender);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [updated, setUpdated] = useState('');
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updated === 'Account Updated') {
      setUpdated('');
    }

    const patient = { firstName, lastName, NIC, tpNo, gender, age, email };

    const response = await fetch('/api/patients/' + id, {
      method: 'PATCH',
      body: JSON.stringify(patient),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      setUpdated('Could not update the Account');

      if (!response.ok) {
        MySwal.fire({
          title: 'Error',
          text: error,
          icon: 'error',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      setUpdated('Account Updated');
      MySwal.fire({
        title: 'Success',
        text: 'Successfully Created',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      goBack();
    }
  };

  const goBack = () => {
    navigate(`/patient-profile/${id}`);
  };

  const handleNICValidation = (e) => {
    const value = e.target.value;
    const key = e.key;
    const isNumeric = /^\d$/.test(key);
    const isModifierKey = [
      'Backspace',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
    ].includes(key);

    const isAllowed =
      (value.length === 9 && ('x' || 'X' || 'z' || 'Z')) ||
      (value.length >= 10 && value.length < 12 && isNumeric) ||
      (value.length < 12 && isNumeric) ||
      isModifierKey;
    if (!isAllowed) {
      e.preventDefault();
    }
  };

  const handleTpNoValidation = (e) => {
    const value = e.target.value;
    const key = e.key;
    const isNumeric = /^\d$/.test(key);
    const isModifierKey = [
      'Backspace',
      'End',
      'Home',
      'ArrowLeft',
      'ArrowRight',
    ].includes(key);

    const isAllowed = (value.length < 10 && isNumeric) || isModifierKey;
    if (!isAllowed) {
      e.preventDefault();
    }
  };

  return (
    <div className="createPatientFormContainer">
      <div className="row my-3">
        <div
          className={
            updated === 'Account Updated'
              ? 'showSuccessBox py-2'
              : updated === 'Could not update the Account'
              ? 'showWarningBox py-2'
              : 'd-none'
          }
        >
          {updated && <div>{updated}</div>}
        </div>
      </div>
      <div id="form-container-div" className="mt-5">
        <form className="createPatientForm" onSubmit={handleSubmit}>
          <center>
            <h3 className="">Edit Profile</h3>
          </center>

          <label>NIC :</label>
          <input
            required
            type="text"
            onChange={(e) => setNIC(e.target.value)}
            value={NIC}
            className={emptyFields.includes('NIC') ? 'error' : ''}
            onKeyDown={(e) => {
              handleNICValidation(e);
            }}
            pattern="[0-9]{9}[x|X|v|V]|[0-9]{12}"
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
            type="tel"
            onChange={(e) => setTpNo(e.target.value)}
            value={tpNo}
            className={emptyFields.includes('tpNo') ? 'error' : ''}
            pattern="[0-9]{10}"
            onKeyDown={(e) => handleTpNoValidation(e)}
          />

          <label>Age (Years):</label>
          <input
            required
            type="number"
            onChange={(e) => setAge(e.target.value)}
            value={age}
            className={emptyFields.includes('age') ? 'error' : ''}
            min="0"
          />

          <label>Email :</label>
          <input
            required
            type="email"
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
            <option value="Male"> Male</option>
            <option value="Female"> Female</option>
          </select>

          <button
            style={{
              width: '100%',
            }}
            className="btnConfirm mt-4 px-4 d-block m-auto"
          >
            {' '}
            Confirm{' '}
          </button>
          <span
            onClick={goBack}
            style={{ width: 'auto', textAlign: 'center' }}
            className="btnConfirm mt-3 px-4 d-block m-auto"
          >
            {'<-'} Go Back
          </span>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default EditPatientForm;
