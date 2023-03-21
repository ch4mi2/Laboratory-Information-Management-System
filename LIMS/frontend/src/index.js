import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'datatables.net-bs5';
import '../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import './css/dataTablesCustom.css'

import './index.css';

import './css/SideNavStyles/sideNavBar.css';
//import './css/TestDataStyles/testData.css';
//import './css/MachineStyles/machineDetails.css';
///import './css/MachineStyles/machineDetails.css';
import App from './App';
import { PatientContextProvider } from './context/PatientContext';
import { SamplesContextProvider } from './context/SampleContext';
import { MachinesContextProvider } from './context/MachineContext';
import { ExpensesContextProvider } from './context/ExpensesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PatientContextProvider>
      <SamplesContextProvider>
        <ExpensesContextProvider>
          <MachinesContextProvider>
            <App />
          </MachinesContextProvider>
        </ExpensesContextProvider>
      </SamplesContextProvider>
    </PatientContextProvider>
  </React.StrictMode>
);
