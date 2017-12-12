import moment from 'moment';

export const formatDateWithMonth = (startDate, endDate) =>
    formatDate('MMMM YYYY', startDate, endDate);
export const formatDateWithYear = (startDate, endDate) =>
    formatDate('YYYY', startDate, endDate);

const formatDate = (formatString, startDate, endDate) => {
    const formattedDates = [startDate, endDate].map(date =>
        moment(date).format(formatString)
    );

    if (formattedDates[0] === formattedDates[1]) {
        return formattedDates[0];
    }

    return formattedDates.join(' - ');
};

export const getDurationObject = (startDate, endDate) => {
    const formatString = 'DD. MM. YYYY';
    const s = moment(startDate);
    const e = moment(endDate);
    const durationObject = {
        startDate: s.format(formatString),
        endDate: e.format(formatString),
        duration: Math.floor(s.diff(e) / 1000 / 3600 / 24),
        passed: Math.floor(moment().diff(s)  / 1000 / 3600 / 24),
        left: Math.floor(e.diff(moment())  / 1000 / 3600 / 24)
    };

    return durationObject;
};
