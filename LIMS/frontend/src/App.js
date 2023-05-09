import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { Helmet, HelmetProvider } from "react-helmet-async";

// assets
import mediLineLogo from "./assets/common/mediLineLogo.webp";

// pages and components`
import InventoryUpdate from "./pages/InventoryUpdateForm";
import Inventory from "./pages/Inventory";
import FormInventory from "./pages/InventoryAddForm";
import PatientList from "./pages/PatientList";
import PatientProfile from "./pages/PatientProfile";
import CreatePatientForm from "./components/PatientComponents/CreatePatientForm";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import PendingAccession from "./pages/PendingAccession";
import Expenseslist from "./pages/Expenseslist";
import Accessed from "./pages/Accessed";
import TestData from "./pages/TestData";
import SideNavBar from "./components/SideNavComponent/SideNavBar";
import AddExpenses from "./pages/AddExpenses";
import CreateTest from "./pages/CreateTest";
import ViewTest from "./pages/ViewTest";
import UpdateTest from "./pages/UpdateTest";
import UpdateCategory from "./pages/UpdateCategory";
import ViewStat from "./pages/ViewStats";
import AddMachines from "./pages/AddMachines";
import PendingTestResults from "./pages/PendingTestResults";
//import Machines from './pages/machineHistory';
import UpdateExpenses from "./pages/UpdateExpenses";
import AddTestResults from "./pages/AddTestResults";
import TestResultPreview from "./pages/TestResultPreview";
import AddBill from "./pages/AddBill";
import PrintBill from "./pages/PrintBill";
import AllBills from "./components/BillComponent/AllBills";
import ShowABill from "./components/BillComponent/ShowABill";
import TransactionHistory from "./pages/TransactionHistory";
//import EditBill from './pages/EditBill';
import AddStaff from "./pages/AddStaff";
import LabInfo from "./pages/LabInfo";
import MachineList from "./pages/machineList";
import MachineHistory from "./pages/machineHistory";
import AddMachineParts from "./pages/AddMachineParts";
import MachineServiceDates from "./pages/AddServiceDates";
import ViewMachineService from "./pages/viewServiceDates";
import FinancialReport from "./pages/FinancialReport";
import EditPatient from "./pages/EditPatient";
import UpdateMachine from "./pages/UpdateMachines";
import UpdateMachineParts from "./pages/UpdateMachineParts";
import UpdateMachineService from "./pages/UpdateMachineServices";
import LoginAdmin from "./pages/LoginAdmin";
import LoginStaff from "./pages/LoginStaff";
import Welcome from "./pages/Welcome";
import AllStaff from "./pages/AllStaff";
import StaffProfile from "./pages/StaffPorfile";
import UpdateProfile from "./pages/UpdateProfile";
import AdminProfile from "./pages/AdminProfile";
import CompletedTestResults from "./pages/CompletedTestResults";
import Dashboard from "./pages/Dashboard";
import TopCustomers from "./pages/TopCustomers";
import MachineServiceBill from "./pages/MachineServiceBill";
import MachinePartsBill from "./pages/MachinePartsBill";
import EditBillNew from "./pages/EditBillNew";
import Salary from "./pages/salary";

