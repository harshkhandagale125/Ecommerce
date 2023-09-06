export const updateFormData = (field, value) => ({
  type: 'UPDATE_BRAND_FORM_DATA',
  field,
  value,
});

export const resetFormData = () => ({
  type: 'RESET_BRAND_FORM_DATA',
});