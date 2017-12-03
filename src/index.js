import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Router, Switch, Route } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

import EditorContainer from './app/editor/editor-container';
import TimelineContainer from './app/timeline/timeline-container';
import TravelBlogContainer from './app/travel-blog/TravelBlogContainer';
import TravelDetail from './app/travel-detail/travel-detail';
import PhotoServicesLandingPage from './app/photo-services/PhotoServicesLandingPage';

import './assets/global.scss';

ReactGA.initialize('UA-32364050-1');

const history = createHistory();

history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});

ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact path="/" component={PhotoServicesLandingPage} />
            <Route path="/travel" component={TravelBlogContainer} />
            <Route path="/timeline/:travelId" component={TravelDetail} />
            <Route path="/editor" component={EditorContainer} />
            <Route exact path="/timeline" component={TimelineContainer} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
