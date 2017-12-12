import React from 'react';

import { getUrlForPoints } from '../../utils/mapUtils';
import { formatDateWithYear } from '../../utils/dateUtils';
import { getTravelById } from '../../utils/firebaseUtils';

import Duration from './duration';

import './travel-detail.scss';

const getMapUrl = travelInfo => {
    const points = travelInfo.checkins.map(checkin => {
        return {
            longitude: checkin.longitude,
            latitude: checkin.latitude
        };
    });

    return getUrlForPoints(points);
};

class TravelDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            travelInfo: {
                checkins: [],
                instaPhotos: [],
                photos: [],
                posts: []
            }
        };
    }

    componentWillMount() {
        getTravelById(this.props.match.params.travelId).then(travelInfo =>
            this.setState({ travelInfo })
        );
    }

    render() {
        return (
            <div className="travelDetail">
                <h2>
                    {this.state.travelInfo.title}{' '}
                    {formatDateWithYear(
                        this.state.travelInfo.dateFrom,
                        this.state.travelInfo.dateTo
                    )}
                </h2>
                <Duration
                    startDate={this.state.travelInfo.dateFrom}
                    endDate={this.state.travelInfo.dateTo}
                />
                <div className="map">
                    <img
                        src={getMapUrl(this.state.travelInfo)}
                        alt="map"
                        width="100%"
                    />
                </div>
                <div className="instagramGallery">
                    {this.state.travelInfo.instaPhotos.map(photo => (
                        <img key={photo.datePosted} src={photo.sourceUrl} />
                    ))}
                </div>
                <div className="gallery">
                    {this.state.travelInfo.photos.map(photo => (
                        <img key={photo.title} src={photo.staticUrl} />
                    ))}
                </div>
            </div>
        );
    }
}

export default TravelDetail;
