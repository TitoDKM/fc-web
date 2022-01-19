import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './views/Login/Login';
import Students from './views/Students/Students';

import './assets/styles.css';
import Student from './views/Student/Student';
import { AppReducer, INITIAL_STATE } from './reducers/AppReducer';

export const appContext = React.createContext([]);

const App = () => {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  return (
    <appContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={state.logged ? <Navigate to="/alumnos" /> : <Login />} />
          <Route path="/alumnos" element={!state.logged ? <Navigate to="/" /> : <Students />} />
          <Route path="/alumno" element={!state.logged ? <Navigate to="/" /> : <Student />} />
          <Route path="*" element={<h1>Página no encontrada</h1>} />
        </Routes>
      </BrowserRouter>
    </appContext.Provider>
  )
}

ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
