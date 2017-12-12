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
        const galleryImages = this.state.travelInfo.photos.map(photo => {
            return {
                src: photo.originalUrl
            };
        });

        return (
            <div className="travelDetail">
                <div className="travelSection">
                    <h1>
                        {this.state.travelInfo.title}{' '}
                        {formatDateWithYear(
                            this.state.travelInfo.dateFrom,
                            this.state.travelInfo.dateTo
                        )}
                    </h1>
                    <Duration
                        startDate={this.state.travelInfo.dateFrom}
                        endDate={this.state.travelInfo.dateTo}
                    />
                </div>
                <div className="travelSection">
                    <h2>Mapa</h2>
                    <div className="map">
                        <img
                            src={getMapUrl(this.state.travelInfo)}
                            alt="map"
                            width="100%"
                        />
                    </div>
                </div>
                <div className="travelSection">
                    <h2>Instagram</h2>
                    <div className="instagramGallery">
                        {this.state.travelInfo.instaPhotos.reverse().map(photo => (
                            <a href={photo.sourceUrl} target="_blank">
                                <img
                                    key={photo.sourceUrl}
                                    src={photo.sourceUrl}
                                />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="travelSection">
                    <h2>Fotky</h2>
                    <div className="gallery">
                        {this.state.travelInfo.photos.reverse().map(photo => (
                            <a href={photo.originalUrl} target="_blank">
                                <img
                                    key={photo.originalUrl}
                                    src={photo.staticUrl}
                                />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default TravelDetail;
