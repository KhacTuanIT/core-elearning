import { combineReducers } from 'redux'
import { category, question, answer } from './learn'
import dashboard from './dashboard'

const rootReducer = combineReducers({
  answer: answer.reducer,
  category: category.reducer,
  dashboard: dashboard.reducer,
  question: question.reducer
})

export default rootReducer
