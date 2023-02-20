import { useEffect, useState } from 'react';
import { usePatientContext } from '../../hooks/usePatientContext';
import {
  SET_PATIENTS,
  CREATE_PATIENT,
  UPDATE_PATIENT,
} from '../../context/patientContextDeclarations';
import { Link, useParams } from 'react-router-dom';

const EditPatientForm = () => {
  const { patients, dispatch } = usePatientContext();
  const { id } = useParams();

  const currentPatient = patients.filter((p) => p._id === id)[0];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [tpNo, setTpNo] = useState('');
  const [gender, setGender] = useState('Male');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    }
    if (response.ok) {
      setFirstName('');
      setLastName('');
      setNIC('');
      setGender('');
      setTpNo('');
      setError(null);
      setEmptyFields([]);
      console.log('patient updated', json);
      dispatch({ type: UPDATE_PATIENT, payload: json });
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

  return (
    <div className="container createPatientFormContainer">
      <form className="createPatientForm" onSubmit={handleSubmit}>
        <center>
          <h3>Register a new Patient</h3>
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

        <button className="btn btn-success mt-4 d-block">Confirm</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default EditPatientForm;
