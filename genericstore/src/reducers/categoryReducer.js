import categoryService from '../services/categories'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CATEGORIES':
      return action.data
    default: return state
  }
}

// Action creators:

export const initializeCategories = () => {
  return async dispatch => {
    const categories = await categoryService.getAll()
    dispatch({
      type: 'INIT_CATEGORIES',
      data: categories
    })
  }
}

export default reducer