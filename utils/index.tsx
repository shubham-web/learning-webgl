import { formatTimeAgo } from "./date";

export const parsePracticeDate = (dateString: PracticeDate): string => {
	let [_day, _month, _year] = dateString.split("-");
	let dateOb = new Date(parseInt(_year), parseInt(_month) - 1, parseInt(_day));
	return formatTimeAgo(dateOb);
};

export const random = (max: number, min = 0) => {
	return min + Math.random() * (max - min);
};
