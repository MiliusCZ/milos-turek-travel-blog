import React from 'react';

import TravelBlogLandingPage from './TravelBlogLandingPage';

import { getTravels } from '../../utils/firebaseUtils';

class TravelBlogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travels: []
        };
    }

    componentWillMount() {
        getTravels().then(travels => this.setState({ travels }));
    }

    render() {
        return <TravelBlogLandingPage travels={this.state.travels} />;
    }
}

export default TravelBlogContainer;
