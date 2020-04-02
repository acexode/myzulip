import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import Landing from './component/landing';
import Login from './component/login';
import Chat from './component/chatpage';
import SignUp from './component/signup';
import AuthGuard from './component/AuthGuard';

function App() {
  return (
    <Router>
     <Route path="/" exact component={Landing} />
     <Route path="/login" exact component={Login} />
     <Route path="/signup" exact component={SignUp} />
     <AuthGuard path="/chat" component={Chat} />
     {/* <Route path="/chat" exact component={Chat} /> */}
     {/* <Route path="/chat/:id" exact component={Chat} /> */}

    </Router>
  );
}

export default App;
