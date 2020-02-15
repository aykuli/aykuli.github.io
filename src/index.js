import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter, Switch, Route } from 'react-router-dom';

import './index.scss';

import Portfolio from './components/portfolio/portfolio';
import About from './components/about/about';
import ErrorPage from './components/error/error';


ReactDOM.render(
<HashRouter>
    <App>
        <Switch>
            <Route exact path='/' component={Portfolio} />
            <Route exact path='/about' component={About} />
            <Route exact path='*' component={ErrorPage} />
        </Switch>
    </App>
</HashRouter>, document.getElementById('root'));