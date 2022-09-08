import { Moment } from "moment";

export const momentToLocaleMoment = (moment: Moment) => {
    return moment
        .clone()
        .locale(navigator.language.includes("en") ? "en" : "es");
};

export const momentToLocaleDateString = (moment: Moment) => {
    return moment.format(
        navigator.language.includes("en") ? "MM/DD/YYYY" : "DD/MM/YYYY"
    );
};

// 1,5 hours => { hours: 1, minutes: 30 }
export const hoursToHHMM = (hours: number) => {
    return {
        hours: Math.trunc(hours),
        minutes: Math.trunc(hours * 60) % 60,
    };
};

// 1,5 hours => "01:30"
export const hoursToHHMMstring = (hours: number | string) => {
    const hoursParsed = parseFloat(hours.toString().replace(",", "."));
    const hoursMinutes = hoursToHHMM(hoursParsed);
    return `${hoursMinutes.hours
        .toString()
        .padStart(2, "0")}:${hoursMinutes.minutes.toString().padStart(2, "0")}`;
};
