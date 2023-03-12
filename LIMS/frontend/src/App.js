import { BrowserRouter, Routes, Route } from 'react-router-dom';


// pages and components
import PatientList from './pages/PatientList';
import PatientProfile from './pages/PatientProfile';
import EditPatientForm from './components/PatientComponents/EditPatientForm';
import CreatePatientForm from './components/PatientComponents/CreatePatientForm';
import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import PendingAccession from './pages/PendingAccession'
import Accessed from './pages/Accessed'

// assets
import mediLineLogo from './assets/common/mediLineLogo.webp';
import AddBill from './pages/AddBill';
function App() {
  return (
    <div className="App">
      <HeaderComponent
        profileImgSrc={''}
        logoImgSrc={mediLineLogo}
        username={''}
      />
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/patient-list" element={<PatientList />} />
            <Route path="/create-patient" element={<CreatePatientForm />} />
            <Route path="/patient-profile/:id" element={<PatientProfile />} />
            <Route path="/patient-profile/:id/addBill" element={<AddBill />} />
            <Route path="/patient-profile/:id/edit" element={<EditPatientForm />} />
            <Route path="/pendingAccession" element={<PendingAccession />}/>
            <Route path="/Accessed" element={<Accessed />}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
