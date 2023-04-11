import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5';
import '../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css'


import './index.css';

import './css/SideNavStyles/sideNavBar.css';
//import './css/MachineStyles/machineDetails.css';
///import './css/MachineStyles/machineDetails.css';
import App from './App';
import { PatientContextProvider } from './context/PatientContext';
import { SamplesContextProvider } from './context/SampleContext';
import { MachinesContextProvider } from './context/MachineContext';
import { ExpensesContextProvider } from './context/ExpensesContext';
import { TestDataContextProvider } from './context/TestDataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientContextProvider>
      <SamplesContextProvider>
        <ExpensesContextProvider>
          <MachinesContextProvider>
            <TestDataContextProvider>
              <App />
            </TestDataContextProvider>
          </MachinesContextProvider>
        </ExpensesContextProvider>
      </SamplesContextProvider>
    </PatientContextProvider>
  </React.StrictMode>
);
