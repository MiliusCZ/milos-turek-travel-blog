import React from 'react';

const TravelDetail = ({ match }) => (
    <div>
        <h2>Travel {match.params.travelId}</h2>
    </div>
);

export default TravelDetail;
