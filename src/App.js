import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Album, Home, Login, Public } from './containers/public/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import * as actions from './store/actions';
import path from './utils/path'

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getHome());
  });

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={ <Home/>} />
            <Route path={path.LOGIN} element={<Login />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAY__TITLE__PID} element={<Album />} />
            <Route path={path.START} element={ <Home/>} />
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
