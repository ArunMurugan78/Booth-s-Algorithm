import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import heart from './heart.png'
import Division from "./division";
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <div style={{minHeight:'96vh'}}>
    <Switch>
      <Route path="/division" exact component={Division}/>
      <Route path="/" exact component={App}/>
    </Switch>
    </div>
    
   <div className="text-center" style={{backgroundColor:'#f3f3f3'}}>Made with <img src={heart} style={{height:'20px',width:'auto'}} alt="heart" className="mx-2"/> by<a href="http://arunmurugan.me/" className="mx-2">Arun</a> </div>

   </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
