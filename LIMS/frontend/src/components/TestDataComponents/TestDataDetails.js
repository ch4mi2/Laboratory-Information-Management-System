const TestDataDetails = ({ Test }) => {
    return (
        <div className="test-data-details">
            <h4>{Test.testName}</h4>
            <p><strong>Test ID: </strong>{Test.testID}</p>
            <p><strong>Short Name: </strong>{Test.shortName}</p>
            <p><strong>Outsourced: </strong>{Test.outsourced}</p>
            <p><strong>Price Rs: </strong>{Test.price}</p>
        </div>
    );
}
 
export default TestDataDetails;