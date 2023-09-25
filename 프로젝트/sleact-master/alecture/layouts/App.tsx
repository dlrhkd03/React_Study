import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import loadable from '@loadable/component';

const Login = loadable(() => import('@pages/Login/index'));
const SignUp = loadable(() => import('@pages/SignUp'));

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact path="/" to="/login" />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
