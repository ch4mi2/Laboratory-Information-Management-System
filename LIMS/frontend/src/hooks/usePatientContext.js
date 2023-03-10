import { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';

export const usePatientContext = () => {
  const context = useContext(PatientContext);

  if (!context) {
    throw Error(
      'usePatientContext must be used inside a PatientContextProvider'
    );
  }

  return context;
};
