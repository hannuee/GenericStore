const initialState = {
    text: '',
    timeoutID: null
  }
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CHANGE':
        if (state.timeoutID !== null) clearTimeout(state.timeoutID)
        return action.data
      case 'CLEAR':
          return {text: '', timeoutID: null}
      default: return state
    }
  }
  
  export const displayNotificationForSeconds = (text, seconds) => {
    return async dispatch => {
      const timeoutID = setTimeout(() => {dispatch({ type: 'CLEAR' })}, seconds*1000)
      dispatch({
        type: 'CHANGE',
        data: { text, timeoutID }
      })
    }
  }
  
  export default reducer