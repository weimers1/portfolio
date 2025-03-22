import { parseISO, format } from 'date-fns';

/**
 *
 * @param {String} dateString The MongoDB Date string being formatted (ex: '2025-03-22T10:30:00.000Z')
 * @param {String} formatString The format for which the MongoDB Date string should be returned (ex: 'MMMM d, yyyy')
 * @returns A formatted string for a MongoDB Date
 */
const formatMongoDBDate = (dateString, formatString = 'M/yyyy') => {
    const date = parseISO(dateString);
    return format(date, formatString);
};

export { formatMongoDBDate };
