import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Calendar from './Components/Calendar';
import './App.css';
import Footer from './Components/Styled-Components/FooterStyles';
import { Title } from './Components/Styled-Components/CalendarStyles';
import GameInfo from './Components/GameInfo';

function App() {
  return (
    <Router>
      <Switch>
          <Route exact path="/" render={Home}></Route>              
          <Route exact path="/:id" render={Details}></Route>              
       </Switch>
    </Router>
  );
}

export default App;

function Home() {
  return (
    <Fragment>
      <Title>Upcoming Games</Title>
      <Calendar />
      <Footer>Made by <a target="_blank" rel="noopener noreferrer" href="https://github.com/xSerpine">Luís Ferro</a>.</Footer>
    </Fragment>
  );
}

function Details() {
  return (
    <Fragment>
      <GameInfo />
      <Footer>Made by <a target="_blank" rel="noopener noreferrer" href="https://github.com/xSerpine">Luís Ferro</a>.</Footer>
    </Fragment>
  );
}