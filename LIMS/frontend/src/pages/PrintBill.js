import { useRef, useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import logo from '../assets/common/mediLineLogo.webp';
import '../css/TestResultStyles/testResultPreview.css';

const PrintBill = ({ billID }) => {
  const componentRef = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  const [bills, setBills] = useState([]);
  let thisBill = [];
  if (billID) {
    thisBill = bills && bills.filter((bill) => bill._id === billID)[0];
  } else {
    thisBill = bills && bills.filter((bill) => bill.patientId === id)[0];
  }

  useEffect(() => {
    const fetchBills = async () => {
      const response = await fetch('/api/bills');
      const json = await response.json();

      if (response.ok) {
        setBills(json);
      }
    };

    fetchBills();
  }, []);

  const handleEditClick = () => {
    navigate(`/view-bills/${thisBill._id}/edit`, {
      state: { bill: thisBill },
    });
  };

  return (
    <>
      <div>
        <div className="report mt-3" ref={componentRef}>
          <div className="reportHeader">
            <div className="reportLogo">
              <img src={logo} alt="logo" />
            </div>
            <div className="reportContact">
              <p>No. H/96 Borella Road, Athurugiriya</p>
              <p>Tel: 0113631063 Hotline: 0711188514 | 0714744901</p>
              <p>Email: medilinelaboratoryservice@gmail.com</p>
            </div>
          </div>
          <div className="reporthr">
            <hr />
          </div>
          <div className="reportHeading">
            <h2>Receipt</h2>
          </div>
          <div className="reportBody">
            <div>
              {thisBill ? (
                <div className="row">
                  <div className="col-4">
                    <p>
                      <b>Name : </b>
                      {thisBill.patientName}
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>Date : </b>
                      {moment(thisBill.createdAt).format('YYYY-MM-DD')}
                    </p>
                  </div>
                  <div className="col-4">
                    <p>
                      <b>Time : </b>
                      {moment(thisBill.createdAt).format('LT')}
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <p>
                        <b>Referred Doctor : </b>
                        {thisBill.referredDoctor}
                      </p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-12">
                      <b>Requested Services :</b>
                      <ul style={{ listStyleType: 'none', margin: '20px' }}>
                        <li>
                          {thisBill &&
                          thisBill.services.map((service) => {
                            return <li>{service}</li>;
                          }).length > 0 ? (
                            <>
                              <b>Services :</b>
                              <ul style={{ listStyleType: 'disc' }}>
                                {thisBill &&
                                  thisBill.services.map((service, index) => {
                                    return <li key={index}>{service}</li>;
                                  })}
                              </ul>
                            </>
                          ) : (
                            <></>
                          )}
                        </li>
                        <li className="mt-3">
                          {thisBill &&
                          thisBill.outsourceServices.map((service) => {
                            return <li>{service}</li>;
                          }).length > 0 ? (
                            <>
                              <b>Outsource :</b>
                              <ul style={{ listStyleType: 'disc' }}>
                                {thisBill &&
                                  thisBill.outsourceServices.map(
                                    (service, index) => {
                                      return <li key={index}>{service}</li>;
                                    }
                                  )}
                              </ul>
                            </>
                          ) : (
                            <></>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <hr />
                  <div className="row mt-3">
                    <div className="col-12">
                      <p>
                        <b>Total : </b> Rs.{' '}
                        {thisBill.total % 1 === 0 ? (
                          <>{thisBill.total}.00</>
                        ) : (
                          <>{thisBill.total}</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Server Error</div>
              )}
              <hr />
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-center">
          <ReactToPrint
            trigger={() => <button className="btnSubmit">Print</button>}
            content={() => componentRef.current}
          />
          <button className="btnSubmit mx-3" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default PrintBill;
