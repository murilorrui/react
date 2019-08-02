import { createStore } from 'redux'
import reducers from 'store/reducers'

const enhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

const store = createStore(reducers, enhancers)

export default store
