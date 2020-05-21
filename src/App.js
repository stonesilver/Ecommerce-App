import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Header from './components/header/header.component';
import Homepage from './pages/homepage/homepage.component';
import shopPage from './pages/shop/shop.component';

function App() {
   return (
      <div>
         <Header/>
         <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/shop' component={shopPage} />
         </Switch>
      </div>
   );
}

export default App;
