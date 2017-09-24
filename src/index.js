import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import TravelBlogContainer from './app/travel-blog/TravelBlogContainer';
import PhotoServicesLandingPage from './app/photo-services/PhotoServicesLandingPage';

import { HashRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/travel' component={TravelBlogContainer} />

-        </Switch>
    </HashRouter>,
    document.getElementById('root')
);