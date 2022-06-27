type PracticeDate = `${number}-${number}-${number}-${hours}-${minutes}`;
interface PracticeItem {
	folder: string;
	label: string;
	preview?: string;
	date: PracticeDate;
}

// webgl util function types
type GetWebGlContext = (canvas: HTMLCanvasElement | null | undefined) => WebGLRenderingContext | null;
type CreateShader = (
	gl: WebGLRenderingContext,
	type: "VERTEX_SHADER" | "FRAGMENT_SHADER",
	source: string
) => WebGLShader;
type CreateProgram = (
	gl: WebGLRenderingContext,
	vertexShader: WebGLShader,
	fragmentShader: WebGLShader
) => WebGLProgram;

type PracticeItems = Array<PracticeItem>;

type WebGLCanvasInit = (context: WebGLRenderingContext) => void;

interface WebGLProgramInitData {
	gl: WebGLRenderingContext;
	program: WebGLProgram;
	attr: { [key: string]: number };
	uniform: { [key: string]: WebGLUniformLocation | null };
	buffer: {
		[key: string]: WebGLBuffer | null;
	};
	texture?: {
		[key: string]: HTMLImageElement;
	};
	customInputs?: {
		[key: string]: any;
	};
}

// prettier-ignore
type KernelMatrix3x3 = [
    number, number, number,
    number, number, number,
    number, number, number,
];
