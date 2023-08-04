import dayjs from "dayjs";

const convertDateToString = ({ $D, $M, $y }) => {
    const day = `${$D}`.length === 2 ? `${$D}` : `0${$D}`;
    const month = `${$M + 1}`.length === 2 ? `${$M + 1}` : `0${$M + 1}`;
    return `${day}/${month}/${$y}`;
};

const convertDateToObject = (str) => {
    return dayjs(str, "DD/MM/YYYY");
};

const convertCalendarDate = (str) => {
    const [day, month, year] = str.split("/");
    return `${year}-${month}-${day}`;
};

export { convertDateToObject, convertDateToString, convertCalendarDate };
