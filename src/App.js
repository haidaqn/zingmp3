import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Login, Public } from './containers/public/index';
import { ToastContainer } from 'react-toastify'
import path from './utils/path'

function App() {

  return (
    <>
      <div className=''>
        <Routes>
          <Route path={path.PUCLIC} element={<Public />}>
            <Route path={path.HOME} element={ <Home/>} />
            <Route path={path.LOGIN} element={ <Login/>} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        /><ToastContainer />
    </>
  );
}

export default App;
