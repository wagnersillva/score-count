import moment from 'moment'

export const generateUniqueId = () =>  Math.random().toString(36).substring(2) + Date.now().toString(36);

export const convertDateString = (date, format = "DD/MM/yyyy") => moment(date).format(format)