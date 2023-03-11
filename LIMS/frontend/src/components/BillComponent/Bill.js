const Bill = ({ patient }) => {
  return (
    <div className="container receipt mt-5">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">MEDILINE Receipt</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          Name : {patient.firstName} {patient.lastName}
        </div>
        <div className="col-md-6">NIC : {patient.NIC}</div>
      </div>
    </div>
  );
};

export default Bill;
