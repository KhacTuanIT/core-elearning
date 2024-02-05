'use client'
import { persistStore } from 'redux-persist'
import { store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@material-tailwind/react'
import BounceLoading from '@/app/loading/bounceLoading'

const { Provider } = require('react-redux')

const ReduxProvider = ({ children }) => {
  let persistor = persistStore(store)

  return (
    <ThemeProvider>
      <Provider store={store}>
        <PersistGate loading={<BounceLoading />} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </ThemeProvider>
  )
}

export default ReduxProvider
