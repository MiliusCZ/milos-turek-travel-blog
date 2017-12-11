import moment from 'moment';

export const formatDateWithMonth = (startDate, endDate) => formatDate('MMMM YYYY', startDate, endDate);
export const formatDateWithYear = (startDate, endDate) => formatDate('YYYY', startDate, endDate);

const formatDate = (formatString, startDate, endDate) => {
    const formattedDates = [startDate, endDate].map(date =>
        moment(date).format(formatString)
    );

    if (formattedDates[0] === formattedDates[1]) {
        return formattedDates[0];
    }

    return formattedDates.join(' - ');
};