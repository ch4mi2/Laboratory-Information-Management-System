// Bug : reload error
import '../../css/PatientDetailStyles/PatientDetailStyles.css';
import { useEffect, useState } from 'react';
import { usePatientContext } from '../../hooks/usePatientContext';
import { UPDATE_PATIENT } from '../../context/patientContextDeclarations';
import { useNavigate, useParams } from 'react-router-dom';

const EditPatientForm = () => {
  const { patients, dispatch } = usePatientContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const currentPatient = patients.filter((p) => p._id === id)[0];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [tpNo, setTpNo] = useState('');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [updated, setUpdated] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updated === 'Account Updated') {
      setUpdated('');
    }

    const patient = { firstName, lastName, NIC, tpNo, gender };

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
    }
    if (response.ok) {
      setError(null);
      setEmptyFields([]);
      dispatch({ type: UPDATE_PATIENT, payload: json });
      setUpdated('Account Updated');
    }
  };

  useEffect(() => {
    if (currentPatient) {
      setFirstName(currentPatient.firstName);
      setLastName(currentPatient.lastName);
      setNIC(currentPatient.NIC);
      setGender(currentPatient.gender);
      setTpNo(currentPatient.tpNo);
    }
  }, []);

  const goBack = () => {
    navigate(`/patient-profile/${id}`);
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
            className="btnSubmit mt-4 px-4 d-block m-auto"
          >
            {' '}
            Confirm{' '}
          </button>
          <span
            onClick={goBack}
            style={{ width: 'auto', textAlign: 'center' }}
            className="btnSubmit mt-3 px-4 d-block m-auto"
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
