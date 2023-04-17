import { usePatientContext } from '../../hooks/usePatientContext';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_PATIENT } from '../../context/patientContextDeclarations';
import Swal from 'sweetalert2';

const PatientDetails = ({ edit, patient }) => {
  const { dispatch } = usePatientContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: 'alerts',
    });

    if (confirmed.isConfirmed) {
      const response = await fetch('/api/patients/' + patient._id, {
        method: 'DELETE',
      });
      const json = await response.json();

      if (response.ok) {
        Swal.fire({
          title: 'Success',
          text: 'Record has been deleted',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        dispatch({ type: DELETE_PATIENT, payload: json });
        navigate('/patient-list');
      }
    }
  };

  return (
    <div className="patientDetailBlock pt-2 px-5">
      <div className="row">
        {edit === true ? (
          <center>
            <h3 className="mb-3">Patient Profile</h3>
          </center>
        ) : (
          <div></div>
        )}
        <div className="col-12">
          <p>
            <strong>Name : </strong> {patient.firstName} {patient.lastName}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>NIC : </strong> {patient.NIC}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>Gender : </strong> {patient.gender}
          </p>
        </div>
        <div className="row">
          <div className="col-12">
            <p>
              <strong>Email : </strong> {patient.email}
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>Telephone Number : </strong> {patient.tpNo}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>
            <strong>Age : </strong> {patient.age}
          </p>
        </div>
      </div>

      {edit === true ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-6">
              <Link
                style={{ textDecoration: 'none' }}
                to={'./edit'}
                state={patient}
              >
                <button
                  id="editProfileButton"
                  className="btn mt-4 px-4 d-block m-auto"
                >
                  Edit Account
                </button>
              </Link>
            </div>
            <div className="col-6">
              <Link style={{ textDecoration: 'none' }} to={''}>
                <button
                  id="deleteProfileButton"
                  className="btn mt-4 px-4 d-block m-auto"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </Link>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <Link
                style={{ textDecoration: 'none' }}
                to={'./transactionHistory'}
              >
                <button
                  style={{
                    width: '100%',
                    minHeight: '50px',
                    fontSize: '1rem',
                  }}
                  className="btnSubmit mt-4 px-4 d-block m-auto"
                >
                  Transaction History
                </button>
              </Link>
            </div>
            <div className="col-6">
              <Link style={{ textDecoration: 'none' }} to={'./addBill'}>
                <button
                  style={{
                    width: '100%',
                    minHeight: '50px',
                    fontSize: '1rem',
                  }}
                  className="btnSubmit mt-4 px-4 d-block m-auto"
                >
                  Add Bill
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PatientDetails;
