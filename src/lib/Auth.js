import React from 'react';
import axios from 'axios';

const { Consumer, Provider } = React.createContext();

// Provider: where we storage the data
// Consumer: a component that can connect to the Provider
// consume the data from the provider

// HOC - High Order Component
// we use WrappedComponent in order to wrap a component and make it a Consumer

function withAuth(WrappedComponent) {

  // in HOC we return another component from inside like an anonimous component
  return function (props) {
    return (
      // we say what we want to do with the wrappedcomponent (it's a component itself)
      // (we want to wrap it with the consumer in order to transform it into a consumer)
      <Consumer>
        {(valueFromProvider) => ( // we can't leave it only wrapped, we have to inject the value from the Provider
          <WrappedComponent 
            {...props} // we pass the props (mandatory for HOC)
            user={valueFromProvider.user} // all the things provider has inside the value
            isLoggedIn={valueFromProvider.isLoggedIn}
            isLoading={valueFromProvider.isLoading}
            login={valueFromProvider.login}
            signup={valueFromProvider.signup}
            logout={valueFromProvider.logout}
          />
        )}
      </Consumer>
    )
  }
}

// this commponent will use the Provider

class AuthProvider extends React.Component {
  state = {
    user: null,  // if not logged in, there isn't user object
    isLoggedIn: false,
    isLoading: true  // the auth is still loading or it is done?
  }

  // user have a cookie or not, is logged in?

  componentDidMount() {
    // When app and AuthProvider load for the first time
    // make a call to the server '/me' (checks if it has a cookie) 
    // and check if user is authenticated

    axios.get('http://localhost:5000/auth/me', { withCredentials: true }) // get request for the backend

      // if user is logged in, give us user object and change the state
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      // if not, leave the state as it was (security reasons)
      .catch((err) => this.setState({ isLoggedIn: false, isLoading: false, user: null }));
  }

 // the three functions below dispach requests to the back-end

 // we have the user info from the form, and now we have to send it to the back-end
 // in order to include the cookie, we put withCredentials: true

  login = (username, password) => {
    axios.post('http://localhost:5000/auth/login', { username, password }, { withCredentials: true })
      .then((response) => {

        // if is successful we receive back the user obj from the response
        // and we use it to change the state
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => console.log(err));
  }
  signup = (username, password) => {
    axios.post('http://localhost:5000/auth/signup', { username, password }, { withCredentials: true })
      .then((response) => {
        const user = response.data;
        this.setState({ isLoggedIn: true, isLoading: false, user });
      })
      .catch((err) => console.log(err));
  }

  // for the logout is not necessary to give the user obj but the cookie yes, in order to
  // destroy the session

  logout = () => {
    axios.get('http://localhost:5000/auth/logout', { withCredentials: true })
      .then((response) => {

        // we put again the state in its default mode
        this.setState({ isLoggedIn: false, isLoading: false, user: null });
      })
      .catch((err) => console.log(err));
  }

  render() {
    // 3. HERE we deconstruct the data from the state to have a cleaner code
    const { user, isLoggedIn, isLoading } = this.state;
    // 5. Deconstructing the functions. It comes form the currenct component -> this
    const { login, signup, logout } = this;

    return (
      // 1. Put inside the component the Provider tag if we want yo use it
      // to convert that component into a Provider-component
      // 2. Everything we want to provide or share with the Consumer,
      // we put inside the value object 
      // 3. To not hardcode everything we want to put in the value,
      // we save it into the state, and then we reference it here
      // 4. This.props.children, is used to wrap the entire application for this to work
      // so it's mandatory to do the wrapping --> all the application can start consuming
      // 5. We save the 3 functions inside the provider. We can borrow, for example,
      // login for the login form (use inside the consumer)

      <Provider value={{ user, isLoggedIn, isLoading, login, signup, logout }}>
        {this.props.children}
      </Provider>
    )
  }
}

export { withAuth, AuthProvider }