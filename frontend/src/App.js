import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePatientForm from './components/PatientComponents/CreatePatientForm';

// pages and components
import PatientList from './pages/PatientList';
import PatientProfile from './pages/PatientProfile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/patient-list" element={<PatientList />} />
            <Route path="/create-patient" element={<CreatePatientForm />} />
            <Route path="/patient-profile/:id" element={<PatientProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
