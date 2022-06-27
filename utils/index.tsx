import { formatTimeAgo } from "./date";

export const parsePracticeDate = (dateString: PracticeDate): string => {
	let [_day, _month, _year, _hours, _minutes] = dateString.split("-").map((e) => parseInt(e));
	let dateOb = new Date(_year, _month - 1, _day, _hours, _minutes);
	return formatTimeAgo(dateOb);
};

export const random = (max: number, min = 0) => {
	return min + Math.random() * (max - min);
};

export const loadImage = (src: string) => {
	return new Promise((resolve: (image: HTMLImageElement) => void, reject) => {
		let image = new Image();
		image.src = src;
		image.onload = () => {
			resolve(image);
		};
		image.onerror = () => {
			reject();
		};
	});
};
