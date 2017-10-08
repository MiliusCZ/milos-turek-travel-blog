import React from 'react';

import TravelBlogLandingPage from './TravelBlogLandingPage';

import firebaseConfig from '../../utils/firebaseConfig';
import { checkinsHelper } from '../../utils/firebaseUtils';

class TravelBlogContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travels: []
        };
    }

    componentWillMount() {
        let travelsRef = firebaseConfig.database().ref('travels');

        travelsRef.on('value', snapshot => {
            checkinsHelper(snapshot.val()).then((travels) => this.setState({ travels }));
        });
    }

    render() {
        return (
            <TravelBlogLandingPage travels={this.state.travels} />
        );
    }
}

export default TravelBlogContainer;



