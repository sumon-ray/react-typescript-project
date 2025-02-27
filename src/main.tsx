import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { persistor, store } from './app/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/route.tsx'
import { ThemeProvider } from './provider/theme-provider.tsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={routes} />
      </PersistGate>
    </Provider>
    <ToastContainer position="top-right" autoClose={3000}/> 

    </ThemeProvider>
  </React.StrictMode>,
)
