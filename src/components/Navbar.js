import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../lib/Auth'

class Navbar extends Component {
  render() {
    // `user`, `logout`, `isLoggedIn` are coming from the AuthProvider 
    // and are injected by the withAuth HOC
    const { user, logout, isLoggedIn } = this.props;

    return (
      <nav className="navbar">
        <Link to={'/'} id='home-btn'>
          <h4>Home</h4>
        </Link>
        {
          //if user is logged in show the logout button
          // on click calls the function that is on the provider
          isLoggedIn
            ? <div>
              <p>{user.username}</p>
              <button onClick={logout}> Logout </button> 
            </div>
            //if not
            : (
              // we don't need to create a div for this, so in order to satisfy JSX
              // we use can use an empty tag
              <> 
                <Link to="/login">
                  {' '}
                  <button className="navbar-button">Login</button>{' '}
                </Link>
                <br />
                <Link to="/signup">
                  {' '}
                  <button className="navbar-button">Sign Up</button>{' '}
                </Link>
              </>
            )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
