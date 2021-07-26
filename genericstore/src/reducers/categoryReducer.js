import categoryService from '../services/categories'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CATEGORIES':
      return action.data
    case 'ADD_NEW':
      return state.concat(action.data)
    case 'REPLACE':
      return state.filter(cetegory => cetegory.id !== action.data.id).concat(action.data)
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


export const addNewCategory = (newCategory) => {
  return async dispatch => {
    const category = await categoryService.post(newCategory)
    dispatch({
      type: 'ADD_NEW',
      data: category
    })
  }
}

export const modifyParentCategory = (idAndInfoToModify) => {
  return async dispatch => {
    const category = await categoryService.putNewCategory(idAndInfoToModify)
    dispatch({
      type: 'REPLACE',
      data: category
    })
  }
}

export default reducer