import React from 'react';
import ReactDOM from 'react-dom/client';





//datatable modules
import 'datatables.net-bs5';
import 'datatables.net-buttons-bs5'
import "datatables.net-buttons/js/dataTables.buttons.js"
import "datatables.net-buttons/js/buttons.colVis.js"
import "datatables.net-buttons/js/buttons.flash.js"
import "datatables.net-buttons/js/buttons.html5.js"
import "datatables.net-buttons/js/buttons.print.js"
import "jszip/dist/jszip.min.js";
import pdfMake from '../node_modules/pdfmake/build/pdfmake';
import pdfFonts from '../node_modules/pdfmake/build/vfs_fonts';

//datatable styles
import '../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css'
import '../node_modules/datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css'

//styles
import './css/SideNavStyles/sideNavBar.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import { PatientContextProvider } from './context/PatientContext';
import { SamplesContextProvider } from './context/SampleContext';
import { MachinesContextProvider } from './context/MachineContext';
import { ExpensesContextProvider } from './context/ExpensesContext';
import { TestDataContextProvider } from './context/TestDataContext';



pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
