import { 
        CATEGORIES_LIST, 
        CATEGORIE_SELECTED, 
        CATEGORIE_PRODUCTS,
        PRODUCT_SELECTED,
        PREMIUM_SELECTED
      } 
  from './categories.action'

const initialState = {
    categories: [],
    categorieSelected:'',
    categorieProducts: [],
    product: '',
    premiumSelected: ''
  };

  export const CategoriesReducer = (state = initialState, action) => {
    switch (action.type) {
      case PREMIUM_SELECTED:
      return {
        ...state,
        premiumSelected: action.payload
      }
      case CATEGORIES_LIST:
        return {
          ...state,
          categories: action.payload
        }
        case CATEGORIE_SELECTED:
        return {
          ...state,
          categorieSelected: action.payload
        }
        case CATEGORIE_PRODUCTS:
        return {
          ...state,
          categorieProducts: action.payload
        }
        case PRODUCT_SELECTED:
        return {
          ...state,
          product: action.payload
        }
      default:
        return state;
    }
  };