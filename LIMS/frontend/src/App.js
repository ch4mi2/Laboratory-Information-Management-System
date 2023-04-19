import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// assets
import mediLineLogo from './assets/common/mediLineLogo.webp';

// pages and components
import PatientList from './pages/PatientList';
import PatientProfile from './pages/PatientProfile';
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
import ViewStat from './pages/ViewStats';
import AddMachines from './pages/AddMachines';
import PendingTestResults from './pages/PendingTestResults';
//import Machines from './pages/machineHistory';
import UpdateExpenses from './pages/UpdateExpenses';
import AddTestResults from './pages/AddTestResults';
import TestResultPreview from './pages/TestResultPreview';
import AddBill from './pages/AddBill';
import PrintBill from './pages/PrintBill';
import AllBills from './components/BillComponent/AllBills';
import ShowABill from './components/BillComponent/ShowABill';
import TransactionHistory from './pages/TransactionHistory';
import EditBill from './pages/EditBill';
import AddStaff from './pages/AddStaff';
import LabInfo from './pages/LabInfo';
import MachineList from './pages/machineList';
import MachineHistory from './pages/machineHistory';
import AddMachineParts from './pages/AddMachineParts';
import MachineServiceDates from './pages/AddServiceDates';
import ViewMachineService from './pages/viewServiceDates';
import FinancialReport from './pages/FinancialReport';
import EditPatient from './pages/EditPatient';
import UpdateMachine from './pages/UpdateMachines'
import UpdateMachineParts from './pages/UpdateMachineParts'
import UpdateMachineService from './pages/UpdateMachineServices'
import LoginAdmin from './pages/LoginAdmin';
import LoginStaff from './pages/LoginStaff';
import Welcome from './pages/Welcome';
import AllStaff from './pages/AllStaff';
import StaffProfile from './pages/StaffPorfile';
import UpdateProfile from './pages/UpdateProfile';
import AdminProfile from './pages/AdminProfile';


function App() {
  const {user} = useAuthContext()
  return (
    <Router>
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
      
        <div className="container-fluid">
          <div className="row">
            <div className="col-3 col-sm-3 col-md-2 col-lg-2">
              <SideNavBar />
            </div>
            <div className="col-9 col-sm-8 col-md-8 col-lg-8 mt-4">
              <div className="pages">
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
                  <Route path="/AdminProfile" element={<AdminProfile />} />
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
                    element={<EditPatient />}
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

                  {/* <Route path="/machines" element={<Machines />} /> */}
                  <Route path="/addMachines" element={<AddMachines />}></Route>
                  <Route path="/machineList" element={<MachineList />}></Route>
                  <Route path="/machineHistory/:id" element={<MachineHistory />}></Route>
                  <Route path="/AddMachineParts" element={<AddMachineParts/>}></Route>
                  <Route path="/AddServiceDates" element={<MachineServiceDates />}></Route>
                  <Route path="/viewServiceDetails/:id" element={<ViewMachineService/>}></Route>
                  <Route path="/updateMachine/:id" element={<UpdateMachine/>}></Route>
                  <Route path="/updateMachineParts/:id" element={<UpdateMachineParts/>}></Route>
                  <Route path="/updateMachineService/:id" element={<UpdateMachineService/>}></Route>

                  <Route path="/testData" element={<TestData />} />
                  <Route path="/createTest" element={<CreateTest />} />
                  <Route path="/viewTest/:id" element={<ViewTest />} />
                  <Route path="/updateTest" element={<UpdateTest />} />
                  <Route path="/updateCategory" element={<UpdateCategory />} />
                  <Route path="/viewStats" element={<ViewStat />} />

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
                    path="/AllStaff"
                    element={<AllStaff/>}
                  />
                  <Route
                    path="/StaffProfile"
                    element={<StaffProfile /> }
                  />
                  <Route
                    path="/financialReport"
                    element={<FinancialReport />}
                  />
                  <Route
                    path='/addStaff'
                    element={<AddStaff/>}
          />
                  <Route
                    path="/labInfo"
                    element={<LabInfo />}
                  />
                  <Route
                    path="/StaffLogin"
                    element={!user ? <LoginStaff /> : <Navigate to ="/StaffProfile"/>}
                  />
                  <Route
                    path="/AdminLogin"
                    element={!user ? <LoginAdmin /> : <Navigate to ="/AdminProfile"/>}
                  />
                  <Route
                    path="/Welcome"
                    element={<Welcome/>}
                  />
                  <Route
                    path="/UpdateProfile"
                    element={<UpdateProfile />}
                  />

                </Routes>
              </div>
            </div>
            <div className="col-0 col-sm-1 col-md-2 col-lg-2"></div>
          </div>
        </div>
      
    </div>
    </Router>
  );
}

export default App;
