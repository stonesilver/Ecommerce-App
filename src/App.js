import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import shopPage from './pages/shop/shop.component';
import checkoutPage from './pages/checkout/checkout.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
// import SignIn from './components/sign-in/sign-in.component';

class App extends Component {
   unsubscribeFromAuth = null;

   componentDidMount() {
      const { setCurrentUser } = this.props;
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
         if (userAuth) {
            const userRef = await createUserProfileDocument(userAuth);

            userRef.onSnapshot((snapShot) => {
               setCurrentUser({
                  currentUser: {
                     id: snapShot.id,
                     ...snapShot.data(),
                  },
               });
            });
         } else {
            setCurrentUser(userAuth);
         }
      });
   }

   componentWillUnmount() {
      this.unsubscribeFromAuth();
   }

   render() {
      return (
         <div>
            <Header />
            <Switch>
               <Route exact path='/' component={Homepage} />
               <Route exact path='/shop' component={shopPage} />
               <Route exact path='/checkout' component={checkoutPage} />
               <Route
                  exact
                  path='/signin'
                  render={() =>
                     this.props.currentUser ? (
                        <Redirect to='/' />
                     ) : (
                        <SignInAndSignUpPage />
                     )
                  }
               />
            </Switch>
         </div>
      );
   }
}

const mapStateToProps = createStructuredSelector({
   currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
