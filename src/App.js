import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import shopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';

class App extends Component {
   constructor() {
      super();
      this.state = {
         currentUser: null,
      };
   }

   unsubscribeFromAuth = null;

   componentDidMount() {
      this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
         this.setState({ currentUser: user });
      });
   }

   componentWillUnmount() {
      this.unsubscribeFromAuth();
   }

   render() {
      return (
         <div>
            <Header currentUser={this.state.currentUser} />
            <Switch>
               <Route exact path='/' component={Homepage} />
               <Route exact path='/shop' component={shopPage} />
               <Route exact path='/signin' component={SignInAndSignUpPage} />
            </Switch>
         </div>
      );
   }
}

export default App;
