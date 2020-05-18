import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from './../lib/Auth';

function PublicRoute(props) {

  console.log('props :>> ', props); // how it looks the component we are passing

  const { exact, path, component, isLoggedIn } = props;
  const Component = component; // we have to save it in Capital letter 

  return (
    // checks if user is logged in or not (that's why we connect to withAuth)
    // isLoggedIn comes from withAuth
    // we need to provide exact and path inside the Route

    <Route
      exact={exact}
      path={path}
      render={(props) => {
        if (isLoggedIn) return <Redirect to="/private" /> // we redirec to the private zone

        // and we need to provide the props inside the component
        else if (!isLoggedIn) return <Component {...props} /> // we show the public component (login/signup)
      }} />
  )
}

export default withAuth(PublicRoute);
