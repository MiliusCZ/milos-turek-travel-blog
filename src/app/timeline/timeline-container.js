import React from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { Link } from 'react-router-dom';

import moment from 'moment';

import firebaseConfig from '../../utils/firebaseConfig';
import { formatDateWithMonth } from '../../utils/dateUtils';

import './timeline-container.scss';
import emptyThumbnail from '../../assets/images/placeholder.png';

class TimelineContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travels: []
        };
    }

    componentWillMount() {
        let travelsRef = firebaseConfig.database().ref('travels');

        travelsRef.on('value', snapshot => {
            this.setState({
                travels: snapshot
                    .val()
                    .sort(
                        (a, b) => -moment(a.dateFrom).diff(moment(b.dateFrom))
                    )
            });
        });
    }

    render() {
        return (
            <div style={{ background: '#ddd' }}>
                <VerticalTimeline>
                    {this.state.travels.map(travel => (
                        <TravelElement travel={travel} key={travel.travelId} />
                    ))}
                </VerticalTimeline>
            </div>
        );
    }
}

export default TimelineContainer;

const TravelElement = ({ travel }) => (
    <VerticalTimelineElement
        date={formatDateWithMonth(travel.dateFrom, travel.dateTo)}
        iconStyle={{
            background: 'rgb(33, 150, 243)',
            color: '#fff'
        }}
    >
        <div className="image">
            <img src={travel.thumbnail ? travel.thumbnail : emptyThumbnail} />
            <h3><Link to={`timeline/${travel.travelId}`}>{travel.title}</Link></h3>
        </div>
    </VerticalTimelineElement>
);

