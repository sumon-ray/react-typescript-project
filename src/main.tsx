import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './app/store.ts'
import { Provider } from 'react-redux'

import { RouterProvider } from 'react-router-dom'
import routes from './routes/route.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>,
)
