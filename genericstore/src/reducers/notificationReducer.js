const initialState = {
  text: '',
  severity: '',   // success, info, warning, error
  timeoutID: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'CHANGE':
    if (state.timeoutID !== null) clearTimeout(state.timeoutID)
    return action.data
  case 'CLEAR':
    return { text: '', severity: '', timeoutID: null }
  default: return state
  }
}

export const displayNotificationForSeconds = (text, severity, seconds) => {
  return async dispatch => {
    const timeoutID = setTimeout(() => {dispatch({ type: 'CLEAR' })}, seconds*1000)
    dispatch({
      type: 'CHANGE',
      data: { text, severity, timeoutID }
    })
  }
}

export default reducer