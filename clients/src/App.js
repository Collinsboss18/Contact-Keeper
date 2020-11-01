// App
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Private Route
import PrivateRoute from './components/routing/PrivateRoute';
// States
import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
// Components
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alerts';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
// Utils
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className={'container'}>
                <Alert />
                <Switch>
                  <Route exert path={'/login'} component={Login} />
                  <Route exert path={'/register'} component={Register} />
                  <Route exert path={'/about'} component={About} />
                  <PrivateRoute exert path={'/'} component={Home} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
