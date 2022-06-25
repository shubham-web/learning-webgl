// webgl specific helper functions
export const getWebGLContext = (canvas: HTMLCanvasElement | null | undefined): WebGLRenderingContext | null => {
	if (!canvas) {
		return null;
	}
	let context = canvas.getContext("webgl");
	if (!context) {
		throw new Error("WebGL not supported!");
	}
	return context;
};

export const createShader = (gl: WebGLRenderingContext, type: "VERTEX_SHADER" | "FRAGMENT_SHADER", source: string) => {
	const shader = gl.createShader(gl[type]);
	if (!shader) {
		throw new Error(`Couldn't Create ${type}.`);
	}
	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
	if (success) {
		return shader;
	}

	let error = gl.getShaderInfoLog(shader);
	gl.deleteShader(shader);
	throw new Error(`Couldn't compile ${type} "${error}"`);
};
