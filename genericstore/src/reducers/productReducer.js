import productService from '../services/products'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_AVAILABLE_PRODUCTS':
      return action.data
    default: return state
  }
}

// Action creators:

export const initializeAvailableProducts = () => {
  return async dispatch => {
    const products = await productService.getAvailable()
    dispatch({
      type: 'INIT_AVAILABLE_PRODUCTS',
      data: products
    })
  }
}

export default reducer