import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import PatientList from './pages/PatientList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/patient-list" element={<PatientList />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
