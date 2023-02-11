import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePatientForm from './components/PatientComponents/CreatePatientForm';

// pages and components
import PatientList from './pages/PatientList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/patient-list" element={<PatientList />} />
            <Route path="/create-patient" element={<CreatePatientForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
