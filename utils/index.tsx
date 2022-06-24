export const parsePracticeDate = (dateString: PracticeDate): Date => {
	let [_day, _month, _year] = dateString.split("-");
	return new Date(parseInt(_year), parseInt(_month) - 1, parseInt(_day));
};
