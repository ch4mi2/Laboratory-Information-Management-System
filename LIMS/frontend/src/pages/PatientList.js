import { useEffect } from 'react';
import { usePatientContext } from '../hooks/usePatientContext';
import {
  SET_PATIENTS,
  DELETE_PATIENT,
} from '../context/patientContextDeclarations';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import Swal from 'sweetalert2';

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

  useEffect(() => {
    $(function () {
      $('#example').DataTable({
        order: [[4, 'desc']],
        bDestroy: true,
      });
    });
  }, []);

  const clickDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: 'alerts',
    });

    if (confirmed.isConfirmed) {
      const response = await fetch('/api/patients/' + id, {
        method: 'DELETE',
      });

      if (response.ok) {
        const table = $('#patient-list').DataTable();
        const row = table.rows(`[data-id ="${id}"]`);
        row.remove().draw();

        Swal.fire({
          title: 'Success',
          text: 'Record has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    }
    navigate('/patient-list');
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
                <th>NIC</th>
                <th>Name</th>
                <th>Gender</th>
                <th>tpNo</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {patients &&
                patients.map((patient) => (
                  <tr
                    key={patient._id}
                    onClick={() => handleClick(patient._id)}
                  >
                    <td>{patient.NIC}</td>
                    <td>
                      {patient.firstName} {patient.lastName}
                    </td>
                    <td>{patient.gender}</td>
                    <td>{patient.tpNo}</td>
                    <td>
                      <button
                        className="btnDelete"
                        onClick={() => clickDelete(patient._id)}
                      >
                        Delete
                      </button>
                    </td>
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
