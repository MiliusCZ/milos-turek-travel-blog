import firebaseConfig from './firebaseConfig';

const getCheckinsForSpan = (startDate, endDate) => new Promise((resolve) => {
    const checkinsRef = firebaseConfig.database().ref('checkins').orderByChild('date').startAt(startDate).endAt(endDate);

    checkinsRef.once('value', checkinsSnapshot => {
        resolve(checkinsSnapshot);
    });
});

export const checkinsHelper = (travels) => new Promise((resolve) => {
    const promises = [];

    travels.map((travel) => promises.push(getCheckinsForSpan(travel.dateFrom, travel.dateTo)));

    Promise.all(promises).then((values) => {
        travels.map((travel, index) => {
            travel.checkins = snapshotToArray(values[index]);
            return travel;
        });

        resolve(travels);
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
}
