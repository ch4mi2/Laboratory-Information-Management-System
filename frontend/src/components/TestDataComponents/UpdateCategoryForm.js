import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UpdateCategoryForm = ({ subCategory }) => {
  const [categoryHeading, setCategoryHeading] = useState(
    subCategory.categoryHeading
  );
  const [category, setCategory] = useState(subCategory.category);
  const [UOM, setUOM] = useState(subCategory.UOM);
  const [startMRef, setStartMRef] = useState(subCategory.startMRef);
  const [operatorM, setOperatorM] = useState(subCategory.operatorM);
  const [endMRef, setEndMRef] = useState(subCategory.endMRef);
  const [startFRef, setStartFRef] = useState(subCategory.startFRef);
  const [operatorF, setOperatorF] = useState(subCategory.operatorF);
  const [endFRef, setEndFRef] = useState(subCategory.endFRef);
  const [startBRef, setStartBRef] = useState(subCategory.startBRef);
  const [operatorB, setOperatorB] = useState(subCategory.operatorB);
  const [endBRef, setEndBRef] = useState(subCategory.endBRef);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleUpdate = async (e) => {
    console.log("Some");
    e.preventDefault();

    const newCategory = {
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

    const response = await fetch("/api/tests/category/" + subCategory._id, {
      method: "PATCH",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
      MySwal.fire({
        title: "Error",
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1000,
      });
    }
    if (response.ok) {
      if (response.status === 200) {
        MySwal.fire({
          title: "Success",
          text: "Successfully Updated Category",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          customClass: "alerts",
          timerProgressBar: true,
        }).then(() => {
          navigate(-1);
        });
      }
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      customClass: "alerts",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch("/api/tests/category/" + subCategory._id, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();

        if (!response.ok) {
          setError(json.error);
        }
        if (response.ok) {
          MySwal.fire({
            title: "Success",
            text: "Successfully Deleted Category",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
          }).then(() => {
            navigate(-1);
          });
        }
      }
    });
  };

  return (
    <form className="secondSection">
      <div className="row">
        <div className="col-12">
          <label>Category: </label>
          <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
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
            onChange={(e) => setCategoryHeading(e.target.value)}
            value={categoryHeading}
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
      <div className="row">
        <button className="col-5 submit btnConfirm" onClick={handleUpdate}>
          Update Category
        </button>
        <button className="col-4 delete btnCancel" onClick={handleDelete}>
          Delete Category
        </button>
      </div>
    </form>
  );
};

export default UpdateCategoryForm;
