import moment, { MomentInput } from 'moment';

export const toISOString = (date: MomentInput) => moment(date).toISOString();
