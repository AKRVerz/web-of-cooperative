import moment, { MomentInput } from 'moment';

export const isIsoDateFormat = (date: MomentInput) =>
  moment(date, 'YYYY-MM-DDTHH:mm:ss', true).isValid();
