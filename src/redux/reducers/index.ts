import { combineReducers } from 'redux'
import itemReducers, { ItemState } from './item.reducers'

export interface State {
  itemReducers: ItemState
}

const rootReducer = combineReducers({
  itemReducers
})

export default rootReducer
