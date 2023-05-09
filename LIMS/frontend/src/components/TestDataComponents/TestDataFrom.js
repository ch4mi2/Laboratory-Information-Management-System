import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TestSubCategoryDetails from "./TestSubCategoryDetails";

const TestDataForm = () => {
  const [testID, setTestID] = useState("");
  const [testName, setTestName] = useState("");
  const [outsourced, setOutsourced] = useState("");
  const [shortName, setShortName] = useState("");
  const [specimen, setSpecimen] = useState("");
  const [price, setPrice] = useState("");
  const [heading, setHeading] = useState("");
  const [remarks, setRemarks] = useState("");
  const [categoryHeading, setCategoryHeading] = useState("");
  const [category, setCategory] = useState("");
  const [UOM, setUOM] = useState("");
  const [startMRef, setStartMRef] = useState("");
  const [operatorM, setOperatorM] = useState("");
  const [endMRef, setEndMRef] = useState("");
  const [startFRef, setStartFRef] = useState("");
  const [operatorF, setOperatorF] = useState("");
  const [endFRef, setEndFRef] = useState("");
  const [startBRef, setStartBRef] = useState("");
  const [operatorB, setOperatorB] = useState("");
  const [endBRef, setEndBRef] = useState("");

  const [disableID, setDisableID] = useState(false);
  const [disable, setDisable] = useState(false);
  const [inputTest, setTest] = useState(null);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const Test = {
      testID,
      testName,
      outsourced,
      shortName,
      specimen,
      price,
      heading,
      remarks,
      categoryHeading,
      category,
      UOM,
      startMRef,
      operatorM,
      endMRef,
      startFRef,
      operatorF,
      endFRef,
      startBRef,
      operatorB,
      endBRef,
    };

    const response = await fetch("/api/tests", {
      method: "POST",
      body: JSON.stringify(Test),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      if (response.status === 400) {
        setEmptyFields(json.emptyFields);
        MySwal.fire({
          title: "Error",
          text: error,
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setEmptyFields([]);
        MySwal.fire({
          title: "Error",
          text: json.error,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
    if (response.ok) {
      setTest(json);
      setCategoryHeading("");
      setCategory("");
      setUOM("");
      setStartMRef("");
      setOperatorM("");
      setEndMRef("");
      setStartFRef("");
      setOperatorF("");
      setEndFRef("");
      setStartBRef("");
      setOperatorB("");
      setEndBRef("");
      setError(null);
      setEmptyFields([]);
      if (response.status === 200) {
        MySwal.fire({
          title: "Successfully Added Test",
          text: "Do you want to add subcategories?",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          customClass: "alerts",
        }).then((result) => {
          if (!result.isConfirmed) {
            navigate("/testData");
          }
        });
      }
      if (response.status === 201) {
        MySwal.fire({
          title: "Successfully Added Test Subcategory",
          text: "Do you want to add more?",
          icon: "success",
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          customClass: "alerts",
        }).then((result) => {
          if (!result.isConfirmed) {
            navigate("/testData");
          }
        });
      }

      // dispatch({type: 'CREATE_TEST', payload: json})
    }
  };

  const updateForm = async (id) => {
    const response = await fetch("/api/tests/");
    const json = await response.json();

    if (response.ok) {
      const test = await json.filter((t) => t.testID === Number(id));

      // console.log(test[0]);

      if (test.length > 0) {
        MySwal.fire({
          title: "Fetching Test",
          showConfirmButton: false,
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 1500,
        });
        Swal.showLoading();
        setTest(await (await fetch("/api/tests/" + test[0]._id)).json());
        setShortName(test[0].shortName);
        setTestName(test[0].testName);
        setPrice(test[0].price);
        setSpecimen(test[0].specimen);
        setHeading(test[0].heading);
        setRemarks(test[0].remarks);
        setOutsourced(test[0].outsourced);
        setDisable(true);
        setDisableID(false);
        document.getElementById("submitButton").innerHTML = "Add subcategory";
      } else {
        setShortName("");
        setTestName("");
        setPrice("");
        setSpecimen("");
        setHeading("");
        setRemarks("");
        setOutsourced("");
        setTest(null);
        setDisable(false);
        setDisableID(false);
        document.getElementById("submitButton").innerHTML = "Add Test";
      }
    }
  };

  return (
    <div className="createTest">
      <form className="form " onSubmit={handleSubmit}>
        <fieldset className="firstSection">
          {/* <legend>Test Data</legend> */}
          <div className="row">
            <div className="col-6">
              <label>Test ID: </label>
              <input
                type="number"
                onChange={(e) => {
                  setDisableID(true);
                  setTestID(e.target.value);
                  updateForm(e.target.value);
                }}
                value={testID}
                min="0"
                className={emptyFields.includes("testID") ? "error" : ""}
                disabled={disableID}
              />
            </div>

            <div className="col-6">
              <label>Short Name: </label>
              <input
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("shortName")] = "";
                  setShortName(e.target.value);
                }}
                value={shortName}
                className={emptyFields.includes("shortName") ? "error" : ""}
                disabled={disable}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label>Test Name: </label>
              <input
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("testName")] = "";
                  setTestName(e.target.value);
                }}
                value={testName}
                className={emptyFields.includes("testName") ? "error" : ""}
                disabled={disable}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label>Price: </label>
              <input
                type="number"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("price")] = "";
                  setPrice(e.target.value);
                }}
                value={price}
                min="0"
                className={emptyFields.includes("price") ? "error" : ""}
                disabled={disable}
              />
            </div>
            <div className="col-6">
              <label>Specimen: </label>
              <input
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("specimen")] = "";
                  setSpecimen(e.target.value);
                }}
                value={specimen}
                className={emptyFields.includes("specimen") ? "error" : ""}
                disabled={disable}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label>Heading: </label>
              <input
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("heading")] = "";
                  setHeading(e.target.value);
                }}
                value={heading}
                className={emptyFields.includes("heading") ? "error" : ""}
                disabled={disable}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label>Remarks: </label>
              <input
                type="text"
                onChange={(e) => setRemarks(e.target.value)}
                value={remarks}
                // className={emptyFields.includes('remarks') ? 'error' : ''}
                disabled={disable}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label>Outsourced: </label>
              <select
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("outsourced")] = "";
                  setOutsourced(e.target.value);
                }}
                value={outsourced}
                className={emptyFields.includes("outsourced") ? "error" : ""}
                disabled={disable}
              >
                <option value=""></option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </div>
          </div>
        </fieldset>

        <div className="secondSection">
          <div className="row">
            <div className="col-12">
              <label>Category: </label>
              <input
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("category")] = "";
                  setCategory(e.target.value);
                }}
                value={category}
                className={emptyFields.includes("category") ? "error" : ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <label>Category Heading:</label>
              <input
                type="text"
                onChange={(e) => {
                  setCategoryHeading(e.target.value);
                }}
                value={categoryHeading}
                // className={emptyFields.includes('categoryHeading') ? 'error' : ''}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <label>UOM: </label>
              <input
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("UOM")] = "";
                  setUOM(e.target.value);
                }}
                value={UOM}
                className={emptyFields.includes("UOM") ? "error" : ""}
              />
            </div>
          </div>

          <div className="row">
            <label>Male Ref Range: </label>
            <div className="col-4">
              {/* <label>Starting Range: </label> */}
              <input
                type="number"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("startMRef")] = "";
                  setStartMRef(e.target.value);
                }}
                value={startMRef}
                className={emptyFields.includes("startMRef") ? "error" : ""}
              />
            </div>
            <div className="col-2">
              {/* <label>Operator: </label> */}
              <select
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("operatorM")] = "";
                  setOperatorM(e.target.value);
                }}
                value={operatorM}
                className={emptyFields.includes("operatorM") ? "error" : ""}
              >
                <option value=""></option>
                <option value="-">-</option>
                <option value=">">&#62;</option>
                <option value="<">&#60;</option>
                <option value=">=">&#8805;</option>
                <option value="<=">&#8924;</option>
              </select>
            </div>
            <div className="col-4">
              {/* <label>Ending Range:</label> */}
              <input
                type="number"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("endMRef")] = "";
                  setEndMRef(e.target.value);
                }}
                value={endMRef}
                className={emptyFields.includes("endMRef") ? "error" : ""}
              />
            </div>
          </div>

          <div className="row">
            <label>Female Ref Range: </label>
            <div className="col-4">
              {/* <label>Starting Range: </label> */}
              <input
                type="number"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("startFRef")] = "";
                  setStartFRef(e.target.value);
                }}
                value={startFRef}
                className={emptyFields.includes("startFRef") ? "error" : ""}
              />
            </div>
            <div className="col-2">
              {/* <label>Operator: </label> */}
              <select
                type="text"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("operatorF")] = "";
                  setOperatorF(e.target.value);
                }}
                value={operatorF}
                className={emptyFields.includes("operatorF") ? "error" : ""}
              >
                <option value=""></option>
                <option value="-">-</option>
                <option value=">">&#62;</option>
                <option value="<">&#60;</option>
                <option value=">=">&#8805;</option>
                <option value="<=">&#8924;</option>
              </select>
            </div>
            <div className="col-4">
              {/* <label>Ending Range:</label> */}
              <input
                type="number"
                onChange={(e) => {
                  emptyFields[emptyFields.indexOf("endFRef")] = "";
                  setEndFRef(e.target.value);
                }}
                value={endFRef}
                className={emptyFields.includes("endFRef") ? "error" : ""}
              />
            </div>
          </div>

          <div className="row">
            <label>Baby Ref Range: </label>
            <div className="col-4">
              <input
                type="number"
                onChange={(e) => setStartBRef(e.target.value)}
                value={startBRef}
                className={emptyFields.includes("startBRef") ? "error" : ""}
              />
            </div>
            <div className="col-2">
              {/* <label>Operator: </label> */}
              <select
                type="text"
                onChange={(e) => setOperatorB(e.target.value)}
                value={operatorB}
                className={emptyFields.includes("operatorB") ? "error" : ""}
              >
                <option value=""></option>
                <option value="-">-</option>
                <option value=">">&#62;</option>
                <option value="<">&#60;</option>
                <option value=">=">&#8805;</option>
                <option value="<=">&#8924;</option>
              </select>
            </div>
            <div className="col-4">
              {/* <label>Ending Range:</label> */}
              <input
                type="number"
                onChange={(e) => setEndBRef(e.target.value)}
                value={endBRef}
                className={emptyFields.includes("endBRef") ? "error" : ""}
              />
            </div>
          </div>
        </div>

        <button className="col-5 submit btnConfirm" id="submitButton">
          Add Test
        </button>
      </form>
      <div className="thirdSection">
        {inputTest && <h5>Related subcategories</h5>}
        {inputTest &&
          inputTest.subCategories &&
          inputTest.subCategories.map((subCategory) => (
            <TestSubCategoryDetails
              key={subCategory._id}
              subCategory={subCategory}
            />
          ))}
      </div>
    </div>
  );
};

export default TestDataForm;
