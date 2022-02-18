import thunkMiddleware from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { IStore } from '../store'

export const mockStoreFactory = (initialState: Partial<IStore>) =>
  configureStore([thunkMiddleware])({ ...initialState })
