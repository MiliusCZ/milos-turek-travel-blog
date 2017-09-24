import React from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

import { getUrlForPoints } from '../../utils/mapUtils';

const getMapUrl = (travelInfo) => {
    const points = travelInfo.checkins.map((checkin) => {
        return {
            longitude: checkin.longitude,
            latitude: checkin.latitude
        }
    });

    console.log(travelInfo);
    return getUrlForPoints(points);
}

const TravelPanel = ({ travelInfo }) => (
    <div>
        <h2>{travelInfo.title}</h2>
        <img src={getMapUrl(travelInfo)} alt="map" width="20%" />
    </div>
);

const TravelBlogLandingPage = ({ travels }) => (
    <div>
        <h1>Travel blog landing page</h1>
        {travels.map(travel => <TravelPanel key={travel.travelId} travelInfo={travel} />)}
    </div>
)

export default TravelBlogLandingPage;
