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
