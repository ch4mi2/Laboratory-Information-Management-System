import { useEffect } from 'react';
import { usePatientContext } from '../hooks/usePatientContext';
import { SET_PATIENTS } from '../context/patientContextDeclarations';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';

const PatientList = () => {
  const navigate = useNavigate();
  const { patients, dispatch } = usePatientContext();

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch('/api/patients/');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: SET_PATIENTS, payload: json });

        $(function () {
          $('#patient-list').DataTable();
        });
      }
    };

    fetchPatients();
  }, []);

  const handleClick = (id) => {
    navigate(`../patient-profile/${id}`);
  };

  return (
    <div>
      {patients ? (
        <div className="container">
          <div>
            <h4>Patients</h4>
          </div>

          <table id="patient-list" className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th className="col-3">NIC</th>
                <th className="col-5">Name</th>
                <th className="col-1">Gender</th>
                <th className="col-2">tpNo</th>
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients.map((patient) => (
                  <tr
                    key={patient._id}
                    onClick={() => handleClick(patient._id)}
                  >
                    <td className="col-3">{patient.NIC}</td>
                    <td className="col-5">
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td className="col-1">{patient.gender}</td>
                    <td className="col-2">{patient.tpNo}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default PatientList;
