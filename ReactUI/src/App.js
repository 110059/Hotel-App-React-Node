import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import Default from './components/Default';
import HotelList from './components/HotelList';
import Footer from './components/Footer';

function App() {
  return (
       <React.Fragment>
         <NavBar />
            <Switch>
               <Route exact path="/" component={HotelList}></Route>
               <Route path="/search/:key" component={HotelList} />
               <Route component={Default}></Route>
            </Switch>
            <Footer />
         </React.Fragment>
    );
}

export default App;
