// reducers/index.js
import { combineReducers } from 'redux';


// setting initial states
const initialState = {
  formData: {
    itemName: '',
    itemPrice: '',
    itemColor: '',
    BrandId: '',
    itemStock: '',
    imageUrl: '',
    itemSpecs:'',
  },
  userState: {
    userRole: 'user', // Ensure this is correctly set
  }

};

// there are reducers that perform actions
const formReducer = (state = initialState.formData, action) => {
  switch (action.type) {
    case 'UPDATE_FORM_DATA':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM_DATA':
      return initialState.formData;
    default:
      return state;
  }
};


const userReducer = (state = initialState.userState, action) => {
  switch (action.type) {
    case 'SET_USER_ROLE':
      return {
        ...state,
        userRole: action.payload,
      };
    default:
      return state;
  }
}

const brandstate={
    formData : {
      Name: '',
      categoryid: '',
      imageUrl: ''
    }
  };
  const BrandReducer = (state = brandstate.formData, action) => {
    switch (action.type) {
      case 'UPDATE_BRAND_FORM_DATA':
        return { ...state, [action.field]: action.value };
      case 'RESET_BRAND_FORM_DATA':
        return brandstate.formData;
      default:
        return state;
    }
  };

  const CategoryState = {
    formData: {
      CategoryName: '',
      category_image:''
        },
    categoryData: [], // Array to store fetched category data
  };
  
  const CategoryFormReducer = (state = CategoryState.formData, action) => {
    switch (action.type) {
      case 'UPDATE_FORM_DATA':
        return { ...state, [action.field]: action.value };
      case 'RESET_FORM_DATA':
        return CategoryState.formData;
      default:
        return state;
    }
  };
  
  const CategoryListReducer = (state = CategoryState.categoryData, action) => {
    switch (action.type) {
      case 'FETCH_CATEGORY_SUCCESS':
        return action.payload;
      case 'FETCH_CATEGORY_ERROR':
        return CategoryState.categoryData;
      default:
        return state;
    }
  };

const rootReducer = combineReducers({
  form: formReducer, 
  brand: BrandReducer,
  categoryform: CategoryFormReducer,
  categorylist: CategoryListReducer

  // form is the key, i.e the state maintained in productFrom.js -->  const formData = useSelector((state) => state.form);
});

export default rootReducer;

