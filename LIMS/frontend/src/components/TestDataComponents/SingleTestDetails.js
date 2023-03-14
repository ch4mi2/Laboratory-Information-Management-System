import { Link } from "react-router-dom";

const SingleTestDetails = ({ Test }) => {
    return (
        <Link to={`/UpdateTest`} state={Test}>
                    
        <div className="firstSection">
                <h4>
                    {Test.testName}
                </h4>
                <div className="row">
                    <div className="col-6">
                        <strong>Test ID: </strong>
                        {Test.testID}
                    </div>
                    
                    <div className="col-6">
                        <strong>Short Name: </strong>
                        {Test.shortName}
                    </div>
                    
                </div>
                
                <div className="row">
                    <div className="col-6">
                        <strong>Price Rs: </strong>
                        {Test.price}
                    </div>
                    <div className="col-6">
                        <strong>Specimen </strong>
                        {Test.specimen}
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-12">
                        <strong>Heading: </strong>
                        {Test.heading}
                    </div>
                </div>

                {Test.remarks &&
                <div className="row" {...Test.remarks? "" : "hidden"}>
                    <div className="col-12">
                        <strong>Remarks: </strong> 
                        {Test.remarks}
                    </div>
                </div>
                }
                    
                
                <div className="row">
                    <div className="col-6">
                        <strong>Outsourced: </strong> 
                        {Test.outsourced}
                    </div>
                </div>
            </div>

            </Link>
    );
}
 
export default SingleTestDetails;