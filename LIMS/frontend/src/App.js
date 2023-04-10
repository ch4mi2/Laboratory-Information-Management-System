import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// assets
import mediLineLogo from './assets/common/mediLineLogo.webp';

// pages and components
import PatientList from './pages/PatientList';
import PatientProfile from './pages/PatientProfile';
import EditPatientForm from './components/PatientComponents/EditPatientForm';
import CreatePatientForm from './components/PatientComponents/CreatePatientForm';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import PendingAccession from './pages/PendingAccession';
import Expenseslist from './pages/Expenseslist';
import Accessed from './pages/Accessed';
import TestData from './pages/TestData';
import SideNavBar from './components/SideNavComponent/SideNavBar';
import AddExpenses from './pages/AddExpenses';
import CreateTest from './pages/CreateTest';
import ViewTest from './pages/ViewTest';
import UpdateTest from './pages/UpdateTest';
import UpdateCategory from './pages/UpdateCategory';
import AddMachines from './pages/AddMachines';
import PendingTestResults from './pages/PendingTestResults';
import Machines from './pages/machineHistory';
import UpdateExpenses from './pages/UpdateExpenses';
import AddTestResults from './pages/AddTestResults';
import TestResultPreview from './pages/TestResultPreview';
import AddBill from './pages/AddBill';
import PrintBill from './pages/PrintBill';
import AllBills from './components/BillComponent/AllBills';
import ShowABill from './components/BillComponent/ShowABill';
import TransactionHistory from './pages/TransactionHistory';
import EditBill from './pages/EditBill';
import LabInfo from './pages/LabInfo';

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Mediline</title>
          <meta name="description" content="Mediline LIMS" />
        </Helmet>
      </HelmetProvider>
      <HeaderComponent
        profileImgSrc={''}
        logoImgSrc={mediLineLogo}
        username={''}
      />
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-sm-3 col-md-2 col-lg-2">
              <SideNavBar />
            </div>
            <div className="col-9 col-sm-8 col-md-8 col-lg-8 mt-4">
              <div className="pages mt-5">
                <Routes>
                  <Route path="/patient-list" element={<PatientList />} />
                  <Route
                    path="/create-patient"
                    element={<CreatePatientForm />}
                  />
                  <Route
                    path="/patient-profile/:id"
                    element={<PatientProfile />}
                  />
                  <Route
                    path="/view-bills/:billId/edit"
                    element={<EditBill />}
                  />
                  <Route path="/view-bills" element={<AllBills />} />

                  <Route
                    path="/patient-profile/:id/addBill"
                    element={<AddBill />}
                  />
                  <Route path="/bill/:id" element={<ShowABill />} />
                  <Route
                    path="/patient-profile/:id/addBill/print-bill"
                    element={<PrintBill />}
                  />
                  <Route
                    path="/patient-profile/:id/edit"
                    element={<EditPatientForm />}
                  />
                  <Route
                    path="/patient-profile/:id/transactionHistory"
                    element={<TransactionHistory />}
                  />
                  <Route
                    path="/pendingAccession"
                    element={<PendingAccession />}
                  />

                  <Route path="/accessed" element={<Accessed />} />
                  <Route path="/machines" element={<Machines />} />
                  <Route path="/addMachines" element={<AddMachines />}></Route>

                  <Route path="/testData" element={<TestData />} />
                  <Route path="/createTest" element={<CreateTest />} />
                  <Route path="/viewTest/:id" element={<ViewTest />} />
                  <Route path="/updateTest" element={<UpdateTest />} />
                  <Route path="/updateCategory" element={<UpdateCategory />} />

                  <Route path="/expenseslist" element={<Expenseslist />} />
                  <Route path="/addExpenses" element={<AddExpenses />} />
                  <Route
                    path="/editExpenses/:id"
                    element={<UpdateExpenses />}
                  />

                  <Route
                    path="/pendingTests"
                    element={<PendingTestResults />}
                  />
                  <Route
                    path="/addTestResults/:id"
                    element={<AddTestResults />}
                  />
                  <Route
                    path="/testResultPreview/:id"
                    element={<TestResultPreview />}
                  />
                  <Route
                    path="/labInfo"
                    element={<LabInfo />}
                  />
                </Routes>
              </div>
            </div>
            <div className="col-0 col-sm-1 col-md-2 col-lg-2"></div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
