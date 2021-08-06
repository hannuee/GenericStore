import categoryService from '../services/categories'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_CATEGORIES':
      return action.data
    case 'ADD_NEW_CATEGORY':
      return state.concat(action.data)
    case 'DELETE_CATEGORY': 
      return state.filter(cetegory => cetegory.id !== action.data)
    case 'REPLACE_CATEGORY': 
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


export const addNewCategory = (newCategory, setDisabled, ClearForm) => {    // SAA POISTAAAAAAAAAAAAAA
  return async dispatch => {
    setDisabled(true)

    try{
      const category = await categoryService.post(newCategory)
      ClearForm()
      setDisabled(false)
      dispatch({
        type: 'ADD_NEW_CATEGORY',
        data: category
      })
    } 
    catch(error) {
      setDisabled(false)
    }
  }
}

export const deleteCategory = (id) => {      // SAA POISTAAAAAAAAAAAAAA
  return async dispatch => {
    const category = await categoryService.deleteCategory(id)
    dispatch({
      type: 'DELETE_CATEGORY',
      data: id
    })
  }
}

export const modifyParentCategory = (idAndInfoToModify) => {      // SAA POISTAAAAAAAAAAAAAA
  return async dispatch => {
    const category = await categoryService.putNewCategory(idAndInfoToModify)
    dispatch({
      type: 'REPLACE_CATEGORY',
      data: category
    })
  }
}

export default reducer