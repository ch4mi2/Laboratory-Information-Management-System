import { useState } from 'react';
import { usePatientContext } from '../../hooks/usePatientContext';

const CreatePatientForm = () => {
  const { dispatch } = usePatientContext();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [tpNo, setTpNo] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = () => {};

  return (
    <form className="" onSubmit={handleSubmit}>
      <h3>Register a new Patient</h3>

      <label>NIC :</label>
      <input
        type="text"
        onChange={(e) => setNIC(e.target.value)}
        value={NIC}
        className={emptyFields.includes('NIC') ? 'error' : ''}
      />

      <label>First Name :</label>
      <input
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        className={emptyFields.includes('firstName') ? 'error' : ''}
      />

      <label>Last Name :</label>
      <input
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        className={emptyFields.includes('lastName') ? 'error' : ''}
      />

      <label>Gender :</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className={emptyFields.includes('gender') ? 'error' : ''}
      >
        <option value="Male"> Male</option>
        <option value="Female"> Female</option>
      </select>

      <label>Telephone Number :</label>
      <input
        type="text"
        onChange={(e) => setTpNo(e.target.value)}
        value={tpNo}
        className={emptyFields.includes('tpNo') ? 'error' : ''}
      />
    </form>
  );
};

export default CreatePatientForm;
