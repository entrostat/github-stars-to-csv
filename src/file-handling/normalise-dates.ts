import { DateCount } from '../generator/models/date-count';
import moment from 'moment';
import { sortObjectKeys } from '../generator/sort-object-keys';

export function normaliseDates(
    dateCounts: DateCount,
    minDate: moment.Moment,
    maxDate: moment.Moment,
) {
    const current = minDate.clone();
    while (current.isSameOrBefore(maxDate)) {
        const dateString = current.format('YYYY-MM-DD');
        dateCounts[dateString] = dateCounts[dateString] || 0;
        current.add(1, 'day');
    }
    return sortObjectKeys(dateCounts);
}
