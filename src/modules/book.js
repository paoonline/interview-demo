export const BOOKREAD_REQUESTED = 'book/newBookRead'
export const BOOKREAD_SAVE = 'book/newBookSave'
export const BOOKREAD_LIST = 'book/BookList'
export const BOOKREAD_DELETE = 'book/BookDelete'
export const BOOKREAD_UPDATE = 'book/BookUpdate'

const initialState = {
    list: [],
    loading: false,
    status:false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case BOOKREAD_LIST:
      return {
        ...state,
        loading: false,
        status:false
      }
    case BOOKREAD_REQUESTED:
      return {
        ...state,
        loading: true,
        status:false
      }

    case BOOKREAD_SAVE:
      return {
        ...state,
        list: [...state.list, action.data],
        loading: false,
        status:true
      }

    case BOOKREAD_UPDATE:
      return {
        ...state,
        list: action.data,
        loading: false,
        status:true
      }


    case BOOKREAD_DELETE:
    return {
        ...state,
        list: action.data,
    }

    default:
      return state
  }
}

export const BookLists = () => {
    return dispatch => {
      dispatch({
        type: BOOKREAD_LIST,
      })
    }
  }

export const BookReadList = () => {
    return dispatch => {
      dispatch({
        type: BOOKREAD_REQUESTED,
      })
    }
  }

export const BookReadAsync = (param) => {
  return dispatch => {
    dispatch({
      type: BOOKREAD_REQUESTED,
    })

    return setTimeout(() => {
      dispatch({
        type: BOOKREAD_SAVE,
        data: param
      })
    }, 3000)
  }
}

export const BookDelete = (param) => {
    return dispatch => {
      dispatch({
        type: BOOKREAD_DELETE,
        data: param
      })
    }
}

export const BookReadUpdateAsync = (param) => {
  return dispatch => {
    dispatch({
      type: BOOKREAD_REQUESTED,
    })

    return setTimeout(() => {
      dispatch({
        type: BOOKREAD_UPDATE,
        data: param
      })
    }, 3000)
  }
}
