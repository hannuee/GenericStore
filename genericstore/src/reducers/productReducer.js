import productService from '../services/products'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_PRODUCTS':
      return action.data
    case 'ADD_NEW_PRODUCT':
      return state.concat(action.data)
    case 'REPLACE_PRODUCT':
      return state.filter(product => product.id !== action.data.id).concat(action.data)
    default: return state
  }
}

// Action creators:

export const initializeAvailableProducts = () => {
  return async dispatch => {
    const products = await productService.getAvailable()
    dispatch({
      type: 'INIT_PRODUCTS',
      data: products
    })
  }
}



export const initializeAllProducts = () => {
  return async dispatch => {
    const products = await productService.getAll()
    dispatch({
      type: 'INIT_PRODUCTS',
      data: products
    })
  }
}

export const addNewProduct = (newProduct) => {            // SAA POISTAAAAAAAAAAAAAA
  return async dispatch => {
    const product = await productService.post(newProduct)
    dispatch({
      type: 'ADD_NEW_PRODUCT',
      data: product
    })
  }
}

export const modifyAvailability = (idAndInfoToModify) => {       // SAA POISTAAAAAAAAAAAAAA
  return async dispatch => {
    const product = await productService.putAvailable(idAndInfoToModify)
    dispatch({
      type: 'REPLACE_PRODUCT',
      data: product
    })
  }
}

export const modifyCategory = (idAndInfoToModify) => {           // SAA POISTAAAAAAAAAAAAAA
  return async dispatch => {
    const product = await productService.putNewCategory(idAndInfoToModify)
    dispatch({
      type: 'REPLACE_PRODUCT',
      data: product
    })
  }
}

export const modifyPricesAndSizes = (idAndInfoToModify) => {      // SAA POISTAAAAAAAAAAAAAA  
  return async dispatch => {
    const product = await productService.putPricesAndSizes(idAndInfoToModify)
    dispatch({
      type: 'REPLACE_PRODUCT',
      data: product
    })
  }
}

export default reducer