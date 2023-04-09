import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import logo from '../assets/common/mediLineLogo.webp';
import '../css/TestResultStyles/testResultPreview.css'

const TestResultPreview = () => {
  const componentRef = useRef();

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => componentRef.current}
      />
      <div className="report" ref={componentRef}>
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
          <h2>CONFIDENTIAL LABORATORY REPORT</h2>
        </div>
        <div className="reportBody">
          <div>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
            <p>text</p>
          </div>
          <div>
            <p>.................</p>
            <p>Signature</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResultPreview;
