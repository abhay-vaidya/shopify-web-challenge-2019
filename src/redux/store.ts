import rootReducer from './reducers'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const middlewareList = [thunkMiddleware]

const configureStore = (initialState = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(
      applyMiddleware(...middlewareList.filter((middleware) => !!middleware))
    )
  )
}

export default configureStore