function App() {
  const { user } = useAuthContext();
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
          profileImgSrc={""}
          logoImgSrc={mediLineLogo}
          username={""}
        />

        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-3 col-sm-3 col-md-2 col-lg-2">
              <SideNavBar />
            </div>
            <div className="col-9 col-sm-8 col-md-8 col-lg-9 mt-4">
              <div className="pages">
                <Routes>
                  <Route
                    path="/patient-list"
                    element={user ? <PatientList /> : <Welcome />}
                  />
                  <Route
                    path="/create-patient"
                    element={user ? <CreatePatientForm /> : <Welcome />}
                  />
                  <Route
                    path="/patient-profile/:id"
                    element={user ? <PatientProfile /> : <Welcome />}
                  />
                  <Route
                    path="/view-bills/:billId/edit"
                    element={user ? <EditBillNew /> : <Welcome />}
                  />
                  <Route path="/Salary" element={<Salary />} />
                  <Route
                    path="/AdminProfile"
                    element={user ? <AdminProfile /> : <Welcome />}
                  />
                  <Route
                    path="/view-bills"
                    element={user ? <AllBills /> : <Welcome />}
                  />

                  <Route
                    path="/patient-profile/:id/addBill"
                    element={user ? <AddBill /> : <Welcome />}
                  />
                  <Route
                    path="/bill/:id"
                    element={user ? <ShowABill /> : <Welcome />}
                  />
                  <Route
                    path="/patient-profile/:id/addBill/print-bill"
                    element={user ? <PrintBill /> : <Welcome />}
                  />
                  <Route
                    path="/patient-profile/:id/edit"
                    element={user ? <EditPatient /> : <Welcome />}
                  />
                  <Route
                    path="/patient-profile/:id/transactionHistory"
                    element={user ? <TransactionHistory /> : <Welcome />}
                  />
                  <Route
                    path="/customer-leaderboard"
                    element={user ? <TopCustomers /> : <Welcome />}
                  />
                  <Route
                    path="/pendingAccession"
                    element={user ? <PendingAccession /> : <Welcome />}
                  />

                  <Route
                    path="/inventory"
                    element={user ? <Inventory /> : <Welcome />}
                  />

                  <Route
                    path="/accessed"
                    element={user ? <Accessed /> : <Welcome />}
                  />

                  {/* <Route path="/machines" element={<Machines />} /> */}
                  <Route
                    path="/addMachines"
                    element={user ? <AddMachines /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/machineList"
                    element={user ? <MachineList /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/machineHistory/:id"
                    element={user ? <MachineHistory /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/AddMachineParts"
                    element={user ? <AddMachineParts /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/AddServiceDates"
                    element={user ? <MachineServiceDates /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/viewServiceDetails/:id"
                    element={user ? <ViewMachineService /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/updateMachine/:id"
                    element={user ? <UpdateMachine /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/updateMachineParts/:id"
                    element={user ? <UpdateMachineParts /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/updateMachineService/:id"
                    element={user ? <UpdateMachineService /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/serviceBill/:id"
                    element={user ? <MachineServiceBill /> : <Welcome />}
                  ></Route>
                  <Route
                    path="/machinePartsBill/:id"
                    element={user ? <MachinePartsBill /> : <Welcome />}
                  ></Route>

                  <Route
                    path="/testData"
                    element={user ? <TestData /> : <Welcome />}
                  />
                  <Route
                    path="/createTest"
                    element={user ? <CreateTest /> : <Welcome />}
                  />
                  <Route
                    path="/viewTest/:id"
                    element={user ? <ViewTest /> : <Welcome />}
                  />
                  <Route
                    path="/updateTest"
                    element={user ? <UpdateTest /> : <Welcome />}
                  />
                  <Route
                    path="/updateCategory"
                    element={user ? <UpdateCategory /> : <Welcome />}
                  />
                  <Route
                    path="/viewStats"
                    element={user ? <ViewStat /> : <Welcome />}
                  />

                  <Route
                    path="/expenseslist"
                    element={user ? <Expenseslist /> : <Welcome />}
                  />
                  <Route
                    path="/addExpenses"
                    element={user ? <AddExpenses /> : <Welcome />}
                  />
                  <Route
                    path="/editExpenses/:id"
                    element={user ? <UpdateExpenses /> : <Welcome />}
                  />

                  <Route
                    path="/pendingTests"
                    element={user ? <PendingTestResults /> : <Welcome />}
                  />
                  <Route
                    path="/addTestResults/:id"
                    element={user ? <AddTestResults /> : <Welcome />}
                  />
                  <Route
                    path="/testResultPreview/:id"
                    element={user ? <TestResultPreview /> : <Welcome />}
                  />
                  <Route
                    path="/AllStaff"
                    element={user ? <AllStaff /> : <Welcome />}
                  />
                  <Route
                    path="/StaffProfile"
                    element={user ? <StaffProfile /> : <Welcome />}
                  />
                  <Route
                    path="/financialReport"
                    element={user ? <FinancialReport /> : <Welcome />}
                  />
                  <Route
                    path="/addStaff"
                    element={user ? <AddStaff /> : <Welcome />}
                  />
                  <Route
                    path="/labInfo"
                    element={user ? <LabInfo /> : <Welcome />}
                  />
                  <Route
                    path="/StaffLogin"
                    element={
                      !user ? <LoginStaff /> : <Navigate to="/dashboard" />
                    }
                  />
                  <Route
                    path="/AdminLogin"
                    element={
                      !user ? <LoginAdmin /> : <Navigate to="/AdminProfile" />
                    }
                  />
                  <Route path="/Welcome" element={<Welcome />} />
                  <Route
                    path="/UpdateProfile"
                    element={user ? <UpdateProfile /> : <Welcome />}
                  />
                  <Route
                    path="/completedTests"
                    element={user ? <CompletedTestResults /> : <Welcome />}
                  />
                  <Route
                    path="/completedTests"
                    element={user ? <CompletedTestResults /> : <Welcome />}
                  />

                  <Route
                    path="/InventoryForm"
                    element={user ? <FormInventory /> : <Welcome />}
                  />
                  <Route
                    path="/inventoryRoutes"
                    element={user ? <FormInventory /> : <Welcome />}
                  />
                  <Route
                    path="/updateInventory/:id"
                    element={user ? <InventoryUpdate /> : <Welcome />}
                  />
                  <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Welcome />}
                  />
                  <Route exact path="/" element={<Dashboard />} />
                </Routes>
              </div>
            </div>
            <div className="col-0 col-sm-1 col-md-2 col-lg-1"></div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
