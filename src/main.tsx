import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import routes from './routes/route.tsx'
import { ThemeProvider } from './provider/theme-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
)
