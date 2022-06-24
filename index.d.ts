type PracticeDate = `${number}-${number}-${number}`;
interface PracticeItem {
	folder: string;
	label: string;
	preview?: string;
	date: PracticeDate;
}
type PracticeItems = Array<PracticeItem>;
