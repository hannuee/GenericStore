import productService from '../services/products'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PRODUCTS':
      return action.data
    default: return state
  }
}

// Action creators:

export const initializeProducts = () => {
  return async dispatch => {
    const products = await productService.getAll()
    dispatch({
      type: 'INIT_PRODUCTS',
      data: products
    })
  }
}

export default reducer