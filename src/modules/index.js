import { combineReducers } from 'redux'
import counter from './counter'
import book from './book'

export default combineReducers({
  counter,
  book
})
