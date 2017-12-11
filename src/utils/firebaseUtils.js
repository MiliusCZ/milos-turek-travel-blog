import firebaseConfig from './firebaseConfig';

export const getTravels = () =>
    new Promise(resolve => {
        let travelsRef = firebaseConfig.database().ref('travels');

        travelsRef.on('value', snapshot => {
            checkinsHelper(snapshot.val()).then(travels => resolve(travels));
        });
    });

export const getTravelById = travelId =>
    new Promise(resolve => {
        let travelsRef = firebaseConfig
            .database()
            .ref('travels')
            .orderByChild('travelId')
            .equalTo(travelId);

        travelsRef.on('value', snapshot => {
            let travelData = null;
            snapshot.forEach(snapshotChild => {
                travelData = snapshotChild.val();
                return true;
            });

            const promises = [];

            promises.push(
                getCheckinsForSpan(travelData.dateFrom, travelData.dateTo).then(
                    values => (travelData.checkins = snapshotToArray(values))
                )
            );

            promises.push(
                getPhotosForSpan(travelData.dateFrom, travelData.dateTo).then(
                    values => (travelData.photos = snapshotToArray(values))
                )
            );

            promises.push(
                getInstaPhotosForSpan(
                    travelData.dateFrom,
                    travelData.dateTo
                ).then(values => (travelData.instaPhotos = snapshotToArray(values)))
            );

            Promise.all(promises).then(() => resolve(travelData));
        });
    });

const getCheckinsForSpan = (startDate, endDate) =>
    getAdditionalData('checkins', 'date', startDate, endDate);

const getPhotosForSpan = (startDate, endDate) =>
    getAdditionalData('photos', 'dateCreated', startDate, endDate);

const getInstaPhotosForSpan = (startDate, endDate) =>
    getAdditionalData('instaPhotos', 'datePosted', startDate, endDate);

const getAdditionalData = (nodeName, datePropertyName, startDate, endDate) =>
    new Promise(resolve => {
        const dataRef = firebaseConfig
            .database()
            .ref(nodeName)
            .orderByChild(datePropertyName)
            .startAt(startDate)
            .endAt(endDate);

        dataRef.once('value', dataSnapshot => {
            resolve(dataSnapshot);
        });
    });

export const checkinsHelper = travels =>
    new Promise(resolve => {
        const promises = [];

        travels.map(travel =>
            promises.push(getCheckinsForSpan(travel.dateFrom, travel.dateTo))
        );

        Promise.all(promises).then(values => {
            const travelsWithCheckins = travels.map((travel, index) => {
                travel.checkins = snapshotToArray(values[index]);
                return travel;
            });

            resolve(travelsWithCheckins);
        });
    });

const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
