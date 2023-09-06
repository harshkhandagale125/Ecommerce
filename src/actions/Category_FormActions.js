import axios from 'axios';

export const updateFormData = (field, value) => ({
    type: 'UPDATE_FORM_DATA',
    field,
    value,
  });
  
  export const resetFormData = () => ({
    type: 'RESET_FORM_DATA',
  });