import { createContext, useReducer } from 'react';

import {
  SET_PATIENTS,
  CREATE_PATIENT,
  DELETE_PATIENT,
  UPDATE_PATIENT,
} from './patientContextDeclarations';

export const PatientContext = createContext();

// create the reducer
export const patientsReducer = (state, action) => {
  switch (action.type) {
    case SET_PATIENTS:
      return {
        patients: action.payload,
      };

    case CREATE_PATIENT:
      return {
        patients: [action.payload, ...state.patients],
      };

    case DELETE_PATIENT:
      return {
        patients: state.patients.filter((p) => p._id !== action.payload._id),
      };
    case UPDATE_PATIENT:
      return {
        ...state,
        patients: state.patients.map((patient) =>
          patient._id === action.payload._id ? action.payload : patient
        ),
      };

    default:
      return state;
  }
};

export const PatientContextProvider = ({ children }) => {
  // Use the reducer
  const [state, dispatch] = useReducer(patientsReducer, {
    patients: null,
  });

  return (
    <PatientContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientContext.Provider>
  );
};
