import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { FormStateMap } from 'redux-form'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export interface IStore {
  form: FormStateMap
}

const reducer = combineReducers({
  form: reduxFormReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware()))

export default store
