import React from 'react';

import { getDurationObject } from '../../utils/dateUtils';

const Duration = ({ startDate, endDate }) => {
    const durationObject = getDurationObject(startDate, endDate);

    return (
        <div className="durationContainer">
            <div>
                {durationObject.startDate} - {durationObject.endDate}{' '}
            </div>
            {durationObject.left > 0 && (
                <div>zbývá {durationObject.left} dní</div>
            )}
            <div> </div>
        </div>
    );
};

export default Duration;
