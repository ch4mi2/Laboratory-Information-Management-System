import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { useAuthContext } from "../../hooks/useAuthContext";
import $ from "jquery";
import ReactToPrint from "react-to-print";
import logo from "../../assets/common/mediLineLogo.webp";

const SalaryTable = () => {
  const [Staff, setStaff] = useState(null);
  const [Att, setAtt] = useState(null);
  const { user } = useAuthContext();
  const componentRef = useRef();
  const [labInfo, setLabInfo] = useState();

  useEffect(() => {
    const fetchStaff = async () => {
      const response = await fetch("/api/Staff", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        setStaff(json);
        setStaff(json);
        $(function () {
          $("#example").DataTable({
            bDestroy: true,
          });
        });
      }
    };

    const fetchAtt = async () => {
      const response1 = await fetch("/api/Attendance", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json1 = await response1.json();

      if (response1.ok) {
        setAtt(json1);
      }
    };

    if (user) {
      fetchStaff();
      fetchAtt();
    }
  }, [user]);

  useEffect(() => {
    const fetchLabInfo = async () => {
      try {
        const response = await fetch("/api/labInfo");
        const json = await response.json();
        if (response.ok) {
          setLabInfo(json);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchLabInfo();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="staff">
          <table id="example" className="table" style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Position</th>
                <th>No. of Attendance</th>
                <th>Salary(Rs.)</th>
              </tr>
            </thead>

            <tbody>
              {Staff &&
                Staff.map((staff) => {
                  const attendance =
                    Att && Att.find((att) => att.Eid === staff.Eid)?.attendance;
                  let salary;

                  if (staff.post === "Receptionist") {
                    salary = attendance * 5000;
                  } else if (staff.post === "Medical Lab Technologist") {
                    salary = attendance * 6000;
                  } else if (staff.post === "Lab Assistant") {
                    salary = attendance * 4000;
                  }

                  return (
                    <tr key={staff._id} data-id={staff._id}>
                      <td>{staff.name}</td>
                      <td>{staff.Eid}</td>
                      <td>{staff.post}</td>
                      <td>{attendance}</td>
                      <td>{salary}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="report" ref={componentRef}>
        <div className="reportHeader">
          <div className="reportLogo">
            <img src={logo} alt="logo" />
          </div>
          <div className="reportContact">
            <p class="info">Address : {labInfo?.address ?? "null"}</p>
            <p class="info">
              Tel: {labInfo?.tel1 ?? "null"} | {labInfo?.tel2 ?? "null"} |{" "}
              {labInfo?.tel3 ?? "null"}
            </p>
            <p class="info">Email: {labInfo?.email ?? "null"}</p>
          </div>
        </div>
        <div className="reporthr">
          <hr />
        </div>
        <div className="reportHeading">
          <h2>Salary Report</h2>
        </div>
        <div className="reportBody">
          <div>
            <div className="container">
              <div className="staff">
                <table className="table" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Employee ID</th>
                      <th>Position</th>
                      <th>No. of Attendance</th>
                      <th>Salary(Rs.)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {Staff &&
                      Staff.map((staff) => {
                        const attendance =
                          Att &&
                          Att.find((att) => att.Eid === staff.Eid)?.attendance;
                        let salary;

                        if (staff.post === "Receptionist") {
                          salary = attendance * 5000;
                        } else if (staff.post === "Medical Lab Technologist") {
                          salary = attendance * 6000;
                        } else if (staff.post === "Lab Assistant") {
                          salary = attendance * 4000;
                        }

                        return (
                          <tr key={staff._id} data-id={staff._id}>
                            <td>{staff.name}</td>
                            <td>{staff.Eid}</td>
                            <td>{staff.post}</td>
                            <td>{attendance}</td>
                            <td>{salary}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <table class="table table-borderless"></table>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <div className="col-12 d-flex justify-content-center">
          <ReactToPrint
            trigger={() => <button className="btnSubmit">Print</button>}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryTable;
