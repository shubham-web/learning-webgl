type PracticeDate = `${number}-${number}-${number}`;
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
