// actions/formActions.js

export const updateFormData = (field, value) => ({
    type: 'UPDATE_FORM_DATA',
    field,
    value,
  });
  
  export const resetFormData = () => ({
    type: 'RESET_FORM_DATA',
  });

  export const updateItem = (updatedData) => {
    return {
        type: 'UPDATE_ITEM',
        payload: updatedData,
    };
};
  

export const setUserRole = (role) => ({
  type: 'SET_USER_ROLE',
  payload: role,
});




