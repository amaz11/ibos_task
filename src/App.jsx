import { RouterProvider, } from 'react-router-dom'
import './App.css'
import { router } from './routes/routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ContextApi } from './ContextApi/ContextApi';

function App() {
    const [user, setUser] = useState(null || localStorage.getItem('user'))

  
  return (
    <>
     <ContextApi.Provider value={{user, setUser }}>
    <ToastContainer />
    <RouterProvider router={router} />
    </ContextApi.Provider>
    </>
  )
}

export default App
