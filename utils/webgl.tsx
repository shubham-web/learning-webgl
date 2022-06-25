// webgl specific helper functions
export const getWebGLContext: GetWebGlContext = (canvas) => {
	if (!canvas) {
		return null;
	}
	let context = canvas.getContext("webgl");
	if (!context) {
		throw new Error("WebGL not supported!");
	}
	return context;
};

export const createShader: CreateShader = (gl, type, source) => {
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

export const createProgram: CreateProgram = (gl, vertexShader, fragmentShader) => {
	const program = gl.createProgram();
	if (!program) {
		throw new Error("Couldn't create gl program.");
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);

	let success = gl.getProgramParameter(program, gl.LINK_STATUS);
	if (success) {
		return program;
	}

	let error = gl.getProgramInfoLog(program);
	gl.deleteProgram(program);
	throw new Error(`Couldn't Link GL Program, ${error}`);
};
