// productActions.js

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';
export const FETCH_BRANDS = 'FETCH_BRANDS';
export const SELECT_BRAND = 'SELECT_BRAND';

export const fetchProducts = (products) => {
  return {
    type: FETCH_PRODUCTS,
    payload: products,
  };
};

export const fetchBrands = (brands) => {
  return {
    type: FETCH_BRANDS,
    payload: brands,
  };
};

export const selectBrand = (brandId) => {
  return {
    type: SELECT_BRAND,
    payload: brandId,
  };
};